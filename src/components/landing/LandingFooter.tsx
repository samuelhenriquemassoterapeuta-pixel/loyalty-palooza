import logoMarrom from "@/assets/logo-marrom.png";
import simboloVerde from "@/assets/simbolo-verde.png";
import heroBg from "@/assets/hero-options/hero-spa-resinkra.jpg";

export const LandingFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-20 lg:py-28 border-t border-border overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/75" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
