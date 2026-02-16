// Images for each lesson
import aulaFundamentos from "@/assets/cursos/headspa/aula-fundamentos-headspa.jpg";
import aulaAnatomia from "@/assets/cursos/headspa/aula-anatomia-couro.jpg";
import aulaBiotipos from "@/assets/cursos/headspa/aula-biotipos-diagnostico.jpg";
import aulaEtapa1 from "@/assets/cursos/headspa/aula-etapa1-analise.jpg";
import aulaEtapa2 from "@/assets/cursos/headspa/aula-etapa2-limpeza.jpg";
import aulaEtapa3 from "@/assets/headspa/massagem-terapeutica.jpg";
import aulaEtapa4 from "@/assets/cursos/headspa/aula-etapa4-nutricao.jpg";
import aulaEtapa5 from "@/assets/cursos/headspa/aula-etapa5-aromaterapia.jpg";
import aulaIngredientes from "@/assets/cursos/headspa/aula-ingredientes-kbeauty.jpg";
import aulaSazonais from "@/assets/cursos/headspa/aula-protocolos-sazonais.jpg";
import aulaMarcas from "@/assets/cursos/headspa/aula-marcas-produtos.jpg";
import aulaTendencias from "@/assets/cursos/headspa/aula-tendencias-2025.jpg";
import aulaTematico from "@/assets/cursos/headspa/aula-tematico-experiencial.jpg";
import aulaPrecificacao from "@/assets/cursos/headspa/aula-precificacao-pacotes.jpg";
import aulaMarketing from "@/assets/cursos/headspa/aula-marketing-captacao.jpg";
import aulaEspaco from "@/assets/cursos/headspa/aula-montando-espaco.jpg";
// Module 6 (index 6): Escola Japonesa vs Coreana
import aulaJaponesaVsCoreana from "@/assets/cursos/headspa/aula-japonesa-vs-coreana.jpg";
import aulaTecnicasShiatsu from "@/assets/cursos/headspa/aula-tecnicas-shiatsu.jpg";
import aulaQuandoUsarCada from "@/assets/cursos/headspa/aula-quando-usar-cada.jpg";
// Module 7 (index 7): Protocolos Avançados
import aulaQuedaAvancado from "@/assets/cursos/headspa/aula-queda-avancado.jpg";
import aulaPublicosEspeciais from "@/assets/cursos/headspa/aula-publicos-especiais.jpg";
import aulaAguaGaseificada from "@/assets/cursos/headspa/aula-agua-gaseificada.jpg";
// Module 8 (index 8): Evidências e Biossegurança
import aulaEvidenciasCientificas from "@/assets/cursos/headspa/aula-evidencias-cientificas.jpg";
import aulaBiosseguranca from "@/assets/cursos/headspa/aula-biosseguranca.jpg";
import aulaEticaProfissional from "@/assets/cursos/headspa/aula-etica-profissional.jpg";

