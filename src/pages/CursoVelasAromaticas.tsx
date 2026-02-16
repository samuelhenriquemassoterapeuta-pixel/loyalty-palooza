import { Flame } from "lucide-react";
import capaVelas from "@/assets/cursos/capa-velas-aromaticas.jpg";
import { CursoShell } from "@/components/curso/CursoShell";
import { cursoVelasAromaticasData } from "@/data/cursoVelasAromaticasContent";
import { velasAromaticasAulaAssets } from "@/data/cursoVelasAromaticasAssets";

export default function CursoVelasAromaticas({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_velas_aromaticas_progress"
      modulos={cursoVelasAromaticasData}
      assets={velasAromaticasAulaAssets}
      courseTitle="Velas Aromáticas"
      courseSubtitle="Do iniciante ao avançado — fabricação e empreendedorismo"
      courseIcon={<Flame size={24} />}
      coverImage={capaVelas}
      coverVideo=""
      completionMessage="Parabéns! Você concluiu o curso de Velas Aromáticas. 🏆 Certificado desbloqueado!"
    />
  );
}
