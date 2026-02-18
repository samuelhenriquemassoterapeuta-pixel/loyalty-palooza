import { CircleDot } from "lucide-react";
import capaVentosaterapia from "@/assets/cursos/capa-ventosaterapia.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoVentosaterapiaData } from "@/features/cursos/data/cursoVentosaterapiaContent";

export default function CursoVentosaterapiaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_ventosaterapia_progress"
      modulos={cursoVentosaterapiaData}
      courseTitle="Ventosaterapia"
      courseSubtitle="Técnicas Avançadas de Ventosas Terapêuticas"
      courseIcon={<CircleDot size={28} />}
      coverImage={capaVentosaterapia}
      courseRoute="/curso-ventosaterapia"
      level="Intermediário"
      description="Curso de Ventosaterapia com 6 módulos e 25 horas — ventosas fixas, deslizantes, sangria, protocolos por patologia e segurança."
      embedded={embedded}
    />
  );
}
