import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/AdminRoute";
import { PageTransition } from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Eagerly loaded (critical path)
import Landing from "@/features/landing/pages/Landing";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";

// Lazy loaded pages
const Agendamento = lazy(() => import("@/features/agendamentos/pages/Agendamento"));
const Pacotes = lazy(() => import("@/pages/Pacotes"));
const Loja = lazy(() => import("@/features/loja/pages/Loja"));
const Wallet = lazy(() => import("@/features/cashback/pages/Wallet"));
const Profile = lazy(() => import("@/features/profile/pages/Profile"));
const Notificacoes = lazy(() => import("@/pages/Notificacoes"));
const Instalar = lazy(() => import("@/pages/Instalar"));
const QRCodePrint = lazy(() => import("@/pages/QRCodePrint"));
const Transferir = lazy(() => import("@/pages/Transferir"));
const Admin = lazy(() => import("@/features/admin/pages/Admin"));
const Indicacoes = lazy(() => import("@/pages/Indicacoes"));
const Manual = lazy(() => import("@/pages/Manual"));
const Cashback = lazy(() => import("@/features/cashback/pages/Cashback"));
const Corporativo = lazy(() => import("@/features/corporativo/pages/Corporativo"));
const Alongamento = lazy(() => import("@/features/alongamento/pages/Alongamento"));
const Protocolos = lazy(() => import("@/features/protocolos/pages/Protocolos"));
const ProtocoloDetalhe = lazy(() => import("@/features/protocolos/pages/ProtocoloDetalhe"));
const Conquistas = lazy(() => import("@/features/conquistas/pages/Conquistas"));
const GuiaClinico = lazy(() => import("@/features/guia-clinico/pages/GuiaClinico"));
const AvaliacaoPostural = lazy(() => import("@/features/avaliacao-postural/pages/AvaliacaoPostural"));
const ContaConfiguracoes = lazy(() => import("@/pages/ContaConfiguracoes"));
const HeadSpa = lazy(() => import("@/pages/HeadSpa"));
const Dietas = lazy(() => import("@/features/dietas/pages/Dietas"));
const ValePresente = lazy(() => import("@/features/vale-presente/pages/ValePresente"));
const CupomEditor = lazy(() => import("@/features/cupom/pages/CupomEditor"));
const ClubeVip = lazy(() => import("@/pages/ClubeVip"));
const RecomendacoesIA = lazy(() => import("@/pages/RecomendacoesIA"));
const DashboardRH = lazy(() => import("@/features/corporativo/pages/DashboardRH"));
const ParceiroDashboard = lazy(() => import("@/pages/ParceiroDashboard"));
const PerfilParceiro = lazy(() => import("@/pages/PerfilParceiro"));
const ResinkraMoments = lazy(() => import("@/features/social/pages/ResinkraMoments"));
const Checkin = lazy(() => import("@/features/agendamentos/pages/Checkin"));
const DesafiosPage = lazy(() => import("@/pages/Desafios"));
const MinhaJornada = lazy(() => import("@/pages/MinhaJornada"));
const ServicoDetalhe = lazy(() => import("@/features/terapias/pages/ServicoDetalhe"));
const CartaoTerapeuta = lazy(() => import("@/features/terapeuta/pages/CartaoTerapeuta"));
const QRCodeTerapeuta = lazy(() => import("@/features/terapeuta/pages/QRCodeTerapeuta"));
const ConteudoSocial = lazy(() => import("@/features/social/pages/ConteudoSocial"));
const CursoVendas = lazy(() => import("@/features/cursos/pages/CursoVendas"));
const CursoAromaterapia = lazy(() => import("@/features/cursos/pages/CursoAromaterapia"));
const Cursos = lazy(() => import("@/features/cursos/pages/Cursos"));
const CursoHeadSpa = lazy(() => import("@/features/cursos/pages/CursoHeadSpa"));
const CursoAnatomia = lazy(() => import("@/features/cursos/pages/CursoAnatomia"));
const CursoYugenFaceSpa = lazy(() => import("@/features/cursos/pages/CursoYugenFaceSpa"));
const CursoVendasHero = lazy(() => import("@/features/cursos/pages/CursoVendasHero"));
const CursoAromaterapiaHero = lazy(() => import("@/features/cursos/pages/CursoAromaterapiaHero"));
const CursoHeadSpaHero = lazy(() => import("@/features/cursos/pages/CursoHeadSpaHero"));
const CursoAnatomiaHero = lazy(() => import("@/features/cursos/pages/CursoAnatomiaHero"));
const CursoYugenFaceSpaHero = lazy(() => import("@/features/cursos/pages/CursoYugenFaceSpaHero"));
const CursoMetodoResinkra = lazy(() => import("@/features/cursos/pages/CursoMetodoResinkra"));
const CursoMetodoResinkraHero = lazy(() => import("@/features/cursos/pages/CursoMetodoResinkraHero"));
const CursoPerfumariaNatural = lazy(() => import("@/features/cursos/pages/CursoPerfumariaNatural"));
const CursoPerfumariaNaturalHero = lazy(() => import("@/features/cursos/pages/CursoPerfumariaNaturalHero"));
const CursoVelasAromaticas = lazy(() => import("@/features/cursos/pages/CursoVelasAromaticas"));
const CursoVelasAromaticasHero = lazy(() => import("@/features/cursos/pages/CursoVelasAromaticasHero"));
const CursoSaboariaArtesanal = lazy(() => import("@/features/cursos/pages/CursoSaboariaArtesanal"));
const CursoSaboariaArtesanalHero = lazy(() => import("@/features/cursos/pages/CursoSaboariaArtesanalHero"));
const CursoDifusorAmbientes = lazy(() => import("@/features/cursos/pages/CursoDifusorAmbientes"));
const CursoDifusorAmbientesHero = lazy(() => import("@/features/cursos/pages/CursoDifusorAmbientesHero"));
const CursoFitoterapia = lazy(() => import("@/features/cursos/pages/CursoFitoterapia"));
const CursoFitoterapiaHero = lazy(() => import("@/features/cursos/pages/CursoFitoterapiaHero"));
const CursoOleosEssenciais = lazy(() => import("@/features/cursos/pages/CursoOleosEssenciais"));
const CursoOleosEssenciaisHero = lazy(() => import("@/features/cursos/pages/CursoOleosEssenciaisHero"));
const CursoMassagemModeladora = lazy(() => import("@/features/cursos/pages/CursoMassagemModeladora"));
const CursoMassagemModeladoraHero = lazy(() => import("@/features/cursos/pages/CursoMassagemModeladoraHero"));
const CursoDrenagemLinfatica = lazy(() => import("@/features/cursos/pages/CursoDrenagemLinfatica"));
const CursoDrenagemLinfaticaHero = lazy(() => import("@/features/cursos/pages/CursoDrenagemLinfaticaHero"));
const CursoGastronomiaSaudavel = lazy(() => import("@/features/cursos/pages/CursoGastronomiaSaudavel"));
const CursoGastronomiaSaudavelHero = lazy(() => import("@/features/cursos/pages/CursoGastronomiaSaudavelHero"));
const CursoSeitai = lazy(() => import("@/features/cursos/pages/CursoSeitai"));
const CursoSeitaiHero = lazy(() => import("@/features/cursos/pages/CursoSeitaiHero"));
const CursoBandagemElastica = lazy(() => import("@/features/cursos/pages/CursoBandagemElastica"));
const CursoBandagemElasticaHero = lazy(() => import("@/features/cursos/pages/CursoBandagemElasticaHero"));
const TerapeutaDashboard = lazy(() => import("@/features/terapeuta/pages/TerapeutaDashboard"));
const Terapias = lazy(() => import("@/features/terapias/pages/Terapias"));
const Offers = lazy(() => import("@/pages/Offers"));
const ChatAssistente = lazy(() => import("@/pages/ChatAssistente"));
const ChatWhatsApp = lazy(() => import("@/pages/ChatWhatsApp"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Admin Pages
const GoogleAdsDashboard = lazy(() => import("@/features/admin/pages/GoogleAdsDashboard"));

// Cromos Pages
const CromosDashboard = lazy(() => import("@/features/cromos/pages/CromosDashboard"));

// Materiais Gráficos
const MateriaisGraficos = lazy(() => import("@/features/materiais/pages/MateriaisGraficos"));

// Anamnese
const Anamnese = lazy(() => import("@/features/anamnese/pages/Anamnese"));

// Resinkra AI Pages
const ResinkraAIDashboard = lazy(() => import("@/features/resinkra-ai/pages/ResinkraAIDashboard"));
const ResinkraAIOnboarding = lazy(() => import("@/features/resinkra-ai/pages/ResinkraAIOnboarding"));
const ResinkraAICreate = lazy(() => import("@/features/resinkra-ai/pages/ResinkraAICreate"));
const ResinkraAIScriptResult = lazy(() => import("@/features/resinkra-ai/pages/ResinkraAIScriptResult"));
const ResinkraAIHistory = lazy(() => import("@/features/resinkra-ai/pages/ResinkraAIHistory"));
const ResinkraAIHooks = lazy(() => import("@/features/resinkra-ai/pages/ResinkraAIHooks"));
const ResinkraAICalendar = lazy(() => import("@/features/resinkra-ai/pages/ResinkraAICalendar"));
const ResinkraAIViralAnalysis = lazy(() => import("@/features/resinkra-ai/pages/ResinkraAIViralAnalysis"));
const ResinkraAIIdeas = lazy(() => import("@/features/resinkra-ai/pages/ResinkraAIIdeas"));
const ResinkraAITemplates = lazy(() => import("@/features/resinkra-ai/pages/ResinkraAITemplates"));
const ResinkraAISettings = lazy(() => import("@/features/resinkra-ai/pages/ResinkraAISettings"));

const LazyPage = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><LoadingSpinner /></div>}>
    <PageTransition>{children}</PageTransition>
  </Suspense>
);

