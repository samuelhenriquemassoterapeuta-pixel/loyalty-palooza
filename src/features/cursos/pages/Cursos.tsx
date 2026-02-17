import { useSearchParams } from "react-router-dom";
import { GraduationCap, Flower2, Sparkles, Bone, Gem, Hand, Droplets, Flame, Bath, Wind, Leaf, FlaskConical, Fingerprint, Waves, ChefHat, Bandage, DollarSign, LucideIcon } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { AnimatedPageBackground } from "@/components/AnimatedPageBackground";
import { lazy, Suspense, useMemo, useRef, useEffect } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CursosHubHero } from "@/features/cursos/components/CursosHubHero";
import { CursoTabButton } from "@/features/cursos/components/CursoTabButton";
import { ContinueWatchingCard } from "@/features/cursos/components/ContinueWatchingCard";
import { allCourseStats } from "@/features/cursos/data/cursosHubStats";
import { useAdmin } from "@/features/admin/hooks/useAdmin";
import { MonetizacaoCursosTab } from "@/features/cursos/components/MonetizacaoCursosTab";

const CursoVendasHero = lazy(() => import("@/features/cursos/pages/CursoVendasHero"));
const CursoAromaterapiaHero = lazy(() => import("@/features/cursos/pages/CursoAromaterapiaHero"));
const CursoHeadSpaHero = lazy(() => import("@/features/cursos/pages/CursoHeadSpaHero"));
const CursoAnatomiaHero = lazy(() => import("@/features/cursos/pages/CursoAnatomiaHero"));
const CursoYugenFaceSpaHero = lazy(() => import("@/features/cursos/pages/CursoYugenFaceSpaHero"));
const CursoMetodoResinkraHero = lazy(() => import("@/features/cursos/pages/CursoMetodoResinkraHero"));
const CursoPerfumariaNaturalHero = lazy(() => import("@/features/cursos/pages/CursoPerfumariaNaturalHero"));
const CursoVelasAromaticasHero = lazy(() => import("@/features/cursos/pages/CursoVelasAromaticasHero"));
const CursoSaboariaArtesanalHero = lazy(() => import("@/features/cursos/pages/CursoSaboariaArtesanalHero"));
const CursoDifusorAmbientesHero = lazy(() => import("@/features/cursos/pages/CursoDifusorAmbientesHero"));
const CursoFitoterapiaHero = lazy(() => import("@/features/cursos/pages/CursoFitoterapiaHero"));
const CursoOleosEssenciaisHero = lazy(() => import("@/features/cursos/pages/CursoOleosEssenciaisHero"));
const CursoMassagemModeladoraHero = lazy(() => import("@/features/cursos/pages/CursoMassagemModeladoraHero"));
const CursoDrenagemLinfaticaHero = lazy(() => import("@/features/cursos/pages/CursoDrenagemLinfaticaHero"));
const CursoGastronomiaSaudavelHero = lazy(() => import("@/features/cursos/pages/CursoGastronomiaSaudavelHero"));
const CursoSeitaiHero = lazy(() => import("@/features/cursos/pages/CursoSeitaiHero"));
const CursoBandagemElasticaHero = lazy(() => import("@/features/cursos/pages/CursoBandagemElasticaHero"));

interface TabDef {
  value: string;
  label: string;
  icon: LucideIcon;
  storageKey: string;
  totalAulas: number;
}

const tabDefs: TabDef[] = [
  { value: "metodo", label: "Método", icon: Hand, storageKey: "resinkra_curso_metodo_resinkra_progress", totalAulas: 0 },
  { value: "vendas", label: "Vendas", icon: GraduationCap, storageKey: "resinkra_curso_vendas_progress", totalAulas: 0 },
  { value: "aromaterapia", label: "Aroma", icon: Flower2, storageKey: "resinkra_curso_aromaterapia_progress", totalAulas: 0 },
  { value: "headspa", label: "Head SPA", icon: Sparkles, storageKey: "resinkra_curso_headspa_progress", totalAulas: 0 },
  { value: "anatomia", label: "Anatomia", icon: Bone, storageKey: "resinkra_curso_anatomia_progress", totalAulas: 0 },
  { value: "facespa", label: "FaceSPA", icon: Gem, storageKey: "resinkra_curso_yugen_facespa_progress", totalAulas: 0 },
  { value: "perfumaria", label: "Perfumaria", icon: Droplets, storageKey: "resinkra_curso_perfumaria_natural_progress", totalAulas: 0 },
  { value: "velas", label: "Velas", icon: Flame, storageKey: "resinkra_curso_velas_aromaticas_progress", totalAulas: 0 },
  { value: "saboaria", label: "Saboaria", icon: Bath, storageKey: "resinkra_curso_saboaria_artesanal_progress", totalAulas: 0 },
  { value: "difusor", label: "Difusor", icon: Wind, storageKey: "resinkra_curso_difusor_ambientes_progress", totalAulas: 0 },
  { value: "fitoterapia", label: "Fitoterapia", icon: Leaf, storageKey: "resinkra_curso_fitoterapia_progress", totalAulas: 0 },
  { value: "oleos", label: "Óleos", icon: FlaskConical, storageKey: "resinkra_curso_oleos_essenciais_progress", totalAulas: 0 },
  { value: "modeladora", label: "Modeladora", icon: Fingerprint, storageKey: "resinkra_curso_massagem_modeladora_progress", totalAulas: 0 },
  { value: "drenagem", label: "Drenagem", icon: Waves, storageKey: "resinkra_curso_drenagem_linfatica_progress", totalAulas: 0 },
  { value: "gastronomia", label: "Gastronomia", icon: ChefHat, storageKey: "resinkra_curso_gastronomia_saudavel_progress", totalAulas: 0 },
  { value: "seitai", label: "Seitai", icon: Fingerprint, storageKey: "resinkra_curso_seitai_progress", totalAulas: 0 },
  { value: "bandagem", label: "Bandagem", icon: Bandage, storageKey: "resinkra_curso_bandagem_elastica_progress", totalAulas: 0 },
];

