import { Brain } from "lucide-react";
import capaNeurociencia from "@/assets/cursos/capa-neurociencia.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoNeurocienciaData } from "@/features/cursos/data/cursoNeurocienciaContent";

export default function CursoNeurocienciaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_neurociencia_progress"
      modulos={cursoNeurocienciaData}
      courseTitle="Neurociência da Dor"
      courseSubtitle="Mecanismos da Dor e Terapia Manual Baseada em Evidências"
      courseIcon={<Brain size={28} />}
      coverImage={capaNeurociencia}
      courseRoute="/curso-neurociencia"
      level="Avançado"
      description="Curso completo de Neurociência da Dor com 9 módulos e 45 horas — neurofisiologia, sensibilização central, educação em dor e protocolos integrativos."
      embedded={embedded}
    />
  );
}
