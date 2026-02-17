import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Database,
  Plus,
  Pencil,
  Trash2,
  Clock,
  User,
  FileJson,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAuditLogs, AuditLog, AuditLogFilters } from "@/features/admin/hooks/useAuditLogs";

const TABLE_LABELS: Record<string, string> = {
  transacoes: "Transações",
  indicacoes: "Indicações",
  pedidos: "Pedidos",
  pacotes_usuario: "Pacotes do Usuário",
};

const OPERATION_LABELS: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  INSERT: { label: "Criação", color: "bg-green-500/10 text-green-600 border-green-500/20", icon: <Plus size={14} /> },
  UPDATE: { label: "Atualização", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: <Pencil size={14} /> },
  DELETE: { label: "Exclusão", color: "bg-red-500/10 text-red-600 border-red-500/20", icon: <Trash2 size={14} /> },
};

const AuditLogItem = ({ log }: { log: AuditLog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const operationInfo = OPERATION_LABELS[log.operation];

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <Card className="overflow-hidden">
        <CollapsibleTrigger asChild>
          <button className="w-full p-4 text-left hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <Badge variant="outline" className={operationInfo.color}>
                    <span className="mr-1">{operationInfo.icon}</span>
                    {operationInfo.label}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Database size={12} />
                    {TABLE_LABELS[log.table_name] || log.table_name}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {format(new Date(log.created_at), "dd/MM/yyyy HH:mm:ss", { locale: ptBR })}
                  </span>
                  {log.user_id && (
                    <span className="flex items-center gap-1 truncate max-w-[180px]" title={log.user_id}>
                      <User size={14} />
                      {log.user_id.slice(0, 8)}...
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  ID: {log.record_id}
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileJson size={16} />
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
          </button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 pt-0 space-y-3 border-t">
            {log.old_data && (
              <div className="mt-3">
                <Label className="text-xs text-muted-foreground mb-1 block">Dados Anteriores</Label>
                <pre className="text-xs bg-red-50 dark:bg-red-950/20 p-3 rounded-lg overflow-x-auto text-red-700 dark:text-red-400">
                  {JSON.stringify(log.old_data, null, 2)}
                </pre>
              </div>
            )}
            
            {log.new_data && (
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Dados Novos</Label>
                <pre className="text-xs bg-green-50 dark:bg-green-950/20 p-3 rounded-lg overflow-x-auto text-green-700 dark:text-green-400">
                  {JSON.stringify(log.new_data, null, 2)}
                </pre>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div>
                <Label className="text-muted-foreground">Record ID</Label>
                <p className="font-mono break-all">{log.record_id}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">User ID</Label>
                <p className="font-mono break-all">{log.user_id || "N/A"}</p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export const AuditLogsViewer = () => {
  const [filters, setFilters] = useState<AuditLogFilters>({
    tableName: "all",
    operation: "all",
    searchTerm: "",
    dateFrom: "",
    dateTo: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const { data: logs = [], isLoading, error } = useAuditLogs(filters);

  const updateFilter = (key: keyof AuditLogFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      tableName: "all",
      operation: "all",
      searchTerm: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  const hasActiveFilters =
    filters.tableName !== "all" ||
    filters.operation !== "all" ||
    filters.searchTerm ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ID, usuário ou conteúdo..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant={showFilters ? "secondary" : "outline"}
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
          </Button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Tabela</Label>
                    <Select value={filters.tableName} onValueChange={(v) => updateFilter("tableName", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas as tabelas" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="transacoes">Transações</SelectItem>
                        <SelectItem value="indicacoes">Indicações</SelectItem>
                        <SelectItem value="pedidos">Pedidos</SelectItem>
                        <SelectItem value="pacotes_usuario">Pacotes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label className="text-sm">Operação</Label>
                    <Select value={filters.operation} onValueChange={(v) => updateFilter("operation", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas as operações" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="INSERT">Criação</SelectItem>
                        <SelectItem value="UPDATE">Atualização</SelectItem>
                        <SelectItem value="DELETE">Exclusão</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label className="text-sm">Data inicial</Label>
                    <Input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => updateFilter("dateFrom", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label className="text-sm">Data final</Label>
                    <Input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => updateFilter("dateTo", e.target.value)}
                    />
                  </div>
                </div>
                
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
                    Limpar filtros
                  </Button>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {isLoading ? "Carregando..." : `${logs.length} registro${logs.length !== 1 ? "s" : ""} encontrado${logs.length !== 1 ? "s" : ""}`}
        </span>
        {hasActiveFilters && (
          <Badge variant="secondary" className="text-xs">
            Filtros ativos
          </Badge>
        )}
      </div>

      {/* Logs List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <Card className="p-6 text-center">
          <p className="text-destructive">Erro ao carregar logs de auditoria</p>
          <p className="text-sm text-muted-foreground mt-1">
            Verifique se você tem permissão de administrador.
          </p>
        </Card>
      ) : logs.length === 0 ? (
        <Card className="p-6 text-center">
          <Database className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Nenhum registro encontrado</p>
          <p className="text-sm text-muted-foreground mt-1">
            {hasActiveFilters
              ? "Tente ajustar os filtros"
              : "Os logs aparecerão quando houver operações nas tabelas monitoradas"}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AuditLogItem log={log} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
