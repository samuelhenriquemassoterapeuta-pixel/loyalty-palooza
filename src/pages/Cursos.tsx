import { useSearchParams } from "react-router-dom";
import { GraduationCap, Flower2, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const CursoVendas = lazy(() => import("@/pages/CursoVendas"));
const CursoAromaterapia = lazy(() => import("@/pages/CursoAromaterapia"));
const CursoHeadSpa = lazy(() => import("@/pages/CursoHeadSpa"));

export default function Cursos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "vendas";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value }, { replace: true });
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-32 lg:pb-8">
        <div className="max-w-lg mx-auto px-4 pt-6">
          <Tabs value={tab} onValueChange={handleTabChange}>
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="vendas" className="gap-1.5 text-xs">
                <GraduationCap size={14} />
                Vendas
              </TabsTrigger>
              <TabsTrigger value="aromaterapia" className="gap-1.5 text-xs">
                <Flower2 size={14} />
                Aromaterapia
              </TabsTrigger>
              <TabsTrigger value="headspa" className="gap-1.5 text-xs">
                <Sparkles size={14} />
                Head SPA
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Suspense fallback={<div className="flex justify-center py-12"><LoadingSpinner /></div>}>
          {tab === "vendas" && <CursoVendas embedded />}
          {tab === "aromaterapia" && <CursoAromaterapia embedded />}
          {tab === "headspa" && <CursoHeadSpa embedded />}
        </Suspense>
      </div>
    </AppLayout>
  );
}
