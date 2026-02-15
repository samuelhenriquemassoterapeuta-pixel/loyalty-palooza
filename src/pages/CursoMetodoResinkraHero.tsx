import { Hand } from "lucide-react";
import capaResinkra from "@/assets/cursos/capa-metodo-resinkra.jpg";
import { CursoHeroPage } from "@/components/curso/CursoHeroPage";
import { cursoMetodoResinkraData } from "@/data/cursoMetodoResinkraContent";

export default function CursoMetodoResinkraHero() {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_metodo_resinkra_progress"
      modulos={cursoMetodoResinkraData}
      courseTitle="Método Resinkra"
      courseSubtitle="Liberação miofascial + relaxamento profundo"
      courseIcon={<Hand size={28} />}
      coverImage={capaResinkra}
      coverVideo=""
      courseRoute="/curso-metodo-resinkra"
      level="Todos os níveis"
      description="23 anos de prática condensados em um método autoral. Aprenda a integrar liberação miofascial com relaxamento profundo — o cliente chega com dor e estressado, sai sem dor e completamente relaxado."
    />
  );
}
