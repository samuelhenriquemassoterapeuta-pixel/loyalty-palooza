import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Activity, Shield, Zap, AlertTriangle, CheckCircle2, XCircle, Clock,
  Play, Trash2, Download, RefreshCw, BarChart3, Lock, FileText, Loader2,
  Server, Wifi, Heart
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

interface TestResult {
  name: string;
  api: string;
  category: string;
  status: "pass" | "fail" | "warn" | "skip";
  message: string;
  responseTime?: number;
  statusCode?: number;
  details?: unknown;
}

interface PerfMetrics {
  avg: number;
  p95: number;
  p99: number;
  min: number;
  max: number;
}

const statusIcon = (s: string) => {
  if (s === "pass") return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
  if (s === "fail") return <XCircle className="w-4 h-4 text-red-500" />;
  if (s === "warn") return <AlertTriangle className="w-4 h-4 text-amber-500" />;
  return <Clock className="w-4 h-4 text-muted-foreground" />;
};

const statusColor = (s: string) => {
  if (s === "pass") return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
  if (s === "fail") return "bg-red-500/10 text-red-600 border-red-500/20";
  if (s === "warn") return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  return "bg-muted text-muted-foreground border-border";
};

const ApiTestDashboard = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [perfResults, setPerfResults] = useState<TestResult[]>([]);
  const [perfMetrics, setPerfMetrics] = useState<PerfMetrics | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState<number | null>(null);
  const [totalTests, setTotalTests] = useState(0);

  const invoke = useCallback(async (action: string, extra?: Record<string, unknown>) => {
    setLoading(prev => ({ ...prev, [action]: true }));
    try {
      const { data, error } = await supabase.functions.invoke("api-test-suite", {
        body: { action, ...extra },
      });
      if (error) throw error;
      return data;
    } catch (e: any) {
      toast.error(`Erro: ${e.message || "Falha na requisição"}`);
      return null;
    } finally {
      setLoading(prev => ({ ...prev, [action]: false }));
    }
  }, []);

  const runHealth = async () => {
    const data = await invoke("health");
    if (data?.results) { setResults(prev => [...prev.filter(r => r.category !== "health"), ...data.results]); toast.success(`${data.results.filter((r: TestResult) => r.status === "pass").length}/${data.results.length} health checks passaram`); }
  };

  const runApi = async (api: string) => {
    const data = await invoke(api);
    if (data?.results) { setResults(prev => [...prev.filter(r => r.api !== api || r.category === "health"), ...data.results]); toast.success(`${api}: ${data.results.filter((r: TestResult) => r.status === "pass").length}/${data.results.length} testes passaram`); }
  };

  const runPerf = async (api: string, count: number) => {
    const data = await invoke("performance", { api, count });
    if (data) { setPerfResults(data.results); setPerfMetrics(data.metrics); toast.success(`Performance: avg ${data.metrics.avg}ms, p95 ${data.metrics.p95}ms`); }
  };

  const runSecurity = async () => {
    const data = await invoke("security");
    if (data?.results) { setResults(prev => [...prev.filter(r => r.category !== "security"), ...data.results]); }
  };

  const runFull = async () => {
    const data = await invoke("full");
    if (data) { setResults(data.results); setScore(data.score); setTotalTests(data.total); toast.success(`Score: ${data.score}/100 (${data.total} testes)`); }
  };

  const fetchLogs = async () => {
    const data = await invoke("logs", { limit: 100 });
    if (data?.logs) { setLogs(data.logs); toast.success(`${data.logs.length} logs carregados`); }
  };

  const clearLogs = async () => {
    await invoke("clear-logs");
    setLogs([]);
    toast.success("Logs limpos");
  };

  const exportData = (data: unknown, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const passed = results.filter(r => r.status === "pass").length;
  const failed = results.filter(r => r.status === "fail").length;
  const warnings = results.filter(r => r.status === "warn").length;

  const perfChartData = perfResults.map((r, i) => ({ name: `#${i + 1}`, time: r.responseTime || 0, status: r.status }));

  const apiGroups = ["gemini", "asaas", "zapi", "resend", "elevenlabs", "security"];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Server className="w-8 h-8 text-primary" />
              API Test Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Testes profundos de todas as integrações</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {score !== null && (
              <div className={`text-2xl font-bold px-4 py-2 rounded-xl ${score >= 80 ? "bg-emerald-500/10 text-emerald-600" : score >= 50 ? "bg-amber-500/10 text-amber-600" : "bg-red-500/10 text-red-600"}`}>
                {score}/100
              </div>
            )}
            <Button onClick={runFull} disabled={loading.full} size="lg" className="gap-2">
              {loading.full ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              Run Full Suite
            </Button>
            <Button variant="outline" onClick={() => { setResults([]); setPerfResults([]); setPerfMetrics(null); setScore(null); }} className="gap-2">
              <RefreshCw className="w-4 h-4" /> Reset
            </Button>
            <Button variant="outline" onClick={() => exportData({ results, perfMetrics, score, timestamp: new Date().toISOString() }, "api-tests-report.json")} className="gap-2">
              <Download className="w-4 h-4" /> Exportar
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        {results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold">{results.length}</div><p className="text-xs text-muted-foreground mt-1">Total</p></CardContent></Card>
            <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold text-emerald-600">{passed}</div><p className="text-xs text-muted-foreground mt-1">Passou</p></CardContent></Card>
            <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold text-red-600">{failed}</div><p className="text-xs text-muted-foreground mt-1">Falhou</p></CardContent></Card>
            <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold text-amber-600">{warnings}</div><p className="text-xs text-muted-foreground mt-1">Avisos</p></CardContent></Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="health" className="w-full">
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
            <TabsTrigger value="health" className="gap-1 text-xs md:text-sm"><Heart className="w-3 h-3" /> Health</TabsTrigger>
            <TabsTrigger value="endpoints" className="gap-1 text-xs md:text-sm"><Wifi className="w-3 h-3" /> Endpoints</TabsTrigger>
            <TabsTrigger value="permissions" className="gap-1 text-xs md:text-sm"><Lock className="w-3 h-3" /> Permissões</TabsTrigger>
            <TabsTrigger value="performance" className="gap-1 text-xs md:text-sm"><Zap className="w-3 h-3" /> Performance</TabsTrigger>
            <TabsTrigger value="errors" className="gap-1 text-xs md:text-sm"><AlertTriangle className="w-3 h-3" /> Erros</TabsTrigger>
            <TabsTrigger value="security" className="gap-1 text-xs md:text-sm"><Shield className="w-3 h-3" /> Segurança</TabsTrigger>
            <TabsTrigger value="logs" className="gap-1 text-xs md:text-sm"><FileText className="w-3 h-3" /> Logs</TabsTrigger>
            <TabsTrigger value="charts" className="gap-1 text-xs md:text-sm"><BarChart3 className="w-3 h-3" /> Gráficos</TabsTrigger>
          </TabsList>

          {/* Health */}
          <TabsContent value="health" className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Button onClick={runHealth} disabled={loading.health} variant="outline" className="gap-2">
                {loading.health ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />} Health Check
              </Button>
            </div>
            <ResultTable results={results.filter(r => r.category === "health")} />
          </TabsContent>

          {/* Endpoints */}
          <TabsContent value="endpoints" className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {["gemini", "asaas", "uazapi"].map(api => (
                <Button key={api} onClick={() => runApi(api)} disabled={loading[api]} variant="outline" className="gap-2 capitalize">
                  {loading[api] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wifi className="w-4 h-4" />} {api}
                </Button>
              ))}
            </div>
            <ResultTable results={results.filter(r => r.category === "endpoint")} />
          </TabsContent>

          {/* Permissions */}
          <TabsContent value="permissions" className="space-y-4">
            <p className="text-sm text-muted-foreground">Testes de permissões e escopos são executados durante os testes de endpoint.</p>
            <ResultTable results={results.filter(r => r.category === "permissions")} />
          </TabsContent>

          {/* Performance */}
          <TabsContent value="performance" className="space-y-4">
            <div className="flex gap-2 flex-wrap items-center">
              <Button onClick={() => runPerf("gemini", 10)} disabled={loading.performance} variant="outline" className="gap-2">
                {loading.performance ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />} Gemini (10 req)
              </Button>
              <Button onClick={() => runPerf("asaas", 10)} disabled={loading.performance} variant="outline" className="gap-2">
                {loading.performance ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />} Asaas (10 req)
              </Button>
            </div>
            {perfMetrics && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {Object.entries(perfMetrics).map(([k, v]) => (
                  <Card key={k}><CardContent className="pt-4 text-center"><div className="text-xl font-mono font-bold">{v}ms</div><p className="text-xs text-muted-foreground">{k.toUpperCase()}</p></CardContent></Card>
                ))}
              </div>
            )}
            {perfChartData.length > 0 && (
              <Card><CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={perfChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis unit="ms" className="text-xs" />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                    <Line type="monotone" dataKey="time" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent></Card>
            )}
          </TabsContent>

          {/* Error handling */}
          <TabsContent value="errors" className="space-y-4">
            <p className="text-sm text-muted-foreground">Testes de resiliência (payload inválido, chaves falsas) executados nos testes de endpoint.</p>
            <ResultTable results={results.filter(r => r.category === "error_handling")} />
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-4">
            <Button onClick={runSecurity} disabled={loading.security} variant="outline" className="gap-2">
              {loading.security ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />} Auditoria de Segurança
            </Button>
            <ResultTable results={results.filter(r => r.category === "security")} />
          </TabsContent>

          {/* Logs */}
          <TabsContent value="logs" className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={fetchLogs} disabled={loading.logs} variant="outline" className="gap-2">
                {loading.logs ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />} Carregar Logs
              </Button>
              <Button onClick={clearLogs} disabled={loading["clear-logs"]} variant="destructive" className="gap-2">
                <Trash2 className="w-4 h-4" /> Limpar
              </Button>
              <Button onClick={() => exportData(logs, "api-logs.json")} variant="outline" className="gap-2">
                <Download className="w-4 h-4" /> Exportar JSON
              </Button>
            </div>
            {logs.length > 0 && (
              <div className="rounded-lg border overflow-auto max-h-[500px]">
                <table className="w-full text-xs">
                  <thead className="bg-muted/50 sticky top-0">
                    <tr>
                      <th className="p-2 text-left">Hora</th>
                      <th className="p-2 text-left">Função</th>
                      <th className="p-2 text-left">Nível</th>
                      <th className="p-2 text-left">Mensagem</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((l, i) => (
                      <tr key={i} className="border-t hover:bg-muted/30">
                        <td className="p-2 font-mono whitespace-nowrap">{new Date(l.created_at).toLocaleString("pt-BR")}</td>
                        <td className="p-2">{l.function_name}</td>
                        <td className="p-2"><Badge variant="outline" className={l.level === "error" ? "text-red-500" : l.level === "warn" ? "text-amber-500" : "text-emerald-500"}>{l.level}</Badge></td>
                        <td className="p-2 max-w-xs truncate">{l.message}</td>
                        <td className="p-2">{l.status_code || "-"}</td>
                        <td className="p-2">{l.duration_ms ? `${l.duration_ms}ms` : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          {/* Charts */}
          <TabsContent value="charts" className="space-y-4">
            {results.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader><CardTitle className="text-base">Status por API</CardTitle></CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={apiGroups.map(api => {
                        const apiResults = results.filter(r => r.api === api);
                        return { name: api, pass: apiResults.filter(r => r.status === "pass").length, fail: apiResults.filter(r => r.status === "fail").length, warn: apiResults.filter(r => r.status === "warn").length };
                      }).filter(d => d.pass + d.fail + d.warn > 0)}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="name" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                        <Bar dataKey="pass" fill="#10b981" stackId="a" />
                        <Bar dataKey="fail" fill="#ef4444" stackId="a" />
                        <Bar dataKey="warn" fill="#f59e0b" stackId="a" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-base">Tempo de Resposta (ms)</CardTitle></CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={results.filter(r => r.responseTime).map(r => ({ name: r.name.substring(0, 15), time: r.responseTime, api: r.api }))}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="name" className="text-xs" angle={-30} textAnchor="end" height={60} />
                        <YAxis unit="ms" className="text-xs" />
                        <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                        <Bar dataKey="time" fill="hsl(var(--primary))">
                          {results.filter(r => r.responseTime).map((r, i) => (
                            <Cell key={i} fill={r.status === "pass" ? "#10b981" : r.status === "fail" ? "#ef4444" : "#f59e0b"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            )}
            {results.length === 0 && <p className="text-center text-muted-foreground py-12">Execute os testes para ver os gráficos</p>}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const ResultTable = ({ results }: { results: TestResult[] }) => {
  if (results.length === 0) return <p className="text-center text-muted-foreground py-8">Nenhum resultado. Execute os testes acima.</p>;
  return (
    <div className="rounded-lg border overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Teste</th>
            <th className="p-3 text-left">API</th>
            <th className="p-3 text-left">Mensagem</th>
            <th className="p-3 text-left">Tempo</th>
            <th className="p-3 text-left">HTTP</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i} className="border-t hover:bg-muted/30">
              <td className="p-3">{statusIcon(r.status)}</td>
              <td className="p-3 font-medium">{r.name}</td>
              <td className="p-3"><Badge variant="outline" className="text-xs capitalize">{r.api}</Badge></td>
              <td className="p-3 text-muted-foreground max-w-xs truncate">{r.message}</td>
              <td className="p-3 font-mono text-xs">{r.responseTime ? `${r.responseTime}ms` : "-"}</td>
              <td className="p-3"><Badge variant="outline" className={`text-xs ${statusColor(r.status)}`}>{r.statusCode || "-"}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiTestDashboard;
