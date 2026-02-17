import { Hand } from "lucide-react";
import capaMassagemModeladora from "@/assets/cursos/capa-massagem-modeladora.jpg";
import { CursoShell } from "@/features/cursos/components/CursoShell";
import { cursoMassagemModeladoraData } from "@/features/cursos/data/cursoMassagemModeladoraContent";
import { massagemModeladoraAulaAssets } from "@/features/cursos/data/cursoMassagemModeladoraAssets";

export default function CursoMassagemModeladora({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_massagem_modeladora_progress"
      modulos={cursoMassagemModeladoraData}
      assets={massagemModeladoraAulaAssets}
      courseTitle="Massagem Modeladora"
      courseSubtitle="Do Iniciante ao Avançado — 128h"
      courseIcon={<Hand size={24} />}
      coverImage={capaMassagemModeladora}
      coverVideo=""
      completionMessage="Parabéns! Você concluiu o curso de Massagem Modeladora. 🏆 Certificado desbloqueado!"
    />
  );
}
