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

function computeStats(title: string, storageKey: string, modulos: { aulas: { duracaoMinutos: number }[] }[]) {
  const totalAulas = modulos.reduce((a, m) => a + m.aulas.length, 0);
  const totalMinutos = modulos.reduce((a, m) => a + m.aulas.reduce((s, l) => s + l.duracaoMinutos, 0), 0);
  const totalModulos = modulos.length;
  return { title, storageKey, totalAulas, totalMinutos, totalModulos };
}

export const allCourseStats = [
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
];
