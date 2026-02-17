import { ChefHat } from "lucide-react";
import capaGastronomiaSaudavel from "@/assets/cursos/capa-gastronomia-saudavel.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoGastronomiaSaudavelData } from "@/features/cursos/data/cursoGastronomiaSaudavelContent";

export default function CursoGastronomiaSaudavelHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_gastronomia_saudavel_progress"
      modulos={cursoGastronomiaSaudavelData}
      courseTitle="Gastronomia Saudável"
      courseSubtitle="Do Iniciante ao Avançado — 130h"
      courseIcon={<ChefHat size={28} />}
      coverImage={capaGastronomiaSaudavel}
      coverVideo=""
      courseRoute="/curso-gastronomia-saudavel"
      level="Iniciante ao Avançado"
      description="Formação completa em gastronomia saudável: nutrição aplicada, técnicas culinárias, receitas por público, marmitas, empreendedorismo, marketing digital e gestão financeira."
      embedded={embedded}
    />
  );
}
