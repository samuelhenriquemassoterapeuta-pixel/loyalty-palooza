import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoMarrom from "@/assets/logo-marrom.png";
import simboloVerde from "@/assets/simbolo-verde.png";

export const LandingFooter = forwardRef<HTMLElement>((_, ref) => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer ref={ref} className="relative py-20 lg:py-32 border-t border-border overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto flex flex-col gap-3 mb-10">
          <Button
            size="xl"
            variant="outline"
            onClick={() => navigate("/auth")}
            className="w-full border-2 border-foreground/70 bg-transparent text-foreground hover:bg-foreground/10 hover:text-foreground rounded-2xl text-lg shadow-lg backdrop-blur-sm"
          >
            Entrar
          </Button>
          <Button
            size="xl"
            onClick={() => navigate("/auth?tab=register")}
            className="w-full rounded-2xl text-lg shadow-lg"
          >
            Criar conta
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src={simboloVerde} alt="Resinkra" className="h-7 w-7 object-contain mix-blend-multiply" />
            <img src={logoMarrom} alt="Resinkra" className="h-3.5 object-contain mix-blend-multiply" />
          </div>
          <p className="text-xs text-muted-foreground">
            © {year} Resinkra. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
});

LandingFooter.displayName = "LandingFooter";
