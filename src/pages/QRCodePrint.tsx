import { ArrowLeft, Download, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";
import logoMarrom from "@/assets/logo-marrom.png";

const APP_URL = "https://d9766493-319f-4158-82d6-caca99a7199a.lovableproject.com/instalar";

const QRCodePrint = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Hidden when printing */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 print:hidden">
        <div className="flex items-center justify-between px-4 py-4 max-w-lg mx-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 -ml-2 rounded-full hover:bg-secondary/50 transition-colors"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">QR Code para Impressão</h1>
          <Button onClick={handlePrint} size="sm" variant="outline" className="gap-2">
            <Printer size={16} />
            Imprimir
          </Button>
        </div>
      </header>

      {/* Print Content */}
      <div className="flex flex-col items-center justify-center p-8 print:p-0 print:min-h-screen">
        <div className="bg-white p-12 rounded-3xl shadow-lg print:shadow-none print:rounded-none max-w-md w-full">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src={logoMarrom} 
              alt="Resinkra" 
              className="h-12 object-contain print:h-16"
            />
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white rounded-2xl print:p-0">
              <QRCode 
                value={APP_URL} 
                size={280}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 280 280`}
                level="H"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-foreground print:text-black">
              Baixe nosso App
            </h2>
            <p className="text-muted-foreground print:text-gray-600">
              Escaneie o QR Code com a câmera do seu celular
            </p>
            
            {/* Features */}
            <div className="flex justify-center gap-6 pt-4 text-sm text-muted-foreground print:text-gray-500">
              <div className="flex items-center gap-1.5">
                <Download size={14} />
                <span>Grátis</span>
              </div>
              <div className="text-muted-foreground/50">•</div>
              <span>iOS & Android</span>
            </div>
          </div>

          {/* URL fallback */}
          <div className="mt-8 pt-6 border-t border-border/50 print:border-gray-200">
            <p className="text-xs text-center text-muted-foreground print:text-gray-400">
              Ou acesse: <span className="font-medium text-primary print:text-black">resinkra.com.br</span>
            </p>
          </div>
        </div>

        {/* Print Tips - Hidden when printing */}
        <div className="mt-8 text-center text-sm text-muted-foreground max-w-md print:hidden">
          <p className="mb-2 font-medium">Dicas para impressão:</p>
          <ul className="space-y-1 text-xs">
            <li>• Use papel de alta qualidade para melhor escaneamento</li>
            <li>• Tamanho mínimo recomendado: 3x3 cm</li>
            <li>• Mantenha contraste alto (fundo branco, QR preto)</li>
          </ul>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            margin: 0;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};

export default QRCodePrint;
