import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAsaasPayment, BillingType, PaymentResult } from "@/hooks/useAsaasPayment";
import { Loader2, QrCode, CreditCard, FileText, Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: number;
  description: string;
  tipoReferencia: "pedido" | "assinatura" | "pacote" | "vale_presente";
  referenciaId: string;
  onPaymentSuccess?: (result: PaymentResult) => void;
}

export const PaymentDialog = ({
  open,
  onOpenChange,
  value,
  description,
  tipoReferencia,
  referenciaId,
  onPaymentSuccess,
}: PaymentDialogProps) => {
  const { loading, paymentResult, createPayment, clearResult } = useAsaasPayment();
  const [billingType, setBillingType] = useState<BillingType>("PIX");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [copied, setCopied] = useState(false);

  // Credit card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardPostalCode, setCardPostalCode] = useState("");
  const [cardAddressNumber, setCardAddressNumber] = useState("");
  const [cardPhone, setCardPhone] = useState("");

  const formatCurrency = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;

  const formatCpf = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 14);
    if (digits.length <= 11) {
      return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (_, a, b, c, d) =>
        d ? `${a}.${b}.${c}-${d}` : c ? `${a}.${b}.${c}` : b ? `${a}.${b}` : a
      );
    }
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, (_, a, b, c, d, e) =>
      e ? `${a}.${b}.${c}/${d}-${e}` : d ? `${a}.${b}.${c}/${d}` : c ? `${a}.${b}.${c}` : b ? `${a}.${b}` : a
    );
  };

  const handleSubmit = async () => {
    if (!cpfCnpj || cpfCnpj.replace(/\D/g, "").length < 11) {
      toast.error("CPF/CNPJ inválido");
      return;
    }

    const params: any = {
      billingType,
      value,
      description,
      tipoReferencia,
      referenciaId,
      customerCpfCnpj: cpfCnpj.replace(/\D/g, ""),
      customerName: customerName || undefined,
    };

    if (billingType === "CREDIT_CARD") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        toast.error("Preencha todos os dados do cartão");
        return;
      }
      const [expMonth, expYear] = cardExpiry.split("/");
      params.creditCard = {
        holderName: cardName,
        number: cardNumber.replace(/\s/g, ""),
        expiryMonth: expMonth,
        expiryYear: expYear?.length === 2 ? `20${expYear}` : expYear,
        ccv: cardCvv,
      };
      params.creditCardHolderInfo = {
        name: cardName,
        email: "",
        cpfCnpj: cpfCnpj.replace(/\D/g, ""),
        postalCode: cardPostalCode.replace(/\D/g, ""),
        addressNumber: cardAddressNumber,
        phone: cardPhone.replace(/\D/g, ""),
      };
    }

    const result = await createPayment(params);
    if (result.success) {
      onPaymentSuccess?.(result);
    }
  };

  const handleCopyPix = () => {
    if (paymentResult?.pixCopiaECola) {
      navigator.clipboard.writeText(paymentResult.pixCopiaECola);
      setCopied(true);
      toast.success("Código Pix copiado!");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleClose = () => {
    clearResult();
    onOpenChange(false);
  };

  const showResult = paymentResult?.success;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            💳 Pagamento — {formatCurrency(value)}
          </DialogTitle>
        </DialogHeader>

        {showResult ? (
          <div className="space-y-4">
            {paymentResult.pixQrCode && (
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">Escaneie o QR Code com seu app do banco</p>
                <div className="bg-white p-4 rounded-lg inline-block mx-auto">
                  <img
                    src={`data:image/png;base64,${paymentResult.pixQrCode}`}
                    alt="QR Code Pix"
                    className="w-48 h-48"
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCopyPix}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span className="ml-2">{copied ? "Copiado!" : "Copiar Pix Copia e Cola"}</span>
                </Button>
              </div>
            )}

            {paymentResult.bankSlipUrl && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(paymentResult.bankSlipUrl, "_blank")}
              >
                <FileText size={16} />
                <span className="ml-2">Abrir Boleto</span>
                <ExternalLink size={14} className="ml-auto" />
              </Button>
            )}

            {paymentResult.invoiceUrl && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(paymentResult.invoiceUrl, "_blank")}
              >
                <ExternalLink size={16} />
                <span className="ml-2">Ver Fatura</span>
              </Button>
            )}

            {billingType === "CREDIT_CARD" && (paymentResult.status === "CONFIRMED" || paymentResult.status === "RECEIVED") && (
              <div className="text-center p-4 bg-highlight/10 rounded-lg">
                <Check className="w-8 h-8 text-highlight mx-auto mb-2" />
                <p className="font-medium text-highlight">Pagamento aprovado!</p>
              </div>
            )}

            <Button className="w-full" onClick={handleClose}>
              Fechar
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Billing type tabs */}
            <Tabs value={billingType} onValueChange={(v) => setBillingType(v as BillingType)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="PIX" className="text-xs gap-1">
                  <QrCode size={14} /> Pix
                </TabsTrigger>
                <TabsTrigger value="CREDIT_CARD" className="text-xs gap-1">
                  <CreditCard size={14} /> Cartão
                </TabsTrigger>
                <TabsTrigger value="BOLETO" className="text-xs gap-1">
                  <FileText size={14} /> Boleto
                </TabsTrigger>
              </TabsList>

              {/* Common fields */}
              <div className="space-y-3 mt-4">
                <div>
                  <Label htmlFor="cpf">CPF/CNPJ *</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(formatCpf(e.target.value))}
                    maxLength={18}
                  />
                </div>
                <div>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
              </div>

              {/* Credit card fields */}
              <TabsContent value="CREDIT_CARD" className="space-y-3 mt-2">
                <div>
                  <Label>Número do cartão</Label>
                  <Input
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                  />
                </div>
                <div>
                  <Label>Nome no cartão</Label>
                  <Input
                    placeholder="NOME COMO NO CARTÃO"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Validade</Label>
                    <Input
                      placeholder="MM/AA"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label>CVV</Label>
                    <Input
                      placeholder="000"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={4}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>CEP</Label>
                    <Input
                      placeholder="00000-000"
                      value={cardPostalCode}
                      onChange={(e) => setCardPostalCode(e.target.value)}
                      maxLength={9}
                    />
                  </div>
                  <div>
                    <Label>Nº endereço</Label>
                    <Input
                      placeholder="123"
                      value={cardAddressNumber}
                      onChange={(e) => setCardAddressNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input
                    placeholder="(00) 00000-0000"
                    value={cardPhone}
                    onChange={(e) => setCardPhone(e.target.value)}
                    maxLength={15}
                  />
                </div>
              </TabsContent>

              <TabsContent value="PIX">
                <p className="text-sm text-muted-foreground mt-2">
                  Um QR Code Pix será gerado para pagamento imediato.
                </p>
              </TabsContent>

              <TabsContent value="BOLETO">
                <p className="text-sm text-muted-foreground mt-2">
                  O boleto será gerado com vencimento em 3 dias úteis.
                </p>
              </TabsContent>
            </Tabs>

            <Button className="w-full" size="lg" onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processando...
                </>
              ) : (
                `Pagar ${formatCurrency(value)}`
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
