import logoMarrom from "@/assets/logo-marrom.png";
import simboloVerde from "@/assets/simbolo-verde.png";

export const LandingFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
};
