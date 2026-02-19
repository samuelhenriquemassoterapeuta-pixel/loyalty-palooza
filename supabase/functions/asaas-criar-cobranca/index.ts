/**
 * @module edge-functions/asaas-criar-cobranca
 * @description Gera cobranças PIX, boleto ou cartão via Asaas.
 *
 * Esta função atua como um wrapper seguro para a API do Asaas, garantindo que
 * o cliente nunca interaja diretamente com a API de pagamentos (o token fica no backend).
 *
 * Funcionalidades:
 * 1. Cria ou recupera um cliente no Asaas (vinculado ao `profiles.asaas_customer_id`)
 * 2. Gera a cobrança com os parâmetros fornecidos
 * 3. Se for PIX, recupera o QR Code e código Copia e Cola
 * 4. Salva o registro na tabela `pagamentos_asaas` para auditoria e status
 *
 * Integrações:
 * - Asaas API v3
 * - Supabase Database (profiles, pagamentos_asaas)
 *
 * Secrets necessárias:
 * - `ASAAS_API_KEY`: Token de API do Asaas (Sandbox ou Produção)
 * - `SUPABASE_URL`: URL do projeto
 * - `SUPABASE_SERVICE_ROLE_KEY`: Chave de serviço para gravar pagamento
 */

import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuthUser } from "../_shared/auth.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

const ASAAS_API_URL = "https://api.asaas.com/v3";

Deno.serve(async (req) => {
  // 1. Configuração de CORS (obrigatório para chamadas do browser)
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // 2. Validação de Secrets
    const ASAAS_API_KEY = Deno.env.get("ASAAS_API_KEY");
    if (!ASAAS_API_KEY) throw new Error("ASAAS_API_KEY não configurada");

    // 3. Autenticação do Usuário (requer login para gerar cobrança)
    // Usa requireAuthUser pois precisamos do email para criar cliente no Asaas
    const { userId, email } = await requireAuthUser(req);
    const supabase = createServiceClient(); // Service Client para gravar pagamento

    // 4. Validação do Payload
    const body = await req.json();
    const {
      billingType,      // "PIX", "BOLETO", "CREDIT_CARD"
      value,            // Valor em reais (ex: 150.00)
      description,      // Descrição que aparece na fatura/comprovante
      tipoReferencia,   // "pedido", "assinatura", "pacote", "vale_presente"
      referenciaId,     // ID do registro correspondente (ex: pedido_id)
      customerName,     // Nome do cliente (opcional, fallback para profile)
      customerEmail,    // Email do cliente (opcional, fallback para auth)
      customerCpfCnpj,  // CPF obrigatório para boleto/PIX no Asaas
      customerPhone,    // Telefone (opcional, fallback para profile)
      creditCard,       // Dados do cartão (apenas se billingType === CREDIT_CARD)
      creditCardHolderInfo, // Dados do titular (apenas se billingType === CREDIT_CARD)
      installmentCount, // Parcelas (opcional)
      dueDate,          // Data de vencimento (opcional, default D+3)
    } = body;

    // Validações básicas de negócio
    if (!billingType || !value || !tipoReferencia || !referenciaId) {
      throw new Error("Campos obrigatórios: billingType, value, tipoReferencia, referenciaId");
    }

    if (!customerCpfCnpj) {
      throw new Error("CPF/CNPJ é obrigatório para criar cobrança");
    }

    // 5. Gestão de Cliente no Asaas (Idempotência)
    // Verifica se o usuário já tem um ID Asaas salvo no perfil
    const { data: profile } = await supabase
      .from("profiles")
      .select("asaas_customer_id, nome, telefone")
      .eq("id", userId)
      .single();

    let asaasCustomerId = profile?.asaas_customer_id;

    // Se não tiver, cria um novo cliente na API do Asaas
    if (!asaasCustomerId) {
      const customerRes = await fetch(`${ASAAS_API_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: ASAAS_API_KEY,
        },
        body: JSON.stringify({
          name: customerName || profile?.nome || "Cliente",
          email: customerEmail || email,
          cpfCnpj: customerCpfCnpj.replace(/\D/g, ""), // Remove pontuação
          mobilePhone: customerPhone || profile?.telefone || undefined,
          externalReference: userId, // Vincula ao ID do Supabase
        }),
      });

      const customerData = await customerRes.json();
      if (customerData.errors) {
        throw new Error(customerData.errors.map((e: any) => e.description).join(", "));
      }

      asaasCustomerId = customerData.id;

      // Salva o ID do Asaas no perfil para usos futuros
      await supabase
        .from("profiles")
        .update({ asaas_customer_id: asaasCustomerId })
        .eq("id", userId);
    }

    // 6. Criação da Cobrança
    const paymentBody: any = {
      customer: asaasCustomerId,
      billingType,
      value,
      dueDate: dueDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      description: description || `Pagamento ${tipoReferencia} #${referenciaId.substring(0, 8)}`,
      externalReference: `${tipoReferencia}:${referenciaId}`, // Formato: "tipo:id" para webhook
    };

    // Lógica específica para cartão de crédito
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

    // 7. Recuperação de QR Code (apenas para PIX)
    let pixData = null;
    if (billingType === "PIX") {
      // Pequeno delay para garantir que o Asaas gerou o QR code
      await new Promise((r) => setTimeout(r, 1000));
      const pixRes = await fetch(`${ASAAS_API_URL}/payments/${paymentData.id}/pixQrCode`, {
        headers: { access_token: ASAAS_API_KEY },
      });
      pixData = await pixRes.json();
    }

    // 8. Persistência no Banco de Dados
    // Salva o registro inicial com status PENDING
    const { data: pagamento, error: dbError } = await supabase
      .from("pagamentos_asaas")
      .insert({
        user_id: userId,
        asaas_payment_id: paymentData.id,
        asaas_customer_id: asaasCustomerId,
        tipo_referencia: tipoReferencia,
        referencia_id: referenciaId,
        valor: value,
        billing_type: billingType,
        status: paymentData.status, // "PENDING"
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
      // Não falha a requisição pois o pagamento foi criado no Asaas,
      // mas loga o erro para auditoria. O webhook corrigirá o status depois.
    }

    // 9. Resposta ao Frontend
    return jsonResponse({
      success: true,
      paymentId: paymentData.id,
      status: paymentData.status,
      invoiceUrl: paymentData.invoiceUrl,
      bankSlipUrl: paymentData.bankSlipUrl,
      pixQrCode: pixData?.encodedImage || null,
      pixCopiaECola: pixData?.payload || null,
      pixExpiration: pixData?.expirationDate || null,
      pagamentoId: pagamento?.id,
    });
  } catch (error: any) {
    console.error("Error:", error);
    if (error instanceof Response) return error;
    return errorResponse(error.message);
  }
});
