import { cursoMetodoResinkraData } from "@/features/cursos/data/cursoMetodoResinkraContent";
import { cursoVendasData } from "@/features/cursos/data/cursoVendasContent";
import { cursoAromaterapiaData } from "@/features/cursos/data/cursoAromaterapiaContent";
import { cursoHeadSpaData } from "@/features/cursos/data/cursoHeadSpaContent";
import { cursoAnatomiaData } from "@/features/cursos/data/cursoAnatomiaContent";
import { cursoYugenFaceSpaData } from "@/features/cursos/data/cursoYugenFaceSpaContent";
import { cursoPerfumariaNaturalData } from "@/features/cursos/data/cursoPerfumariaNaturalContent";
import { cursoVelasAromaticasData } from "@/features/cursos/data/cursoVelasAromaticasContent";
import { cursoSaboariaArtesanalData } from "@/features/cursos/data/cursoSaboariaArtesanalContent";
import { cursoDifusorAmbientesData } from "@/features/cursos/data/cursoDifusorAmbientesContent";
import { cursoFitoterapiaData } from "@/features/cursos/data/cursoFitoterapiaContent";
import { cursoOleosEssenciaisData } from "@/features/cursos/data/cursoOleosEssenciaisContent";
import { cursoMassagemModeladoraData } from "@/features/cursos/data/cursoMassagemModeladoraContent";
import { cursoDrenagemLinfaticaData } from "@/features/cursos/data/cursoDrenagemLinfaticaContent";
import { cursoGastronomiaSaudavelData } from "@/features/cursos/data/cursoGastronomiaSaudavelContent";
import { cursoSeitaiData } from "@/features/cursos/data/cursoSeitaiContent";
import { cursoBandagemElasticaData } from "@/features/cursos/data/cursoBandagemElasticaContent";
// Expansion courses
import { cursoFitoterapiaAplicadaData } from "@/features/cursos/data/cursoFitoterapiaAplicadaContent";
import { cursoGestantesData } from "@/features/cursos/data/cursoGestantesContent";
import { cursoNeurocienciaData } from "@/features/cursos/data/cursoNeurocienciaContent";
import { cursoGeriatricaData } from "@/features/cursos/data/cursoGeriatricaContent";
import { cursoEsportivaData } from "@/features/cursos/data/cursoEsportivaContent";
import { cursoMarketingDigitalData } from "@/features/cursos/data/cursoMarketingDigitalContent";
import { cursoPetMassageData } from "@/features/cursos/data/cursoPetMassageContent";
import { cursoMindfulnessData } from "@/features/cursos/data/cursoMindfulnessContent";
import { cursoMtcIntroData } from "@/features/cursos/data/cursoMtcIntroContent";
import { cursoMeridianosData } from "@/features/cursos/data/cursoMeridianosContent";
import { cursoVentosaterapiaData } from "@/features/cursos/data/cursoVentosaterapiaContent";
import { cursoMoxabustaoData } from "@/features/cursos/data/cursoMoxabustaoContent";
import { cursoAuriculoterapiaData } from "@/features/cursos/data/cursoAuriculoterapiaContent";
import { cursoTuiNaData } from "@/features/cursos/data/cursoTuiNaContent";
import { cursoDiagnosticoMtcData } from "@/features/cursos/data/cursoDiagnosticoMtcContent";
import { cursoFitoterapiaChinContent } from "@/features/cursos/data/cursoFitoterapiaChinContent";
import { cursoQiGongData } from "@/features/cursos/data/cursoQiGongContent";
import { cursoAlimentacaoChinesaData } from "@/features/cursos/data/cursoAlimentacaoChinesaContent";
import type { ModuloContent } from "@/features/cursos/data/cursoVendasContent";

interface CourseEntry {
  name: string;
  data: ModuloContent[];
}

