import { Bath } from "lucide-react";
import capaSaboaria from "@/assets/cursos/capa-saboaria-artesanal.jpg";
import { CursoShell } from "@/features/cursos/components/CursoShell";
import { cursoSaboariaArtesanalData } from "@/features/cursos/data/cursoSaboariaArtesanalContent";
import { saboariaArtesanalAulaAssets } from "@/features/cursos/data/cursoSaboariaArtesanalAssets";

export default function CursoSaboariaArtesanal({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_saboaria_artesanal_progress"
      modulos={cursoSaboariaArtesanalData}
      assets={saboariaArtesanalAulaAssets}
      courseTitle="Saboaria Artesanal"
      courseSubtitle="Do iniciante ao avançado — fabricação e empreendedorismo"
      courseIcon={<Bath size={24} />}
      coverImage={capaSaboaria}
      coverVideo=""
      completionMessage="Parabéns! Você concluiu o curso de Saboaria Artesanal. 🏆 Certificado desbloqueado!"
    />
  );
}
