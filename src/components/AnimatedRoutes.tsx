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
import Conquistas from "@/pages/Conquistas";
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
