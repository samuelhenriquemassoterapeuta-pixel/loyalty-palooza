// Images for each lesson
import aulaOleosEssenciais from "@/assets/cursos/aromaterapia/aula-oleos-essenciais.jpg";
import aulaCptgDoterra from "@/assets/cursos/aromaterapia/aula-cptg-doterra.jpg";
import aulaSeguranca from "@/assets/cursos/aromaterapia/aula-seguranca.jpg";
import aulaTriadeEssencial from "@/assets/cursos/aromaterapia/aula-triade-essencial.jpg";
import aulaImunidade from "@/assets/cursos/aromaterapia/aula-imunidade.jpg";
import aulaRelaxamento from "@/assets/cursos/aromaterapia/aula-relaxamento.jpg";
import aulaDorInflamacao from "@/assets/cursos/aromaterapia/aula-dor-inflamacao.jpg";
import aulaAntiEstresse from "@/assets/cursos/aromaterapia/aula-anti-estresse.jpg";
import aulaAromatouchCiencia from "@/assets/cursos/aromaterapia/aula-aromatouch-ciencia.jpg";
import aulaAromatouchPasso from "@/assets/cursos/aromaterapia/aula-aromatouch-passo.jpg";
import aulaAnimais from "@/assets/cursos/aromaterapia/aula-animais.jpg";
import aulaDiyArtesanal from "@/assets/cursos/aromaterapia/aula-diy-artesanal.jpg";
import aulaPiramideBemEstar from "@/assets/cursos/aromaterapia/aula-piramide-bem-estar.jpg";
import aulaEstudosCasos from "@/assets/cursos/aromaterapia/aula-estudos-casos.jpg";
import aulaIntegracaoMassagem from "@/assets/cursos/aromaterapia/aula-integracao-massagem.jpg";
import aulaNegocioDoterra from "@/assets/cursos/aromaterapia/aula-negocio-doterra.jpg";
import aulaVendasScript from "@/assets/cursos/aromaterapia/aula-vendas-script.jpg";
import aulaQuimicaAvancada from "@/assets/cursos/aromaterapia/aula-quimica-avancada.jpg";

// Videos for each lesson
import videoOleosEssenciais from "@/assets/cursos/aromaterapia/video-oleos-essenciais.mp4";
import videoCptg from "@/assets/cursos/aromaterapia/video-cptg.mp4";
import videoSeguranca from "@/assets/cursos/aromaterapia/video-seguranca.mp4";
import videoTriade from "@/assets/cursos/aromaterapia/video-triade.mp4";
import videoImunidade from "@/assets/cursos/aromaterapia/video-imunidade.mp4";
import videoRelaxamento from "@/assets/cursos/aromaterapia/video-relaxamento.mp4";
import videoDor from "@/assets/cursos/aromaterapia/video-dor.mp4";
import videoAntiEstresse from "@/assets/cursos/aromaterapia/video-anti-estresse.mp4";
import videoAromatouchCiencia from "@/assets/cursos/aromaterapia/video-aromatouch-ciencia.mp4";
import videoAromatouchPasso from "@/assets/cursos/aromaterapia/video-aromatouch-passo.mp4";
import videoAnimais from "@/assets/cursos/aromaterapia/video-animais.mp4";
import videoDiyArtesanal from "@/assets/cursos/aromaterapia/video-diy-artesanal.mp4";
import videoPiramideBemEstar from "@/assets/cursos/aromaterapia/video-piramide-bem-estar.mp4";
import videoEstudosCasos from "@/assets/cursos/aromaterapia/video-estudos-casos.mp4";
import videoIntegracao from "@/assets/cursos/aromaterapia/video-integracao.mp4";
import videoNegocio from "@/assets/cursos/aromaterapia/video-negocio.mp4";
import videoVendas from "@/assets/cursos/aromaterapia/video-vendas.mp4";
import videoQuimicaAvancada from "@/assets/cursos/aromaterapia/video-quimica-avancada.mp4";

// Map: [moduleIndex]-[lessonIndex] => { image, video }
// New structure: 4 modules, 18 lessons total
export const aromaterapiaAulaAssets: Record<string, { image: string; video: string }> = {
  // Module 0: Fundação (5 aulas)
  "0-0": { image: aulaOleosEssenciais, video: videoOleosEssenciais },   // História e Origens
  "0-1": { image: aulaQuimicaAvancada, video: videoQuimicaAvancada },   // O que São OE
  "0-2": { image: aulaRelaxamento, video: videoRelaxamento },           // Ciência do Aroma
  "0-3": { image: aulaCptgDoterra, video: videoCptg },                  // Qualidade CPTG
  "0-4": { image: aulaSeguranca, video: videoSeguranca },               // Segurança

  // Module 1: Explorando os Óleos (4 aulas)
  "1-0": { image: aulaTriadeEssencial, video: videoTriade },            // Classificação Química
  "1-1": { image: aulaImunidade, video: videoImunidade },               // Perfil dos Óleos
  "1-2": { image: aulaDorInflamacao, video: videoDor },                 // Aplicação por Sistemas
  "1-3": { image: aulaAntiEstresse, video: videoAntiEstresse },         // Protocolos Práticos

  // Module 2: Técnicas Avançadas (4 aulas)
  "2-0": { image: aulaIntegracaoMassagem, video: videoIntegracao },     // Métodos de Aplicação
  "2-1": { image: aulaAromatouchCiencia, video: videoAromatouchCiencia }, // AromaTouch®
  "2-2": { image: aulaAnimais, video: videoAnimais },                   // Públicos Específicos
  "2-3": { image: aulaDiyArtesanal, video: videoDiyArtesanal },         // Receitas DIY

  // Module 3: Profissionalização (5 aulas)
  "3-0": { image: aulaPiramideBemEstar, video: videoPiramideBemEstar }, // Pirâmide do Bem-Estar
  "3-1": { image: aulaEstudosCasos, video: videoEstudosCasos },         // Estudos Científicos
  "3-2": { image: aulaAromatouchPasso, video: videoAromatouchPasso },   // Ética Profissional
  "3-3": { image: aulaNegocioDoterra, video: videoNegocio },            // Modelos de Negócio
  "3-4": { image: aulaVendasScript, video: videoVendas },               // Marketing
};
