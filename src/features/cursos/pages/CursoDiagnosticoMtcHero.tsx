import { ScanEye } from "lucide-react";
import capaDiagnosticoMtc from "@/assets/cursos/capa-diagnostico-mtc.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoDiagnosticoMtcData } from "@/features/cursos/data/cursoDiagnosticoMtcContent";

export default function CursoDiagnosticoMtcHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_diagnostico_mtc_progress"
      modulos={cursoDiagnosticoMtcData}
      courseTitle="Diagnóstico pela Língua e Pulso"
      courseSubtitle="Métodos Diagnósticos da MTC"
      courseIcon={<ScanEye size={28} />}
      coverImage={capaDiagnosticoMtc}
      courseRoute="/curso-diagnostico-mtc"
      level="Avançado"
      description="Curso de Diagnóstico MTC com 6 módulos e 30 horas — inspeção da língua, palpação do pulso, 8 princípios diagnósticos e estudos de caso."
      embedded={embedded}
    />
  );
}
