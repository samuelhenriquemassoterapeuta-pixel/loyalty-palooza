import { Flower2 } from "lucide-react";
import capaAromaterapia from "@/assets/cursos/capa-aromaterapia.jpg";
import videoAromaterapia from "@/assets/cursos/video-aromaterapia.mp4";
import { CursoShell } from "@/features/cursos/components/CursoShell";
import { cursoAromaterapiaData } from "@/features/cursos/data/cursoAromaterapiaContent";
import { aromaterapiaAulaAssets } from "@/features/cursos/data/cursoAromaterapiaAssets";

export default function CursoAromaterapia({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_aromaterapia_progress"
      modulos={cursoAromaterapiaData}
      assets={aromaterapiaAulaAssets}
      courseTitle="Aromaterapia doTERRA"
      courseSubtitle="Óleos essenciais para massoterapeutas"
      courseIcon={<Flower2 size={24} />}
      coverImage={capaAromaterapia}
      coverVideo={videoAromaterapia}
      completionMessage="Parabéns! Você concluiu o curso de Aromaterapia doTERRA para Massoterapeutas. 🏆 Certificado desbloqueado!"
    />
  );
}
