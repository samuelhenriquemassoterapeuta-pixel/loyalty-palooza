import { ChefHat } from "lucide-react";
import capaGastronomiaSaudavel from "@/assets/cursos/capa-gastronomia-saudavel.jpg";
import { CursoShell } from "@/features/cursos/components/CursoShell";
import { cursoGastronomiaSaudavelData } from "@/features/cursos/data/cursoGastronomiaSaudavelContent";
import { gastronomiaSaudavelAulaAssets } from "@/features/cursos/data/cursoGastronomiaSaudavelAssets";

export default function CursoGastronomiaSaudavel({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_gastronomia_saudavel_progress"
      modulos={cursoGastronomiaSaudavelData}
      assets={gastronomiaSaudavelAulaAssets}
      courseTitle="Gastronomia Saudável"
      courseSubtitle="Do Iniciante ao Avançado — 130h"
      courseIcon={<ChefHat size={24} />}
      coverImage={capaGastronomiaSaudavel}
      coverVideo=""
      completionMessage="Parabéns! Você concluiu o curso de Gastronomia Saudável. 🏆 Certificado desbloqueado!"
    />
  );
}