const allCourses: CourseEntry[] = [
  // ── Base (17) ──
  { name: "Método Resinkra", data: cursoMetodoResinkraData },
  { name: "Vendas e Negócios", data: cursoVendasData },
  { name: "Aromaterapia Clínica", data: cursoAromaterapiaData },
  { name: "Head SPA Japonês", data: cursoHeadSpaData },
  { name: "Anatomia e Fisiologia", data: cursoAnatomiaData },
  { name: "Yūgen FaceSPA", data: cursoYugenFaceSpaData },
  { name: "Perfumaria Natural", data: cursoPerfumariaNaturalData },
  { name: "Velas Aromáticas", data: cursoVelasAromaticasData },
  { name: "Saboaria Artesanal", data: cursoSaboariaArtesanalData },
  { name: "Difusor de Ambientes", data: cursoDifusorAmbientesData },
  { name: "Fitoterapia e Fitoterápicos", data: cursoFitoterapiaData },
  { name: "Óleos Essenciais", data: cursoOleosEssenciaisData },
  { name: "Massagem Modeladora", data: cursoMassagemModeladoraData },
  { name: "Drenagem Linfática", data: cursoDrenagemLinfaticaData },
  { name: "Gastronomia Saudável", data: cursoGastronomiaSaudavelData },
  { name: "Seitai e New Seitai", data: cursoSeitaiData },
  { name: "Bandagem Elástica", data: cursoBandagemElasticaData },
  // ── Expansão (18) ──
  { name: "Fitoterapia Aplicada", data: cursoFitoterapiaAplicadaData },
  { name: "Massagem para Gestantes", data: cursoGestantesData },
  { name: "Neurociência da Dor", data: cursoNeurocienciaData },
  { name: "Massagem Geriátrica", data: cursoGeriatricaData },
  { name: "Massagem Esportiva", data: cursoEsportivaData },
  { name: "Marketing Digital para Terapeutas", data: cursoMarketingDigitalData },
  { name: "Pet Massage", data: cursoPetMassageData },
  { name: "Mindfulness e Meditação", data: cursoMindfulnessData },
  { name: "Introdução à MTC", data: cursoMtcIntroData },
  { name: "Meridianos e Pontos de Acupuntura", data: cursoMeridianosData },
  { name: "Ventosaterapia", data: cursoVentosaterapiaData },
  { name: "Moxabustão", data: cursoMoxabustaoData },
  { name: "Auriculoterapia", data: cursoAuriculoterapiaData },
  { name: "Tui Na — Massagem Chinesa", data: cursoTuiNaData },
  { name: "Diagnóstico pela MTC", data: cursoDiagnosticoMtcData },
  { name: "Fitoterapia Chinesa", data: cursoFitoterapiaChinContent },
  { name: "Qi Gong Terapêutico", data: cursoQiGongData },
  { name: "Dietética Chinesa", data: cursoAlimentacaoChinesaData },
];

export function generateAllCoursesMarkdown(): string {
  let md = `# 📚 Estrutura Completa dos Cursos — Resinkra Academy\n`;
  md += `> Gerado automaticamente · ${allCourses.length} cursos\n\n`;

  let totalGlobalAulas = 0;
  let totalGlobalMinutos = 0;

  for (const course of allCourses) {
    const totalAulas = course.data.reduce((a, m) => a + m.aulas.length, 0);
    const totalMin = course.data.reduce((a, m) => a + m.aulas.reduce((s, l) => s + l.duracaoMinutos, 0), 0);
    totalGlobalAulas += totalAulas;
    totalGlobalMinutos += totalMin;

    md += `---\n\n`;
    md += `## 🎓 ${course.name}\n`;
    md += `**${course.data.length} módulos · ${totalAulas} aulas · ${Math.round(totalMin / 60)}h ${totalMin % 60}min**\n\n`;

    course.data.forEach((modulo, mi) => {
      const modMin = modulo.aulas.reduce((s, l) => s + l.duracaoMinutos, 0);
      md += `### Módulo ${mi + 1}: ${modulo.titulo}\n`;
      md += `> ${modulo.descricao} · ${modulo.aulas.length} aulas · ${Math.round(modMin / 60)}h ${modMin % 60}min · Nível: ${modulo.nivel || "geral"}\n\n`;

      modulo.aulas.forEach((aula, ai) => {
        md += `- **Aula ${ai + 1}:** ${aula.titulo} (${aula.duracaoMinutos}min)\n`;
        md += `  - ${aula.descricao}\n`;
        
        // Extract first 5 H2 headings from content as topics
        const h2s = aula.conteudo.match(/^## .+/gm);
        if (h2s && h2s.length > 0) {
          const topics = h2s.slice(0, 5).map(h => h.replace("## ", ""));
          md += `  - Tópicos: ${topics.join(" | ")}\n`;
        }

        if (aula.quiz && aula.quiz.length > 0) {
          md += `  - Quiz: ${aula.quiz.length} questões\n`;
        }
        if (aula.checklist && aula.checklist.length > 0) {
          md += `  - Checklist: ${aula.checklist.length} itens\n`;
        }
      });

      md += `\n`;
    });
  }

  md += `---\n\n`;
  md += `## 📊 Resumo Geral\n\n`;
  md += `| Métrica | Valor |\n`;
  md += `|---|---|\n`;
  md += `| Total de Cursos | ${allCourses.length} |\n`;
  md += `| Total de Módulos | ${allCourses.reduce((a, c) => a + c.data.length, 0)} |\n`;
  md += `| Total de Aulas | ${totalGlobalAulas} |\n`;
  md += `| Carga Horária Total | ${Math.round(totalGlobalMinutos / 60)}h |\n`;

  return md;
}
