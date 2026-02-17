import { Droplets } from "lucide-react";
import capaOleosEssenciais from "@/assets/cursos/capa-oleos-essenciais.jpg";
import { CursoShell } from "@/features/cursos/components/CursoShell";
import { cursoOleosEssenciaisData } from "@/features/cursos/data/cursoOleosEssenciaisContent";
import { oleosEssenciaisAulaAssets } from "@/features/cursos/data/cursoOleosEssenciaisAssets";

export default function CursoOleosEssenciais({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_oleos_essenciais_progress"
      modulos={cursoOleosEssenciaisData}
      assets={oleosEssenciaisAulaAssets}
      courseTitle="Fabricação de Óleos Essenciais"
      courseSubtitle="Do Iniciante ao Avançado — 150h"
      courseIcon={<Droplets size={24} />}
      coverImage={capaOleosEssenciais}
      coverVideo=""
      completionMessage="Parabéns! Você concluiu o curso de Fabricação de Óleos Essenciais. 🏆 Certificado desbloqueado!"
    />
  );
}
