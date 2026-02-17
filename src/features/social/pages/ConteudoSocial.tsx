import { useState, useRef } from "react";
import { ArrowLeft, Instagram, Download, Type, Sparkles, Palette, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CupomExportMenu } from "@/features/cupom/components/CupomExportMenu";
import { SocialPostVisual, SocialPostData, templateOptions } from "@/features/social/components/SocialPostVisual";

const defaultPost: SocialPostData = {
  titulo: "Drenagem Linfática",
  subtitulo: "Cuide do seu corpo com quem entende",
  descricao: "Sessões personalizadas para seu bem-estar completo",
  cta: "Agende agora",
  template: "promo",
  estilo: "folha",
};

const formatoLabels = {
  stories: { label: "Stories", icon: Instagram, desc: "1080×1920" },
  feed: { label: "Feed", icon: ImageIcon, desc: "1080×1080" },
  banner: { label: "Banner", icon: ImageIcon, desc: "1200×628" },
};

const ConteudoSocial = () => {
  const navigate = useNavigate();
  const postRef = useRef<HTMLDivElement>(null);
  const [post, setPost] = useState<SocialPostData>(defaultPost);
  const [formato, setFormato] = useState<keyof typeof formatoLabels>("stories");

  const update = (field: keyof SocialPostData, value: string) => {
    setPost((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-secondary/50 transition-colors">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            Gerador de Conteúdo
          </h1>
          <CupomExportMenu cupomRef={postRef} formato={formato} formatoLabel={formatoLabels[formato].label} variant="header" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pb-24 lg:pb-6">
        {/* Editor */}
        <div className="space-y-3 sm:space-y-4 order-2 lg:order-1">
          <Card className="border-border/50 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <Type className="w-4 h-4" /> Conteúdo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Título principal</Label>
                <Input value={post.titulo} onChange={(e) => update("titulo", e.target.value)} placeholder="Ex: Drenagem Linfática" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Subtítulo</Label>
                <Input value={post.subtitulo} onChange={(e) => update("subtitulo", e.target.value)} placeholder="Ex: Cuide do seu corpo" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Descrição</Label>
                <Textarea value={post.descricao} onChange={(e) => update("descricao", e.target.value)} placeholder="Texto descritivo" rows={2} className="text-xs" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Call-to-Action</Label>
                <Input value={post.cta} onChange={(e) => update("cta", e.target.value)} placeholder="Ex: Agende agora" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <Palette className="w-4 h-4" /> Template & Estilo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Template</Label>
                <div className="grid grid-cols-2 gap-2">
                  {templateOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => update("template", opt.value)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        post.template === opt.value
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border/50 hover:border-border"
                      }`}
                    >
                      <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                      <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Paleta de cores</Label>
                <Select value={post.estilo} onValueChange={(v) => update("estilo", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="folha">Folha Sombra (verde escuro)</SelectItem>
                    <SelectItem value="canela">Canela com Mel (marrom)</SelectItem>
                    <SelectItem value="areia">Areia Serena (claro)</SelectItem>
                    <SelectItem value="meditacao">Meditação (verde suave)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-3 sm:space-y-4 order-1 lg:order-2">
          <Card className="border-border/50 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-foreground">Pré-visualização</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={formato} onValueChange={(v) => setFormato(v as any)} className="mb-4">
                <TabsList className="grid grid-cols-3 w-full">
                  {Object.entries(formatoLabels).map(([key, { label, icon: Icon }]) => (
                    <TabsTrigger key={key} value={key} className="gap-1 text-xs">
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="flex justify-center items-center min-h-[250px] sm:min-h-[300px] bg-muted/30 rounded-xl p-2 sm:p-4 overflow-hidden">
                <div className="transform scale-[0.65] sm:scale-75 lg:scale-100 origin-center">
                  <SocialPostVisual ref={postRef} data={post} formato={formato} />
                </div>
              </div>
            </CardContent>
          </Card>

          <CupomExportMenu cupomRef={postRef} formato={formato} formatoLabel={formatoLabels[formato].label} variant="mobile" />
        </div>
      </div>
    </div>
  );
};

export default ConteudoSocial;
