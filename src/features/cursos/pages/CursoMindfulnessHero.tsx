import { Sun } from "lucide-react";
import capaMindfulness from "@/assets/cursos/capa-mindfulness.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoMindfulnessData } from "@/features/cursos/data/cursoMindfulnessContent";

export default function CursoMindfulnessHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_mindfulness_progress"
      modulos={cursoMindfulnessData}
      courseTitle="Mindfulness e Meditação"
      courseSubtitle="Práticas Contemplativas para Terapeutas"
      courseIcon={<Sun size={28} />}
      coverImage={capaMindfulness}
      courseRoute="/curso-mindfulness"
      level="Iniciante ao Avançado"
      description="Curso completo de Mindfulness com 6 módulos e 25 horas — meditação guiada, respiração consciente, neurociência contemplativa e integração clínica."
      embedded={embedded}
    />
  );
}
