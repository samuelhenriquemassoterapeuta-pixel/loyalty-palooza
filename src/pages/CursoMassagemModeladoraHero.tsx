import { Hand } from "lucide-react";
import capaMassagemModeladora from "@/assets/cursos/capa-massagem-modeladora.jpg";
import { CursoHeroPage } from "@/components/curso/CursoHeroPage";
import { cursoMassagemModeladoraData } from "@/data/cursoMassagemModeladoraContent";

export default function CursoMassagemModeladoraHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_massagem_modeladora_progress"
      modulos={cursoMassagemModeladoraData}
      courseTitle="Massagem Modeladora"
      courseSubtitle="Do Iniciante ao Avançado — 128h"
      courseIcon={<Hand size={28} />}
      coverImage={capaMassagemModeladora}
      coverVideo=""
      courseRoute="/curso-massagem-modeladora"
      level="Iniciante ao Avançado"
      description="Formação completa em massagem modeladora: anatomia aplicada, técnicas por região, protocolos combinados, celulite, contraindicações, anamnese, ética e negócios."
      embedded={embedded}
    />
  );
}
