import { Droplets } from "lucide-react";
import capaOleosEssenciais from "@/assets/cursos/capa-oleos-essenciais.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoOleosEssenciaisData } from "@/features/cursos/data/cursoOleosEssenciaisContent";

export default function CursoOleosEssenciaisHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_oleos_essenciais_progress"
      modulos={cursoOleosEssenciaisData}
      courseTitle="Fabricação de Óleos Essenciais"
      courseSubtitle="Do Iniciante ao Avançado — 150h"
      courseIcon={<Droplets size={28} />}
      coverImage={capaOleosEssenciais}
      coverVideo=""
      courseRoute="/curso-oleos-essenciais"
      level="Iniciante ao Avançado"
      description="Formação completa em fabricação de óleos essenciais: destilação, prensagem a frio, CO2 supercrítico, controle de qualidade, regulamentação e empreendedorismo no setor."
      embedded={embedded}
    />
  );
}
