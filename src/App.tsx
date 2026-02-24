import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { AnimatedRoutes } from "@/components/AnimatedRoutes";
import { SplashScreen } from "@/components/SplashScreen";
import { ResiChat } from "@/components/chat/ResiChat";
import { EditModeFAB } from "@/components/edit-mode";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if splash was already shown this session
    const splashShown = sessionStorage.getItem("splashShown");
    if (splashShown) {
      setShowSplash(false);
      return;
    }

    // Hide splash after animation completes
    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("splashShown", "true");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <EditModeProvider>
              <SplashScreen isVisible={showSplash} />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AnimatedRoutes />
                <ResiChat />
                <EditModeFAB />
              </BrowserRouter>
            </EditModeProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
