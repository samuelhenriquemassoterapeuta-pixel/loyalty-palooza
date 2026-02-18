import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const protocolos = [
  { icon: "🧖‍♀️", title: "Head Spa Japonês", desc: "Ritual capilar com massagem craniana, aromaterapia e tratamento do couro cabeludo", duracao: "60 min" },
  { icon: "💆", title: "Massoterapia Integrativa", desc: "Técnicas terapêuticas combinadas para alívio profundo de dores e tensões", duracao: "50-90 min" },
  { icon: "🦴", title: "Avaliação Postural", desc: "Análise biomecânica completa com protocolo personalizado de correção", duracao: "45 min" },
  { icon: "🥗", title: "Nutrição Integrativa", desc: "Planos alimentares personalizados com acompanhamento contínuo via app", duracao: "40 min" },
  { icon: "🧘", title: "Seitai Japonês", desc: "Técnica ancestral de realinhamento corporal e equilíbrio energético", duracao: "50 min" },
  { icon: "🌿", title: "Aromaterapia Clínica", desc: "Protocolos terapêuticos com óleos essenciais para saúde integral", duracao: "45 min" },
];

const planos = [
  { nome: "Essencial", preco: "Sob consulta", items: ["1 sessão/mês", "Acesso ao app", "Avaliação inicial", "Suporte por chat"], destaque: false },
  { nome: "Premium", preco: "Sob consulta", items: ["4 sessões/mês", "Acesso ao app", "Avaliação completa", "Nutrição incluída", "10% cashback", "Prioridade"], destaque: true },
  { nome: "VIP", preco: "Sob consulta", items: ["8 sessões/mês", "Acesso ao app", "Todos os protocolos", "Nutrição + Dieta", "20% cashback", "Prioridade total", "Head Spa mensal"], destaque: false },
];

interface Props {
  onBack: () => void;
}

