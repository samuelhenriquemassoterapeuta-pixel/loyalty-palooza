import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, QrCode, Copy, Check, ExternalLink, CreditCard, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PagamentoAgendamentoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  servicoNome: string;
  valor: number;
  agendamentoId: string;
  onSuccess: () => void;
}

export const PagamentoAgendamentoDialog = ({
  open,
  onOpenChange,
  servicoNome,
  valor,
  agendamentoId,
  onSuccess,
}: PagamentoAgendamentoDialogProps) => {
  const [billingType, setBillingType] = useState<"PIX" | "BOLETO">("PIX");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<{
    pixQrCode?: string;
    pixCopiaECola?: string;
    invoiceUrl?: string;
    bankSlipUrl?: string;
    status?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const formatCpf = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  };

  const handlePagar = async () => {
    const cpfLimpo = cpf.replace(/\D/g, "");
    if (cpfLimpo.length !== 11) {
      toast.error("CPF inválido");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("asaas-criar-cobranca", {
        body: {
          billingType,
          value: valor,
          description: `Agendamento: ${servicoNome}`,
          tipoReferencia: "agendamento",
          referenciaId: agendamentoId,
          customerCpfCnpj: cpfLimpo,
        },
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Erro ao criar cobrança");

      setPaymentData({
        pixQrCode: data.pixQrCode,
        pixCopiaECola: data.pixCopiaECola,
        invoiceUrl: data.invoiceUrl,
        bankSlipUrl: data.bankSlipUrl,
        status: data.status,
      });

      toast.success("Cobrança criada com sucesso!");
    } catch (err: any) {
      toast.error(err.message || "Erro ao processar pagamento");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPix = () => {
    if (paymentData?.pixCopiaECola) {
      navigator.clipboard.writeText(paymentData.pixCopiaECola);
      setCopied(true);
      toast.success("Código Pix copiado!");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    if (paymentData) onSuccess();
    setPaymentData(null);
    setCpf("");
    setBillingType("PIX");
    setCopied(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Pagamento
          </DialogTitle>
        </DialogHeader>

        {!paymentData ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Resumo */}
            <div className="rounded-xl bg-muted/50 p-4 space-y-1">
              <p className="text-sm text-muted-foreground">Serviço</p>
              <p className="font-semibold text-foreground">{servicoNome}</p>
              <p className="text-lg font-bold text-primary mt-2">
                R$ {valor.toFixed(2).replace(".", ",")}
              </p>
            </div>

            {/* Método */}
            <div className="space-y-2">
              <Label>Forma de pagamento</Label>
              <RadioGroup value={billingType} onValueChange={(v) => setBillingType(v as "PIX" | "BOLETO")} className="grid grid-cols-2 gap-3">
                <Label
                  htmlFor="pix"
                  className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                    billingType === "PIX" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <RadioGroupItem value="PIX" id="pix" />
                  <Smartphone className="h-4 w-4" />
                  <span className="text-sm font-medium">Pix</span>
                </Label>
                <Label
                  htmlFor="boleto"
                  className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                    billingType === "BOLETO" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <RadioGroupItem value="BOLETO" id="boleto" />
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-sm font-medium">Boleto</span>
                </Label>
              </RadioGroup>
            </div>

            {/* CPF */}
            <div className="space-y-2">
              <Label>CPF</Label>
              <Input
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(formatCpf(e.target.value))}
                maxLength={14}
              />
            </div>

            <Button onClick={handlePagar} className="w-full h-12 rounded-xl" disabled={loading || cpf.replace(/\D/g, "").length !== 11}>
              {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
              {loading ? "Gerando cobrança..." : `Pagar R$ ${valor.toFixed(2).replace(".", ",")}`}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {billingType === "PIX" && paymentData.pixQrCode && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-xl">
                    <img
                      src={`data:image/png;base64,${paymentData.pixQrCode}`}
                      alt="QR Code Pix"
                      className="w-48 h-48"
                    />
                  </div>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Escaneie o QR Code ou copie o código abaixo
                </p>

                <Button
                  variant="outline"
                  className="w-full gap-2 rounded-xl"
                  onClick={handleCopyPix}
                >
                  {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copiado!" : "Copiar código Pix"}
                </Button>
              </div>
            )}

            {billingType === "BOLETO" && paymentData.invoiceUrl && (
              <div className="space-y-4 text-center">
                <div className="p-6 rounded-xl bg-muted/50">
                  <ExternalLink className="mx-auto h-12 w-12 text-primary mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Seu boleto foi gerado com sucesso!
                  </p>
                </div>

                <Button className="w-full gap-2 rounded-xl" asChild>
                  <a href={paymentData.bankSlipUrl || paymentData.invoiceUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Abrir Boleto
                  </a>
                </Button>
              </div>
            )}

            <Button variant="outline" className="w-full rounded-xl" onClick={handleClose}>
              Fechar
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};
