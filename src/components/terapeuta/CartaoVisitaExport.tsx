import { useState, useRef } from "react";
import { Image, FileText, Printer, Monitor, BookOpen } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CartaoVisitaVisual } from "./CartaoVisitaVisual";
import { CupomExportMenu } from "@/components/cupom/CupomExportMenu";

interface CartaoVisitaExportProps {
  terapeuta: {
    id: string;
    nome: string;
    especialidade?: string | null;
    foto_url?: string | null;
    email?: string | null;
    telefone?: string | null;
    media_avaliacoes?: number;
    total_avaliacoes?: number;
  };
}

const formatoLabels = {
  stories: { label: "Stories", icon: Image, desc: "9:16" },
  feed: { label: "Feed", icon: FileText, desc: "1:1" },
  impressao: { label: "Cartão", icon: Printer, desc: "Horizontal" },
  banner: { label: "Banner", icon: Monitor, desc: "16:9" },
  flyer: { label: "Flyer", icon: BookOpen, desc: "A5" },
};

const formatoSizes: Record<string, { width: number; height: number; className: string }> = {
  stories: { width: 1080, height: 1920, className: "w-[270px] h-[480px]" },
  feed: { width: 1080, height: 1080, className: "w-[320px] h-[320px]" },
  impressao: { width: 600, height: 400, className: "w-[360px] h-[240px]" },
  banner: { width: 1200, height: 628, className: "w-[360px] h-[188px]" },
  flyer: { width: 1748, height: 2480, className: "w-[250px] h-[354px]" },
};

export const CartaoVisitaExport = ({ terapeuta }: CartaoVisitaExportProps) => {
  const [formato, setFormato] = useState<keyof typeof formatoLabels>("stories");
  const cardRef = useRef<HTMLDivElement>(null);
  const size = formatoSizes[formato];

  return (
    <div className="space-y-3">
      <Tabs value={formato} onValueChange={(v) => setFormato(v as keyof typeof formatoLabels)} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          {Object.entries(formatoLabels).map(([key, { label, icon: Icon }]) => (
            <TabsTrigger key={key} value={key} className="gap-1 text-xs px-1">
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex justify-center items-center bg-muted/30 rounded-xl p-2 overflow-hidden">
        <div className="transform scale-[0.85] sm:scale-100 origin-center">
          <div
            ref={cardRef}
            className={size.className}
            data-export-width={size.width}
            data-export-height={size.height}
          >
            <CartaoVisitaVisual
              nome={terapeuta.nome}
              especialidade={terapeuta.especialidade}
              foto_url={terapeuta.foto_url}
              email={terapeuta.email}
              telefone={terapeuta.telefone}
              media_avaliacoes={terapeuta.media_avaliacoes}
              total_avaliacoes={terapeuta.total_avaliacoes}
              terapeutaId={terapeuta.id}
              fillContainer
            />
          </div>
        </div>
      </div>

      <CupomExportMenu
        cupomRef={cardRef}
        formato={formato}
        formatoLabel={formatoLabels[formato].label}
        variant="inline"
      />
    </div>
  );
};
