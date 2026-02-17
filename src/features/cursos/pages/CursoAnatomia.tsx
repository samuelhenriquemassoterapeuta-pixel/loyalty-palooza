import { Bone } from "lucide-react";
import capaAnatomia from "@/assets/cursos/capa-anatomia.jpg";
import videoAnatomia from "@/assets/cursos/video-anatomia.mp4";
import { CursoShell } from "@/features/cursos/components/CursoShell";
import { cursoAnatomiaData } from "@/features/cursos/data/cursoAnatomiaContent";
import { anatomiaAulaAssets } from "@/features/cursos/data/cursoAnatomiaAssets";

export default function CursoAnatomia({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_anatomia_progress"
      modulos={cursoAnatomiaData}
      assets={anatomiaAulaAssets}
      courseTitle="Anatomia Humana"
      courseSubtitle="Anatomia aplicada à massoterapia"
      courseIcon={<Bone size={24} />}
      coverImage={capaAnatomia}
      coverVideo={videoAnatomia}
      completionMessage="Parabéns! Você concluiu o curso de Anatomia Humana Aplicada à Massoterapia. 🏆 Certificado desbloqueado!"
    />
  );
}
