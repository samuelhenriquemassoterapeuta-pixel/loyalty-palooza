import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  FolderTree,
  Plug,
  FileCode,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Server,
  Shield,
  Layers,
  Terminal,
  BookOpen,
  KeyRound,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";

const CodeBlock = ({ code, language = "typescript", title }: { code: string; language?: string; title?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Código copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <FileCode size={14} />
            {title}
          </span>
          <Badge variant="secondary" className="text-[10px]">{language}</Badge>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 text-xs overflow-x-auto bg-card text-foreground leading-relaxed">
          <code>{code}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7"
          onClick={handleCopy}
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        </Button>
      </div>
    </div>
  );
};

const CollapsibleSection = ({
  title,
  icon: Icon,
  badge,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left">
          <Icon size={18} className="text-primary shrink-0" />
          <span className="font-medium text-sm flex-1">{title}</span>
          {badge && <Badge variant="secondary" className="text-[10px]">{badge}</Badge>}
          {open ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronRight size={16} className="text-muted-foreground" />}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-9 pr-3 pb-3 space-y-3">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// === PROJECT STRUCTURE ===
const ProjectStructureSection = () => (
  <div className="space-y-3">
    <CollapsibleSection title="Estrutura do Projeto (Feature Folders)" icon={FolderTree} badge="React + Vite" defaultOpen>
      <CodeBlock
        language="text"
        title="Árvore de diretórios — src/"
        code={`src/
├── assets/                        # Imagens e mídia
├── components/
│   ├── ui/                        # Shadcn/UI components
│   ├── home/                      # Dashboard do usuário
│   ├── AnimatedRoutes.tsx          # Lazy loading de rotas
│   ├── ProtectedRoute.tsx          # RBAC frontend
│   ├── BottomNavigation.tsx        # Nav mobile
│   └── DesktopSidebar.tsx          # Nav desktop
├── contexts/
│   └── AuthContext.tsx             # Autenticação global
├── features/                      # ⭐ FEATURE FOLDERS (domínios)
│   ├── admin/                     # Painel administrativo
│   │   ├── components/            # 39+ componentes (CRUD, tabs)
│   │   ├── hooks/                 # useAdmin, useAuditLogs
│   │   └── pages/                 # Admin.tsx
│   ├── agendamentos/              # Fluxo de agendamento
│   │   ├── components/            # ServicoSelector, TerapeutaSelector...
│   │   ├── hooks/                 # useAgendamentos, useListaEspera...
│   │   └── pages/                 # Agendamento.tsx, Checkin.tsx
│   ├── alongamento/               # Exercícios e pausas posturais
│   │   ├── components/            # ExercicioCard, SessaoPlayer...
│   │   ├── hooks/                 # useAlongamento, usePausasPosturais...
│   │   └── pages/                 # Alongamento.tsx
│   ├── avaliacao-postural/        # Avaliação postural
│   │   ├── components/            # AngleCharts, MeasurementLayer...
│   │   ├── hooks/                 # useAvaliacaoPostural, useAngleHistory...
│   │   └── pages/                 # AvaliacaoPostural.tsx
│   ├── cashback/                  # Sistema de cashback/wallet
│   │   ├── components/            # BalanceCard, TierCelebration...
│   │   ├── hooks/                 # useTransacoes, useUserTier...
│   │   └── pages/                 # Cashback.tsx, Wallet.tsx
│   ├── conquistas/                # Gamificação e ranking
│   │   ├── components/            # AchievementCard, RankingList...
│   │   ├── hooks/                 # useAchievements, useRanking...
│   │   └── pages/                 # Conquistas.tsx
│   ├── corporativo/               # Página B2B corporativa
│   ├── cupom/                     # Editor de cupons
│   ├── cursos/                    # Conteúdo educacional (17 cursos)
│   ├── dietas/                    # Planos nutricionais
│   ├── guia-clinico/              # Guia clínico
│   ├── landing/                   # Landing page pública
│   ├── loja/                      # E-commerce de produtos
│   ├── pagamento/                 # Integração Asaas
│   ├── profile/                   # Perfil do usuário
│   ├── protocolos/                # Protocolos terapêuticos
│   ├── resinkra-ai/               # IA para criação de conteúdo
│   ├── social/                    # Resinkra Moments (social proof)
│   ├── terapeuta/                 # Dashboard terapeuta
│   ├── terapias/                  # Catálogo de terapias
│   └── vale-presente/             # Sistema de vales presente
├── integrations/supabase/         # Cliente e tipos (auto-gerado)
├── pages/                         # Páginas restantes (Index, etc.)
└── App.tsx                        # Router principal

supabase/
├── functions/                     # 24 Edge Functions (Deno)
│   ├── asaas-*/                   # Integração pagamentos Asaas
│   ├── enviar-whatsapp/           # API Z-API WhatsApp
│   ├── fetch-google-ads/          # Google Ads metrics
│   ├── generate-*/                # IA (scripts, hooks, ideias)
│   └── chat-assistente/           # Assistente IA
└── migrations/                    # Migrações SQL`}
      />
    </CollapsibleSection>

    <CollapsibleSection title="Stack Tecnológica" icon={Layers} badge="12 libs core">
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "React 18", desc: "UI Framework" },
          { name: "TypeScript", desc: "Type Safety" },
          { name: "Vite", desc: "Build Tool" },
          { name: "Tailwind CSS", desc: "Styling" },
          { name: "Shadcn/UI", desc: "Components" },
          { name: "Framer Motion", desc: "Animations" },
          { name: "TanStack Query", desc: "Data Fetching" },
          { name: "React Router", desc: "Routing" },
          { name: "React Hook Form", desc: "Forms" },
          { name: "Zod", desc: "Validation" },
          { name: "Recharts", desc: "Charts" },
          { name: "Capacitor", desc: "Mobile (Android/iOS)" },
        ].map((tech) => (
          <div key={tech.name} className="p-2 rounded-md bg-muted/50 text-xs">
            <span className="font-medium text-foreground">{tech.name}</span>
            <span className="text-muted-foreground ml-1">— {tech.desc}</span>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  </div>
);

// === SOURCE CODE SNIPPETS ===
const SourceCodeSection = () => (
  <div className="space-y-3">
    <CollapsibleSection title="Autenticação (AuthContext)" icon={Shield} defaultOpen>
      <CodeBlock
        title="src/contexts/AuthContext.tsx"
        code={`// Context de autenticação global
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, nome) => {
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { nome } }
    });
    return { error };
  };
};`}
      />
    </CollapsibleSection>

    <CollapsibleSection title="Controle de Acesso (RBAC)" icon={Shield}>
      <CodeBlock
        title="src/features/admin/hooks/useAdmin.ts"
        code={`// Hook para verificar se o usuário é admin
export const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) { setIsAdmin(false); return; }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    };
    checkAdmin();
  }, [user]);

  return { isAdmin };
};`}
      />
      <CodeBlock
        title="src/components/ProtectedRoute.tsx"
        code={`// Rota protegida com controle de papéis
<ProtectedRoute allowRoles={['admin']}>
  <Admin />
</ProtectedRoute>

<ProtectedRoute allowRoles={['admin', 'terapeuta']}>
  <Cursos />
</ProtectedRoute>`}
      />
    </CollapsibleSection>

    <CollapsibleSection title="Cashback & Gamificação" icon={Code2}>
      <CodeBlock
        title="Sistema de Tiers (Bronze → Prata → Ouro)"
        code={`// Função SQL: get_user_tier(user_id)
// Calcula tier baseado no gasto total do usuário
// Bronze: < R$ 200 (1x multiplicador)
// Prata:  R$ 200+ (1.5x multiplicador)
// Ouro:   R$ 500+ (2x multiplicador)

// Triggers automáticos:
// → credit_cashback_on_order()     — cashback em pedidos
// → credit_cashback_on_agendamento() — cashback em sessões
// → process_referral_on_first_purchase() — indicações
// → credit_desafio_reward()        — desafios concluídos
// → credit_social_post_reward()    — posts aprovados`}
      />
    </CollapsibleSection>

    <CollapsibleSection title="Hooks Personalizados" icon={Code2}>
      <CodeBlock
        title="Exemplos de hooks utilizados"
        code={`// Data fetching com TanStack Query
const { data, isLoading } = useQuery({
  queryKey: ['produtos'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('disponivel', true)
      .order('nome');
    if (error) throw error;
    return data;
  }
});

// Mutations com invalidação automática
const mutation = useMutation({
  mutationFn: async (newItem) => {
    const { error } = await supabase
      .from('produtos')
      .insert(newItem);
    if (error) throw error;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['produtos'] });
    toast.success('Produto criado!');
  }
});`}
      />
    </CollapsibleSection>
  </div>
);

// === DATABASE / SQL ===
const DatabaseSection = () => (
  <div className="space-y-3">
    <CollapsibleSection title="Tabelas Principais" icon={Database} badge="95+ tabelas" defaultOpen>
      <div className="grid grid-cols-1 gap-2 text-xs">
        {[
          { group: "Usuários & Auth", tables: "profiles, user_roles, roles, login_attempts, audit_logs" },
          { group: "Permissões (RBAC)", tables: "permissions, role_permissions, user_permissions_mv (cache)" },
          { group: "Serviços", tables: "servicos, servicos_detalhes, agendamentos, terapeutas" },
          { group: "Produtos", tables: "produtos, pedidos, pedido_itens, pacotes, pacotes_usuario" },
          { group: "Financeiro", tables: "transacoes, indicacoes, vale_presentes, pagamentos_asaas, cupons" },
          { group: "Gamificação", tables: "desafios, desafio_participantes, checkins, conquistas" },
          { group: "Saúde", tables: "protocolos, usuario_protocolos, fichas_acompanhamento, avaliacoes_posturais" },
          { group: "Nutrição", tables: "planos_dieta, diario_alimentar, ficha_nutricional, dietas_conteudo" },
          { group: "Educação", tables: "curso_modulos, curso_aulas, curso_progresso" },
          { group: "Social", tables: "social_posts, social_posts_config, notificacoes, banners_promocionais" },
          { group: "Corporativo", tables: "empresas_corporativas, colaboradores_empresa, corporativo_*" },
          { group: "Marketing", tables: "campanhas_marketing, google_ads_metrics, landing_config" },
          { group: "Parceiros", tables: "parceiros, parceiro_cupons, parceiro_comissoes, parceiro_faixas_comissao" },
        ].map((g) => (
          <div key={g.group} className="p-2 rounded-md bg-muted/30">
            <span className="font-semibold text-primary">{g.group}:</span>{" "}
            <span className="text-muted-foreground">{g.tables}</span>
          </div>
        ))}
      </div>
    </CollapsibleSection>

    <CollapsibleSection title="Sistema de Permissões Granular" icon={KeyRound} badge="Novo">
      <CodeBlock
        title="Estrutura de Permissões (roles → permissions)"
        language="sql"
        code={`-- Tabela de roles (mapeia enum app_role)
-- roles: admin, user, terapeuta, parceiro

-- Tabela de permissões (30 permissões)
-- Ex: (resource: 'appointments', action: 'create')
-- Ex: (resource: 'admin', action: 'access')

-- Relação N:N: role_permissions
-- Admin: 30 permissões (todas)
-- User: 21 permissões (básicas)
-- Terapeuta: 13 permissões (clínicas + cursos)
-- Parceiro: 4 permissões (loja + cashback)

-- Cache via Materialized View: user_permissions_mv
-- Auto-refresh via triggers em user_roles e role_permissions

-- Funções helper:
SELECT * FROM get_user_permissions('user-uuid');
SELECT has_permission('user-uuid', 'admin', 'access');
SELECT has_role('user-uuid', 'admin');`}
      />
      <div className="grid grid-cols-2 gap-2 text-xs">
        {[
          { module: "admin", perms: 1 },
          { module: "appointments", perms: 4 },
          { module: "exercises", perms: 3 },
          { module: "cashback", perms: 3 },
          { module: "courses", perms: 4 },
          { module: "diets", perms: 2 },
          { module: "store", perms: 2 },
          { module: "protocols", perms: 2 },
          { module: "ai", perms: 2 },
          { module: "social", perms: 4 },
          { module: "gift_card", perms: 3 },
        ].map((m) => (
          <div key={m.module} className="flex items-center justify-between p-2 rounded-md bg-muted/30">
            <span className="font-mono text-foreground">{m.module}</span>
            <Badge variant="secondary" className="text-[10px]">{m.perms} ações</Badge>
          </div>
        ))}
      </div>
    </CollapsibleSection>

    <CollapsibleSection title="Funções SQL (Triggers & RPC)" icon={Terminal} badge="27+ funções">
      <CodeBlock
        title="Trigger: Cashback automático em pedidos"
        language="sql"
        code={`CREATE OR REPLACE FUNCTION credit_cashback_on_order()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  total_cashback NUMERIC := 0;
  item RECORD;
  v_multiplier NUMERIC := 1.0;
BEGIN
  SELECT gt.tier_multiplier INTO v_multiplier
  FROM get_user_tier(NEW.user_id) gt;

  FOR item IN 
    SELECT pi.quantidade, pi.preco_unitario,
           COALESCE(p.cashback_percentual, 0) as cashback_pct
    FROM pedido_itens pi
    JOIN produtos p ON p.id = pi.produto_id
    WHERE pi.pedido_id = NEW.id
  LOOP
    total_cashback := total_cashback + 
      (item.preco_unitario * item.quantidade * item.cashback_pct / 100);
  END LOOP;

  total_cashback := ROUND(total_cashback * v_multiplier, 2);

  IF total_cashback > 0 THEN
    INSERT INTO transacoes (user_id, tipo, valor, descricao, expira_em)
    VALUES (NEW.user_id, 'cashback', total_cashback,
      'Cashback do pedido #' || LEFT(NEW.id::text, 8),
      now() + INTERVAL '90 days');
  END IF;
  RETURN NEW;
END; $$;`}
      />

      <CodeBlock
        title="Funções de RBAC e Permissões"
        language="sql"
        code={`-- Verificar papel do usuário
CREATE OR REPLACE FUNCTION has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Verificar permissão granular
CREATE OR REPLACE FUNCTION has_permission(
  p_user_id UUID, p_resource TEXT, p_action TEXT
) RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_permissions_mv
    WHERE user_id = p_user_id
      AND resource = p_resource AND action = p_action
  )
$$;

-- Listar permissões do usuário
CREATE OR REPLACE FUNCTION get_user_permissions(p_user_id UUID)
RETURNS TABLE(resource TEXT, action TEXT) AS $$
  SELECT upm.resource, upm.action
  FROM user_permissions_mv upm
  WHERE upm.user_id = p_user_id;
$$;`}
      />

      <CodeBlock
        title="Trigger: Proteção de dados sensíveis"
        language="sql"
        code={`-- Valida que clientes só podem debitar cashback
CREATE OR REPLACE FUNCTION validate_transaction_insert()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN NEW; END IF;
  IF NEW.tipo = 'uso_cashback' AND NEW.valor < 0 THEN RETURN NEW; END IF;
  RAISE EXCEPTION 'Operação não permitida';
END; $$;

-- Proteção de código de indicação
CREATE OR REPLACE FUNCTION protect_referral_code()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF OLD.codigo_indicacao IS NOT NULL 
     AND NEW.codigo_indicacao IS DISTINCT FROM OLD.codigo_indicacao THEN
    NEW.codigo_indicacao := OLD.codigo_indicacao;
  END IF;
  RETURN NEW;
END; $$;`}
      />
    </CollapsibleSection>

    <CollapsibleSection title="Políticas RLS (Row Level Security)" icon={Shield} badge="262+ políticas">
      <CodeBlock
        title="Exemplos de políticas de segurança"
        language="sql"
        code={`-- Usuários só veem seus próprios dados
CREATE POLICY "Users see own data"
ON profiles FOR SELECT TO authenticated
USING (auth.uid() = id);

-- Bloquear acesso anônimo a dados sensíveis
CREATE POLICY "Block anon access"
ON profiles FOR ALL TO anon
USING (false) WITH CHECK (false);

-- Admins podem gerenciar tudo
CREATE POLICY "Admins manage servicos"
ON servicos FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Terapeutas veem apenas seus agendamentos
CREATE POLICY "Terapeutas see own appointments"
ON agendamentos FOR SELECT TO authenticated
USING (
  auth.uid() = user_id 
  OR has_role(auth.uid(), 'admin')
  OR is_terapeuta(auth.uid())
);

-- Tabelas de permissões: admins gerenciam, todos leem
CREATE POLICY "Admins manage permissions"
ON permissions FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated read permissions"
ON permissions FOR SELECT TO authenticated USING (true);`}
      />
    </CollapsibleSection>
  </div>
);

// === EDGE FUNCTIONS ===
const EdgeFunctionsSection = () => (
  <div className="space-y-3">
    <CollapsibleSection title="Edge Functions (Backend)" icon={Server} badge="24 funções" defaultOpen>
      <div className="grid grid-cols-1 gap-2 text-xs">
        {[
          { name: "asaas-criar-cobranca", desc: "Cria cobranças PIX/boleto via Asaas" },
          { name: "asaas-webhook", desc: "Recebe callbacks de pagamento" },
          { name: "asaas-status", desc: "Consulta status de pagamentos" },
          { name: "enviar-whatsapp", desc: "Envia mensagens via Z-API" },
          { name: "whatsapp-webhook", desc: "Recebe mensagens WhatsApp" },
          { name: "fetch-google-ads", desc: "Coleta métricas Google Ads" },
          { name: "chat-assistente", desc: "Assistente IA conversacional" },
          { name: "generate-script", desc: "Gera roteiros com IA" },
          { name: "generate-hooks", desc: "Gera ganchos virais com IA" },
          { name: "generate-ideas", desc: "Gera ideias de conteúdo" },
          { name: "analyze-viral", desc: "Analisa potencial viral" },
          { name: "gerar-recomendacoes", desc: "Recomendações personalizadas IA" },
          { name: "gerar-imagem-servico", desc: "Gera imagens com IA" },
          { name: "curso-tts", desc: "Text-to-Speech para cursos" },
          { name: "enviar-campanha", desc: "Dispara campanhas marketing" },
          { name: "enviar-lembretes", desc: "Lembretes de agendamento" },
          { name: "lembrete-alongamento", desc: "Notifica pausas posturais" },
          { name: "lembrete-medidas", desc: "Lembrete de medições" },
          { name: "notificacoes-inteligentes", desc: "Notificações contextuais" },
          { name: "processar-expiracoes", desc: "Expira cashback vencido" },
          { name: "processar-vales-expirados", desc: "Expira vales presente" },
          { name: "transferir-creditos", desc: "Transferência entre usuários" },
          { name: "check-rate-limit", desc: "Rate limiting de login" },
          { name: "buscar-usuario", desc: "Busca usuário por email/telefone" },
        ].map((fn) => (
          <div key={fn.name} className="flex items-start gap-2 p-2 rounded-md bg-muted/30">
            <Terminal size={14} className="text-primary mt-0.5 shrink-0" />
            <div>
              <span className="font-mono font-semibold text-foreground">{fn.name}</span>
              <span className="text-muted-foreground ml-1.5">— {fn.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>

    <CollapsibleSection title="Exemplo: Edge Function WhatsApp" icon={Code2}>
      <CodeBlock
        title="supabase/functions/enviar-whatsapp/index.ts"
        language="typescript"
        code={`import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { telefone, mensagem } = await req.json();
  
  const ZAPI_INSTANCE = Deno.env.get('ZAPI_INSTANCE_ID');
  const ZAPI_TOKEN = Deno.env.get('ZAPI_TOKEN');
  
  const response = await fetch(
    \`https://api.z-api.io/instances/\${ZAPI_INSTANCE}/token/\${ZAPI_TOKEN}/send-text\`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: telefone, message: mensagem })
    }
  );

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
});`}
      />
    </CollapsibleSection>

    <CollapsibleSection title="Exemplo: Integração Asaas (Pagamentos)" icon={Code2}>
      <CodeBlock
        title="supabase/functions/asaas-criar-cobranca/index.ts"
        language="typescript"
        code={`// Cria cobrança PIX via Asaas
const response = await fetch(
  'https://api.asaas.com/v3/payments',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': Deno.env.get('ASAAS_API_KEY')!
    },
    body: JSON.stringify({
      customer: customerId,
      billingType: 'PIX',
      value: valor,
      description: descricao,
      dueDate: vencimento
    })
  }
);

// Webhook recebe confirmação de pagamento
// e credita cashback automaticamente via trigger SQL`}
      />
    </CollapsibleSection>
  </div>
);

// === INTEGRATION SNIPPETS ===
const IntegrationSection = () => (
  <div className="space-y-3">
    <CollapsibleSection title="Conectar ao Banco de Dados" icon={Database} defaultOpen>
      <CodeBlock
        title="Importação do cliente"
        code={`import { supabase } from "@/integrations/supabase/client";

// SELECT
const { data, error } = await supabase
  .from('produtos')
  .select('*')
  .eq('disponivel', true);

// INSERT
const { error } = await supabase
  .from('notificacoes')
  .insert({ user_id, titulo: 'Olá!', mensagem: '...', tipo: 'geral' });

// UPDATE
const { error } = await supabase
  .from('pedidos')
  .update({ status: 'entregue' })
  .eq('id', pedidoId);

// DELETE
const { error } = await supabase
  .from('produtos')
  .delete()
  .eq('id', produtoId);

// RPC (chamar função SQL)
const { data } = await supabase
  .rpc('get_user_tier', { p_user_id: userId });

// Verificar permissão granular
const { data } = await supabase
  .rpc('has_permission', { 
    p_user_id: userId, 
    p_resource: 'admin', 
    p_action: 'access' 
  });`}
      />
    </CollapsibleSection>

    <CollapsibleSection title="Chamar Edge Functions" icon={Server}>
      <CodeBlock
        title="Invocando funções backend"
        code={`// Enviar WhatsApp
const { data, error } = await supabase.functions.invoke('enviar-whatsapp', {
  body: { telefone: '5511999999999', mensagem: 'Olá!' }
});

// Criar cobrança Asaas
const { data } = await supabase.functions.invoke('asaas-criar-cobranca', {
  body: { valor: 150.00, descricao: 'Sessão de Massagem', tipo: 'PIX' }
});

// Gerar conteúdo com IA
const { data } = await supabase.functions.invoke('generate-script', {
  body: { topic: 'Benefícios da massagem', brandId: '...' }
});

// Chat assistente
const { data } = await supabase.functions.invoke('chat-assistente', {
  body: { message: 'Quais serviços vocês oferecem?' }
});`}
      />
    </CollapsibleSection>

    <CollapsibleSection title="Upload de Arquivos" icon={Code2}>
      <CodeBlock
        title="Storage: Upload e URL pública"
        code={`// Upload de imagem
const { data, error } = await supabase.storage
  .from('admin-uploads')
  .upload(\`images/\${fileName}\`, file, {
    cacheControl: '3600',
    upsert: true
  });

// Gerar URL pública
const { data: { publicUrl } } = supabase.storage
  .from('admin-uploads')
  .getPublicUrl(filePath);

// Buckets disponíveis:
// avatars               — Fotos de perfil (público)
// fotos-evolucao        — Fotos de tratamento (privado, URLs assinadas)
// avaliacoes-posturais  — Fotos posturais (privado)
// exercise-videos       — Vídeos de exercícios (público)
// social-posts          — Posts Resinkra Moments (privado)
// exames-arquivos       — Exames do paciente (privado)
// admin-uploads         — Uploads administrativos (público)
// corporativo-media     — Mídia corporativa (público)
// landing-media         — Mídia da landing page (público)
// headspa-imagens       — Imagens head spa (público)
// servico-imagens       — Imagens de serviços (público)`}
      />
    </CollapsibleSection>

    <CollapsibleSection title="Realtime (Tempo Real)" icon={Plug}>
      <CodeBlock
        title="Subscrição a mudanças em tempo real"
        code={`// Escutar mudanças na tabela de notificações
const channel = supabase
  .channel('notificacoes-changes')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'notificacoes',
      filter: \`user_id=eq.\${userId}\`
    },
    (payload) => {
      toast.info(payload.new.titulo);
      queryClient.invalidateQueries({ queryKey: ['notificacoes'] });
    }
  )
  .subscribe();

return () => { supabase.removeChannel(channel); };`}
      />
    </CollapsibleSection>

    <CollapsibleSection title="Secrets Configurados" icon={Shield}>
      <div className="grid grid-cols-1 gap-2 text-xs">
        {[
          { name: "ASAAS_API_KEY", desc: "API de pagamentos Asaas" },
          { name: "ASAAS_WEBHOOK_TOKEN", desc: "Token de webhook Asaas" },
          { name: "ZAPI_INSTANCE_ID", desc: "Instância Z-API WhatsApp" },
          { name: "ZAPI_TOKEN", desc: "Token de acesso Z-API" },
          { name: "RESEND_API_KEY", desc: "Envio de emails via Resend" },
          { name: "ELEVENLABS_API_KEY", desc: "Text-to-Speech (conector)" },
          { name: "LOVABLE_API_KEY", desc: "IA Lovable (scripts, hooks)" },
        ].map((s) => (
          <div key={s.name} className="flex items-center gap-2 p-2 rounded-md bg-muted/30">
            <Shield size={14} className="text-green-500 shrink-0" />
            <span className="font-mono font-semibold text-foreground">{s.name}</span>
            <span className="text-muted-foreground">— {s.desc}</span>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  </div>
);

// === TECHNICAL REPORT ===
const TechnicalReportSection = () => (
  <div className="space-y-3">
    <CollapsibleSection title="Métricas da Plataforma" icon={BookOpen} defaultOpen>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "Feature Folders", value: "21" },
          { label: "Componentes", value: "~200+" },
          { label: "Tabelas DB", value: "95+" },
          { label: "Políticas RLS", value: "262+" },
          { label: "Edge Functions", value: "24" },
          { label: "Funções SQL", value: "27+" },
          { label: "Permissões", value: "30" },
          { label: "Roles", value: "4" },
          { label: "Horas Conteúdo", value: "~1.388h" },
          { label: "Storage Buckets", value: "11" },
          { label: "Secrets", value: "7" },
          { label: "Triggers DB", value: "17+" },
        ].map((m) => (
          <Card key={m.label} className="p-3 text-center">
            <div className="text-lg font-bold text-primary">{m.value}</div>
            <div className="text-[10px] text-muted-foreground">{m.label}</div>
          </Card>
        ))}
      </div>
    </CollapsibleSection>

    <CollapsibleSection title="Arquitetura de Segurança" icon={Shield}>
      <CodeBlock
        title="Camadas de proteção"
        language="text"
        code={`1. AUTENTICAÇÃO
   → Email/senha com verificação obrigatória
   → Rate limiting (5 tentativas / 15 min)
   → Proteção HIBP (senhas vazadas)

2. AUTORIZAÇÃO (RBAC + Permissões Granulares)
   → Tabela user_roles separada (anti-escalação)
   → Função has_role() SECURITY DEFINER
   → Sistema de permissões: roles → permissions → user_permissions_mv
   → has_permission(user, resource, action) para controle fino
   → ProtectedRoute com allowRoles no frontend
   → AdminRoute para páginas administrativas

3. ROW LEVEL SECURITY (RLS)
   → Todas as tabelas com RLS ativado
   → Políticas RESTRICTIVE para bloquear anon
   → Usuários só acessam próprios dados
   → Admins têm acesso total via has_role()
   → Tabelas de permissões: admin gerencia, todos leem

4. PROTEÇÃO DE DADOS
   → Fotos sensíveis via URLs assinadas (1h)
   → Triggers protegem código de indicação
   → Validação server-side em transações
   → Audit logs em tabelas críticas

5. INTEGRAÇÕES SEGURAS
   → API keys em Secrets (nunca no código)
   → Webhooks com token de validação
   → Edge Functions com CORS configurado`}
      />
    </CollapsibleSection>

    <CollapsibleSection title="Fluxos de Negócio" icon={Layers}>
      <CodeBlock
        title="Fluxo de Cashback"
        language="text"
        code={`COMPRA/SESSÃO
  └→ Trigger calcula cashback (% do produto/serviço)
  └→ Multiplica pelo tier do usuário (1x/1.5x/2x)
  └→ Insere em transacoes (tipo: cashback, expira: 90 dias)
  └→ Cria notificação automática

INDICAÇÃO
  └→ Amigo se cadastra com código
  └→ Amigo faz primeira compra
  └→ Trigger credita R$ 10 ao indicador + R$ 5 ao indicado
  └→ Notifica ambos

DESAFIO CONCLUÍDO
  └→ Trigger credita recompensa ao participante
  └→ Notificação de parabéns

CASHBACK EXPIRANDO
  └→ Função notifica 7 dias antes
  └→ process_expired_cashback() debita após vencimento`}
      />
    </CollapsibleSection>
  </div>
);

export const CodigoPlataformaTab = () => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Code2 className="text-primary" size={20} />
          Código da Plataforma
        </h3>
        <p className="text-sm text-muted-foreground">
          Documentação técnica, código-fonte, SQL, permissões e snippets de integração
        </p>
      </div>

      <Tabs defaultValue="estrutura" className="w-full">
        <TabsList className="w-full grid grid-cols-5 h-auto">
          <TabsTrigger value="estrutura" className="text-[10px] sm:text-xs px-1 py-2">
            <FolderTree size={14} className="mr-1 hidden sm:inline" />
            Estrutura
          </TabsTrigger>
          <TabsTrigger value="codigo" className="text-[10px] sm:text-xs px-1 py-2">
            <Code2 size={14} className="mr-1 hidden sm:inline" />
            Código
          </TabsTrigger>
          <TabsTrigger value="database" className="text-[10px] sm:text-xs px-1 py-2">
            <Database size={14} className="mr-1 hidden sm:inline" />
            SQL
          </TabsTrigger>
          <TabsTrigger value="edge" className="text-[10px] sm:text-xs px-1 py-2">
            <Server size={14} className="mr-1 hidden sm:inline" />
            Backend
          </TabsTrigger>
          <TabsTrigger value="integracao" className="text-[10px] sm:text-xs px-1 py-2">
            <Plug size={14} className="mr-1 hidden sm:inline" />
            APIs
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <TabsContent value="estrutura">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ProjectStructureSection />
            </motion.div>
          </TabsContent>
          <TabsContent value="codigo">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <SourceCodeSection />
            </motion.div>
          </TabsContent>
          <TabsContent value="database">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <DatabaseSection />
            </motion.div>
          </TabsContent>
          <TabsContent value="edge">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <EdgeFunctionsSection />
            </motion.div>
          </TabsContent>
          <TabsContent value="integracao">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <IntegrationSection />
              <div className="mt-6">
                <TechnicalReportSection />
              </div>
            </motion.div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
