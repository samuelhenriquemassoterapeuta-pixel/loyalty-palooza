import { Hand } from "lucide-react";
import capaResinkra from "@/assets/cursos/capa-metodo-resinkra.jpg";
import { CursoShell } from "@/components/curso/CursoShell";
import { cursoMetodoResinkraData } from "@/data/cursoMetodoResinkraContent";
import { metodoResinkraAulaAssets } from "@/data/cursoMetodoResinkraAssets";

export default function CursoMetodoResinkra({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_metodo_resinkra_progress"
      modulos={cursoMetodoResinkraData}
      assets={metodoResinkraAulaAssets}
      courseTitle="Método Resinkra"
      courseSubtitle="Liberação miofascial + relaxamento profundo"
      courseIcon={<Hand size={24} />}
      coverImage={capaResinkra}
      coverVideo=""
      completionMessage="Parabéns! Você concluiu o Método Resinkra. 🏆 23 anos de prática agora estão nas suas mãos."
    />
  );
}
