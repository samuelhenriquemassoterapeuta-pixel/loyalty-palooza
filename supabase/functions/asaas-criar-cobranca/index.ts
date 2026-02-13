import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ASAAS_API_URL = "https://api.asaas.com/v3";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ASAAS_API_KEY = Deno.env.get("ASAAS_API_KEY");
    if (!ASAAS_API_KEY) throw new Error("ASAAS_API_KEY não configurada");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Não autorizado");

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) throw new Error("Não autorizado");

    const body = await req.json();
    const {
      billingType, // PIX, CREDIT_CARD, BOLETO
      value,
      description,
      tipoReferencia, // pedido, assinatura, pacote, vale_presente
      referenciaId,
      customerName,
      customerEmail,
      customerCpfCnpj,
      customerPhone,
      creditCard,
      creditCardHolderInfo,
      installmentCount,
      dueDate,
    } = body;

    if (!billingType || !value || !tipoReferencia || !referenciaId) {
      throw new Error("Campos obrigatórios: billingType, value, tipoReferencia, referenciaId");
    }

    if (!customerCpfCnpj) {
      throw new Error("CPF/CNPJ é obrigatório para criar cobrança");
    }

    // 1. Get or create Asaas customer
    const { data: profile } = await supabase
      .from("profiles")
      .select("asaas_customer_id, nome, telefone")
      .eq("id", user.id)
      .single();

    let asaasCustomerId = profile?.asaas_customer_id;

    if (!asaasCustomerId) {
      const customerRes = await fetch(`${ASAAS_API_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: ASAAS_API_KEY,
        },
        body: JSON.stringify({
          name: customerName || profile?.nome || "Cliente",
          email: customerEmail || user.email,
          cpfCnpj: customerCpfCnpj.replace(/\D/g, ""),
          mobilePhone: customerPhone || profile?.telefone || undefined,
          externalReference: user.id,
        }),
      });

      const customerData = await customerRes.json();
      if (customerData.errors) {
        throw new Error(customerData.errors.map((e: any) => e.description).join(", "));
      }

      asaasCustomerId = customerData.id;

      // Save customer ID to profile
      await supabase
        .from("profiles")
        .update({ asaas_customer_id: asaasCustomerId })
        .eq("id", user.id);
    }

    // 2. Create payment
    const paymentBody: any = {
      customer: asaasCustomerId,
      billingType,
      value,
      dueDate: dueDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      description: description || `Pagamento ${tipoReferencia} #${referenciaId.substring(0, 8)}`,
      externalReference: `${tipoReferencia}:${referenciaId}`,
    };

    // Credit card specific
    if (billingType === "CREDIT_CARD" && creditCard) {
      paymentBody.creditCard = creditCard;
      paymentBody.creditCardHolderInfo = creditCardHolderInfo;
      if (installmentCount && installmentCount > 1) {
        paymentBody.installmentCount = installmentCount;
        paymentBody.installmentValue = Math.ceil((value / installmentCount) * 100) / 100;
      }
    }

    const paymentRes = await fetch(`${ASAAS_API_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: ASAAS_API_KEY,
      },
      body: JSON.stringify(paymentBody),
    });

    const paymentData = await paymentRes.json();
    if (paymentData.errors) {
      throw new Error(paymentData.errors.map((e: any) => e.description).join(", "));
    }

    // 3. Get PIX QR code if billing type is PIX
    let pixData = null;
    if (billingType === "PIX") {
      // Wait a bit for payment to be processed
      await new Promise((r) => setTimeout(r, 1000));

      const pixRes = await fetch(`${ASAAS_API_URL}/payments/${paymentData.id}/pixQrCode`, {
        headers: { access_token: ASAAS_API_KEY },
      });
      pixData = await pixRes.json();
    }

    // 4. Save to database
    const { data: pagamento, error: dbError } = await supabase
      .from("pagamentos_asaas")
      .insert({
        user_id: user.id,
        asaas_payment_id: paymentData.id,
        asaas_customer_id: asaasCustomerId,
        tipo_referencia: tipoReferencia,
        referencia_id: referenciaId,
        valor: value,
        billing_type: billingType,
        status: paymentData.status,
        invoice_url: paymentData.invoiceUrl,
        bank_slip_url: paymentData.bankSlipUrl,
        pix_qr_code: pixData?.encodedImage || null,
        pix_copia_cola: pixData?.payload || null,
        pix_expiration: pixData?.expirationDate || null,
      })
      .select()
      .single();

    if (dbError) {
      console.error("DB error:", dbError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        paymentId: paymentData.id,
        status: paymentData.status,
        invoiceUrl: paymentData.invoiceUrl,
        bankSlipUrl: paymentData.bankSlipUrl,
        pixQrCode: pixData?.encodedImage || null,
        pixCopiaECola: pixData?.payload || null,
        pixExpiration: pixData?.expirationDate || null,
        pagamentoId: pagamento?.id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
