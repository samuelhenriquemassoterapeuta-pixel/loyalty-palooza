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

// Videos for each lesson
import videoOrigemMetodo from "@/assets/cursos/resinkra/video-origem-metodo.mp4";
import videoPrincipios from "@/assets/cursos/resinkra/video-principios.mp4";
import videoDualidadeDor from "@/assets/cursos/resinkra/video-dualidade-dor.mp4";
import videoMusculoesqueletico from "@/assets/cursos/resinkra/video-musculoesqueletico.mp4";
import videoFasciasTrigger from "@/assets/cursos/resinkra/video-fascias-trigger.mp4";
import videoCadeiasMusculares from "@/assets/cursos/resinkra/video-cadeias-musculares.mp4";
import videoAvaliacaoVisual from "@/assets/cursos/resinkra/video-avaliacao-visual.mp4";
import videoMapaTensoes from "@/assets/cursos/resinkra/video-mapa-tensoes.mp4";
import videoRaizDor from "@/assets/cursos/resinkra/video-raiz-dor.mp4";
import videoPolegaresDedos from "@/assets/cursos/resinkra/video-polegares-dedos.mp4";
import videoCotovelosAntebraco from "@/assets/cursos/resinkra/video-cotovelos-antebraco.mp4";
import videoErgonomia from "@/assets/cursos/resinkra/video-ergonomia.mp4";
import videoVelocidade from "@/assets/cursos/resinkra/video-velocidade.mp4";
import videoGraduacaoPressao from "@/assets/cursos/resinkra/video-graduacao-pressao.mp4";
import videoTransicaoPratica from "@/assets/cursos/resinkra/video-transicao-pratica.mp4";
import videoCostasColuna from "@/assets/cursos/resinkra/video-costas-coluna.mp4";
import videoMembros from "@/assets/cursos/resinkra/video-membros.mp4";
import videoCervicalCranio from "@/assets/cursos/resinkra/video-cervical-cranio.mp4";
import videoRespiracao from "@/assets/cursos/resinkra/video-respiracao.mp4";
import videoComunicacaoNaoVerbal from "@/assets/cursos/resinkra/video-comunicacao-nao-verbal.mp4";
import videoPresencaIntuicao from "@/assets/cursos/resinkra/video-presenca-intuicao.mp4";
import videoSessaoCompleta from "@/assets/cursos/resinkra/video-sessao-completa.mp4";
import videoCasosClinicos from "@/assets/cursos/resinkra/video-casos-clinicos.mp4";
import videoAdaptacoesPerfil from "@/assets/cursos/resinkra/video-adaptacoes-perfil.mp4";

// Map: [moduleIndex]-[lessonIndex] => { image, video }
export const metodoResinkraAulaAssets: Record<string, CursoAssetPair> = {
  // Module 0: Filosofia do Método
  "0-0": { image: aulaOrigemMetodo, video: videoOrigemMetodo },
  "0-1": { image: aulaPrincipios, video: videoPrincipios },
  "0-2": { image: aulaDualidadeDor, video: videoDualidadeDor },
  // Module 1: Anatomia Aplicada
  "1-0": { image: aulaMusculoesqueletico, video: videoMusculoesqueletico },
  "1-1": { image: aulaFasciasTrigger, video: videoFasciasTrigger },
  "1-2": { image: aulaCadeiasMusculares, video: videoCadeiasMusculares },
  // Module 2: Leitura Corporal
  "2-0": { image: aulaAvaliacaoVisual, video: videoAvaliacaoVisual },
  "2-1": { image: aulaMapaTensoes, video: videoMapaTensoes },
  "2-2": { image: aulaRaizDor, video: videoRaizDor },
  // Module 3: Ferramentas do Corpo
  "3-0": { image: aulaPolegaresDedos, video: videoPolegaresDedos },
  "3-1": { image: aulaCotovelosAntebraco, video: videoCotovelosAntebraco },
  "3-2": { image: aulaErgonomia, video: videoErgonomia },
  // Module 4: Cadenciamento e Pressão
  "4-0": { image: aulaVelocidade, video: videoVelocidade },
  "4-1": { image: aulaGraduacaoPressao, video: videoGraduacaoPressao },
  "4-2": { image: aulaTransicaoPratica, video: videoTransicaoPratica },
  // Module 5: Protocolos por Região
  "5-0": { image: aulaCostasColuna, video: videoCostasColuna },
  "5-1": { image: aulaMembros, video: videoMembros },
  "5-2": { image: aulaCervicalCranio, video: videoCervicalCranio },
  // Module 6: Conexão Terapêutica
  "6-0": { image: aulaRespiracao, video: videoRespiracao },
  "6-1": { image: aulaComunicacaoNaoVerbal, video: videoComunicacaoNaoVerbal },
  "6-2": { image: aulaPresencaIntuicao, video: videoPresencaIntuicao },
  // Module 7: Prática Integrada
  "7-0": { image: aulaSessaoCompleta, video: videoSessaoCompleta },
  "7-1": { image: aulaCasosClinicos, video: videoCasosClinicos },
  "7-2": { image: aulaAdaptacoesPerfil, video: videoAdaptacoesPerfil },
};
