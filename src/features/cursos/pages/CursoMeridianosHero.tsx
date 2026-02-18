import { Route } from "lucide-react";
import capaMeridianos from "@/assets/cursos/capa-meridianos.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoMeridianosData } from "@/features/cursos/data/cursoMeridianosContent";

export default function CursoMeridianosHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_meridianos_progress"
      modulos={cursoMeridianosData}
      courseTitle="Meridianos e Pontos"
      courseSubtitle="Mapeamento Completo dos Canais Energéticos"
      courseIcon={<Route size={28} />}
      coverImage={capaMeridianos}
      courseRoute="/curso-meridianos"
      level="Intermediário"
      description="Curso de Meridianos e Pontos com 7 módulos e 35 horas — 12 meridianos principais, pontos de acupressão e protocolos energéticos."
      embedded={embedded}
    />
  );
}
