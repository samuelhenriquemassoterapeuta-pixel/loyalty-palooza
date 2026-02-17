import { Wind } from "lucide-react";
import capaDifusor from "@/assets/cursos/capa-difusor-ambientes.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoDifusorAmbientesData } from "@/features/cursos/data/cursoDifusorAmbientesContent";

export default function CursoDifusorAmbientesHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_difusor_ambientes_progress"
      modulos={cursoDifusorAmbientesData}
      courseTitle="Difusor de Ambientes Natural"
      courseSubtitle="Do iniciante ao avançado — formulação e empreendedorismo"
      courseIcon={<Wind size={28} />}
      coverImage={capaDifusor}
      coverVideo=""
      courseRoute="/curso-difusor-ambientes"
      level="Iniciante ao Avançado"
      description="Formação completa em difusores naturais: varetas, sprays, gel, blends aromáticos, aromaterapia aplicada, certificações internacionais, empreendedorismo e marketing digital. 105 horas de conteúdo."
      embedded={embedded}
    />
  );
}
