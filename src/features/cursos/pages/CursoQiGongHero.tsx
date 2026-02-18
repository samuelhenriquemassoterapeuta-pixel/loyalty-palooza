import { Wind } from "lucide-react";
import capaQiGong from "@/assets/cursos/capa-qi-gong.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoQiGongData } from "@/features/cursos/data/cursoQiGongContent";

export default function CursoQiGongHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_qi_gong_progress"
      modulos={cursoQiGongData}
      courseTitle="Qi Gong Terapêutico"
      courseSubtitle="Exercícios Energéticos para Saúde e Vitalidade"
      courseIcon={<Wind size={28} />}
      coverImage={capaQiGong}
      courseRoute="/curso-qi-gong"
      level="Iniciante ao Avançado"
      description="Curso de Qi Gong com 6 módulos e 25 horas — Ba Duan Jin, Yi Jin Jing, meditação em movimento e prescrição de exercícios."
      embedded={embedded}
    />
  );
}
