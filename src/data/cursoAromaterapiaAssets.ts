// Images for each lesson
import aulaOleosEssenciais from "@/assets/cursos/aromaterapia/aula-oleos-essenciais.jpg";
import aulaCptgDoterra from "@/assets/cursos/aromaterapia/aula-cptg-doterra.jpg";
import aulaSeguranca from "@/assets/cursos/aromaterapia/aula-seguranca.jpg";
import aulaTriadeEssencial from "@/assets/cursos/aromaterapia/aula-triade-essencial.jpg";
import aulaImunidade from "@/assets/cursos/aromaterapia/aula-imunidade.jpg";
import aulaRelaxamento from "@/assets/cursos/aromaterapia/aula-relaxamento.jpg";
import aulaDorInflamacao from "@/assets/cursos/aromaterapia/aula-dor-inflamacao.jpg";
import aulaAntiEstresse from "@/assets/cursos/aromaterapia/aula-anti-estresse.jpg";
import aulaDoresMusculares from "@/assets/cursos/aromaterapia/aula-dores-musculares.jpg";
import aulaSonoInsonia from "@/assets/cursos/aromaterapia/aula-sono-insonia.jpg";
import aulaDigestaoDetox from "@/assets/cursos/aromaterapia/aula-digestao-detox.jpg";
import aulaBlendsParte1 from "@/assets/cursos/aromaterapia/aula-blends-parte1.jpg";
import aulaBlendsParte2 from "@/assets/cursos/aromaterapia/aula-blends-parte2.jpg";
import aulaBlendsParte3 from "@/assets/cursos/aromaterapia/aula-blends-parte3.jpg";
import aulaKitClinica from "@/assets/cursos/aromaterapia/aula-kit-clinica.jpg";
import aulaIntegracaoMassagem from "@/assets/cursos/aromaterapia/aula-integracao-massagem.jpg";
import aulaHeadspaAromaterapia from "@/assets/cursos/aromaterapia/aula-headspa-aromaterapia.jpg";
import aulaNegocioDoterra from "@/assets/cursos/aromaterapia/aula-negocio-doterra.jpg";
import aulaVendasScript from "@/assets/cursos/aromaterapia/aula-vendas-script.jpg";
import aulaQuizCertificacao from "@/assets/cursos/aromaterapia/aula-quiz-certificacao.jpg";

// Videos for each lesson
import videoOleosEssenciais from "@/assets/cursos/aromaterapia/video-oleos-essenciais.mp4";
import videoCptg from "@/assets/cursos/aromaterapia/video-cptg.mp4";
import videoSeguranca from "@/assets/cursos/aromaterapia/video-seguranca.mp4";
import videoTriade from "@/assets/cursos/aromaterapia/video-triade.mp4";
import videoImunidade from "@/assets/cursos/aromaterapia/video-imunidade.mp4";
import videoRelaxamento from "@/assets/cursos/aromaterapia/video-relaxamento.mp4";
import videoDor from "@/assets/cursos/aromaterapia/video-dor.mp4";
import videoAntiEstresse from "@/assets/cursos/aromaterapia/video-anti-estresse.mp4";
import videoDoresMusculares from "@/assets/cursos/aromaterapia/video-dores-musculares.mp4";
import videoSono from "@/assets/cursos/aromaterapia/video-sono.mp4";
import videoDetox from "@/assets/cursos/aromaterapia/video-detox.mp4";
import videoBlends1 from "@/assets/cursos/aromaterapia/video-blends1.mp4";
import videoBlends2 from "@/assets/cursos/aromaterapia/video-blends2.mp4";
import videoBlends3 from "@/assets/cursos/aromaterapia/video-blends3.mp4";
import videoKitClinica from "@/assets/cursos/aromaterapia/video-kit-clinica.mp4";
import videoIntegracao from "@/assets/cursos/aromaterapia/video-integracao.mp4";
import videoHeadspa from "@/assets/cursos/aromaterapia/video-headspa.mp4";
import videoNegocio from "@/assets/cursos/aromaterapia/video-negocio.mp4";
import videoVendas from "@/assets/cursos/aromaterapia/video-vendas.mp4";
import videoCertificacao from "@/assets/cursos/aromaterapia/video-certificacao.mp4";

// Map: [moduleIndex]-[lessonIndex] => { image, video }
export const aromaterapiaAulaAssets: Record<string, { image: string; video: string }> = {
  // Module 0: Fundamentos da Aromaterapia
  "0-0": { image: aulaOleosEssenciais, video: videoOleosEssenciais },
  "0-1": { image: aulaCptgDoterra, video: videoCptg },
  "0-2": { image: aulaSeguranca, video: videoSeguranca },
  // Module 1: Os 15 Óleos Essenciais Populares
  "1-0": { image: aulaTriadeEssencial, video: videoTriade },
  "1-1": { image: aulaImunidade, video: videoImunidade },
  "1-2": { image: aulaRelaxamento, video: videoRelaxamento },
  "1-3": { image: aulaDorInflamacao, video: videoDor },
  // Module 2: Protocolos Terapêuticos com Óleos
  "2-0": { image: aulaAntiEstresse, video: videoAntiEstresse },
  "2-1": { image: aulaDoresMusculares, video: videoDoresMusculares },
  "2-2": { image: aulaSonoInsonia, video: videoSono },
  "2-3": { image: aulaDigestaoDetox, video: videoDetox },
  // Module 3: Blends doTERRA Prontos
  "3-0": { image: aulaBlendsParte1, video: videoBlends1 },
  "3-1": { image: aulaBlendsParte2, video: videoBlends2 },
  "3-2": { image: aulaBlendsParte3, video: videoBlends3 },
  // Module 4: Aromaterapia na Massoterapia Profissional
  "4-0": { image: aulaKitClinica, video: videoKitClinica },
  "4-1": { image: aulaIntegracaoMassagem, video: videoIntegracao },
  "4-2": { image: aulaHeadspaAromaterapia, video: videoHeadspa },
  // Module 5: Vendas e Negócios com Óleos
  "5-0": { image: aulaNegocioDoterra, video: videoNegocio },
  "5-1": { image: aulaVendasScript, video: videoVendas },
  "5-2": { image: aulaQuizCertificacao, video: videoCertificacao },
};
