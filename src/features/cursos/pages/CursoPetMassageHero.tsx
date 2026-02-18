import { PawPrint } from "lucide-react";
import capaPetMassage from "@/assets/cursos/capa-pet-massage.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoPetMassageData } from "@/features/cursos/data/cursoPetMassageContent";

export default function CursoPetMassageHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_pet_massage_progress"
      modulos={cursoPetMassageData}
      courseTitle="Pet Massage"
      courseSubtitle="Massoterapia Animal — Cães e Gatos"
      courseIcon={<PawPrint size={28} />}
      coverImage={capaPetMassage}
      courseRoute="/curso-pet-massage"
      level="Iniciante ao Intermediário"
      description="Curso completo de Pet Massage com 7 módulos e 30 horas — anatomia animal, técnicas seguras, acupressão pet e empreendedorismo no nicho."
      embedded={embedded}
    />
  );
}
