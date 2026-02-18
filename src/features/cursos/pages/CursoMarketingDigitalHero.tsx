import { Megaphone } from "lucide-react";
import capaMarketingDigital from "@/assets/cursos/capa-marketing-digital.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoMarketingDigitalData } from "@/features/cursos/data/cursoMarketingDigitalContent";

export default function CursoMarketingDigitalHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_marketing_digital_progress"
      modulos={cursoMarketingDigitalData}
      courseTitle="Marketing Digital para Terapeutas"
      courseSubtitle="Estratégias Digitais para Crescer seu Negócio"
      courseIcon={<Megaphone size={28} />}
      coverImage={capaMarketingDigital}
      courseRoute="/curso-marketing-digital"
      level="Iniciante ao Intermediário"
      description="Curso completo de Marketing Digital com 8 módulos e 35 horas — Instagram, Google, funil de vendas, copywriting e automações para terapeutas."
      embedded={embedded}
    />
  );
}
