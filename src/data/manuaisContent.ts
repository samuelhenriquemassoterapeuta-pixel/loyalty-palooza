import { 
  Sparkles, Calendar, ShoppingBag, Package, Send, Gift, Wallet, 
  Shield, Award, Heart, Target, Camera, Dumbbell, FileText,
  Bell, Smartphone, CreditCard, Users, Star, Clock,
  type LucideIcon
} from "lucide-react";

export interface ManualStep {
  text: string;
  screenshot?: string; // path to screenshot image
}

export interface ManualSubSection {
  title: string;
  steps: ManualStep[];
}

export interface ManualSection {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  content: ManualSubSection[];
}

export interface ManualFaq {
  question: string;
  answer: string;
}

export interface ManualData {
  id: string;
  title: string;
  subtitle: string;
  sections: ManualSection[];
  faq: ManualFaq[];
}

// ─── Manual do Usuário ───
export const manualUsuario: ManualData = {
  id: "usuario",
  title: "Manual do Usuário",
  subtitle: "Tudo que você precisa para aproveitar o Resinkra",
  sections: [
    {
      id: "inicio",
      icon: Sparkles,
      title: "Primeiros Passos",
      description: "Crie sua conta e configure seu perfil",
      color: "from-primary/20 to-primary/5",
      content: [
        {
          title: "Criando sua conta",
          steps: [
            { text: "Acesse a tela de login e clique em 'Criar conta'" },
            { text: "Preencha seu email e crie uma senha segura" },
            { text: "Confirme seu email clicando no link enviado" },
            { text: "Complete seu perfil com nome e telefone" },
          ],
        },
        {
          title: "Navegando pelo app",
          steps: [
            { text: "Use a barra inferior para navegar entre as seções principais" },
            { text: "O ícone de casa leva à página inicial com seu dashboard" },
            { text: "Acesse seu perfil clicando no ícone de engrenagem" },
            { text: "Veja suas notificações no ícone do sino" },
          ],
        },
      ],
    },
    {
      id: "agendamentos",
      icon: Calendar,
      title: "Agendamentos",
      description: "Agende, reagende e avalie suas sessões",
      color: "from-primary/20 to-accent/10",
      content: [
        {
          title: "Fazer um agendamento",
          steps: [
            { text: "Na tela inicial, toque em 'Agendar'" },
            { text: "Escolha o serviço desejado na lista" },
            { text: "Selecione o terapeuta de sua preferência (opcional)" },
            { text: "Escolha a data e horário disponível" },
            { text: "Confirme e aguarde a confirmação" },
          ],
        },
        {
          title: "Reagendar ou cancelar",
          steps: [
            { text: "Vá até seus agendamentos na página de agendamento" },
            { text: "Toque no agendamento que deseja alterar" },
            { text: "Use 'Reagendar' para trocar data/hora ou 'Cancelar'" },
            { text: "Cancelamentos devem ser feitos com 24h de antecedência" },
          ],
        },
        {
          title: "Avaliando o atendimento",
          steps: [
            { text: "Após a sessão, você receberá uma notificação para avaliar" },
            { text: "Dê uma nota de 1 a 5 estrelas e deixe um comentário" },
            { text: "Sua avaliação ajuda outros clientes e melhora o serviço" },
          ],
        },
      ],
    },
    {
      id: "loja",
      icon: ShoppingBag,
      title: "Loja",
      description: "Compre produtos com cashback",
      color: "from-accent/20 to-accent/5",
      content: [
        {
          title: "Comprando produtos",
          steps: [
            { text: "Acesse a Loja pelo menu inferior" },
            { text: "Navegue pelas categorias ou use a busca" },
            { text: "Toque no '+' para adicionar ao carrinho" },
            { text: "Finalize clicando em 'Reservar' no carrinho flutuante" },
          ],
        },
        {
          title: "Usando cashback na compra",
          steps: [
            { text: "No carrinho, ative 'Usar meu cashback'" },
            { text: "O valor será descontado automaticamente" },
            { text: "Você pode usar todo ou parte do saldo disponível" },
          ],
        },
      ],
    },
    {
      id: "cashback",
      icon: Wallet,
      title: "Cashback e Carteira",
      description: "Ganhe e use seu cashback",
      color: "from-highlight/20 to-highlight/5",
      content: [
        {
          title: "Como ganhar cashback",
          steps: [
            { text: "Cada compra gera um percentual de cashback automático" },
            { text: "O percentual varia conforme seu nível de fidelidade (tier)" },
            { text: "Indicações aprovadas também geram cashback" },
            { text: "Desafios concluídos podem dar bônus de cashback" },
          ],
        },
        {
          title: "Níveis de fidelidade",
          steps: [
            { text: "Bronze → Prata → Ouro → Diamante" },
            { text: "Acumule pontos com compras e atividades no app" },
            { text: "Cada nível oferece mais cashback e benefícios exclusivos" },
            { text: "Acompanhe seu progresso na tela de Cashback" },
          ],
        },
        {
          title: "Transferindo créditos",
          steps: [
            { text: "Toque em 'Transferir' na tela inicial" },
            { text: "Digite o email do destinatário" },
            { text: "Informe o valor e confirme a transferência" },
          ],
        },
      ],
    },
    {
      id: "indicacoes",
      icon: Gift,
      title: "Indicações",
      description: "Indique amigos e ganhe recompensas",
      color: "from-accent/20 to-highlight/10",
      content: [
        {
          title: "Como indicar",
          steps: [
            { text: "Acesse 'Indique e Ganhe' no menu" },
            { text: "Copie seu código exclusivo ou compartilhe via QR Code" },
            { text: "Envie para amigos via WhatsApp ou redes sociais" },
            { text: "Ganhe cashback quando seu amigo fizer a primeira compra" },
          ],
        },
      ],
    },
    {
      id: "protocolos",
      icon: FileText,
      title: "Protocolos de Tratamento",
      description: "Acompanhe sua evolução clínica",
      color: "from-info/20 to-info/5",
      content: [
        {
          title: "Ativando um protocolo",
          steps: [
            { text: "Acesse 'Protocolos' no menu" },
            { text: "Escolha o protocolo indicado pelo profissional" },
            { text: "Toque em 'Iniciar Protocolo' (requer plano ativo)" },
            { text: "Acompanhe seu progresso semanal no dashboard" },
          ],
        },
        {
          title: "Registrando medidas e evolução",
          steps: [
            { text: "Dentro do protocolo, acesse 'Ficha de Acompanhamento'" },
            { text: "Registre peso, medidas e escala de dor (EVA)" },
            { text: "Tire fotos de evolução (antes/durante/depois)" },
            { text: "Envie relatórios para seu terapeuta via WhatsApp" },
          ],
        },
      ],
    },
    {
      id: "alongamento",
      icon: Dumbbell,
      title: "Alongamento",
      description: "Exercícios e sessões guiadas",
      color: "from-green-500/20 to-green-500/5",
      content: [
        {
          title: "Realizando uma sessão",
          steps: [
            { text: "Acesse 'Alongamento' no menu" },
            { text: "Escolha um plano ou exercícios individuais" },
            { text: "Siga as instruções animadas de cada exercício" },
            { text: "Registre sua sessão para acompanhar o progresso" },
          ],
        },
      ],
    },
    {
      id: "conquistas",
      icon: Award,
      title: "Conquistas e Desafios",
      description: "Gamificação e recompensas",
      color: "from-warning/20 to-warning/5",
      content: [
        {
          title: "Sistema de XP e níveis",
          steps: [
            { text: "Ganhe XP ao fazer check-in, completar sessões e atingir metas" },
            { text: "Suba de nível para desbloquear recompensas exclusivas" },
            { text: "Acompanhe seu ranking entre os clientes" },
          ],
        },
        {
          title: "Desafios",
          steps: [
            { text: "Acesse a página de Desafios para ver os ativos" },
            { text: "Participe e acompanhe seu progresso" },
            { text: "Ao concluir, receba a recompensa automaticamente" },
          ],
        },
      ],
    },
    {
      id: "vale-presente",
      icon: Heart,
      title: "Vale Presente",
      description: "Presenteie quem você ama",
      color: "from-pink-500/20 to-pink-500/5",
      content: [
        {
          title: "Comprando um vale",
          steps: [
            { text: "Acesse 'Vale Presente' no menu" },
            { text: "Escolha entre vale monetário ou experiência" },
            { text: "Personalize: tema, mensagem e nome do destinatário" },
            { text: "Exporte o cartão visual ou compartilhe o QR Code" },
          ],
        },
        {
          title: "Resgatando um vale",
          steps: [
            { text: "Acesse 'Resgatar Vale' na página de Vale Presente" },
            { text: "Insira o código de 10 dígitos ou escaneie o QR Code" },
            { text: "O valor será creditado automaticamente na sua conta" },
          ],
        },
      ],
    },
    {
      id: "clube-vip",
      icon: Star,
      title: "Clube VIP",
      description: "Planos de assinatura com benefícios",
      color: "from-primary/20 to-accent/10",
      content: [
        {
          title: "Conhecendo os planos",
          steps: [
            { text: "Acesse 'Clube VIP' no menu" },
            { text: "Compare os planos disponíveis e seus benefícios" },
            { text: "Planos oferecem créditos mensais, cashback extra e prioridade" },
            { text: "Escolha o plano e confirme a assinatura" },
          ],
        },
      ],
    },
  ],
  faq: [
    { question: "Esqueci minha senha, o que faço?", answer: "Na tela de login, clique em 'Esqueci a senha'. Digite seu email e você receberá um link para criar uma nova senha." },
    { question: "Posso cancelar um agendamento?", answer: "Sim, com até 24h de antecedência. Cancelamentos em cima da hora podem ter penalidades." },
    { question: "Como funciona o cashback?", answer: "Você recebe um percentual de volta em cada compra. O valor fica disponível para usar em futuras compras ou agendamentos." },
    { question: "Meu pacote tem validade?", answer: "Sim, cada pacote tem validade. Verifique a data na tela de pacotes." },
    { question: "Como entro em contato com o suporte?", answer: "No perfil, acesse 'Ajuda' para contato via WhatsApp, email ou telefone." },
    { question: "O que são protocolos?", answer: "São programas de tratamento com acompanhamento de medidas, evolução fotográfica e orientações nutricionais. Requerem plano VIP ativo." },
    { question: "Posso usar o app offline?", answer: "O app precisa de conexão para funcionar, mas pode ser instalado como PWA para uma experiência nativa." },
  ],
};

