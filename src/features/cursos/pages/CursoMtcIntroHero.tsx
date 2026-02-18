import { CircleDot } from "lucide-react";
import capaMtcIntro from "@/assets/cursos/capa-mtc-intro.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoMtcIntroData } from "@/features/cursos/data/cursoMtcIntroContent";

export default function CursoMtcIntroHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_mtc_intro_progress"
      modulos={cursoMtcIntroData}
      courseTitle="Introdução à MTC"
      courseSubtitle="Fundamentos da Medicina Tradicional Chinesa"
      courseIcon={<CircleDot size={28} />}
      coverImage={capaMtcIntro}
      courseRoute="/curso-mtc-intro"
      level="Iniciante"
      description="Curso de Introdução à MTC com 5 módulos e 20 horas — Yin-Yang, Cinco Elementos, Qi, Sangue e Fluidos Corporais."
      embedded={embedded}
    />
  );
}