// Videos for each lesson
import videoFundamentos from "@/assets/cursos/headspa/video-fundamentos.mp4";
import videoAnatomia from "@/assets/cursos/headspa/video-anatomia.mp4";
import videoAnalise from "@/assets/cursos/headspa/video-analise.mp4";
import videoLimpeza from "@/assets/cursos/headspa/video-limpeza.mp4";
import videoMassagem from "@/assets/cursos/headspa/video-massagem.mp4";
import videoNutricao from "@/assets/cursos/headspa/video-nutricao.mp4";
import videoAromaterapia from "@/assets/cursos/headspa/video-aromaterapia.mp4";
import videoIngredientes from "@/assets/cursos/headspa/video-ingredientes.mp4";
import videoSazonais from "@/assets/cursos/headspa/video-sazonais.mp4";
import videoMarcas from "@/assets/cursos/headspa/video-marcas.mp4";
import videoTendencias from "@/assets/cursos/headspa/video-tendencias.mp4";
import videoTematico from "@/assets/cursos/headspa/video-tematico.mp4";
import videoPrecificacao from "@/assets/cursos/headspa/video-precificacao.mp4";
import videoMarketing from "@/assets/cursos/headspa/video-marketing.mp4";
import videoEspaco from "@/assets/cursos/headspa/video-espaco.mp4";
// New module videos
import videoJaponesaVsCoreana from "@/assets/cursos/headspa/video-japonesa-vs-coreana.mp4";
import videoTecnicasShiatsu from "@/assets/cursos/headspa/video-tecnicas-shiatsu.mp4";
import videoQuandoUsarCada from "@/assets/cursos/headspa/video-quando-usar-cada.mp4";
import videoQuedaAvancado from "@/assets/cursos/headspa/video-queda-avancado.mp4";
import videoPublicosEspeciais from "@/assets/cursos/headspa/video-publicos-especiais.mp4";
import videoAguaGaseificada from "@/assets/cursos/headspa/video-agua-gaseificada.mp4";
import videoEvidenciasCientificas from "@/assets/cursos/headspa/video-evidencias-cientificas.mp4";
import videoBiosseguranca from "@/assets/cursos/headspa/video-biosseguranca.mp4";
import videoEticaProfissional from "@/assets/cursos/headspa/video-etica-profissional.mp4";

// Map: [moduleIndex][lessonIndex] => { image, video }
export const headSpaAulaAssets: Record<string, { image: string; video: string }> = {
  // Module 0: Fundamentos
  "0-0": { image: aulaFundamentos, video: videoFundamentos },
  "0-1": { image: aulaAnatomia, video: videoAnatomia },
  "0-2": { image: aulaBiotipos, video: videoFundamentos },
  // Module 1: Protocolos Técnicos
  "1-0": { image: aulaEtapa1, video: videoAnalise },
  "1-1": { image: aulaEtapa2, video: videoLimpeza },
  "1-2": { image: aulaEtapa3, video: videoMassagem },
  "1-3": { image: aulaEtapa4, video: videoNutricao },
  "1-4": { image: aulaEtapa5, video: videoAromaterapia },
  // Module 2: Ingredientes K-Beauty
  "2-0": { image: aulaIngredientes, video: videoIngredientes },
  "2-1": { image: aulaSazonais, video: videoSazonais },
  "2-2": { image: aulaMarcas, video: videoMarcas },
  // Module 3: Tendências
  "3-0": { image: aulaTendencias, video: videoTendencias },
  "3-1": { image: aulaTematico, video: videoTematico },
  // Module 4: Negócios
  "4-0": { image: aulaPrecificacao, video: videoPrecificacao },
  "4-1": { image: aulaMarketing, video: videoMarketing },
  "4-2": { image: aulaEspaco, video: videoEspaco },
  // Module 5: Prática e Certificação (existing)
  "5-0": { image: aulaEspaco, video: videoEspaco },
  "5-1": { image: aulaFundamentos, video: videoFundamentos },
  // Module 6: Escola Japonesa vs Coreana
  "6-0": { image: aulaJaponesaVsCoreana, video: videoJaponesaVsCoreana },
  "6-1": { image: aulaTecnicasShiatsu, video: videoTecnicasShiatsu },
  "6-2": { image: aulaQuandoUsarCada, video: videoQuandoUsarCada },
  // Module 7: Protocolos Avançados
  "7-0": { image: aulaQuedaAvancado, video: videoQuedaAvancado },
  "7-1": { image: aulaPublicosEspeciais, video: videoPublicosEspeciais },
  "7-2": { image: aulaAguaGaseificada, video: videoAguaGaseificada },
  // Module 8: Evidências e Biossegurança
  "8-0": { image: aulaEvidenciasCientificas, video: videoEvidenciasCientificas },
  "8-1": { image: aulaBiosseguranca, video: videoBiosseguranca },
  "8-2": { image: aulaEticaProfissional, video: videoEticaProfissional },
};
