// Images for each lesson
import aulaVenderCuidar from "@/assets/cursos/vendas/aula-vender-cuidar.jpg";
import aulaEtica from "@/assets/cursos/vendas/aula-etica-profissional.jpg";
import aulaPerfil from "@/assets/cursos/vendas/aula-perfil-cliente.jpg";
import aulaPrimeiros30s from "@/assets/cursos/vendas/aula-primeiros-30s.jpg";
import aulaAutoridade from "@/assets/cursos/vendas/aula-autoridade.jpg";
import aulaComunicacao from "@/assets/cursos/vendas/aula-comunicacao-empatica.jpg";
import aulaPacotes from "@/assets/cursos/vendas/aula-pacotes.jpg";
import aulaAncoragem from "@/assets/cursos/vendas/aula-ancoragem.jpg";
import aulaUpsell from "@/assets/cursos/vendas/aula-upsell.jpg";
import aulaObjecoes from "@/assets/cursos/vendas/aula-objecoes.jpg";
import aulaFechamento from "@/assets/cursos/vendas/aula-fechamento.jpg";
import aulaFollowup from "@/assets/cursos/vendas/aula-followup-whatsapp.jpg";
import aulaAlerta from "@/assets/cursos/vendas/aula-alerta-saldo.jpg";
import aulaUpgrade from "@/assets/cursos/vendas/aula-upgrade.jpg";
import aulaMetasConversao from "@/assets/cursos/vendas/aula-metas-conversao.jpg";
import aulaKpis from "@/assets/cursos/vendas/aula-kpis.jpg";
import aulaPlanoAcao from "@/assets/cursos/vendas/aula-plano-acao.jpg";

// Videos for each lesson
import videoVenderCuidar from "@/assets/cursos/vendas/video-vender-cuidar.mp4";
import videoEtica from "@/assets/cursos/vendas/video-etica.mp4";
import videoPerfil from "@/assets/cursos/vendas/video-perfil.mp4";
import videoPrimeiros30s from "@/assets/cursos/vendas/video-primeiros-30s.mp4";
import videoAutoridade from "@/assets/cursos/vendas/video-autoridade.mp4";
import videoComunicacao from "@/assets/cursos/vendas/video-comunicacao.mp4";
import videoPacotes from "@/assets/cursos/vendas/video-pacotes.mp4";
import videoAncoragem from "@/assets/cursos/vendas/video-ancoragem.mp4";
import videoUpsell from "@/assets/cursos/vendas/video-upsell.mp4";
import videoObjecoes from "@/assets/cursos/vendas/video-objecoes.mp4";
import videoFechamento from "@/assets/cursos/vendas/video-fechamento.mp4";
import videoFollowup from "@/assets/cursos/vendas/video-followup.mp4";
import videoAlerta from "@/assets/cursos/vendas/video-alerta.mp4";
import videoUpgrade from "@/assets/cursos/vendas/video-upgrade.mp4";
import videoMetas from "@/assets/cursos/vendas/video-metas.mp4";
import videoKpis from "@/assets/cursos/vendas/video-kpis.mp4";
import videoPlanoAcao from "@/assets/cursos/vendas/video-plano-acao.mp4";

// Map: [moduleIndex]-[lessonIndex] => { image, video }
export const vendasAulaAssets: Record<string, { image: string; video: string }> = {
  // Module 0: Mindset e Fundamentos
  "0-0": { image: aulaVenderCuidar, video: videoVenderCuidar },
  "0-1": { image: aulaEtica, video: videoEtica },
  "0-2": { image: aulaPerfil, video: videoPerfil },
  // Module 1: Técnicas de Comunicação e Rapport
  "1-0": { image: aulaPrimeiros30s, video: videoPrimeiros30s },
  "1-1": { image: aulaAutoridade, video: videoAutoridade },
  "1-2": { image: aulaComunicacao, video: videoComunicacao },
  // Module 2: Nossos Pacotes e Precificação
  "2-0": { image: aulaPacotes, video: videoPacotes },
  "2-1": { image: aulaAncoragem, video: videoAncoragem },
  "2-2": { image: aulaUpsell, video: videoUpsell },
  // Module 3: Objeções e Fechamento
  "3-0": { image: aulaObjecoes, video: videoObjecoes },
  "3-1": { image: aulaFechamento, video: videoFechamento },
  "3-2": { image: aulaFollowup, video: videoFollowup },
  // Module 4: Renovação e Retenção
  "4-0": { image: aulaAlerta, video: videoAlerta },
  "4-1": { image: aulaUpgrade, video: videoUpgrade },
  "4-2": { image: aulaMetasConversao, video: videoMetas },
  // Module 5: Indicadores e Melhoria Contínua
  "5-0": { image: aulaKpis, video: videoKpis },
  "5-1": { image: aulaPlanoAcao, video: videoPlanoAcao },
};
