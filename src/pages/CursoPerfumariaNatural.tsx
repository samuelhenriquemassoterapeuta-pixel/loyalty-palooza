import { Flower2 } from "lucide-react";
import capaPerfumaria from "@/assets/cursos/capa-perfumaria.jpg";
import { CursoShell } from "@/components/curso/CursoShell";
import { cursoPerfumariaNaturalData } from "@/data/cursoPerfumariaNaturalContent";
import { perfumariaNaturalAulaAssets } from "@/data/cursoPerfumariaNaturalAssets";

export default function CursoPerfumariaNatural({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_perfumaria_natural_progress"
      modulos={cursoPerfumariaNaturalData}
      assets={perfumariaNaturalAulaAssets}
      courseTitle="Perfumaria Natural"
      courseSubtitle="Criação e formulação de perfumes artesanais"
      courseIcon={<Flower2 size={24} />}
      coverImage={capaPerfumaria}
      coverVideo=""
      completionMessage="Parabéns! Você concluiu o curso de Perfumaria Natural. 🏆 Certificado desbloqueado!"
    />
  );
}
