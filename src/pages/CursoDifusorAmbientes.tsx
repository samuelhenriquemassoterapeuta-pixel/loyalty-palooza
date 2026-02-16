import { Wind } from "lucide-react";
import capaDifusor from "@/assets/cursos/capa-difusor-ambientes.jpg";
import { CursoShell } from "@/components/curso/CursoShell";
import { cursoDifusorAmbientesData } from "@/data/cursoDifusorAmbientesContent";
import { difusorAmbientesAulaAssets } from "@/data/cursoDifusorAmbientesAssets";

export default function CursoDifusorAmbientes({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_difusor_ambientes_progress"
      modulos={cursoDifusorAmbientesData}
      assets={difusorAmbientesAulaAssets}
      courseTitle="Difusor de Ambientes Natural"
      courseSubtitle="Do iniciante ao avançado — formulação e empreendedorismo"
      courseIcon={<Wind size={24} />}
      coverImage={capaDifusor}
      coverVideo=""
      completionMessage="Parabéns! Você concluiu o curso de Difusor de Ambientes Natural. 🏆 Certificado desbloqueado!"
    />
  );
}
