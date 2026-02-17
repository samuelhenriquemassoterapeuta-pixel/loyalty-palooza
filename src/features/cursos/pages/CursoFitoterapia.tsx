import { Leaf } from "lucide-react";
import capaFitoterapia from "@/assets/cursos/capa-fitoterapia.jpg";
import { CursoShell } from "@/features/cursos/components/CursoShell";
import { cursoFitoterapiaData } from "@/features/cursos/data/cursoFitoterapiaContent";
import { fitoterapiaAulaAssets } from "@/features/cursos/data/cursoFitoterapiaAssets";

export default function CursoFitoterapia({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_fitoterapia_progress"
      modulos={cursoFitoterapiaData}
      assets={fitoterapiaAulaAssets}
      courseTitle="Fitoterapia e Fitoterápicos"
      courseSubtitle="Do Iniciante ao Avançado — 140h"
      courseIcon={<Leaf size={24} />}
      coverImage={capaFitoterapia}
      coverVideo=""
      completionMessage="Parabéns! Você concluiu o curso de Fitoterapia e Fitoterápicos. 🏆 Certificado desbloqueado!"
    />
  );
}
