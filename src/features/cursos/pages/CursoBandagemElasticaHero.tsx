import { Bandage } from "lucide-react";
import capaBandagem from "@/assets/cursos/capa-bandagem-elastica.jpg";
import videoAnatomia from "@/assets/cursos/video-anatomia.mp4";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoBandagemElasticaData } from "@/features/cursos/data/cursoBandagemElasticaContent";

export default function CursoBandagemElasticaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_bandagem_elastica_progress"
      modulos={cursoBandagemElasticaData}
      courseTitle="Bandagem Elástica"
      courseSubtitle="Kinesio Taping — Do Iniciante ao Avançado"
      courseIcon={<Bandage size={28} />}
      coverImage={capaBandagem}
      coverVideo={videoAnatomia}
      courseRoute="/curso-bandagem-elastica"
      level="Iniciante ao Avançado"
      description="Curso completo de Bandagem Elástica (Kinesio Taping) com 13 módulos e 120 horas — técnicas corretivas, aplicações clínicas, raciocínio biomecânico e visão de negócios."
      embedded={embedded}
    />
  );
}