// ─── Manual do Parceiro ───
export const manualParceiro: ManualData = {
  id: "parceiro",
  title: "Manual do Parceiro",
  subtitle: "Gerencie seus cupons, comissões e vendas",
  sections: [
    {
      id: "inicio-parceiro",
      icon: Sparkles,
      title: "Primeiros Passos",
      description: "Como funciona o programa de parceiros",
      color: "from-primary/20 to-primary/5",
      content: [
        {
          title: "Sobre o programa",
          steps: [
            { text: "Parceiros são profissionais ou empresas que indicam clientes à Resinkra" },
            { text: "Você recebe comissões sobre vendas realizadas com seus cupons" },
            { text: "O cadastro é feito pelo administrador — entre em contato para participar" },
            { text: "Após aprovação, acesse seu dashboard em 'Parceiro Dashboard'" },
          ],
        },
        {
          title: "Acessando seu dashboard",
          steps: [
            { text: "Faça login com a conta vinculada ao perfil de parceiro" },
            { text: "Acesse o menu e toque em 'Parceiro Dashboard'" },
            { text: "Visualize seus KPIs: vendas, comissões e ranking de faixa" },
          ],
        },
      ],
    },
    {
      id: "cupons-parceiro",
      icon: CreditCard,
      title: "Cupons de Desconto",
      description: "Crie e gerencie seus cupons",
      color: "from-accent/20 to-accent/5",
      content: [
        {
          title: "Criando um cupom",
          steps: [
            { text: "No dashboard, acesse a aba 'Meus Cupons'" },
            { text: "Toque em 'Novo Cupom' e defina o código" },
            { text: "Escolha o tipo: percentual (máx. 30%) ou fixo (máx. R$ 50)" },
            { text: "Defina validade, limite de usos e serviços aplicáveis" },
            { text: "Ative o cupom e compartilhe com seus seguidores" },
          ],
        },
        {
          title: "Regras dos cupons",
          steps: [
            { text: "Cupons não são válidos para compra de planos ou pacotes" },
            { text: "Cada uso gera uma comissão proporcional para você" },
            { text: "Acompanhe os usos em tempo real no dashboard" },
          ],
        },
      ],
    },
    {
      id: "comissoes",
      icon: Wallet,
      title: "Comissões",
      description: "Acompanhe seus ganhos",
      color: "from-highlight/20 to-highlight/5",
      content: [
        {
          title: "Faixas de comissão",
          steps: [
            { text: "Bronze → Prata → Ouro → Diamante" },
            { text: "Suba de faixa acumulando vendas realizadas" },
            { text: "Cada faixa oferece percentual de comissão maior" },
            { text: "Benefícios extras são desbloqueados em faixas superiores" },
          ],
        },
        {
          title: "Recebendo pagamentos",
          steps: [
            { text: "Comissões são calculadas automaticamente a cada venda" },
            { text: "O status muda de 'Pendente' para 'Pago' após processamento" },
            { text: "Consulte o histórico completo na aba 'Comissões'" },
          ],
        },
      ],
    },
    {
      id: "vales-parceiro",
      icon: Gift,
      title: "Vales Presente",
      description: "Venda vales para seus clientes",
      color: "from-pink-500/20 to-pink-500/5",
      content: [
        {
          title: "Criando vales como parceiro",
          steps: [
            { text: "No dashboard, acesse 'Meus Vales'" },
            { text: "Crie vales presente personalizados para seus clientes" },
            { text: "Os vales ficam vinculados ao seu perfil de parceiro" },
            { text: "Exporte os cartões visuais para compartilhar" },
          ],
        },
      ],
    },
    {
      id: "perfil-publico",
      icon: Users,
      title: "Perfil Público",
      description: "Sua página de parceiro verificado",
      color: "from-info/20 to-info/5",
      content: [
        {
          title: "Seu perfil público",
          steps: [
            { text: "Após verificação, seu perfil fica acessível via link público" },
            { text: "Clientes podem ver seus cupons ativos diretamente" },
            { text: "Personalize com logo, descrição e links de redes sociais" },
            { text: "Compartilhe o link do seu perfil nas suas redes" },
          ],
        },
      ],
    },
  ],
  faq: [
    { question: "Como me torno parceiro?", answer: "Entre em contato com a administração da Resinkra. O cadastro é feito manualmente após análise." },
    { question: "Qual o limite de desconto dos cupons?", answer: "Máximo de 30% (percentual) ou R$ 50,00 (fixo). Não válidos para planos ou pacotes." },
    { question: "Quando recebo minhas comissões?", answer: "Comissões são calculadas automaticamente. O pagamento é processado conforme o calendário definido pela administração." },
    { question: "Como subo de faixa?", answer: "Acumulando vendas através dos seus cupons. Cada faixa tem uma meta mínima de vendas." },
    { question: "Posso ter mais de um cupom ativo?", answer: "Sim, você pode criar quantos cupons quiser, cada um com configurações diferentes." },
  ],
};

