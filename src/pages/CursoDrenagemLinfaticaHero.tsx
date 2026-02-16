import { Droplets } from "lucide-react";
import capaDrenagemLinfatica from "@/assets/cursos/capa-drenagem-linfatica.jpg";
import { CursoHeroPage } from "@/components/curso/CursoHeroPage";
import { cursoDrenagemLinfaticaData } from "@/data/cursoDrenagemLinfaticaContent";

export default function CursoDrenagemLinfaticaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_drenagem_linfatica_progress"
      modulos={cursoDrenagemLinfaticaData}
      courseTitle="Drenagem Linfática"
      courseSubtitle="Do Iniciante ao Avançado — 116h"
      courseIcon={<Droplets size={28} />}
      coverImage={capaDrenagemLinfatica}
      coverVideo=""
      courseRoute="/curso-drenagem-linfatica"
      level="Iniciante ao Avançado"
      description="Formação completa em drenagem linfática: anatomia do sistema linfático, técnicas de Vodder e Leduc, sequência corporal de 12 passos, gestantes, pós-operatório, anamnese, ética e negócios."
      embedded={embedded}
    />
  );
}
