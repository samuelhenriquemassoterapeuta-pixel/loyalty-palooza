import { Fingerprint } from "lucide-react";
import capaSeitai from "@/assets/cursos/capa-seitai.jpg";
import videoAnatomia from "@/assets/cursos/video-anatomia.mp4";
import { CursoShell } from "@/features/cursos/components/CursoShell";
import { cursoSeitaiData } from "@/features/cursos/data/cursoSeitaiContent";
import { seitaiAulaAssets } from "@/features/cursos/data/cursoSeitaiAssets";

export default function CursoSeitai({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_seitai_progress"
      modulos={cursoSeitaiData}
      assets={seitaiAulaAssets}
      courseTitle="Seitai e New Seitai"
      courseSubtitle="Quiropraxia Japonesa — Do Iniciante ao Avançado"
      courseIcon={<Fingerprint size={24} />}
      coverImage={capaSeitai}
      coverVideo={videoAnatomia}
      completionMessage="Parabéns! Você concluiu o curso de Seitai e New Seitai. 🏆 Certificado desbloqueado!"
    />
  );
}
