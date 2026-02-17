import { GraduationCap } from "lucide-react";
import capaVendas from "@/assets/cursos/capa-vendas.jpg";
import videoVendas from "@/assets/cursos/video-vendas.mp4";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoVendasData } from "@/features/cursos/data/cursoVendasContent";

export default function CursoVendasHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_vendas_progress"
      modulos={cursoVendasData}
      courseTitle="Curso de Vendas"
      courseSubtitle="Vendas consultivas em massoterapia"
      courseIcon={<GraduationCap size={28} />}
      coverImage={capaVendas}
      coverVideo={videoVendas}
      courseRoute="/curso-vendas"
      level="Intermediário"
      description="Domine as técnicas de vendas consultivas para massoterapia. Aprenda a precificar pacotes, contornar objeções, fidelizar clientes, automatizar processos e escalar sua clínica com estratégias comprovadas."
      embedded={embedded}
    />
  );
}
