import { useRef } from "react";
import { ArrowLeft, Download, Printer, Leaf, Brain, Heart, Sparkles, Phone, Mail, Globe, MapPin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const servicos = [
  { icon: "🧖‍♀️", title: "Head Spa Japonês", desc: "Ritual capilar com aromaterapia e massagem craniana profunda" },
  { icon: "💆", title: "Massoterapia", desc: "Técnicas terapêuticas para alívio de dores e tensões musculares" },
  { icon: "🦴", title: "Avaliação Postural", desc: "Análise completa com protocolo personalizado de correção" },
  { icon: "🥗", title: "Nutrição Integrativa", desc: "Planos alimentares personalizados com acompanhamento contínuo" },
  { icon: "🧘", title: "Seitai Japonês", desc: "Técnica ancestral de realinhamento corporal e energético" },
  { icon: "🌿", title: "Aromaterapia Clínica", desc: "Protocolos com óleos essenciais para saúde e bem-estar" },
];

const diferenciais = [
  { icon: Leaf, text: "Protocolos naturais e personalizados" },
  { icon: Brain, text: "Abordagem integrativa corpo-mente" },
  { icon: Heart, text: "Acompanhamento contínuo via app" },
  { icon: Sparkles, text: "Programa de fidelidade com cashback" },
];

interface Props {
  onBack: () => void;
}

export function FolderInstitucional({ onBack }: Props) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Permita pop-ups para imprimir");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Resinkra - Folder Institucional</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
            
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            @page { 
              size: A4; 
              margin: 0; 
            }
            
            body { 
              font-family: 'DM Sans', sans-serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .page {
              width: 210mm;
              height: 297mm;
              padding: 15mm;
              position: relative;
              overflow: hidden;
              page-break-after: always;
            }

            .page-front {
              background: linear-gradient(145deg, #f5f3ec 0%, #ebebe0 100%);
            }

            .page-back {
              background: #fafaf7;
            }

            .header-band {
              background: #3e4331;
              margin: -15mm -15mm 0 -15mm;
              padding: 20mm 15mm 15mm;
              position: relative;
            }

            .header-band::after {
              content: '';
              position: absolute;
              bottom: -30px;
              left: 0;
              right: 0;
              height: 60px;
              background: #3e4331;
              clip-path: ellipse(55% 100% at 50% 0%);
            }

            .logo-text {
              font-family: 'DM Serif Display', serif;
              font-size: 42px;
              color: #C4A882;
              letter-spacing: 2px;
            }

            .tagline {
              font-family: 'DM Sans', sans-serif;
              color: #bac7be;
              font-size: 14px;
              letter-spacing: 3px;
              text-transform: uppercase;
              margin-top: 6px;
            }

            .main-content {
              margin-top: 50px;
            }

            .section-title {
              font-family: 'DM Serif Display', serif;
              color: #3e4331;
              font-size: 22px;
              margin-bottom: 16px;
              display: flex;
              align-items: center;
              gap: 10px;
            }

            .section-title::after {
              content: '';
              flex: 1;
              height: 2px;
              background: linear-gradient(90deg, #C4A882, transparent);
            }

            .servicos-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
              margin-bottom: 30px;
            }

            .servico-card {
              background: white;
              border-radius: 12px;
              padding: 14px;
              border: 1px solid #e8dcc8;
            }

            .servico-icon {
              font-size: 24px;
              margin-bottom: 6px;
            }

            .servico-title {
              font-weight: 700;
              color: #3e4331;
              font-size: 12px;
              margin-bottom: 4px;
            }

            .servico-desc {
              color: #666;
              font-size: 10px;
              line-height: 1.4;
            }

            .diferenciais {
              background: #3e4331;
              border-radius: 16px;
              padding: 20px;
              margin-top: 20px;
            }

            .dif-title {
              font-family: 'DM Serif Display', serif;
              color: #C4A882;
              font-size: 18px;
              margin-bottom: 14px;
            }

            .dif-item {
              display: flex;
              align-items: center;
              gap: 10px;
              color: #ebebe0;
              font-size: 12px;
              margin-bottom: 8px;
            }

            .dif-dot {
              width: 8px;
              height: 8px;
              background: #C4A882;
              border-radius: 50%;
              flex-shrink: 0;
            }

            /* Page 2 - Back */
            .back-header {
              text-align: center;
              margin-bottom: 25px;
            }

            .back-logo {
              font-family: 'DM Serif Display', serif;
              font-size: 28px;
              color: #3e4331;
            }

            .cta-box {
              background: linear-gradient(135deg, #3e4331, #4a5038);
              border-radius: 16px;
              padding: 25px;
              text-align: center;
              margin-bottom: 25px;
            }

            .cta-title {
              font-family: 'DM Serif Display', serif;
              color: #C4A882;
              font-size: 22px;
              margin-bottom: 8px;
            }

            .cta-text {
              color: #bac7be;
              font-size: 13px;
              line-height: 1.5;
            }

            .contato-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
              margin-bottom: 25px;
            }

            .contato-item {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 12px;
              background: #f5f3ec;
              border-radius: 10px;
              font-size: 11px;
              color: #3e4331;
            }

            .contato-icon {
              width: 32px;
              height: 32px;
              background: #3e4331;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #C4A882;
              flex-shrink: 0;
              font-size: 14px;
            }

            .qr-section {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 20px;
              background: #ebebe0;
              border-radius: 16px;
              padding: 20px;
              margin-bottom: 25px;
            }

            .qr-placeholder {
              width: 100px;
              height: 100px;
              background: white;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 11px;
              color: #999;
              text-align: center;
              border: 2px dashed #C4A882;
            }

            .qr-text {
              font-size: 13px;
              color: #3e4331;
            }

            .qr-text strong {
              display: block;
              font-family: 'DM Serif Display', serif;
              font-size: 16px;
              margin-bottom: 4px;
            }

            .footer {
              text-align: center;
              padding-top: 15px;
              border-top: 2px solid #e8dcc8;
              color: #999;
              font-size: 10px;
            }

            .depoimento {
              background: white;
              border-radius: 12px;
              padding: 16px;
              border-left: 4px solid #C4A882;
              margin-bottom: 20px;
              font-style: italic;
              color: #555;
              font-size: 12px;
              line-height: 1.5;
            }

            .depoimento-author {
              font-style: normal;
              font-weight: 700;
              color: #3e4331;
              margin-top: 8px;
              font-size: 11px;
            }

            .stars {
              color: #C4A882;
              margin-bottom: 6px;
            }
          </style>
        </head>
        <body>
          <!-- FRENTE -->
          <div class="page page-front">
            <div class="header-band">
              <div class="logo-text">Resinkra</div>
              <div class="tagline">Saúde Integrativa & Bem-Estar</div>
            </div>

            <div class="main-content">
              <div class="section-title">Nossos Serviços</div>
              <div class="servicos-grid">
                ${servicos.map(s => `
                  <div class="servico-card">
                    <div class="servico-icon">${s.icon}</div>
                    <div class="servico-title">${s.title}</div>
                    <div class="servico-desc">${s.desc}</div>
                  </div>
                `).join("")}
              </div>

              <div class="diferenciais">
                <div class="dif-title">Por que escolher a Resinkra?</div>
                ${diferenciais.map(d => `
                  <div class="dif-item">
                    <div class="dif-dot"></div>
                    <span>${d.text}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>

          <!-- VERSO -->
          <div class="page page-back">
            <div class="back-header">
              <div class="back-logo">Resinkra</div>
              <p style="color:#745227;font-size:12px;margin-top:4px">Transformando vidas através da saúde integrativa</p>
            </div>

            <div class="cta-box">
              <div class="cta-title">Agende sua Sessão</div>
              <div class="cta-text">
                Experimente nossos protocolos exclusivos e descubra<br>
                o poder da saúde integrativa personalizada.
              </div>
            </div>

            <div class="depoimento">
              <div class="stars">★★★★★</div>
              "A Resinkra mudou minha qualidade de vida. Os protocolos personalizados fizeram toda a diferença no meu tratamento."
              <div class="depoimento-author">— Cliente Resinkra</div>
            </div>

            <div class="section-title" style="font-size:18px">Fale Conosco</div>
            <div class="contato-grid">
              <div class="contato-item">
                <div class="contato-icon">📱</div>
                <div><strong style="font-size:10px">WhatsApp</strong><br>(XX) XXXXX-XXXX</div>
              </div>
              <div class="contato-item">
                <div class="contato-icon">📧</div>
                <div><strong style="font-size:10px">E-mail</strong><br>contato@resinkra.com</div>
              </div>
              <div class="contato-item">
                <div class="contato-icon">🌐</div>
                <div><strong style="font-size:10px">Site</strong><br>www.resinkra.com</div>
              </div>
              <div class="contato-item">
                <div class="contato-icon">📍</div>
                <div><strong style="font-size:10px">Endereço</strong><br>Seu endereço aqui</div>
              </div>
            </div>

            <div class="qr-section">
              <div class="qr-placeholder">QR Code<br>do App</div>
              <div class="qr-text">
                <strong>Baixe nosso App</strong>
                Agende, acompanhe seus protocolos<br>e acumule cashback!
              </div>
            </div>

            <div class="footer">
              © ${new Date().getFullYear()} Resinkra — Saúde Integrativa & Bem-Estar • Todos os direitos reservados
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="min-h-screen bg-background pb-32 lg:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-highlight/10 border-b border-border px-4 py-4 safe-top">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-bold text-primary">Folder Institucional</h1>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handlePrint} className="gap-1.5">
              <Printer size={14} />
              Imprimir / PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6" ref={printRef}>
        {/* Page 1 - Front */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
          {/* Header band */}
          <div className="bg-primary px-6 py-8 relative">
            <div className="absolute -bottom-4 left-0 right-0 h-8 bg-primary" style={{ clipPath: "ellipse(55% 100% at 50% 0%)" }} />
            <h2 className="font-serif text-3xl text-accent font-bold tracking-wide">Resinkra</h2>
            <p className="text-secondary text-xs tracking-[3px] uppercase mt-1">Saúde Integrativa & Bem-Estar</p>
          </div>

          <div className="px-6 py-8 space-y-6">
            {/* Services */}
            <div>
              <h3 className="font-serif text-lg text-primary mb-4 flex items-center gap-2">
                Nossos Serviços
                <span className="flex-1 h-0.5 bg-gradient-to-r from-accent/50 to-transparent" />
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {servicos.map((s) => (
                  <div key={s.title} className="bg-background rounded-xl p-3 border border-border">
                    <span className="text-xl">{s.icon}</span>
                    <h4 className="font-bold text-xs text-foreground mt-1">{s.title}</h4>
                    <p className="text-[10px] text-muted-foreground leading-snug mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Diferenciais */}
            <div className="bg-primary rounded-2xl p-5">
              <h3 className="font-serif text-accent text-base mb-3">Por que escolher a Resinkra?</h3>
              {diferenciais.map((d) => (
                <div key={d.text} className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <span className="text-xs text-primary-foreground">{d.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page 2 - Back */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
          <div className="px-6 py-8 space-y-5">
            <div className="text-center">
              <h2 className="font-serif text-2xl text-primary">Resinkra</h2>
              <p className="text-xs text-accent mt-1">Transformando vidas através da saúde integrativa</p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-6 text-center">
              <h3 className="font-serif text-accent text-xl mb-2">Agende sua Sessão</h3>
              <p className="text-xs text-secondary">
                Experimente nossos protocolos exclusivos e descubra o poder da saúde integrativa personalizada.
              </p>
            </div>

            {/* Testimonial */}
            <div className="bg-background rounded-xl p-4 border-l-4 border-accent">
              <p className="text-xs text-accent mb-1">★★★★★</p>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                "A Resinkra mudou minha qualidade de vida. Os protocolos personalizados fizeram toda a diferença no meu tratamento."
              </p>
              <p className="text-xs font-bold text-foreground mt-2">— Cliente Resinkra</p>
            </div>

            {/* Contatos */}
            <div>
              <h3 className="font-serif text-base text-primary mb-3 flex items-center gap-2">
                Fale Conosco
                <span className="flex-1 h-0.5 bg-gradient-to-r from-accent/50 to-transparent" />
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Phone, label: "WhatsApp", value: "(XX) XXXXX-XXXX" },
                  { icon: Mail, label: "E-mail", value: "contato@resinkra.com" },
                  { icon: Globe, label: "Site", value: "www.resinkra.com" },
                  { icon: MapPin, label: "Endereço", value: "Seu endereço aqui" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-2 p-3 bg-background rounded-lg">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                      <c.icon size={14} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-foreground">{c.label}</p>
                      <p className="text-[10px] text-muted-foreground">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QR */}
            <div className="flex items-center gap-4 bg-muted rounded-2xl p-4">
              <div className="w-20 h-20 bg-background rounded-xl border-2 border-dashed border-accent flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground text-center">QR Code<br />do App</span>
              </div>
              <div>
                <p className="font-serif text-sm text-primary font-bold">Baixe nosso App</p>
                <p className="text-[10px] text-muted-foreground">Agende, acompanhe seus protocolos e acumule cashback!</p>
              </div>
            </div>

            <div className="text-center pt-3 border-t border-border">
              <p className="text-[9px] text-muted-foreground">
                © {new Date().getFullYear()} Resinkra — Saúde Integrativa & Bem-Estar • Todos os direitos reservados
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          👆 Prévia digital • Clique em "Imprimir / PDF" para versão em alta resolução para gráfica
        </p>
      </div>
    </div>
  );
}
