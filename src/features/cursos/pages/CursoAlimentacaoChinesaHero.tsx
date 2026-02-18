import { Apple } from "lucide-react";
import capaAlimentacaoChinesa from "@/assets/cursos/capa-alimentacao-chinesa.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoAlimentacaoChinesaData } from "@/features/cursos/data/cursoAlimentacaoChinesaContent";

export default function CursoAlimentacaoChinesaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_alimentacao_chinesa_progress"
      modulos={cursoAlimentacaoChinesaData}
      courseTitle="Dietética Chinesa"
      courseSubtitle="Alimentação Terapêutica pela MTC"
      courseIcon={<Apple size={28} />}
      coverImage={capaAlimentacaoChinesa}
      courseRoute="/curso-alimentacao-chinesa"
      level="Intermediário"
      description="Curso de Dietética Chinesa com 6 módulos e 25 horas — natureza térmica, sabores, dietas por constituição e receitas terapêuticas."
      embedded={embedded}
    />
  );
}