function getProgress(storageKey: string): number {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? (JSON.parse(saved) as string[]).length : 0;
  } catch {
    return 0;
  }
}

// Map course stats totalAulas into tabDefs
function enrichTabs(): TabDef[] {
  const statsMap = new Map(allCourseStats.map((c) => [c.storageKey, c.totalAulas]));
  return tabDefs.map((t) => ({ ...t, totalAulas: statsMap.get(t.storageKey) ?? 0 }));
}

const courseForContinue = allCourseStats.map((c, i) => ({
  title: c.title,
  storageKey: c.storageKey,
  totalAulas: c.totalAulas,
  tabValue: tabDefs[i]?.value ?? "",
}));

export default function Cursos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "metodo";
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isAdmin } = useAdmin();

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value }, { replace: true });
  };

  const enrichedTabs = useMemo(() => enrichTabs(), []);

  // Smart sort: in-progress first, then not started, then completed
  const sortedTabs = useMemo(() => {
    return [...enrichedTabs].sort((a, b) => {
      const aPct = a.totalAulas > 0 ? getProgress(a.storageKey) / a.totalAulas : 0;
      const bPct = b.totalAulas > 0 ? getProgress(b.storageKey) / b.totalAulas : 0;
      const aStarted = getProgress(a.storageKey) > 0;
      const bStarted = getProgress(b.storageKey) > 0;

      // In progress (started but not 100%) first
      const aInProgress = aStarted && aPct < 1;
      const bInProgress = bStarted && bPct < 1;
      if (aInProgress && !bInProgress) return -1;
      if (!aInProgress && bInProgress) return 1;

      // Then not started
      if (!aStarted && bStarted) return -1;
      if (aStarted && !bStarted) return 1;

      // Then by pct descending
      return bPct - aPct;
    });
  }, [enrichedTabs]);

  // Scroll active tab into view
  useEffect(() => {
    if (!scrollRef.current) return;
    const activeBtn = scrollRef.current.querySelector(`[data-tab="${tab}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [tab]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-32 lg:pb-8 relative">
        <AnimatedPageBackground />
        <CursosHubHero courses={allCourseStats} />

        <div className="max-w-lg mx-auto px-4 pt-4 space-y-3 relative z-10">
          {/* Continue Watching */}
          <ContinueWatchingCard courses={courseForContinue} onSelect={handleTabChange} />

          {/* Horizontal scroll tabs */}
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {sortedTabs.map((t) => {
              const completed = getProgress(t.storageKey);
              const pct = t.totalAulas > 0 ? Math.round((completed / t.totalAulas) * 100) : 0;
              return (
                <div key={t.value} data-tab={t.value}>
                  <CursoTabButton
                    label={t.label}
                    icon={t.icon}
                    value={t.value}
                    active={tab === t.value}
                    pct={pct}
                    onClick={() => handleTabChange(t.value)}
                  />
                </div>
              );
            })}
            {isAdmin && (
              <div data-tab="monetizacao">
                <CursoTabButton
                  label="Monetização"
                  icon={DollarSign}
                  value="monetizacao"
                  active={tab === "monetizacao"}
                  pct={0}
                  onClick={() => handleTabChange("monetizacao")}
                />
              </div>
            )}
          </div>
        </div>

        <Suspense fallback={<div className="flex justify-center py-12"><LoadingSpinner /></div>}>
          {tab === "monetizacao" && isAdmin ? (
            <MonetizacaoCursosTab />
          ) : (
            <>
              {tab === "metodo" && <CursoMetodoResinkraHero embedded />}
              {tab === "vendas" && <CursoVendasHero embedded />}
              {tab === "aromaterapia" && <CursoAromaterapiaHero embedded />}
              {tab === "headspa" && <CursoHeadSpaHero embedded />}
              {tab === "anatomia" && <CursoAnatomiaHero embedded />}
              {tab === "facespa" && <CursoYugenFaceSpaHero embedded />}
              {tab === "perfumaria" && <CursoPerfumariaNaturalHero embedded />}
              {tab === "velas" && <CursoVelasAromaticasHero embedded />}
              {tab === "saboaria" && <CursoSaboariaArtesanalHero embedded />}
              {tab === "difusor" && <CursoDifusorAmbientesHero embedded />}
              {tab === "fitoterapia" && <CursoFitoterapiaHero embedded />}
              {tab === "oleos" && <CursoOleosEssenciaisHero embedded />}
              {tab === "modeladora" && <CursoMassagemModeladoraHero embedded />}
              {tab === "drenagem" && <CursoDrenagemLinfaticaHero embedded />}
              {tab === "gastronomia" && <CursoGastronomiaSaudavelHero embedded />}
              {tab === "seitai" && <CursoSeitaiHero embedded />}
              {tab === "bandagem" && <CursoBandagemElasticaHero embedded />}
            </>
          )}
        </Suspense>
      </div>
    </AppLayout>
  );
}
