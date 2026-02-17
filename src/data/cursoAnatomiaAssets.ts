// Imagens placeholder — os assets serão gerados/adicionados conforme necessário
// Usando a mesma imagem de capa como fallback para módulos sem asset dedicado
import capaAnatomia from "@/assets/cursos/capa-anatomia.jpg";

export interface AulaAsset {
  image: string;
  video: string;
}

// Chave: "moduloIndex-aulaIndex"
// Assets serão adicionados conforme disponibilidade de imagens/vídeos para cada aula
export const anatomiaAulaAssets: Record<string, AulaAsset> = {};
