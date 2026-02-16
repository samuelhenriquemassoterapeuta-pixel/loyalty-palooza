import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/AdminRoute";
import { PageTransition } from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Eagerly loaded (critical path)
import Landing from "@/pages/Landing";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";

// Lazy loaded pages
const Agendamento = lazy(() => import("@/pages/Agendamento"));
const Pacotes = lazy(() => import("@/pages/Pacotes"));
const Loja = lazy(() => import("@/pages/Loja"));
const Wallet = lazy(() => import("@/pages/Wallet"));
const Profile = lazy(() => import("@/pages/Profile"));
const Notificacoes = lazy(() => import("@/pages/Notificacoes"));
const Instalar = lazy(() => import("@/pages/Instalar"));
const QRCodePrint = lazy(() => import("@/pages/QRCodePrint"));
const Transferir = lazy(() => import("@/pages/Transferir"));
const Admin = lazy(() => import("@/pages/Admin"));
const Indicacoes = lazy(() => import("@/pages/Indicacoes"));
const Manual = lazy(() => import("@/pages/Manual"));
const Cashback = lazy(() => import("@/pages/Cashback"));
const Corporativo = lazy(() => import("@/pages/Corporativo"));
const Alongamento = lazy(() => import("@/pages/Alongamento"));
const Protocolos = lazy(() => import("@/pages/Protocolos"));
const ProtocoloDetalhe = lazy(() => import("@/pages/ProtocoloDetalhe"));
const Conquistas = lazy(() => import("@/pages/Conquistas"));
const GuiaClinico = lazy(() => import("@/pages/GuiaClinico"));
const AvaliacaoPostural = lazy(() => import("@/pages/AvaliacaoPostural"));
const ContaConfiguracoes = lazy(() => import("@/pages/ContaConfiguracoes"));
const HeadSpa = lazy(() => import("@/pages/HeadSpa"));
const Dietas = lazy(() => import("@/pages/Dietas"));
const ValePresente = lazy(() => import("@/pages/ValePresente"));
const CupomEditor = lazy(() => import("@/pages/CupomEditor"));
const ClubeVip = lazy(() => import("@/pages/ClubeVip"));
const RecomendacoesIA = lazy(() => import("@/pages/RecomendacoesIA"));
const DashboardRH = lazy(() => import("@/pages/DashboardRH"));
const ParceiroDashboard = lazy(() => import("@/pages/ParceiroDashboard"));
const PerfilParceiro = lazy(() => import("@/pages/PerfilParceiro"));
const ResinkraMoments = lazy(() => import("@/pages/ResinkraMoments"));
const Checkin = lazy(() => import("@/pages/Checkin"));
const DesafiosPage = lazy(() => import("@/pages/Desafios"));
const MinhaJornada = lazy(() => import("@/pages/MinhaJornada"));
const ServicoDetalhe = lazy(() => import("@/pages/ServicoDetalhe"));
const CartaoTerapeuta = lazy(() => import("@/pages/CartaoTerapeuta"));
const ConteudoSocial = lazy(() => import("@/pages/ConteudoSocial"));
const CursoVendas = lazy(() => import("@/pages/CursoVendas"));
const CursoAromaterapia = lazy(() => import("@/pages/CursoAromaterapia"));
const Cursos = lazy(() => import("@/pages/Cursos"));
const CursoHeadSpa = lazy(() => import("@/pages/CursoHeadSpa"));
const CursoAnatomia = lazy(() => import("@/pages/CursoAnatomia"));
const CursoYugenFaceSpa = lazy(() => import("@/pages/CursoYugenFaceSpa"));
const CursoVendasHero = lazy(() => import("@/pages/CursoVendasHero"));
const CursoAromaterapiaHero = lazy(() => import("@/pages/CursoAromaterapiaHero"));
const CursoHeadSpaHero = lazy(() => import("@/pages/CursoHeadSpaHero"));
const CursoAnatomiaHero = lazy(() => import("@/pages/CursoAnatomiaHero"));
const CursoYugenFaceSpaHero = lazy(() => import("@/pages/CursoYugenFaceSpaHero"));
const CursoMetodoResinkra = lazy(() => import("@/pages/CursoMetodoResinkra"));
const CursoMetodoResinkraHero = lazy(() => import("@/pages/CursoMetodoResinkraHero"));
const CursoPerfumariaNatural = lazy(() => import("@/pages/CursoPerfumariaNatural"));
const CursoPerfumariaNaturalHero = lazy(() => import("@/pages/CursoPerfumariaNaturalHero"));
const CursoVelasAromaticas = lazy(() => import("@/pages/CursoVelasAromaticas"));
const CursoVelasAromaticasHero = lazy(() => import("@/pages/CursoVelasAromaticasHero"));
const CursoSaboariaArtesanal = lazy(() => import("@/pages/CursoSaboariaArtesanal"));
const CursoSaboariaArtesanalHero = lazy(() => import("@/pages/CursoSaboariaArtesanalHero"));
const CursoDifusorAmbientes = lazy(() => import("@/pages/CursoDifusorAmbientes"));
const CursoDifusorAmbientesHero = lazy(() => import("@/pages/CursoDifusorAmbientesHero"));
const CursoFitoterapia = lazy(() => import("@/pages/CursoFitoterapia"));
const CursoFitoterapiaHero = lazy(() => import("@/pages/CursoFitoterapiaHero"));
const Terapias = lazy(() => import("@/pages/Terapias"));
const Offers = lazy(() => import("@/pages/Offers"));
const ChatAssistente = lazy(() => import("@/pages/ChatAssistente"));
const ChatWhatsApp = lazy(() => import("@/pages/ChatWhatsApp"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Admin Pages
const GoogleAdsDashboard = lazy(() => import("@/pages/admin/GoogleAdsDashboard"));

// Resinkra AI Pages
const ResinkraAIDashboard = lazy(() => import("@/pages/resinkra-ai/ResinkraAIDashboard"));
const ResinkraAIOnboarding = lazy(() => import("@/pages/resinkra-ai/ResinkraAIOnboarding"));
const ResinkraAICreate = lazy(() => import("@/pages/resinkra-ai/ResinkraAICreate"));
const ResinkraAIScriptResult = lazy(() => import("@/pages/resinkra-ai/ResinkraAIScriptResult"));
const ResinkraAIHistory = lazy(() => import("@/pages/resinkra-ai/ResinkraAIHistory"));
const ResinkraAIHooks = lazy(() => import("@/pages/resinkra-ai/ResinkraAIHooks"));
const ResinkraAICalendar = lazy(() => import("@/pages/resinkra-ai/ResinkraAICalendar"));
const ResinkraAIViralAnalysis = lazy(() => import("@/pages/resinkra-ai/ResinkraAIViralAnalysis"));
const ResinkraAIIdeas = lazy(() => import("@/pages/resinkra-ai/ResinkraAIIdeas"));
const ResinkraAITemplates = lazy(() => import("@/pages/resinkra-ai/ResinkraAITemplates"));
const ResinkraAISettings = lazy(() => import("@/pages/resinkra-ai/ResinkraAISettings"));

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
        <Route path="/parceiro/:slug" element={<LazyPage><PerfilParceiro /></LazyPage>} />
        <Route path="/resinkra-moments" element={<ProtectedRoute><LazyPage><ResinkraMoments /></LazyPage></ProtectedRoute>} />
        <Route path="/checkin" element={<ProtectedRoute><LazyPage><Checkin /></LazyPage></ProtectedRoute>} />
        <Route path="/desafios" element={<ProtectedRoute><LazyPage><DesafiosPage /></LazyPage></ProtectedRoute>} />
        <Route path="/minha-jornada" element={<ProtectedRoute><LazyPage><MinhaJornada /></LazyPage></ProtectedRoute>} />
        <Route path="/conteudo-social" element={<ProtectedRoute requireAdmin><LazyPage><ConteudoSocial /></LazyPage></ProtectedRoute>} />
        <Route path="/terapeuta/:id" element={<LazyPage><CartaoTerapeuta /></LazyPage>} />
        <Route path="/cursos" element={<ProtectedRoute><LazyPage><Cursos /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-vendas" element={<ProtectedRoute><LazyPage><CursoVendas /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-aromaterapia" element={<ProtectedRoute><LazyPage><CursoAromaterapia /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-headspa" element={<ProtectedRoute><LazyPage><CursoHeadSpa /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-anatomia" element={<ProtectedRoute><LazyPage><CursoAnatomia /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-yugen-facespa" element={<ProtectedRoute><LazyPage><CursoYugenFaceSpa /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/vendas" element={<ProtectedRoute><LazyPage><CursoVendasHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/aromaterapia" element={<ProtectedRoute><LazyPage><CursoAromaterapiaHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/headspa" element={<ProtectedRoute><LazyPage><CursoHeadSpaHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/anatomia" element={<ProtectedRoute><LazyPage><CursoAnatomiaHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/facespa" element={<ProtectedRoute><LazyPage><CursoYugenFaceSpaHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-metodo-resinkra" element={<ProtectedRoute><LazyPage><CursoMetodoResinkra /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/metodo-resinkra" element={<ProtectedRoute><LazyPage><CursoMetodoResinkraHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-perfumaria-natural" element={<ProtectedRoute><LazyPage><CursoPerfumariaNatural /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/perfumaria-natural" element={<ProtectedRoute><LazyPage><CursoPerfumariaNaturalHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-velas-aromaticas" element={<ProtectedRoute><LazyPage><CursoVelasAromaticas /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/velas-aromaticas" element={<ProtectedRoute><LazyPage><CursoVelasAromaticasHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-saboaria-artesanal" element={<ProtectedRoute><LazyPage><CursoSaboariaArtesanal /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/saboaria-artesanal" element={<ProtectedRoute><LazyPage><CursoSaboariaArtesanalHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-difusor-ambientes" element={<ProtectedRoute><LazyPage><CursoDifusorAmbientes /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/difusor-ambientes" element={<ProtectedRoute><LazyPage><CursoDifusorAmbientesHero /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-fitoterapia" element={<ProtectedRoute><LazyPage><CursoFitoterapia /></LazyPage></ProtectedRoute>} />
        <Route path="/curso/fitoterapia" element={<ProtectedRoute><LazyPage><CursoFitoterapiaHero /></LazyPage></ProtectedRoute>} />
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
