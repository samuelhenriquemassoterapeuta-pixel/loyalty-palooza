import { useRef, useState } from "react";
import { ArrowLeft, Printer, Phone, Mail, Globe, Instagram, MapPin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import QRCode from "react-qr-code";
import { toast } from "sonner";

interface Props {
  onBack: () => void;
}

export function CartaoDigital({ onBack }: Props) {
  const [form, setForm] = useState({
    nome: "Seu Nome",
    cargo: "Terapeuta Integrativa",
    telefone: "(XX) XXXXX-XXXX",
    email: "contato@resinkra.com",
    instagram: "@resinkra",
    site: "www.resinkra.com",
    endereco: "Seu endereço",
    qrUrl: "https://loyalty-palooza.lovable.app",
  });

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Permita pop-ups para imprimir");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Cartão Digital - Resinkra</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            @page { size: A5 landscape; margin: 10mm; }
            body { 
              font-family: 'DM Sans', sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: #f5f3ec;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .card {
              width: 148mm;
              height: 85mm;
              background: #3e4331;
              border-radius: 12px;
              display: flex;
              overflow: hidden;
              position: relative;
            }
            .card::before {
              content: '';
              position: absolute;
              top: -30px;
              right: -30px;
              width: 150px;
              height: 150px;
              background: rgba(196,168,130,0.08);
              border-radius: 50%;
            }
            .card::after {
              content: '';
              position: absolute;
              bottom: -40px;
              left: -20px;
              width: 120px;
              height: 120px;
              background: rgba(196,168,130,0.05);
              border-radius: 50%;
            }
            .left {
              flex: 1.2;
              padding: 18px 20px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              position: relative;
              z-index: 1;
            }
            .right {
              width: 95px;
              background: rgba(196,168,130,0.12);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 15px;
              position: relative;
              z-index: 1;
            }
            .logo-text {
              font-family: 'DM Serif Display', serif;
              font-size: 24px;
              color: #C4A882;
              letter-spacing: 1px;
            }
            .logo-sub {
              font-size: 8px;
              color: #bac7be;
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-top: 2px;
            }
            .name {
              font-family: 'DM Serif Display', serif;
              font-size: 18px;
              color: #ebebe0;
              margin-top: 10px;
            }
            .role {
              font-size: 9px;
              color: #C4A882;
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-top: 2px;
            }
            .contacts {
              display: flex;
              flex-direction: column;
              gap: 5px;
            }
            .contact-item {
              display: flex;
              align-items: center;
              gap: 6px;
              font-size: 9px;
              color: #bac7be;
            }
            .contact-dot {
              width: 4px;
              height: 4px;
              background: #C4A882;
              border-radius: 50%;
              flex-shrink: 0;
            }
            .qr-box {
              width: 70px;
              height: 70px;
              background: white;
              border-radius: 8px;
              padding: 4px;
            }
            .qr-label {
              font-size: 7px;
              color: #C4A882;
              text-align: center;
              margin-top: 6px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="left">
              <div>
                <div class="logo-text">Resinkra</div>
                <div class="logo-sub">Saúde Integrativa & Bem-Estar</div>
              </div>
              <div>
                <div class="name">${form.nome}</div>
                <div class="role">${form.cargo}</div>
              </div>
              <div class="contacts">
                <div class="contact-item"><div class="contact-dot"></div>${form.telefone}</div>
                <div class="contact-item"><div class="contact-dot"></div>${form.email}</div>
                <div class="contact-item"><div class="contact-dot"></div>${form.instagram}</div>
                <div class="contact-item"><div class="contact-dot"></div>${form.site}</div>
              </div>
            </div>
            <div class="right">
              <div class="qr-box" id="qr-target"></div>
              <div class="qr-label">Escaneie para<br>agendar</div>
            </div>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
          <script>
            const canvas = document.createElement('canvas');
            canvas.width = 140;
            canvas.height = 140;
            QRCode.toCanvas(canvas, '${form.qrUrl}', { width: 140, margin: 0 }, function(err) {
              if (!err) document.getElementById('qr-target').appendChild(canvas);
            });
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => printWindow.print(), 800);
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
            <h1 className="text-lg font-bold text-primary">Cartão de Visita Digital</h1>
          </div>
          <Button size="sm" variant="outline" onClick={handlePrint} className="gap-1.5">
            <Printer size={14} />
            Imprimir / PDF
          </Button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Preview Card */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
          <div className="bg-primary flex" style={{ aspectRatio: "16/9" }}>
            {/* Left */}
            <div className="flex-[1.3] p-5 flex flex-col justify-between relative">
              <div className="absolute -top-8 -right-8 w-28 h-28 bg-accent/10 rounded-full" />
              <div className="absolute -bottom-10 -left-5 w-20 h-20 bg-accent/5 rounded-full" />
              <div className="relative z-10">
                <h2 className="font-serif text-2xl text-accent tracking-wide">Resinkra</h2>
                <p className="text-[8px] text-secondary tracking-[2px] uppercase">Saúde Integrativa & Bem-Estar</p>
              </div>
              <div className="relative z-10">
                <p className="font-serif text-lg text-primary-foreground">{form.nome}</p>
                <p className="text-[9px] text-accent tracking-[2px] uppercase">{form.cargo}</p>
              </div>
              <div className="relative z-10 space-y-1">
                {[form.telefone, form.email, form.instagram, form.site].map((v, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-accent" />
                    <span className="text-[9px] text-secondary">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right - QR */}
            <div className="w-24 bg-accent/10 flex flex-col items-center justify-center p-3">
              <div className="bg-background rounded-lg p-1.5">
                <QRCode value={form.qrUrl} size={60} />
              </div>
              <p className="text-[7px] text-accent text-center mt-2 uppercase tracking-wider leading-tight">
                Escaneie para<br />agendar
              </p>
            </div>
          </div>
        </div>

        {/* Edit form */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-sm text-foreground">Personalizar Cartão</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Nome</Label><Input value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} /></div>
              <div><Label className="text-xs">Cargo</Label><Input value={form.cargo} onChange={e => setForm({...form, cargo: e.target.value})} /></div>
              <div><Label className="text-xs">Telefone</Label><Input value={form.telefone} onChange={e => setForm({...form, telefone: e.target.value})} /></div>
              <div><Label className="text-xs">E-mail</Label><Input value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
              <div><Label className="text-xs">Instagram</Label><Input value={form.instagram} onChange={e => setForm({...form, instagram: e.target.value})} /></div>
              <div><Label className="text-xs">Site</Label><Input value={form.site} onChange={e => setForm({...form, site: e.target.value})} /></div>
              <div className="col-span-2"><Label className="text-xs">URL do QR Code</Label><Input value={form.qrUrl} onChange={e => setForm({...form, qrUrl: e.target.value})} /></div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          👆 Edite os campos acima e clique em "Imprimir / PDF" para exportar
        </p>
      </div>
    </div>
  );
}
