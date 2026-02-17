import { Fingerprint } from "lucide-react";
import capaSeitai from "@/assets/cursos/capa-seitai.jpg";
import videoAnatomia from "@/assets/cursos/video-anatomia.mp4";
import { CursoHeroPage } from "@/components/curso/CursoHeroPage";
import { cursoSeitaiData } from "@/data/cursoSeitaiContent";

export default function CursoSeitaiHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_seitai_progress"
      modulos={cursoSeitaiData}
      courseTitle="Seitai e New Seitai"
      courseSubtitle="Quiropraxia Japonesa — Do Iniciante ao Avançado"
      courseIcon={<Fingerprint size={28} />}
      coverImage={capaSeitai}
      coverVideo={videoAnatomia}
      courseRoute="/curso-seitai"
      level="Iniciante ao Avançado"
      description="Curso completo de Seitai e New Seitai (Quiropraxia Japonesa) com 15 módulos e 125 horas — técnicas tradicionais, J-SEITAI moderno, protocolos e visão de negócios."
      embedded={embedded}
    />
  );
}