// ─── Manual do Administrador ───
export const manualAdmin: ManualData = {
  id: "admin",
  title: "Manual do Administrador",
  subtitle: "Gerencie todo o sistema Resinkra",
  sections: [
    {
      id: "painel-geral",
      icon: Shield,
      title: "Painel Administrativo",
      description: "Visão geral e navegação",
      color: "from-primary/20 to-primary/5",
      content: [
        {
          title: "Acessando o painel",
          steps: [
            { text: "Faça login com conta de administrador" },
            { text: "Acesse /admin pelo menu lateral ou navegação" },
            { text: "O painel possui abas horizontais para cada módulo" },
            { text: "O Dashboard exibe KPIs de faturamento e engajamento" },
          ],
        },
      ],
    },
    {
      id: "agendamentos-admin",
      icon: Calendar,
      title: "Gestão de Agendamentos",
      description: "Monitore e edite agendamentos",
      color: "from-primary/20 to-accent/10",
      content: [
        {
          title: "Gerenciando agendamentos",
          steps: [
            { text: "Na aba 'Agendamentos', veja todos os agendamentos dos clientes" },
            { text: "Filtre por status: agendado, confirmado, concluído, cancelado" },
            { text: "Edite data, horário, terapeuta ou status de qualquer agendamento" },
            { text: "O nome do cliente é exibido automaticamente" },
          ],
        },
      ],
    },
    {
      id: "terapeutas-admin",
      icon: Users,
      title: "Gestão de Terapeutas",
      description: "Cadastre e gerencie profissionais",
      color: "from-accent/20 to-accent/5",
      content: [
        {
          title: "Cadastrando terapeutas",
          steps: [
            { text: "Na aba 'Terapeutas', toque em 'Novo Terapeuta'" },
            { text: "Preencha: nome, especialidade, email e telefone" },
            { text: "Adicione foto do profissional (opcional)" },
            { text: "Defina a disponibilidade (ativo/inativo)" },
          ],
        },
        {
          title: "Cartão de visita virtual",
          steps: [
            { text: "Cada terapeuta possui um cartão de visita acessível via /terapeuta/:id" },
            { text: "O cartão exibe foto, especialidade, avaliações e contato" },
            { text: "Compartilhe o link ou exporte o cartão visual" },
          ],
        },
      ],
    },
    {
      id: "protocolos-admin",
      icon: FileText,
      title: "Protocolos e Dietas",
      description: "Configure tratamentos e conteúdo nutricional",
      color: "from-info/20 to-info/5",
      content: [
        {
          title: "Gerenciando protocolos",
          steps: [
            { text: "Na aba 'Protocolos', crie ou edite programas de tratamento" },
            { text: "Defina nome, tipo, duração em semanas e sessões por semana" },
            { text: "Adicione seções clínicas com orientações detalhadas" },
            { text: "Associe conteúdos de dieta específicos ao protocolo" },
          ],
        },
        {
          title: "Conteúdo de dietas",
          steps: [
            { text: "Na aba 'Dietas / Conteúdo', gerencie orientações nutricionais" },
            { text: "Organize por categoria e vincule a protocolos específicos" },
            { text: "O conteúdo aparece automaticamente para pacientes no protocolo" },
          ],
        },
      ],
    },
    {
      id: "financeiro-admin",
      icon: CreditCard,
      title: "Financeiro",
      description: "Dashboard de faturamento e métricas",
      color: "from-highlight/20 to-highlight/5",
      content: [
        {
          title: "Análise financeira",
          steps: [
            { text: "Acesse a aba 'Financeiro' para ver KPIs de faturamento" },
            { text: "Visualize gráficos de vendas por período" },
            { text: "Acompanhe taxa de cashback distribuído vs. utilizado" },
            { text: "Monitore receita de pacotes, loja e vales presente" },
          ],
        },
      ],
    },
    {
      id: "parceiros-admin",
      icon: Users,
      title: "Gestão de Parceiros",
      description: "Cadastre e monitore parceiros",
      color: "from-warning/20 to-warning/5",
      content: [
        {
          title: "Cadastrando parceiros",
          steps: [
            { text: "Na aba 'Parceiros', toque em 'Novo Parceiro'" },
            { text: "Vincule a um usuário existente pelo user_id" },
            { text: "Defina slug, segmento e informações comerciais" },
            { text: "Verifique o parceiro para ativar o perfil público" },
          ],
        },
        {
          title: "Monitorando comissões",
          steps: [
            { text: "Visualize comissões pendentes e pagas por parceiro" },
            { text: "Gerencie faixas de comissão (Bronze, Prata, Ouro, Diamante)" },
            { text: "Atualize o status de pagamento das comissões" },
          ],
        },
      ],
    },
    {
      id: "desafios-admin",
      icon: Target,
      title: "Desafios e Gamificação",
      description: "Crie desafios e recompensas",
      color: "from-green-500/20 to-green-500/5",
      content: [
        {
          title: "Criando desafios",
          steps: [
            { text: "Na aba 'Desafios', toque em 'Novo Desafio'" },
            { text: "Defina título, meta (sessões, check-ins, etc.) e recompensa" },
            { text: "Configure período de validade (início e fim)" },
            { text: "Ative o desafio — usuários verão automaticamente" },
          ],
        },
      ],
    },
    {
      id: "social-admin",
      icon: Camera,
      title: "Social Moments",
      description: "Aprove posts de clientes",
      color: "from-pink-500/20 to-pink-500/5",
      content: [
        {
          title: "Gerenciando posts",
          steps: [
            { text: "Na aba 'Social Moments', veja posts pendentes de aprovação" },
            { text: "Analise o screenshot e link do post do cliente" },
            { text: "Aprove para creditar cashback e XP automaticamente" },
            { text: "Rejeite com motivo se o post não atender aos critérios" },
          ],
        },
      ],
    },
    {
      id: "empresas-admin",
      icon: Shield,
      title: "Empresas (B2B)",
      description: "Gerencie contas corporativas",
      color: "from-primary/20 to-accent/10",
      content: [
        {
          title: "Cadastrando empresas",
          steps: [
            { text: "Na aba 'Empresas', cadastre clientes corporativos" },
            { text: "Defina CNPJ, contato, plano QVT e valor mensal" },
            { text: "Vincule colaboradores à empresa" },
            { text: "Acompanhe o uso via Dashboard RH" },
          ],
        },
      ],
    },
    {
      id: "vales-admin",
      icon: Gift,
      title: "Vales Presente",
      description: "Gerencie todos os vales do sistema",
      color: "from-accent/20 to-highlight/10",
      content: [
        {
          title: "Administrando vales",
          steps: [
            { text: "Na aba 'Vales Presente', veja todos os vales emitidos" },
            { text: "Filtre por status: ativo, usado, expirado" },
            { text: "Vales expirados são processados automaticamente diariamente" },
            { text: "Crie vales manualmente se necessário" },
          ],
        },
      ],
    },
    {
      id: "landing-admin",
      icon: Smartphone,
      title: "Landing Page",
      description: "Configure a página institucional",
      color: "from-info/20 to-info/5",
      content: [
        {
          title: "Editando conteúdo da landing",
          steps: [
            { text: "Na aba 'Landing Page', edite seções da página institucional" },
            { text: "Configure textos, imagens e informações de contato" },
            { text: "Alterações são refletidas imediatamente na página /site" },
          ],
        },
      ],
    },
  ],
  faq: [
    { question: "Como adiciono um novo administrador?", answer: "Insira o user_id na tabela user_roles com role 'admin'. Isso deve ser feito via backend por segurança." },
    { question: "Como gero relatórios financeiros?", answer: "Acesse a aba 'Financeiro' no painel admin para visualizar KPIs e gráficos de faturamento." },
    { question: "Os dados dos terapeutas ficam expostos?", answer: "Não. Email e telefone são restritos ao painel admin. Usuários comuns veem apenas nome, foto e especialidade via função segura." },
    { question: "Como configuro as faixas de comissão?", answer: "Na aba 'Parceiros', acesse a seção de faixas para definir percentuais, metas e benefícios por nível." },
    { question: "Como funciona a expiração de vales?", answer: "Uma função automática roda diariamente verificando validade e notificando sobre vales próximos do vencimento." },
  ],
};
