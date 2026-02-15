import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
const Offers = lazy(() => import("@/pages/Offers"));
const NotFound = lazy(() => import("@/pages/NotFound"));

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
        <Route path="/curso-vendas" element={<ProtectedRoute><LazyPage><CursoVendas /></LazyPage></ProtectedRoute>} />
        <Route path="/curso-aromaterapia" element={<ProtectedRoute><LazyPage><CursoAromaterapia /></LazyPage></ProtectedRoute>} />
        <Route path="/ofertas" element={<ProtectedRoute><LazyPage><Offers /></LazyPage></ProtectedRoute>} />
        <Route path="*" element={<LazyPage><NotFound /></LazyPage>} />
      </Routes>
    </AnimatePresence>
  );
};
