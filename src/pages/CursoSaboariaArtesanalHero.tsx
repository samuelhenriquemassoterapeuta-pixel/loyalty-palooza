import { Bath } from "lucide-react";
import capaSaboaria from "@/assets/cursos/capa-saboaria-artesanal.jpg";
import { CursoHeroPage } from "@/components/curso/CursoHeroPage";
import { cursoSaboariaArtesanalData } from "@/data/cursoSaboariaArtesanalContent";

export default function CursoSaboariaArtesanalHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_saboaria_artesanal_progress"
      modulos={cursoSaboariaArtesanalData}
      courseTitle="Saboaria Artesanal"
      courseSubtitle="Do iniciante ao avançado — fabricação e empreendedorismo"
      courseIcon={<Bath size={28} />}
      coverImage={capaSaboaria}
      coverVideo=""
      courseRoute="/curso-saboaria-artesanal"
      level="Iniciante ao Avançado"
      description="Formação completa em saboaria artesanal: Melt & Pour, saponificação a frio, ingredientes funcionais, corantes naturais, embalagem, precificação, marketing digital e aspectos legais. 99 horas de conteúdo."
      embedded={embedded}
    />
  );
}
