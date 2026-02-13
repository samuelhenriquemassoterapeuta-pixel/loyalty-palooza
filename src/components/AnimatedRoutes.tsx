import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageTransition } from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import Landing from "@/pages/Landing";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Agendamento from "@/pages/Agendamento";
import Pacotes from "@/pages/Pacotes";
import Loja from "@/pages/Loja";
import Wallet from "@/pages/Wallet";
import Profile from "@/pages/Profile";
import Notificacoes from "@/pages/Notificacoes";
import Instalar from "@/pages/Instalar";
import QRCodePrint from "@/pages/QRCodePrint";
import Transferir from "@/pages/Transferir";
import Admin from "@/pages/Admin";
import Indicacoes from "@/pages/Indicacoes";
import Manual from "@/pages/Manual";
import Cashback from "@/pages/Cashback";
import Corporativo from "@/pages/Corporativo";
import Alongamento from "@/pages/Alongamento";
import Protocolos from "@/pages/Protocolos";
import ProtocoloDetalhe from "@/pages/ProtocoloDetalhe";
import Conquistas from "@/pages/Conquistas";
import GuiaClinico from "@/pages/GuiaClinico";
import AvaliacaoPostural from "@/pages/AvaliacaoPostural";
import ContaConfiguracoes from "@/pages/ContaConfiguracoes";
import HeadSpa from "@/pages/HeadSpa";
import Dietas from "@/pages/Dietas";
import ValePresente from "@/pages/ValePresente";
import CupomEditor from "@/pages/CupomEditor";
import ClubeVip from "@/pages/ClubeVip";
import RecomendacoesIA from "@/pages/RecomendacoesIA";
import DashboardRH from "@/pages/DashboardRH";
import ParceiroDashboard from "@/pages/ParceiroDashboard";
import PerfilParceiro from "@/pages/PerfilParceiro";
import ResinkraMoments from "@/pages/ResinkraMoments";
import NotFound from "@/pages/NotFound";

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
        <Route
          path="/auth"
          element={
            <PageTransition>
              <Auth />
            </PageTransition>
          }
        />
        <Route
          path="/instalar"
          element={
            <PageTransition>
              <Instalar />
            </PageTransition>
          }
        />
        <Route
          path="/qrcode"
          element={
            <PageTransition>
              <QRCodePrint />
            </PageTransition>
          }
        />
        <Route
          path="/"
          element={
            <PageTransition>
              <HomeRoute />
            </PageTransition>
          }
        />
        <Route
          path="/site"
          element={
            <PageTransition>
              <Landing />
            </PageTransition>
          }
        />
        <Route
          path="/agendamento"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Agendamento />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pacotes"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Pacotes />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/loja"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Loja />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Wallet />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Profile />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notificacoes"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Notificacoes />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transferir"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Transferir />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <PageTransition>
                <Admin />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/indicacoes"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Indicacoes />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cashback"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Cashback />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manual"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Manual />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/headspa"
          element={
            <PageTransition>
              <HeadSpa />
            </PageTransition>
          }
        />
        <Route
          path="/corporativo"
          element={
            <PageTransition>
              <Corporativo />
            </PageTransition>
          }
        />
        <Route
          path="/alongamento"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Alongamento />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/protocolos"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Protocolos />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dietas"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Dietas />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/protocolos/:id"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ProtocoloDetalhe />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/conquistas"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Conquistas />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/guia-clinico"
          element={
            <ProtectedRoute>
              <PageTransition>
                <GuiaClinico />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/avaliacao-postural"
          element={
            <ProtectedRoute>
              <PageTransition>
                <AvaliacaoPostural />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/conta"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ContaConfiguracoes />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vale-presente"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ValePresente />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cupom-editor"
          element={
            <ProtectedRoute requireAdmin>
              <PageTransition>
                <CupomEditor />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clube-vip"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ClubeVip />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recomendacoes"
          element={
            <ProtectedRoute>
              <PageTransition>
                <RecomendacoesIA />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-rh"
          element={
            <ProtectedRoute requireAdmin>
              <PageTransition>
                <DashboardRH />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/parceiro-dashboard"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ParceiroDashboard />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/parceiro/:slug"
          element={
            <PageTransition>
              <PerfilParceiro />
            </PageTransition>
          }
        />
        <Route
          path="/resinkra-moments"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ResinkraMoments />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};
