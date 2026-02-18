import { Flame } from "lucide-react";
import capaMoxabustao from "@/assets/cursos/capa-moxabustao.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoMoxabustaoData } from "@/features/cursos/data/cursoMoxabustaoContent";

export default function CursoMoxabustaoHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_moxabustao_progress"
      modulos={cursoMoxabustaoData}
      courseTitle="Moxabustão"
      courseSubtitle="Terapia por Calor com Artemísia"
      courseIcon={<Flame size={28} />}
      coverImage={capaMoxabustao}
      courseRoute="/curso-moxabustao"
      level="Intermediário"
      description="Curso de Moxabustão com 5 módulos e 20 horas — moxa direta, indireta, bastão, cone e protocolos para deficiência de Yang."
      embedded={embedded}
    />
  );
}
