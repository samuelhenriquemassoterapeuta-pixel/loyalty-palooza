// Imagens
import imgPosicaoAnatomica from "@/assets/cursos/anatomia/aula-posicao-anatomica.jpg";
import imgOrganizacaoCorpo from "@/assets/cursos/anatomia/aula-organizacao-corpo.jpg";
import imgPeleTegumentar from "@/assets/cursos/anatomia/aula-pele-tegumentar.jpg";
import imgEsqueletoAxial from "@/assets/cursos/anatomia/aula-esqueleto-axial.jpg";
import imgEsqueletoApendicular from "@/assets/cursos/anatomia/aula-esqueleto-apendicular.jpg";
import imgArticulacoes from "@/assets/cursos/anatomia/aula-articulacoes.jpg";
import imgFisiologiaMuscular from "@/assets/cursos/anatomia/aula-fisiologia-muscular.jpg";
import imgMusculosCabeca from "@/assets/cursos/anatomia/aula-musculos-cabeca-pescoco.jpg";
import imgMusculosTronco from "@/assets/cursos/anatomia/aula-musculos-tronco.jpg";
import imgMusculosMembros from "@/assets/cursos/anatomia/aula-musculos-membros.jpg";
import imgSistemaNervoso from "@/assets/cursos/anatomia/aula-sistema-nervoso.jpg";
import imgDermatomos from "@/assets/cursos/anatomia/aula-dermatomos.jpg";
import imgCardiovascular from "@/assets/cursos/anatomia/aula-cardiovascular.jpg";
import imgLinfatico from "@/assets/cursos/anatomia/aula-linfatico.jpg";
import imgAvaliacaoPostural from "@/assets/cursos/anatomia/aula-avaliacao-postural.jpg";
import imgPatologias from "@/assets/cursos/anatomia/aula-patologias.jpg";
import imgProtocolos from "@/assets/cursos/anatomia/aula-protocolos.jpg";

// Vídeos
import vidPosicaoAnatomica from "@/assets/cursos/anatomia/video-posicao-anatomica.mp4";
import vidOrganizacaoCorpo from "@/assets/cursos/anatomia/video-organizacao-corpo.mp4";
import vidPeleTegumentar from "@/assets/cursos/anatomia/video-pele-tegumentar.mp4";
import vidEsqueletoAxial from "@/assets/cursos/anatomia/video-esqueleto-axial.mp4";
import vidEsqueletoApendicular from "@/assets/cursos/anatomia/video-esqueleto-apendicular.mp4";
import vidArticulacoes from "@/assets/cursos/anatomia/video-articulacoes.mp4";
import vidFisiologiaMuscular from "@/assets/cursos/anatomia/video-fisiologia-muscular.mp4";
import vidMusculosCabeca from "@/assets/cursos/anatomia/video-musculos-cabeca.mp4";
import vidMusculosTronco from "@/assets/cursos/anatomia/video-musculos-tronco.mp4";
import vidMusculosMembros from "@/assets/cursos/anatomia/video-musculos-membros.mp4";
import vidSistemaNervoso from "@/assets/cursos/anatomia/video-sistema-nervoso.mp4";
import vidDermatomos from "@/assets/cursos/anatomia/video-dermatomos.mp4";
import vidCardiovascular from "@/assets/cursos/anatomia/video-cardiovascular.mp4";
import vidLinfatico from "@/assets/cursos/anatomia/video-linfatico.mp4";
import vidAvaliacaoPostural from "@/assets/cursos/anatomia/video-avaliacao-postural.mp4";
import vidPatologias from "@/assets/cursos/anatomia/video-patologias.mp4";
import vidProtocolos from "@/assets/cursos/anatomia/video-protocolos.mp4";

export interface AulaAsset {
  image: string;
  video: string;
}

// Chave: "moduloIndex-aulaIndex"
export const anatomiaAulaAssets: Record<string, AulaAsset> = {
  // Módulo 0: Introdução à Anatomia Humana
  "0-0": { image: imgPosicaoAnatomica, video: vidPosicaoAnatomica },
  "0-1": { image: imgOrganizacaoCorpo, video: vidOrganizacaoCorpo },
  "0-2": { image: imgPeleTegumentar, video: vidPeleTegumentar },

  // Módulo 1: Sistema Esquelético
  "1-0": { image: imgEsqueletoAxial, video: vidEsqueletoAxial },
  "1-1": { image: imgEsqueletoApendicular, video: vidEsqueletoApendicular },
  "1-2": { image: imgArticulacoes, video: vidArticulacoes },

  // Módulo 2: Sistema Muscular
  "2-0": { image: imgFisiologiaMuscular, video: vidFisiologiaMuscular },
  "2-1": { image: imgMusculosCabeca, video: vidMusculosCabeca },
  "2-2": { image: imgMusculosTronco, video: vidMusculosTronco },
  "2-3": { image: imgMusculosMembros, video: vidMusculosMembros },

  // Módulo 3: Sistema Nervoso
  "3-0": { image: imgSistemaNervoso, video: vidSistemaNervoso },
  "3-1": { image: imgDermatomos, video: vidDermatomos },

  // Módulo 4: Sistema Circulatório e Linfático
  "4-0": { image: imgCardiovascular, video: vidCardiovascular },
  "4-1": { image: imgLinfatico, video: vidLinfatico },

  // Módulo 5: Anatomia Aplicada à Prática Clínica
  "5-0": { image: imgAvaliacaoPostural, video: vidAvaliacaoPostural },
  "5-1": { image: imgPatologias, video: vidPatologias },
  "5-2": { image: imgProtocolos, video: vidProtocolos },
};
