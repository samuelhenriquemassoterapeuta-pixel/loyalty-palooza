import { Bandage } from "lucide-react";
import capaBandagem from "@/assets/cursos/capa-bandagem-elastica.jpg";
import videoAnatomia from "@/assets/cursos/video-anatomia.mp4";
import { CursoShell } from "@/components/curso/CursoShell";
import { cursoBandagemElasticaData } from "@/data/cursoBandagemElasticaContent";
import { bandagemElasticaAulaAssets } from "@/data/cursoBandagemElasticaAssets";

export default function CursoBandagemElastica({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_bandagem_elastica_progress"
      modulos={cursoBandagemElasticaData}
      assets={bandagemElasticaAulaAssets}
      courseTitle="Bandagem Elástica"
      courseSubtitle="Kinesio Taping — Do Iniciante ao Avançado"
      courseIcon={<Bandage size={24} />}
      coverImage={capaBandagem}
      coverVideo={videoAnatomia}
      completionMessage="Parabéns! Você concluiu o curso de Bandagem Elástica. 🏆 Certificado desbloqueado!"
    />
  );
}
