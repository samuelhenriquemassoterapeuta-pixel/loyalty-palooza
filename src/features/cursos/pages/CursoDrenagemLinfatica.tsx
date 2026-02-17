import { Droplets } from "lucide-react";
import capaDrenagemLinfatica from "@/assets/cursos/capa-drenagem-linfatica.jpg";
import { CursoShell } from "@/features/cursos/components/CursoShell";
import { cursoDrenagemLinfaticaData } from "@/features/cursos/data/cursoDrenagemLinfaticaContent";
import { drenagemLinfaticaAulaAssets } from "@/features/cursos/data/cursoDrenagemLinfaticaAssets";

export default function CursoDrenagemLinfatica({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_drenagem_linfatica_progress"
      modulos={cursoDrenagemLinfaticaData}
      assets={drenagemLinfaticaAulaAssets}
      courseTitle="Drenagem Linfática"
      courseSubtitle="Do Iniciante ao Avançado — 116h"
      courseIcon={<Droplets size={24} />}
      coverImage={capaDrenagemLinfatica}
      coverVideo=""
      completionMessage="Parabéns! Você concluiu o curso de Drenagem Linfática Completo. 🏆 Certificado desbloqueado!"
    />
  );
}