export function CatalogoServicos({ onBack }: Props) {
  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) { toast.error("Permita pop-ups"); return; }

    w.document.write(`
      <html><head><title>Resinkra - Catálogo</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        @page { size:A4; margin:12mm; }
        body { font-family:'DM Sans',sans-serif; -webkit-print-color-adjust:exact; print-color-adjust:exact; background:white; }
        
        .cover { width:100%; min-height:270mm; background:#3e4331; padding:40mm 20mm; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; page-break-after:always; position:relative; overflow:hidden; }
        .cover::before { content:''; position:absolute; top:-100px; right:-100px; width:400px; height:400px; background:rgba(196,168,130,0.06); border-radius:50%; }
        .cover .logo { font-family:'DM Serif Display',serif; font-size:52px; color:#C4A882; letter-spacing:3px; }
        .cover .sub { font-size:14px; color:#bac7be; letter-spacing:4px; text-transform:uppercase; margin-top:8px; }
        .cover .divider { width:60px; height:2px; background:#C4A882; margin:30px auto; }
        .cover .title { font-family:'DM Serif Display',serif; font-size:28px; color:#ebebe0; }
        .cover .year { font-size:12px; color:#bac7be; margin-top:10px; }
        
        .page { page-break-before:always; padding:15mm 0; }
        .page-title { font-family:'DM Serif Display',serif; font-size:24px; color:#3e4331; margin-bottom:20px; text-align:center; }
        .page-title::after { content:''; display:block; width:40px; height:2px; background:#C4A882; margin:10px auto 0; }
        
        .proto-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .proto-card { background:#fafaf7; border:1px solid #e8dcc8; border-radius:12px; padding:16px; }
        .proto-icon { font-size:28px; margin-bottom:8px; }
        .proto-title { font-weight:700; font-size:14px; color:#3e4331; }
        .proto-desc { font-size:11px; color:#666; margin-top:4px; line-height:1.5; }
        .proto-dur { font-size:10px; color:#C4A882; margin-top:6px; font-weight:600; }
        
        .planos-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin-top:10px; }
        .plano-card { border:1px solid #e8dcc8; border-radius:12px; padding:18px; text-align:center; background:white; }
        .plano-dest { border-color:#3e4331; border-width:2px; background:#fafaf7; position:relative; }
        .plano-badge { position:absolute; top:-10px; left:50%; transform:translateX(-50%); background:#3e4331; color:#C4A882; font-size:9px; padding:3px 12px; border-radius:20px; font-weight:700; letter-spacing:1px; }
        .plano-nome { font-family:'DM Serif Display',serif; font-size:18px; color:#3e4331; }
        .plano-preco { font-size:13px; color:#745227; margin:8px 0; font-weight:600; }
        .plano-items { list-style:none; text-align:left; }
        .plano-items li { font-size:10px; color:#555; padding:4px 0; border-bottom:1px solid #f0ece3; display:flex; align-items:center; gap:6px; }
        .plano-items li::before { content:'✓'; color:#3e4331; font-weight:700; }
        
        .footer { text-align:center; margin-top:30px; padding-top:15px; border-top:2px solid #e8dcc8; font-size:10px; color:#999; }
      </style></head><body>
        <div class="cover">
          <div class="logo">Resinkra</div>
          <div class="sub">Saúde Integrativa & Bem-Estar</div>
          <div class="divider"></div>
          <div class="title">Catálogo de Serviços</div>
          <div class="year">${new Date().getFullYear()}</div>
        </div>
        
        <div class="page">
          <div class="page-title">Nossos Protocolos</div>
          <div class="proto-grid">
            ${protocolos.map(p => `
              <div class="proto-card">
                <div class="proto-icon">${p.icon}</div>
                <div class="proto-title">${p.title}</div>
                <div class="proto-desc">${p.desc}</div>
                <div class="proto-dur">⏱ ${p.duracao}</div>
              </div>
            `).join("")}
          </div>
        </div>
        
        <div class="page">
          <div class="page-title">Planos & Pacotes</div>
          <div class="planos-grid">
            ${planos.map(p => `
              <div class="plano-card ${p.destaque ? 'plano-dest' : ''}">
                ${p.destaque ? '<div class="plano-badge">MAIS POPULAR</div>' : ''}
                <div class="plano-nome">${p.nome}</div>
                <div class="plano-preco">${p.preco}</div>
                <ul class="plano-items">${p.items.map(i => `<li>${i}</li>`).join("")}</ul>
              </div>
            `).join("")}
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} Resinkra — contato@resinkra.com • www.resinkra.com
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
            <h1 className="text-lg font-bold text-primary">Catálogo de Serviços</h1>
          </div>
          <Button size="sm" variant="outline" onClick={handlePrint} className="gap-1.5">
            <Printer size={14} /> Imprimir / PDF
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Cover preview */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
          <div className="bg-primary p-8 text-center" style={{ aspectRatio: "210/150" }}>
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="font-serif text-3xl text-accent tracking-wide">Resinkra</h2>
              <p className="text-[9px] text-secondary tracking-[4px] uppercase mt-1">Saúde Integrativa & Bem-Estar</p>
              <div className="w-12 h-0.5 bg-accent my-4" />
              <h3 className="font-serif text-xl text-primary-foreground">Catálogo de Serviços</h3>
              <p className="text-xs text-secondary mt-1">{new Date().getFullYear()}</p>
            </div>
          </div>
        </div>

        {/* Protocolos preview */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-border bg-card p-5">
          <h3 className="font-serif text-lg text-primary mb-4 text-center">Nossos Protocolos</h3>
          <div className="grid grid-cols-2 gap-3">
            {protocolos.map((p) => (
              <div key={p.title} className="bg-background rounded-xl p-3 border border-border">
                <span className="text-xl">{p.icon}</span>
                <h4 className="font-bold text-xs text-foreground mt-1">{p.title}</h4>
                <p className="text-[10px] text-muted-foreground leading-snug mt-1">{p.desc}</p>
                <p className="text-[10px] text-accent font-semibold mt-1">⏱ {p.duracao}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Planos preview */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-border bg-card p-5">
          <h3 className="font-serif text-lg text-primary mb-4 text-center">Planos & Pacotes</h3>
          <div className="grid grid-cols-3 gap-2">
            {planos.map((p) => (
              <div key={p.nome} className={`rounded-xl p-3 border text-center ${p.destaque ? "border-primary border-2 bg-background relative" : "border-border bg-background"}`}>
                {p.destaque && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-accent text-[7px] px-2 py-0.5 rounded-full font-bold tracking-wider">
                    POPULAR
                  </span>
                )}
                <p className="font-serif text-sm text-primary">{p.nome}</p>
                <p className="text-[10px] text-accent font-semibold my-1">{p.preco}</p>
                <ul className="text-left space-y-1">
                  {p.items.map((item) => (
                    <li key={item} className="text-[8px] text-muted-foreground flex items-center gap-1">
                      <span className="text-primary font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          👆 Prévia do catálogo (3 páginas) • Clique em "Imprimir / PDF" para exportar
        </p>
      </div>
    </div>
  );
}
