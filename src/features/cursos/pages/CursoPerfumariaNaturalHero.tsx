import { Flower2 } from "lucide-react";
import capaPerfumaria from "@/assets/cursos/capa-perfumaria.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoPerfumariaNaturalData } from "@/features/cursos/data/cursoPerfumariaNaturalContent";

export default function CursoPerfumariaNaturalHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_perfumaria_natural_progress"
      modulos={cursoPerfumariaNaturalData}
      courseTitle="Perfumaria Natural"
      courseSubtitle="Criação e formulação de perfumes artesanais"
      courseIcon={<Flower2 size={28} />}
      coverImage={capaPerfumaria}
      coverVideo=""
      courseRoute="/curso-perfumaria-natural"
      level="Iniciante a Intermediário"
      description="Domine a arte da perfumaria natural em 60 horas. Da história dos aromas à criação de perfumes autorais, passando por todas as famílias olfativas, técnicas de formulação e estratégias de negócio."
      embedded={embedded}
    />
  );
}
