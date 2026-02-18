import { Hand } from "lucide-react";
import capaTuiNa from "@/assets/cursos/capa-tui-na.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoTuiNaData } from "@/features/cursos/data/cursoTuiNaContent";

export default function CursoTuiNaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_tui_na_progress"
      modulos={cursoTuiNaData}
      courseTitle="Tui Na"
      courseSubtitle="Massagem Terapêutica Chinesa"
      courseIcon={<Hand size={28} />}
      coverImage={capaTuiNa}
      courseRoute="/curso-tui-na"
      level="Intermediário ao Avançado"
      description="Curso de Tui Na com 8 módulos e 40 horas — 8 técnicas fundamentais, manipulações articulares e protocolos por síndrome."
      embedded={embedded}
    />
  );
}