/** Shows landing for visitors, dashboard for authenticated users */
const HomeRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Index />;
  return <Landing />;
};

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/instalar" element={<LazyPage><Instalar /></LazyPage>} />
        <Route path="/qrcode" element={<LazyPage><QRCodePrint /></LazyPage>} />
        <Route path="/" element={<PageTransition><HomeRoute /></PageTransition>} />
        <Route path="/site" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/servico/:id" element={<ProtectedRoute><LazyPage><ServicoDetalhe /></LazyPage></ProtectedRoute>} />
        <Route path="/agendamento" element={<ProtectedRoute><LazyPage><Agendamento /></LazyPage></ProtectedRoute>} />
        <Route path="/pacotes" element={<ProtectedRoute><LazyPage><Pacotes /></LazyPage></ProtectedRoute>} />
        <Route path="/loja" element={<ProtectedRoute><LazyPage><Loja /></LazyPage></ProtectedRoute>} />
        <Route path="/wallet" element={<ProtectedRoute><LazyPage><Wallet /></LazyPage></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><LazyPage><Profile /></LazyPage></ProtectedRoute>} />
        <Route path="/notificacoes" element={<ProtectedRoute><LazyPage><Notificacoes /></LazyPage></ProtectedRoute>} />
        <Route path="/transferir" element={<ProtectedRoute><LazyPage><Transferir /></LazyPage></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute requireAdmin><LazyPage><Admin /></LazyPage></ProtectedRoute>} />
        <Route path="/admin/google-ads" element={<ProtectedRoute requireAdmin><LazyPage><GoogleAdsDashboard /></LazyPage></ProtectedRoute>} />
        <Route path="/indicacoes" element={<ProtectedRoute><LazyPage><Indicacoes /></LazyPage></ProtectedRoute>} />
        <Route path="/cashback" element={<ProtectedRoute><LazyPage><Cashback /></LazyPage></ProtectedRoute>} />
        <Route path="/manual" element={<ProtectedRoute><LazyPage><Manual /></LazyPage></ProtectedRoute>} />
        <Route path="/headspa" element={<LazyPage><HeadSpa /></LazyPage>} />
        <Route path="/corporativo" element={<LazyPage><Corporativo /></LazyPage>} />
        <Route path="/alongamento" element={<ProtectedRoute><LazyPage><Alongamento /></LazyPage></ProtectedRoute>} />
        <Route path="/protocolos" element={<ProtectedRoute><LazyPage><Protocolos /></LazyPage></ProtectedRoute>} />
        <Route path="/dietas" element={<ProtectedRoute><LazyPage><Dietas /></LazyPage></ProtectedRoute>} />
        <Route path="/protocolos/:id" element={<ProtectedRoute><LazyPage><ProtocoloDetalhe /></LazyPage></ProtectedRoute>} />
        <Route path="/conquistas" element={<ProtectedRoute><LazyPage><Conquistas /></LazyPage></ProtectedRoute>} />
        <Route path="/guia-clinico" element={<ProtectedRoute><LazyPage><GuiaClinico /></LazyPage></ProtectedRoute>} />
        <Route path="/avaliacao-postural" element={<ProtectedRoute><LazyPage><AvaliacaoPostural /></LazyPage></ProtectedRoute>} />
        <Route path="/conta" element={<ProtectedRoute><LazyPage><ContaConfiguracoes /></LazyPage></ProtectedRoute>} />
        <Route path="/vale-presente" element={<ProtectedRoute><LazyPage><ValePresente /></LazyPage></ProtectedRoute>} />
        <Route path="/cupom-editor" element={<ProtectedRoute requireAdmin><LazyPage><CupomEditor /></LazyPage></ProtectedRoute>} />
        <Route path="/clube-vip" element={<ProtectedRoute><LazyPage><ClubeVip /></LazyPage></ProtectedRoute>} />
        <Route path="/recomendacoes" element={<ProtectedRoute><LazyPage><RecomendacoesIA /></LazyPage></ProtectedRoute>} />
        <Route path="/dashboard-rh" element={<ProtectedRoute requireAdmin><LazyPage><DashboardRH /></LazyPage></ProtectedRoute>} />
        <Route path="/parceiro-dashboard" element={<ProtectedRoute><LazyPage><ParceiroDashboard /></LazyPage></ProtectedRoute>} />
        <Route path="/terapeuta-dashboard" element={<ProtectedRoute><LazyPage><TerapeutaDashboard /></LazyPage></ProtectedRoute>} />
        <Route path="/parceiro/:slug" element={<LazyPage><PerfilParceiro /></LazyPage>} />
        <Route path="/resinkra-moments" element={<ProtectedRoute><LazyPage><ResinkraMoments /></LazyPage></ProtectedRoute>} />
        <Route path="/checkin" element={<ProtectedRoute><LazyPage><Checkin /></LazyPage></ProtectedRoute>} />
        <Route path="/desafios" element={<ProtectedRoute><LazyPage><DesafiosPage /></LazyPage></ProtectedRoute>} />
        <Route path="/minha-jornada" element={<ProtectedRoute><LazyPage><MinhaJornada /></LazyPage></ProtectedRoute>} />
        <Route path="/cromos" element={<ProtectedRoute><LazyPage><CromosDashboard /></LazyPage></ProtectedRoute>} />
        <Route path="/conteudo-social" element={<ProtectedRoute requireAdmin><LazyPage><ConteudoSocial /></LazyPage></ProtectedRoute>} />
        <Route path="/materiais" element={<ProtectedRoute requireAdmin><LazyPage><MateriaisGraficos /></LazyPage></ProtectedRoute>} />
        <Route path="/anamnese" element={<ProtectedRoute><LazyPage><Anamnese /></LazyPage></ProtectedRoute>} />
        <Route path="/terapeuta/:id" element={<LazyPage><CartaoTerapeuta /></LazyPage>} />
        <Route path="/terapeuta/:id/qrcode" element={<LazyPage><QRCodeTerapeuta /></LazyPage>} />
        <Route path="/cursos" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><Cursos /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-vendas" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoVendas /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-aromaterapia" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoAromaterapia /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-headspa" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoHeadSpa /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-anatomia" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoAnatomia /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-yugen-facespa" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoYugenFaceSpa /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/vendas" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoVendasHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/aromaterapia" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoAromaterapiaHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/headspa" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoHeadSpaHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/anatomia" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoAnatomiaHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/facespa" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoYugenFaceSpaHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-metodo-resinkra" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoMetodoResinkra /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/metodo-resinkra" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoMetodoResinkraHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-perfumaria-natural" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoPerfumariaNatural /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/perfumaria-natural" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoPerfumariaNaturalHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-velas-aromaticas" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoVelasAromaticas /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/velas-aromaticas" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoVelasAromaticasHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-saboaria-artesanal" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoSaboariaArtesanal /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/saboaria-artesanal" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoSaboariaArtesanalHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-difusor-ambientes" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoDifusorAmbientes /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/difusor-ambientes" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoDifusorAmbientesHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-fitoterapia" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoFitoterapia /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/fitoterapia" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoFitoterapiaHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-oleos-essenciais" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoOleosEssenciais /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/oleos-essenciais" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoOleosEssenciaisHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-massagem-modeladora" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoMassagemModeladora /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/massagem-modeladora" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoMassagemModeladoraHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-drenagem-linfatica" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoDrenagemLinfatica /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/drenagem-linfatica" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoDrenagemLinfaticaHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-gastronomia-saudavel" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoGastronomiaSaudavel /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/gastronomia-saudavel" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoGastronomiaSaudavelHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-seitai" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoSeitai /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/seitai" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoSeitaiHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-bandagem-elastica" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoBandagemElastica /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/bandagem-elastica" element={<ProtectedRoute allowRoles={["admin", "terapeuta"]}><LazyPage><CursoBandagemElasticaHero /></LazyPage></ProtectedRoute>} />
        <Route path="/terapias" element={<LazyPage><Terapias /></LazyPage>} />
        <Route path="/ofertas" element={<ProtectedRoute><LazyPage><Offers /></LazyPage></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><LazyPage><ChatAssistente /></LazyPage></ProtectedRoute>} />
        <Route path="/chat-whatsapp" element={<ProtectedRoute requireAdmin><LazyPage><ChatWhatsApp /></LazyPage></ProtectedRoute>} />

        {/* Resinkra AI Routes — Admin Only */}
        <Route path="/resinkra-ai" element={<AdminRoute><LazyPage><ResinkraAIDashboard /></LazyPage></AdminRoute>} />
        <Route path="/resinkra-ai/onboarding" element={<AdminRoute><LazyPage><ResinkraAIOnboarding /></LazyPage></AdminRoute>} />
        <Route path="/resinkra-ai/create" element={<AdminRoute><LazyPage><ResinkraAICreate /></LazyPage></AdminRoute>} />
        <Route path="/resinkra-ai/script/:id" element={<AdminRoute><LazyPage><ResinkraAIScriptResult /></LazyPage></AdminRoute>} />
        <Route path="/resinkra-ai/history" element={<AdminRoute><LazyPage><ResinkraAIHistory /></LazyPage></AdminRoute>} />
        <Route path="/resinkra-ai/hooks" element={<AdminRoute><LazyPage><ResinkraAIHooks /></LazyPage></AdminRoute>} />
        <Route path="/resinkra-ai/calendar" element={<AdminRoute><LazyPage><ResinkraAICalendar /></LazyPage></AdminRoute>} />
        <Route path="/resinkra-ai/viral-analysis" element={<AdminRoute><LazyPage><ResinkraAIViralAnalysis /></LazyPage></AdminRoute>} />
        <Route path="/resinkra-ai/ideas" element={<AdminRoute><LazyPage><ResinkraAIIdeas /></LazyPage></AdminRoute>} />
        <Route path="/resinkra-ai/templates" element={<AdminRoute><LazyPage><ResinkraAITemplates /></LazyPage></AdminRoute>} />
        <Route path="/resinkra-ai/settings" element={<AdminRoute><LazyPage><ResinkraAISettings /></LazyPage></AdminRoute>} />

        <Route path="*" element={<LazyPage><NotFound /></LazyPage>} />
      </Routes>
    </AnimatePresence>
  );
};
