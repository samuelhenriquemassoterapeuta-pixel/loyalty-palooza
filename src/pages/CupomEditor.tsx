import { useState, useRef, useCallback } from "react";
import { ArrowLeft, Download, Image, FileText, Printer, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CupomVisual, CupomData, estiloOptions } from "@/components/cupom/CupomVisual";
import { toast } from "sonner";
import html2canvas from "html2canvas";

const defaultCupom: CupomData = {
  titulo: "Drenagem Linfática",
  subtitulo: "Primeira sessão com desconto especial",
  desconto: "20",
  tipoDesconto: "percentual",
  codigo: "RESINKRA20",
  validade: "31/03/2026",
  termos: "Válido para novos clientes. Não cumulativo.",
  estilo: "folha",
};

const formatoLabels = {
  stories: { label: "Stories", icon: Image, desc: "1080×1920" },
  feed: { label: "Feed", icon: FileText, desc: "1080×1080" },
  impressao: { label: "Impressão", icon: Printer, desc: "Horizontal" },
};

const CupomEditor = () => {
  const navigate = useNavigate();
  const cupomRef = useRef<HTMLDivElement>(null);
  const [cupom, setCupom] = useState<CupomData>(defaultCupom);
  const [formato, setFormato] = useState<"stories" | "feed" | "impressao">("stories");
  const [exporting, setExporting] = useState(false);

  const update = (field: keyof CupomData, value: string) => {
    setCupom((prev) => ({ ...prev, [field]: value }));
  };

  const exportAsImage = useCallback(async () => {
    if (!cupomRef.current || exporting) return;
    setExporting(true);

    try {
      const el = cupomRef.current;
      const exportWidth = parseInt(el.getAttribute("data-export-width") || "1080");
      const exportHeight = parseInt(el.getAttribute("data-export-height") || "1920");
      const scale = exportWidth / el.offsetWidth;

      const canvas = await html2canvas(el, {
        scale,
        useCORS: true,
        backgroundColor: null,
        width: el.offsetWidth,
        height: el.offsetHeight,
      });

      const link = document.createElement("a");
      link.download = `cupom-resinkra-${formato}-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast.success("Cupom exportado com sucesso! 🎟️");
    } catch {
      toast.error("Erro ao exportar cupom");
    } finally {
      setExporting(false);
    }
  }, [formato, exporting]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-secondary/50 transition-colors">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            Editor de Cupom
          </h1>
          <Button onClick={exportAsImage} size="sm" className="gap-2 bg-primary text-primary-foreground" disabled={exporting}>
            <Download size={16} />
            {exporting ? "..." : "PNG"}
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <div className="space-y-4 order-2 lg:order-1">
          <Card className="border-border/50 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-foreground">Conteúdo do Cupom</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Título principal</Label>
                <Input value={cupom.titulo} onChange={(e) => update("titulo", e.target.value)} placeholder="Ex: Drenagem Linfática" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Subtítulo</Label>
                <Input value={cupom.subtitulo} onChange={(e) => update("subtitulo", e.target.value)} placeholder="Ex: Primeira sessão com desconto" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Tipo de desconto</Label>
                  <Select value={cupom.tipoDesconto} onValueChange={(v) => update("tipoDesconto", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentual">Percentual (%)</SelectItem>
                      <SelectItem value="valor">Valor (R$)</SelectItem>
                      <SelectItem value="texto">Texto livre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    {cupom.tipoDesconto === "percentual" ? "Percentual" : cupom.tipoDesconto === "valor" ? "Valor" : "Texto"}
                  </Label>
                  <Input value={cupom.desconto} onChange={(e) => update("desconto", e.target.value)} placeholder="20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Código do cupom</Label>
                  <Input
                    value={cupom.codigo}
                    onChange={(e) => update("codigo", e.target.value.toUpperCase())}
                    placeholder="RESINKRA20"
                    className="font-mono tracking-wider"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Validade</Label>
                  <Input value={cupom.validade} onChange={(e) => update("validade", e.target.value)} placeholder="31/03/2026" />
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Termos / Condições</Label>
                <Textarea
                  value={cupom.termos}
                  onChange={(e) => update("termos", e.target.value)}
                  placeholder="Ex: Válido para novos clientes"
                  rows={2}
                  className="text-xs"
                />
              </div>
            </CardContent>
          </Card>

          {/* Style selector */}
          <Card className="border-border/50 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-foreground">Estilo Visual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {estiloOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update("estilo", opt.value)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      cupom.estilo === opt.value
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border/50 hover:border-border"
                    }`}
                  >
                    <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                    <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-4 order-1 lg:order-2">
          <Card className="border-border/50 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-foreground">Pré-visualização</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Format tabs */}
              <Tabs value={formato} onValueChange={(v) => setFormato(v as any)} className="mb-4">
                <TabsList className="grid grid-cols-3 w-full">
                  {Object.entries(formatoLabels).map(([key, { label, icon: Icon, desc }]) => (
                    <TabsTrigger key={key} value={key} className="gap-1 text-xs">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{label}</span>
                      <span className="text-[9px] text-muted-foreground hidden md:inline">({desc})</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Visual preview */}
              <div className="flex justify-center items-center min-h-[300px] bg-muted/30 rounded-xl p-4">
                <CupomVisual ref={cupomRef} data={cupom} formato={formato} />
              </div>
            </CardContent>
          </Card>

          {/* Export button (mobile) */}
          <Button onClick={exportAsImage} className="w-full lg:hidden gap-2 bg-primary text-primary-foreground" disabled={exporting}>
            <Download size={18} />
            {exporting ? "Exportando..." : `Baixar ${formatoLabels[formato].label} como PNG`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CupomEditor;
