import { Flower2 } from "lucide-react";
import capaAromaterapia from "@/assets/cursos/capa-aromaterapia.jpg";
import videoAromaterapia from "@/assets/cursos/video-aromaterapia.mp4";
import { CursoHeroPage } from "@/components/curso/CursoHeroPage";
import { cursoAromaterapiaData } from "@/data/cursoAromaterapiaContent";

export default function CursoAromaterapiaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_aromaterapia_progress"
      modulos={cursoAromaterapiaData}
      courseTitle="Aromaterapia doTERRA"
      courseSubtitle="Óleos essenciais para massoterapeutas"
      courseIcon={<Flower2 size={28} />}
      coverImage={capaAromaterapia}
      coverVideo={videoAromaterapia}
      courseRoute="/curso-aromaterapia"
      level="Iniciante ao Avançado"
      description="Formação completa em aromaterapia doTERRA: dos fundamentos à Técnica AromaTouch®, classificação química, evidências científicas, DIY artesanal, aromaterapia para animais e empreendedorismo."
      embedded={embedded}
    />
  );
}
