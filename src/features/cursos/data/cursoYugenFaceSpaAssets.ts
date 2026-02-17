// Images for each lesson
import aulaYugenIntro from "@/assets/cursos/facespa/aula-yugen-intro.jpg";
import aulaHistoria from "@/assets/cursos/facespa/aula-historia-oriental.jpg";
import aulaQiMeridianos from "@/assets/cursos/facespa/aula-qi-meridianos.jpg";
import aulaMusculosFaciais from "@/assets/cursos/facespa/aula-musculos-faciais.jpg";
import aulaZonasReflexas from "@/assets/cursos/facespa/aula-zonas-reflexas.jpg";
import aulaFerramentas from "@/assets/cursos/facespa/aula-ferramentas.jpg";
import aulaOleosProdutos from "@/assets/cursos/facespa/aula-oleos-produtos.jpg";
import aulaPreparacaoLimpeza from "@/assets/cursos/facespa/aula-preparacao-limpeza.jpg";
import aulaKobidoProtocolo from "@/assets/cursos/facespa/aula-kobido-protocolo.jpg";
import aulaContraindicacoes from "@/assets/cursos/facespa/aula-contraindicacoes.jpg";
import aulaProtocoloYugen from "@/assets/cursos/facespa/aula-protocolo-yugen.jpg";
import aulaProtocolosPele from "@/assets/cursos/facespa/aula-protocolos-pele.jpg";
import aulaPrecificacao from "@/assets/cursos/facespa/aula-precificacao.jpg";
import aulaMarketingDigital from "@/assets/cursos/facespa/aula-marketing-digital.jpg";
import aulaFidelizacao from "@/assets/cursos/facespa/aula-fidelizacao.jpg";

// Videos for each lesson
import videoYugenIntro from "@/assets/cursos/facespa/video-yugen-intro.mp4";
import videoHistoria from "@/assets/cursos/facespa/video-historia.mp4";
import videoQiMeridianos from "@/assets/cursos/facespa/video-qi-meridianos.mp4";
import videoMusculos from "@/assets/cursos/facespa/video-musculos.mp4";
import videoZonasReflexas from "@/assets/cursos/facespa/video-zonas-reflexas.mp4";
import videoFerramentas from "@/assets/cursos/facespa/video-ferramentas.mp4";
import videoOleos from "@/assets/cursos/facespa/video-oleos.mp4";
import videoPreparacao from "@/assets/cursos/facespa/video-preparacao.mp4";
import videoKobido from "@/assets/cursos/facespa/video-kobido.mp4";
import videoContraindicacoes from "@/assets/cursos/facespa/video-contraindicacoes.mp4";
import videoProtocoloYugen from "@/assets/cursos/facespa/video-protocolo-yugen.mp4";
import videoProtocolosPele from "@/assets/cursos/facespa/video-protocolos-pele.mp4";
import videoPrecificacao from "@/assets/cursos/facespa/video-precificacao.mp4";
import videoMarketing from "@/assets/cursos/facespa/video-marketing.mp4";
import videoFidelizacao from "@/assets/cursos/facespa/video-fidelizacao.mp4";

// Map: [moduleIndex]-[lessonIndex] => { image, video }
export const faceSpaAulaAssets: Record<string, { image: string; video: string }> = {
  // Module 0: Fundação & Filosofia Oriental (4 aulas)
  "0-0": { image: aulaYugenIntro, video: videoYugenIntro },
  "0-1": { image: aulaHistoria, video: videoHistoria },
  "0-2": { image: aulaQiMeridianos, video: videoQiMeridianos },
  "0-3": { image: aulaFerramentas, video: videoFerramentas },
  // Module 1: Anatomia Facial Energética (3 aulas)
  "1-0": { image: aulaMusculosFaciais, video: videoMusculos },
  "1-1": { image: aulaZonasReflexas, video: videoZonasReflexas },
  "1-2": { image: aulaContraindicacoes, video: videoContraindicacoes },
  // Module 2: Kobido — Massagem Facial Japonesa (3 aulas)
  "2-0": { image: aulaPreparacaoLimpeza, video: videoPreparacao },
  "2-1": { image: aulaKobidoProtocolo, video: videoKobido },
  "2-2": { image: aulaProtocolosPele, video: videoProtocolosPele },
  // Module 3: Técnica Yūgen Japan + Gua Sha (4 aulas)
  "3-0": { image: aulaProtocoloYugen, video: videoProtocoloYugen },
  "3-1": { image: aulaYugenIntro, video: videoYugenIntro },
  "3-2": { image: aulaOleosProdutos, video: videoOleos },
  "3-3": { image: aulaProtocolosPele, video: videoProtocolosPele },
  // Module 4: Produtos, Ferramentas & Óleos (3 aulas)
  "4-0": { image: aulaOleosProdutos, video: videoOleos },
  "4-1": { image: aulaFerramentas, video: videoFerramentas },
  "4-2": { image: aulaPrecificacao, video: videoPrecificacao },
  // Module 5: Omotenashi, Negócios & Certificação (3 aulas)
  "5-0": { image: aulaFidelizacao, video: videoFidelizacao },
  "5-1": { image: aulaPrecificacao, video: videoPrecificacao },
  "5-2": { image: aulaMarketingDigital, video: videoMarketing },
};
