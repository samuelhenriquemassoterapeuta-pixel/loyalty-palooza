/**
 * Generates a comprehensive Markdown document cataloging all images and videos
 * across the platform — both static assets (src/assets, public/) and dynamic
 * media managed via Supabase Storage buckets.
 */
export function generateMediaMarkdown(): string {
  return `# 📸 Catálogo Completo de Imagens e Vídeos da Plataforma

> Documento gerado automaticamente — Inventário de todos os ativos visuais e audiovisuais.

---

## 📊 Resumo Geral

| Categoria | Imagens | Vídeos | Total |
|---|---|---|---|
| Cursos (aulas) | 128 | 128 | 256 |
| Cursos (capas) | 18 | 5 | 23 |
| Corporativo | 13 | 5 | 18 |
| Terapias | 14 | 0 | 14 |
| Hero Options | 12 | 0 | 12 |
| Head Spa | 5 | 0 | 5 |
| Educativo | 5 | 0 | 5 |
| Landing | 4 | 0 | 4 |
| Protocolos | 3 | 0 | 3 |
| Icons | 5 | 0 | 5 |
| Raiz (logos/selos) | 12 | 0 | 12 |
| Public (PWA/OG) | 6 | 0 | 6 |
| **Storage Buckets** | **Dinâmico** | **Dinâmico** | **11 buckets** |
| **Total Estático** | **~225** | **~138** | **~363** |

---

## 1. 🎓 Cursos — Capas

Diretório: \`src/assets/cursos/\`

| Arquivo | Formato | Curso |
|---|---|---|
| capa-anatomia.jpg | JPG | Anatomia Aplicada |
| capa-aromaterapia.jpg | JPG | Aromaterapia Clínica |
| capa-bandagem-elastica.jpg | JPG | Bandagem Elástica |
| capa-cursos-hub.jpg | JPG | Hub de Cursos |
| capa-difusor-ambientes.jpg | JPG | Difusor de Ambientes |
| capa-drenagem-linfatica.jpg | JPG | Drenagem Linfática |
| capa-facespa.jpg | JPG | Face Spa / Yügen |
| capa-fitoterapia.jpg | JPG | Fitoterapia |
| capa-gastronomia-saudavel.jpg | JPG | Gastronomia Saudável |
| capa-headspa.jpg | JPG | Head Spa Coreano |
| capa-massagem-modeladora.jpg | JPG | Massagem Modeladora |
| capa-metodo-resinkra.jpg | JPG | Método Resinkra |
| capa-oleos-essenciais.jpg | JPG | Óleos Essenciais |
| capa-perfumaria.jpg | JPG | Perfumaria |
| capa-saboaria-artesanal.jpg | JPG | Saboaria Artesanal |
| capa-seitai.jpg | JPG | Seitai |
| capa-velas-aromaticas.jpg | JPG | Velas Aromáticas |
| capa-vendas.jpg | JPG | Vendas & Gestão |

### Vídeos Introdutórios dos Cursos

| Arquivo | Formato |
|---|---|
| video-anatomia.mp4 | MP4 |
| video-aromaterapia.mp4 | MP4 |
| video-facespa.mp4 | MP4 |
| video-headspa.mp4 | MP4 |
| video-vendas.mp4 | MP4 |

---

## 2. 🎓 Cursos — Aulas por Módulo

### 2.1 Anatomia Aplicada
Diretório: \`src/assets/cursos/anatomia/\`
- **17 imagens** (aula-*.jpg): articulacoes, avaliacao-postural, cardiovascular, dermatomos, esqueleto-apendicular, esqueleto-axial, fisiologia-muscular, linfatico, musculos-cabeca-pescoco, musculos-membros, musculos-tronco, organizacao-corpo, patologias, pele-tegumentar, posicao-anatomica, protocolos, sistema-nervoso
- **17 vídeos** (video-*.mp4): correspondentes a cada aula

### 2.2 Aromaterapia Clínica
Diretório: \`src/assets/cursos/aromaterapia/\`
- **29 imagens** (aula-*.jpg): animais, anti-estresse, aromatouch-ciencia, aromatouch-passo, aromatouch-pratica, blends-parte1/2/3, cptg-doterra, digestao-detox, diy-artesanal, dor-inflamacao, dores-musculares, empreendedorismo, estudos-casos, headspa-aromaterapia, imunidade, integracao-massagem, kit-clinica, negocio-doterra, oleos-essenciais, piramide-bem-estar, quimica-avancada, quiz-certificacao, relaxamento, seguranca, sono-insonia, triade-essencial, vendas-script
- **29 vídeos** (video-*.mp4): correspondentes a cada aula

### 2.3 Yügen Face Spa
Diretório: \`src/assets/cursos/facespa/\`
- **15 imagens** (aula-*.jpg): contraindicacoes, ferramentas, fidelizacao, historia-oriental, kobido-protocolo, marketing-digital, musculos-faciais, oleos-produtos, precificacao, preparacao-limpeza, protocolo-yugen, protocolos-pele, qi-meridianos, yugen-intro, zonas-reflexas
- **15 vídeos** (video-*.mp4): correspondentes a cada aula

### 2.4 Head Spa Coreano
Diretório: \`src/assets/cursos/headspa/\`
- **24 imagens** (aula-*.jpg): agua-gaseificada, anatomia-couro, biosseguranca, biotipos-diagnostico, etapa1-analise, etapa2-limpeza, etapa4-nutricao, etapa5-aromaterapia, etica-profissional, evidencias-cientificas, fundamentos-headspa, ingredientes-kbeauty, japonesa-vs-coreana, marcas-produtos, marketing-captacao, montando-espaco, precificacao-pacotes, protocolos-sazonais, publicos-especiais, quando-usar-cada, queda-avancado, tecnicas-shiatsu, tematico-experiencial, tendencias-2025
- **24 vídeos** (video-*.mp4): correspondentes a cada aula

### 2.5 Método Resinkra
Diretório: \`src/assets/cursos/resinkra/\`
- **24 imagens** (aula-*.jpg): adaptacoes-perfil, avaliacao-visual, cadeias-musculares, casos-clinicos, cervical-cranio, comunicacao-nao-verbal, costas-coluna, cotovelos-antebraco, dualidade-dor, ergonomia, fascias-trigger, graduacao-pressao, mapa-tensoes, membros, musculoesqueletico, origem-metodo, polegares-dedos, presenca-intuicao, principios, raiz-dor, respiracao, sessao-completa, transicao-pratica, velocidade
- **24 vídeos** (video-*.mp4): correspondentes a cada aula

### 2.6 Vendas & Gestão
Diretório: \`src/assets/cursos/vendas/\`
- **26 imagens** (aula-*.jpg): alerta-saldo, ancoragem, automacao-mensagens, autoridade, comunicacao-empatica, conteudo-atrai, crm-terapeutas, etica-profissional, fechamento, followup-whatsapp, indicacoes-parcerias, kpis, lgpd-conformidade, lideranca-gestao, metas-conversao, objecoes, pacotes, perfil-cliente, planejamento-estrategico, plano-acao, presenca-digital, primeiros-30s, recrutamento-equipe, upgrade, upsell, vender-cuidar
- **26 vídeos** (video-*.mp4): correspondentes a cada aula

---

## 3. 🏢 Corporativo

Diretório: \`src/assets/corporativo/\`

### Imagens de Benefícios
| Arquivo | Descrição |
|---|---|
| beneficio-afastamentos.jpg | Redução de afastamentos |
| beneficio-estresse.jpg | Gestão do estresse |
| beneficio-nr17.jpg | Conformidade NR-17 |
| beneficio-produtividade.jpg | Aumento de produtividade |
| beneficio-satisfacao.jpg | Satisfação dos colaboradores |
| beneficio-saude.jpg | Saúde corporativa |
| empresas-internacionais.jpg | Empresas internacionais |

### Imagens de Eventos
| Arquivo | Descrição |
|---|---|
| evento-casamento.jpg | Evento casamento |
| evento-convencao.jpg | Convenção corporativa |
| evento-debutante.jpg | Festa de debutante |
| evento-esportivo.jpg | Evento esportivo |
| evento-formatura.jpg | Formatura |
| evento-qvt.jpg | Qualidade de Vida no Trabalho |
| evento-sipat.jpg | SIPAT |

### Vídeos Corporativos
| Arquivo | Descrição |
|---|---|
| video-bem-estar.mp4 | Bem-estar corporativo |
| video-casamento.mp4 | Evento casamento |
| video-debutante.mp4 | Festa de debutante |
| video-esportivo.mp4 | Evento esportivo |
| video-formatura.mp4 | Formatura |

---

## 4. 💆 Terapias

Diretório: \`src/assets/terapias/\`

| Arquivo | Terapia |
|---|---|
| aromaterapia.jpg | Aromaterapia |
| drenagem-linfatica.jpg | Drenagem Linfática |
| dry-needling.jpg | Dry Needling |
| head-spa-coreano.jpg | Head Spa Coreano |
| kinesio-taping.jpg | Kinesio Taping |
| liberacao-miofascial.jpg | Liberação Miofascial |
| limpeza-de-pele.jpg | Limpeza de Pele |
| massagem-abhyanga.jpg | Massagem Abhyanga |
| massagem-modeladora.jpg | Massagem Modeladora |
| massagem-relaxante.jpg | Massagem Relaxante |
| reflexologia-podal.jpg | Reflexologia Podal |
| seitai-new-seitai.jpg | Seitai |
| yugen-facespa.jpg | Yügen Face Spa |

> Arquivo de índice: \`index.ts\` — exporta mapeamento por nome

---

## 5. 🌅 Hero Options

Diretório: \`src/assets/hero-options/\`

| Arquivo | Tipo | Descrição |
|---|---|---|
| hero-spa-1.jpg | JPG | Opção hero 1 |
| hero-spa-2.jpg | JPG | Opção hero 2 |
| hero-spa-4.jpg | JPG | Opção hero 4 |
| hero-spa-5.jpg | JPG | Opção hero 5 |
| hero-spa-6.jpg | JPG | Opção hero 6 |
| hero-spa-7.jpg | JPG | Opção hero 7 |
| hero-spa-8.jpg | JPG | Opção hero 8 |
| hero-spa-10.jpg | JPG | Opção hero 10 |
| hero-spa-11.jpg | JPG | Opção hero 11 |
| hero-spa-resinkra.jpg | JPG | Hero Resinkra |
| contato-bg.jpg | JPG | Background contato |
| simbolo-opcao-1.png | PNG | Símbolo alternativo 1 |
| simbolo-opcao-2.png | PNG | Símbolo alternativo 2 |
| simbolo-opcao-3.png | PNG | Símbolo alternativo 3 |
| simbolo-opcao-4.png | PNG | Símbolo alternativo 4 |

---

## 6. 🧖 Head Spa

Diretório: \`src/assets/headspa/\`

| Arquivo | Descrição |
|---|---|
| analise-couro.jpg | Análise do couro cabeludo |
| aromaterapia-vapor.jpg | Aromaterapia com vapor |
| limpeza-profunda.jpg | Limpeza profunda |
| massagem-terapeutica.jpg | Massagem terapêutica |
| tratamentos-nutritivos.jpg | Tratamentos nutritivos |

---

## 7. 📚 Educativo

Diretório: \`src/assets/educativo/\`

| Arquivo | Descrição |
|---|---|
| anatomia-linfatica.jpg | Anatomia do sistema linfático |
| automassagem-abdomen.jpg | Automassagem abdominal |
| drenagem-bracos.jpg | Técnica de drenagem braços |
| drenagem-pernas.jpg | Técnica de drenagem pernas |
| drenagem-rosto.jpg | Técnica de drenagem rosto |

---

## 8. 🏠 Landing Page

Diretório: \`src/assets/landing/\`

| Arquivo | Seção |
|---|---|
| depoimentos-banner.jpg | Banner de depoimentos |
| pacotes-banner.jpg | Banner de pacotes |
| servicos-banner.jpg | Banner de serviços |
| sobre-banner.jpg | Banner sobre nós |

---

## 9. 🩺 Protocolos

Diretório: \`src/assets/protocolos/\`

| Arquivo | Protocolo |
|---|---|
| alongamento-hero.jpg | Alongamento |
| drenagem-hero.jpg | Drenagem |
| postural-hero.jpg | Avaliação Postural |

---

## 10. 🎨 Ícones & Navegação

Diretório: \`src/assets/icons/\`

| Arquivo | Uso |
|---|---|
| agendar-icon.png | Botão agendar (original) |
| agendar-icon-new.png | Botão agendar (novo) |
| historico-icon.png | Botão histórico |
| loja-icon.png | Botão loja |
| transferir-icon.png | Botão transferir |

---

## 11. 🔖 Logos, Selos & Identidade Visual

Diretório: \`src/assets/\` (raiz)

| Arquivo | Tipo | Descrição |
|---|---|---|
| resinkra-logo.png | PNG | Logo principal Resinkra |
| logo-branco.png | PNG | Logo branca (fundo escuro) |
| logo-marrom.png | PNG | Logo marrom (fundo claro) |
| simbolo-marrom.png | PNG | Símbolo isolado (marrom) |
| simbolo-verde.png | PNG | Símbolo isolado (verde) |
| icone-flor.png | PNG | Ícone flor decorativo |
| selo-completo.png | PNG | Selo de qualidade completo |
| resinks-coin.png | PNG | Moeda Resinks (cashback) |
| avatar-instrutora.png | PNG | Avatar da instrutora |
| hero-bg.jpg | JPG | Background hero principal |
| home-bg.jpg | JPG | Background home |
| agendamento-bg.jpg | JPG | Background agendamento |
| corporativo-hero.jpg | JPG | Hero corporativo |
| headspa-hero.jpg | JPG | Hero head spa |

---

## 12. 🖼️ Materiais Gráficos (Layouts)

Diretório: \`src/assets/\` (raiz)

| Arquivo | Material |
|---|---|
| layout-cartao-digital.jpg | Cartão de Visita Digital |
| layout-catalogo.jpg | Catálogo de Serviços |
| layout-deck-b2b.jpg | Deck Comercial B2B |
| layout-folder-frente.jpg | Folder Institucional (frente) |
| layout-folder-verso.jpg | Folder Institucional (verso) |
| layout-trifold.jpg | Trifold |

---

## 13. 🌐 Public (PWA & SEO)

Diretório: \`public/\`

| Arquivo | Uso |
|---|---|
| favicon.ico | Favicon (ICO) |
| favicon.png | Favicon (PNG) |
| og-image.png | OpenGraph / Social Share |
| placeholder.svg | Placeholder genérico |
| pwa-192x192.png | Ícone PWA 192px |
| pwa-512x512.png | Ícone PWA 512px |

---

## 14. ☁️ Storage Buckets (Mídia Dinâmica)

Mídia gerenciada pelo backend via Supabase Storage.

| Bucket | Descrição | Acesso | Conteúdo |
|---|---|---|---|
| \`avatars\` | Fotos de perfil | 🌐 Público | Avatares dos usuários |
| \`fotos-evolucao\` | Fotos de tratamento | 🔒 URLs assinadas (1h) | Before/after de sessões |
| \`avaliacoes-posturais\` | Fotos posturais | 🔒 Privado | Anterior, posterior, laterais |
| \`exercise-videos\` | Vídeos de exercícios | 🌐 Público | Alongamentos e exercícios |
| \`social-posts\` | Posts Resinkra Moments | 🔒 Privado | Stories, Reels, Feed |
| \`exames-arquivos\` | Exames do paciente | 🔒 Privado | PDFs, imagens de exames |
| \`admin-uploads\` | Uploads administrativos | 🌐 Público | Mídia genérica do admin |
| \`corporativo-media\` | Mídia corporativa | 🌐 Público | Logos, fotos de empresas |
| \`landing-media\` | Mídia da landing page | 🌐 Público | Banners, fotos das seções |
| \`headspa-imagens\` | Imagens head spa | 🌐 Público | Fotos de tratamentos |
| \`servico-imagens\` | Imagens de serviços | 🌐 Público | Galerias de cada serviço |

### Padrão de Upload (código)

\`\`\`typescript
// Upload para bucket
const { data } = await supabase.storage
  .from('admin-uploads')
  .upload(\`images/\${fileName}\`, file, { upsert: true });

// URL pública
const { data: { publicUrl } } = supabase.storage
  .from('admin-uploads')
  .getPublicUrl(filePath);

// URL assinada (privado, 1h)
const { data: { signedUrl } } = await supabase.storage
  .from('fotos-evolucao')
  .createSignedUrl(filePath, 3600);
\`\`\`

---

## 15. 📐 Convenções de Nomenclatura

| Padrão | Exemplo | Uso |
|---|---|---|
| \`capa-{curso}.jpg\` | capa-headspa.jpg | Capas de cursos |
| \`aula-{tema}.jpg\` | aula-biosseguranca.jpg | Thumbnails de aulas |
| \`video-{tema}.mp4\` | video-biosseguranca.mp4 | Vídeos de aulas |
| \`beneficio-{nome}.jpg\` | beneficio-estresse.jpg | Imagens corporativas |
| \`evento-{tipo}.jpg\` | evento-casamento.jpg | Fotos de eventos |
| \`layout-{material}.jpg\` | layout-catalogo.jpg | Layouts gráficos |
| \`hero-spa-{n}.jpg\` | hero-spa-5.jpg | Opções de hero |
| \`logo-{cor}.png\` | logo-branco.png | Variantes do logo |
| \`simbolo-{cor}.png\` | simbolo-verde.png | Variantes do símbolo |

---

*Documento gerado automaticamente — Total estimado: ~363 arquivos estáticos + mídia dinâmica em 11 buckets.*
`;
}
