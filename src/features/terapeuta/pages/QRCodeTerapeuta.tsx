import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";
import logoMarrom from "@/assets/logo-marrom.png";
import { supabase } from "@/integrations/supabase/client";
import { PageLoading } from "@/components/LoadingSpinner";
import { toast } from "sonner";

const QRCodeTerapeuta = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qrRef = useRef<HTMLDivElement>(null);
  const [terapeuta, setTerapeuta] = useState<{ nome: string; especialidade: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  const cardUrl = `${window.location.origin}/terapeuta/${id}`;

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const { data } = await supabase.rpc("get_terapeuta_cartao", { terapeuta_uuid: id });
      if (data?.length) {
        setTerapeuta({ nome: data[0].nome, especialidade: data[0].especialidade });
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  const handlePrint = () => window.print();

  const handleDownload = async () => {
    if (!qrRef.current) return;
    try {
      const svg = qrRef.current.querySelector("svg");
      if (!svg) return;
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const size = 400;
      const padding = 40;
      canvas.width = size + padding * 2;
      canvas.height = size + padding * 2;
      img.onload = () => {
        if (!ctx) return;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, padding, padding, size, size);
        const link = document.createElement("a");
        link.download = `qrcode-${terapeuta?.nome?.replace(/\s+/g, "-").toLowerCase() || "terapeuta"}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        toast.success("QR Code salvo!");
      };
      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    } catch {
      toast.error("Erro ao baixar QR Code");
    }
  };

  if (loading) return <PageLoading />;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 print:hidden">
        <div className="flex items-center justify-between px-4 py-4 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-secondary/50 transition-colors">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">QR Code</h1>
          <div className="flex gap-2">
            <Button onClick={handleDownload} size="sm" variant="outline" className="gap-2">
              <Download size={16} /> PNG
            </Button>
            <Button onClick={handlePrint} size="sm" variant="outline" className="gap-2">
              <Printer size={16} />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center p-8 print:p-0 print:min-h-screen">
        <div className="bg-white p-12 rounded-3xl shadow-lg print:shadow-none print:rounded-none max-w-md w-full">
          <div className="flex justify-center mb-8">
            <img src={logoMarrom} alt="Resinkra" className="h-12 object-contain print:h-16" />
          </div>

          <div className="flex justify-center mb-6">
            <div ref={qrRef} className="p-4 bg-white rounded-2xl print:p-0">
              <QRCode
                value={cardUrl}
                size={280}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox="0 0 280 280"
                level="H"
              />
            </div>
          </div>

          <div className="text-center space-y-2">
            {terapeuta && (
              <>
                <h2 className="text-2xl font-bold text-foreground print:text-black font-serif">
                  {terapeuta.nome}
                </h2>
                {terapeuta.especialidade && (
                  <p className="text-sm text-muted-foreground print:text-gray-600">{terapeuta.especialidade}</p>
                )}
              </>
            )}
            <p className="text-muted-foreground print:text-gray-600 pt-2">
              Escaneie o QR Code para ver o cartão de visita
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border/50 print:border-gray-200">
            <p className="text-xs text-center text-muted-foreground print:text-gray-400">
              Ou acesse: <span className="font-medium text-primary print:text-black break-all">{cardUrl}</span>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground max-w-md print:hidden">
          <p className="mb-2 font-medium">Dicas para impressão:</p>
          <ul className="space-y-1 text-xs">
            <li>• Use papel de alta qualidade para melhor escaneamento</li>
            <li>• Tamanho mínimo recomendado: 3x3 cm</li>
            <li>• Mantenha contraste alto (fundo branco, QR preto)</li>
          </ul>
        </div>
      </div>

      <style>{`
        @media print {
          @page { margin: 0; size: A4; }
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
    </div>
  );
};

export default QRCodeTerapeuta;
