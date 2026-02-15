import { GraduationCap } from "lucide-react";
import capaVendas from "@/assets/cursos/capa-vendas.jpg";
import videoVendas from "@/assets/cursos/video-vendas.mp4";
import { CursoShell } from "@/components/curso/CursoShell";
import { cursoVendasData } from "@/data/cursoVendasContent";
import { vendasAulaAssets } from "@/data/cursoVendasAssets";

export default function CursoVendas({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_vendas_progress"
      modulos={cursoVendasData}
      assets={vendasAulaAssets}
      courseTitle="Curso de Vendas"
      courseSubtitle="Vendas consultivas em massoterapia"
      courseIcon={<GraduationCap size={24} />}
      coverImage={capaVendas}
      coverVideo={videoVendas}
      completionMessage="Parabéns! Você concluiu todas as aulas do curso de Vendas Consultivas em Massoterapia."
    />
  );
}
