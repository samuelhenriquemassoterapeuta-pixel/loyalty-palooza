import type { CursoAssetPair } from "@/components/curso/CursoShell";

// Images for each lesson
import aulaOrigemMetodo from "@/assets/cursos/resinkra/aula-origem-metodo.jpg";
import aulaPrincipios from "@/assets/cursos/resinkra/aula-principios.jpg";
import aulaDualidadeDor from "@/assets/cursos/resinkra/aula-dualidade-dor.jpg";
import aulaMusculoesqueletico from "@/assets/cursos/resinkra/aula-musculoesqueletico.jpg";
import aulaFasciasTrigger from "@/assets/cursos/resinkra/aula-fascias-trigger.jpg";
import aulaCadeiasMusculares from "@/assets/cursos/resinkra/aula-cadeias-musculares.jpg";
import aulaAvaliacaoVisual from "@/assets/cursos/resinkra/aula-avaliacao-visual.jpg";
import aulaMapaTensoes from "@/assets/cursos/resinkra/aula-mapa-tensoes.jpg";
import aulaRaizDor from "@/assets/cursos/resinkra/aula-raiz-dor.jpg";
import aulaPolegaresDedos from "@/assets/cursos/resinkra/aula-polegares-dedos.jpg";
import aulaCotovelosAntebraco from "@/assets/cursos/resinkra/aula-cotovelos-antebraco.jpg";
import aulaErgonomia from "@/assets/cursos/resinkra/aula-ergonomia.jpg";
import aulaVelocidade from "@/assets/cursos/resinkra/aula-velocidade.jpg";
import aulaGraduacaoPressao from "@/assets/cursos/resinkra/aula-graduacao-pressao.jpg";
import aulaTransicaoPratica from "@/assets/cursos/resinkra/aula-transicao-pratica.jpg";
import aulaCostasColuna from "@/assets/cursos/resinkra/aula-costas-coluna.jpg";
import aulaMembros from "@/assets/cursos/resinkra/aula-membros.jpg";
import aulaCervicalCranio from "@/assets/cursos/resinkra/aula-cervical-cranio.jpg";
import aulaRespiracao from "@/assets/cursos/resinkra/aula-respiracao.jpg";
import aulaComunicacaoNaoVerbal from "@/assets/cursos/resinkra/aula-comunicacao-nao-verbal.jpg";
import aulaPresencaIntuicao from "@/assets/cursos/resinkra/aula-presenca-intuicao.jpg";
import aulaSessaoCompleta from "@/assets/cursos/resinkra/aula-sessao-completa.jpg";
import aulaCasosClinicos from "@/assets/cursos/resinkra/aula-casos-clinicos.jpg";
import aulaAdaptacoesPerfil from "@/assets/cursos/resinkra/aula-adaptacoes-perfil.jpg";

// Map: [moduleIndex]-[lessonIndex] => { image, video }
// Video is empty since this course uses narration (ElevenLabs) instead of per-lesson video
export const metodoResinkraAulaAssets: Record<string, CursoAssetPair> = {
  // Module 0: Filosofia do Método
  "0-0": { image: aulaOrigemMetodo, video: "" },
  "0-1": { image: aulaPrincipios, video: "" },
  "0-2": { image: aulaDualidadeDor, video: "" },
  // Module 1: Anatomia Aplicada
  "1-0": { image: aulaMusculoesqueletico, video: "" },
  "1-1": { image: aulaFasciasTrigger, video: "" },
  "1-2": { image: aulaCadeiasMusculares, video: "" },
  // Module 2: Leitura Corporal
  "2-0": { image: aulaAvaliacaoVisual, video: "" },
  "2-1": { image: aulaMapaTensoes, video: "" },
  "2-2": { image: aulaRaizDor, video: "" },
  // Module 3: Ferramentas do Corpo
  "3-0": { image: aulaPolegaresDedos, video: "" },
  "3-1": { image: aulaCotovelosAntebraco, video: "" },
  "3-2": { image: aulaErgonomia, video: "" },
  // Module 4: Cadenciamento e Pressão
  "4-0": { image: aulaVelocidade, video: "" },
  "4-1": { image: aulaGraduacaoPressao, video: "" },
  "4-2": { image: aulaTransicaoPratica, video: "" },
  // Module 5: Protocolos por Região
  "5-0": { image: aulaCostasColuna, video: "" },
  "5-1": { image: aulaMembros, video: "" },
  "5-2": { image: aulaCervicalCranio, video: "" },
  // Module 6: Conexão Terapêutica
  "6-0": { image: aulaRespiracao, video: "" },
  "6-1": { image: aulaComunicacaoNaoVerbal, video: "" },
  "6-2": { image: aulaPresencaIntuicao, video: "" },
  // Module 7: Prática Integrada
  "7-0": { image: aulaSessaoCompleta, video: "" },
  "7-1": { image: aulaCasosClinicos, video: "" },
  "7-2": { image: aulaAdaptacoesPerfil, video: "" },
};
