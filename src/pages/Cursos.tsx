import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GraduationCap, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/AppLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const CursoVendas = lazy(() => import("@/pages/CursoVendas"));
const CursoAromaterapia = lazy(() => import("@/pages/CursoAromaterapia"));

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
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="vendas" className="gap-2">
                <GraduationCap size={16} />
                Vendas
              </TabsTrigger>
              <TabsTrigger value="aromaterapia" className="gap-2">
                <Flower2 size={16} />
                Aromaterapia
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Suspense fallback={<div className="flex justify-center py-12"><LoadingSpinner /></div>}>
          {tab === "vendas" ? <CursoVendasContent /> : <CursoAromaterapiaContent />}
        </Suspense>
      </div>
    </AppLayout>
  );
}

// Inline wrappers that render course content without their own AppLayout
// We need to modify the child pages to support embedded mode
function CursoVendasContent() {
  return <CursoVendas embedded />;
}

function CursoAromaterapiaContent() {
  return <CursoAromaterapia embedded />;
}
