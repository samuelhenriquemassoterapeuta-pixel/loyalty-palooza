import { cursoMetodoResinkraData } from "@/data/cursoMetodoResinkraContent";
import { cursoVendasData } from "@/data/cursoVendasContent";
import { cursoAromaterapiaData } from "@/data/cursoAromaterapiaContent";
import { cursoHeadSpaData } from "@/data/cursoHeadSpaContent";
import { cursoAnatomiaData } from "@/data/cursoAnatomiaContent";
import { cursoYugenFaceSpaData } from "@/data/cursoYugenFaceSpaContent";
import { cursoPerfumariaNaturalData } from "@/data/cursoPerfumariaNaturalContent";
import { cursoVelasAromaticasData } from "@/data/cursoVelasAromaticasContent";

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
];
