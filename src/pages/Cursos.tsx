import { useSearchParams } from "react-router-dom";
import { GraduationCap, Flower2, Sparkles, Bone, Gem, Hand } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CursosHubHero } from "@/components/curso/CursosHubHero";
import { allCourseStats } from "@/data/cursosHubStats";

const CursoVendasHero = lazy(() => import("@/pages/CursoVendasHero"));
const CursoAromaterapiaHero = lazy(() => import("@/pages/CursoAromaterapiaHero"));
const CursoHeadSpaHero = lazy(() => import("@/pages/CursoHeadSpaHero"));
const CursoAnatomiaHero = lazy(() => import("@/pages/CursoAnatomiaHero"));
const CursoYugenFaceSpaHero = lazy(() => import("@/pages/CursoYugenFaceSpaHero"));
const CursoMetodoResinkraHero = lazy(() => import("@/pages/CursoMetodoResinkraHero"));

export default function Cursos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "metodo";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value }, { replace: true });
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-32 lg:pb-8">
        {/* Hero Section */}
        <CursosHubHero courses={allCourseStats} />

        <div className="max-w-lg mx-auto px-4 pt-4">
          <Tabs value={tab} onValueChange={handleTabChange}>
            <TabsList className="w-full grid grid-cols-6 mb-4">
              <TabsTrigger value="metodo" className="gap-1 text-xs px-1">
                <Hand size={14} />
                <span className="hidden sm:inline">Método</span>
              </TabsTrigger>
              <TabsTrigger value="vendas" className="gap-1 text-xs px-1">
                <GraduationCap size={14} />
                <span className="hidden sm:inline">Vendas</span>
              </TabsTrigger>
              <TabsTrigger value="aromaterapia" className="gap-1 text-xs px-1">
                <Flower2 size={14} />
                <span className="hidden sm:inline">Aroma</span>
              </TabsTrigger>
              <TabsTrigger value="headspa" className="gap-1 text-xs px-1">
                <Sparkles size={14} />
                <span className="hidden sm:inline">Head SPA</span>
              </TabsTrigger>
              <TabsTrigger value="anatomia" className="gap-1 text-xs px-1">
                <Bone size={14} />
                <span className="hidden sm:inline">Anatomia</span>
              </TabsTrigger>
              <TabsTrigger value="facespa" className="gap-1 text-xs px-1">
                <Gem size={14} />
                <span className="hidden sm:inline">FaceSPA</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Suspense fallback={<div className="flex justify-center py-12"><LoadingSpinner /></div>}>
          {tab === "metodo" && <CursoMetodoResinkraHero embedded />}
          {tab === "vendas" && <CursoVendasHero embedded />}
          {tab === "aromaterapia" && <CursoAromaterapiaHero embedded />}
          {tab === "headspa" && <CursoHeadSpaHero embedded />}
          {tab === "anatomia" && <CursoAnatomiaHero embedded />}
          {tab === "facespa" && <CursoYugenFaceSpaHero embedded />}
        </Suspense>
      </div>
    </AppLayout>
  );
}
