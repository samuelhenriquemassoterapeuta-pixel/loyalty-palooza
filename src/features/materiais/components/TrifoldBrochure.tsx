import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const servicos = [
  { icon: "🧖‍♀️", title: "Head Spa", desc: "Ritual capilar japonês com aromaterapia" },
  { icon: "💆", title: "Massoterapia", desc: "Alívio de dores e tensões musculares" },
  { icon: "🦴", title: "Postural", desc: "Avaliação e correção postural completa" },
  { icon: "🥗", title: "Nutrição", desc: "Planos alimentares personalizados" },
  { icon: "🧘", title: "Seitai", desc: "Realinhamento corporal japonês" },
  { icon: "🌿", title: "Aromaterapia", desc: "Protocolos com óleos essenciais" },
];

interface Props {
  onBack: () => void;
}

export function TrifoldBrochure({ onBack }: Props) {
  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) { toast.error("Permita pop-ups"); return; }

    w.document.write(`
      <html><head><title>Resinkra - Tri-fold</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        @page { size: 297mm 210mm; margin:0; }
        body { font-family:'DM Sans',sans-serif; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
        .trifold { width:297mm; height:210mm; display:flex; }
        .panel { width:99mm; height:210mm; padding:12mm; position:relative; overflow:hidden; }
        .p1 { background:#3e4331; color:#ebebe0; display:flex; flex-direction:column; justify-content:center; }
        .p1 .logo { font-family:'DM Serif Display',serif; font-size:36px; color:#C4A882; }
        .p1 .sub { font-size:10px; color:#bac7be; letter-spacing:3px; text-transform:uppercase; margin-top:6px; }
        .p1 .tagline { font-size:13px; color:#ebebe0; margin-top:30px; line-height:1.6; }
        .p1::after { content:''; position:absolute; bottom:-40px; right:-40px; width:150px; height:150px; background:rgba(196,168,130,0.1); border-radius:50%; }
        .p2 { background:#fafaf7; border-left:1px solid #e8dcc8; border-right:1px solid #e8dcc8; }
        .p2 .title { font-family:'DM Serif Display',serif; font-size:18px; color:#3e4331; margin-bottom:15px; text-align:center; }
        .svc { background:white; border:1px solid #e8dcc8; border-radius:8px; padding:10px; margin-bottom:8px; }
        .svc-icon { font-size:18px; float:left; margin-right:8px; }
        .svc-title { font-weight:700; font-size:11px; color:#3e4331; }
        .svc-desc { font-size:9px; color:#666; margin-top:2px; }
        .p3 { background:#ebebe0; display:flex; flex-direction:column; justify-content:space-between; }
        .p3 .title { font-family:'DM Serif Display',serif; font-size:16px; color:#3e4331; margin-bottom:12px; }
        .contact { font-size:10px; color:#3e4331; margin-bottom:6px; display:flex; align-items:center; gap:6px; }
        .dot { width:5px; height:5px; background:#C4A882; border-radius:50%; flex-shrink:0; }
        .qr-area { text-align:center; margin-top:15px; }
        .qr-box { width:80px; height:80px; border:2px dashed #C4A882; border-radius:8px; margin:0 auto 6px; display:flex; align-items:center; justify-content:center; font-size:9px; color:#999; background:white; }
        .qr-label { font-size:9px; color:#745227; }
        .footer { font-size:8px; color:#999; text-align:center; margin-top:auto; padding-top:10px; border-top:1px solid #C4A882; }
      </style></head><body>
        <div class="trifold">
          <div class="panel p1">
            <div>
              <div class="logo">Resinkra</div>
              <div class="sub">Saúde Integrativa</div>
              <div class="tagline">Transformamos vidas através de protocolos naturais e personalizados, unindo o melhor das terapias orientais e ocidentais.</div>
            </div>
          </div>
          <div class="panel p2">
            <div class="title">Nossos Serviços</div>
            ${servicos.map(s => `
              <div class="svc">
                <span class="svc-icon">${s.icon}</span>
                <div class="svc-title">${s.title}</div>
                <div class="svc-desc">${s.desc}</div>
              </div>
            `).join("")}
          </div>
          <div class="panel p3">
            <div>
              <div class="title">Fale Conosco</div>
              <div class="contact"><div class="dot"></div>📱 (XX) XXXXX-XXXX</div>
              <div class="contact"><div class="dot"></div>📧 contato@resinkra.com</div>
              <div class="contact"><div class="dot"></div>🌐 www.resinkra.com</div>
              <div class="contact"><div class="dot"></div>📍 Seu endereço aqui</div>
              <div class="contact"><div class="dot"></div>📷 @resinkra</div>
              <div class="qr-area">
                <div class="qr-box">QR Code</div>
                <div class="qr-label">Escaneie para agendar</div>
              </div>
            </div>
            <div class="footer">© ${new Date().getFullYear()} Resinkra • Todos os direitos reservados</div>
          </div>
        </div>
      </body></html>
    `);
    w.document.close();
    setTimeout(() => w.print(), 500);
  };

  return (
    <div className="min-h-screen bg-background pb-32 lg:pb-8">
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-highlight/10 border-b border-border px-4 py-4 safe-top">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft size={20} /></Button>
            <h1 className="text-lg font-bold text-primary">Folder Tri-fold (DL)</h1>
          </div>
          <Button size="sm" variant="outline" onClick={handlePrint} className="gap-1.5">
            <Printer size={14} /> Imprimir / PDF
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Preview - 3 panels side by side */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-border flex" style={{ aspectRatio: "297/210" }}>
          {/* Panel 1 - Cover */}
          <div className="flex-1 bg-primary p-5 flex flex-col justify-center relative">
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-accent/10 rounded-full" />
            <h2 className="font-serif text-2xl text-accent">Resinkra</h2>
            <p className="text-[8px] text-secondary tracking-[3px] uppercase mt-1">Saúde Integrativa</p>
            <p className="text-xs text-primary-foreground mt-4 leading-relaxed">
              Transformamos vidas através de protocolos naturais e personalizados.
            </p>
          </div>

          {/* Panel 2 - Services */}
          <div className="flex-1 bg-card p-4 border-x border-border">
            <h3 className="font-serif text-sm text-primary mb-3 text-center">Nossos Serviços</h3>
            <div className="space-y-2">
              {servicos.map((s) => (
                <div key={s.title} className="bg-background rounded-lg p-2 border border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{s.icon}</span>
                    <div>
                      <p className="font-bold text-[9px] text-foreground">{s.title}</p>
                      <p className="text-[8px] text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 3 - Contact */}
          <div className="flex-1 bg-muted p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-sm text-primary mb-3">Fale Conosco</h3>
              {["📱 (XX) XXXXX-XXXX", "📧 contato@resinkra.com", "🌐 www.resinkra.com", "📷 @resinkra"].map((c) => (
                <div key={c} className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  <span className="text-[8px] text-foreground">{c}</span>
                </div>
              ))}
              <div className="text-center mt-3">
                <div className="w-14 h-14 mx-auto bg-background rounded-lg border-2 border-dashed border-accent flex items-center justify-center">
                  <span className="text-[7px] text-muted-foreground">QR Code</span>
                </div>
                <p className="text-[7px] text-accent mt-1">Escaneie para agendar</p>
              </div>
            </div>
            <p className="text-[7px] text-muted-foreground text-center border-t border-border pt-2">
              © {new Date().getFullYear()} Resinkra
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          👆 Prévia do tri-fold aberto • Formato final: DL (99×210mm) dobrável
        </p>
      </div>
    </div>
  );
}
