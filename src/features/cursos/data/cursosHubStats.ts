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

function computeStats(title: string, storageKey: string, modulos: { aulas: { duracaoMinutos: number }[] }[]) {
  const totalAulas = modulos.reduce((a, m) => a + m.aulas.length, 0);
  const totalMinutos = modulos.reduce((a, m) => a + m.aulas.reduce((s, l) => s + l.duracaoMinutos, 0), 0);
  const totalModulos = modulos.length;
  return { title, storageKey, totalAulas, totalMinutos, totalModulos };
}

export const allCourseStats = [
  // Base courses
  computeStats("Método Resinkra", "resinkra_curso_metodo_resinkra_progress", cursoMetodoResinkraData),
  computeStats("Vendas", "resinkra_curso_vendas_progress", cursoVendasData),
  computeStats("Aromaterapia", "resinkra_curso_aromaterapia_progress", cursoAromaterapiaData),
  computeStats("Head SPA", "resinkra_curso_headspa_progress", cursoHeadSpaData),
  computeStats("Anatomia", "resinkra_curso_anatomia_progress", cursoAnatomiaData),
  computeStats("Yūgen FaceSPA", "resinkra_curso_yugen_facespa_progress", cursoYugenFaceSpaData),
  computeStats("Perfumaria Natural", "resinkra_curso_perfumaria_natural_progress", cursoPerfumariaNaturalData),
  computeStats("Velas Aromáticas", "resinkra_curso_velas_aromaticas_progress", cursoVelasAromaticasData),
  computeStats("Saboaria Artesanal", "resinkra_curso_saboaria_artesanal_progress", cursoSaboariaArtesanalData),
  computeStats("Difusor de Ambientes", "resinkra_curso_difusor_ambientes_progress", cursoDifusorAmbientesData),
  computeStats("Fitoterapia", "resinkra_curso_fitoterapia_progress", cursoFitoterapiaData),
  computeStats("Óleos Essenciais", "resinkra_curso_oleos_essenciais_progress", cursoOleosEssenciaisData),
  computeStats("Massagem Modeladora", "resinkra_curso_massagem_modeladora_progress", cursoMassagemModeladoraData),
  computeStats("Drenagem Linfática", "resinkra_curso_drenagem_linfatica_progress", cursoDrenagemLinfaticaData),
  computeStats("Gastronomia Saudável", "resinkra_curso_gastronomia_saudavel_progress", cursoGastronomiaSaudavelData),
  computeStats("Seitai e New Seitai", "resinkra_curso_seitai_progress", cursoSeitaiData),
  computeStats("Bandagem Elástica", "resinkra_curso_bandagem_elastica_progress", cursoBandagemElasticaData),
  // Expansion courses
  computeStats("Fitoterapia Aplicada", "resinkra_curso_fitoterapia_aplicada_progress", cursoFitoterapiaAplicadaData),
  computeStats("Gestantes", "resinkra_curso_gestantes_progress", cursoGestantesData),
  computeStats("Neurociência da Dor", "resinkra_curso_neurociencia_progress", cursoNeurocienciaData),
  computeStats("Massagem Geriátrica", "resinkra_curso_geriatrica_progress", cursoGeriatricaData),
  computeStats("Massagem Esportiva", "resinkra_curso_esportiva_progress", cursoEsportivaData),
  computeStats("Marketing Digital", "resinkra_curso_marketing_digital_progress", cursoMarketingDigitalData),
  computeStats("Pet Massage", "resinkra_curso_pet_massage_progress", cursoPetMassageData),
  computeStats("Mindfulness", "resinkra_curso_mindfulness_progress", cursoMindfulnessData),
  computeStats("Introdução à MTC", "resinkra_curso_mtc_intro_progress", cursoMtcIntroData),
  computeStats("Meridianos e Pontos", "resinkra_curso_meridianos_progress", cursoMeridianosData),
  computeStats("Ventosaterapia", "resinkra_curso_ventosaterapia_progress", cursoVentosaterapiaData),
  computeStats("Moxabustão", "resinkra_curso_moxabustao_progress", cursoMoxabustaoData),
  computeStats("Auriculoterapia", "resinkra_curso_auriculoterapia_progress", cursoAuriculoterapiaData),
  computeStats("Tui Na", "resinkra_curso_tui_na_progress", cursoTuiNaData),
  computeStats("Diagnóstico MTC", "resinkra_curso_diagnostico_mtc_progress", cursoDiagnosticoMtcData),
  computeStats("Fitoterapia Chinesa", "resinkra_curso_fitoterapia_chin_progress", cursoFitoterapiaChinContent),
  computeStats("Qi Gong", "resinkra_curso_qi_gong_progress", cursoQiGongData),
  computeStats("Dietética Chinesa", "resinkra_curso_alimentacao_chinesa_progress", cursoAlimentacaoChinesaData),
];
