import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type BillingType = "PIX" | "CREDIT_CARD" | "BOLETO";

export interface CreditCardData {
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
}

export interface CreditCardHolderInfo {
  name: string;
  email: string;
  cpfCnpj: string;
  postalCode: string;
  addressNumber: string;
  phone: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  status?: string;
  invoiceUrl?: string;
  bankSlipUrl?: string;
  pixQrCode?: string;
  pixCopiaECola?: string;
  pixExpiration?: string;
  pagamentoId?: string;
  error?: string;
}

interface CreatePaymentParams {
  billingType: BillingType;
  value: number;
  description?: string;
  tipoReferencia: "pedido" | "assinatura" | "pacote" | "vale_presente";
  referenciaId: string;
  customerName?: string;
  customerEmail?: string;
  customerCpfCnpj: string;
  customerPhone?: string;
  creditCard?: CreditCardData;
  creditCardHolderInfo?: CreditCardHolderInfo;
  installmentCount?: number;
  dueDate?: string;
}

export const useAsaasPayment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

  const createPayment = async (params: CreatePaymentParams): Promise<PaymentResult> => {
    setLoading(true);
    setPaymentResult(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Usuário não autenticado");

      const response = await supabase.functions.invoke("asaas-criar-cobranca", {
        body: params,
      });

      if (response.error) throw new Error(response.error.message);

      const result = response.data as PaymentResult;

      if (!result.success) {
        throw new Error(result.error || "Erro ao criar cobrança");
      }

      setPaymentResult(result);

      if (params.billingType === "PIX") {
        toast.success("Cobrança Pix gerada! Escaneie o QR Code ou copie o código.");
      } else if (params.billingType === "CREDIT_CARD") {
        if (result.status === "CONFIRMED" || result.status === "RECEIVED") {
          toast.success("Pagamento aprovado! ✅");
        } else {
          toast.info("Pagamento sendo processado...");
        }
      } else if (params.billingType === "BOLETO") {
        toast.success("Boleto gerado! Pague até o vencimento.");
      }

      return result;
    } catch (error: any) {
      const errorMsg = error.message || "Erro ao processar pagamento";
      toast.error(errorMsg);
      const errorResult: PaymentResult = { success: false, error: errorMsg };
      setPaymentResult(errorResult);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async (paymentId: string) => {
    try {
      const response = await supabase.functions.invoke("asaas-status", {
        body: null,
        headers: {},
      });

      // Use query params approach
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Não autenticado");

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/asaas-status?paymentId=${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      );

      const data = await res.json();
      return data;
    } catch (error: any) {
      console.error("Status check error:", error);
      return null;
    }
  };

  const clearResult = () => setPaymentResult(null);

  return {
    loading,
    paymentResult,
    createPayment,
    checkStatus,
    clearResult,
  };
};
