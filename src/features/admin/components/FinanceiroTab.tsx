import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, FileText, RotateCcw, Users, BarChart3, ArrowLeftRight, Receipt, HandCoins } from "lucide-react";
import AdminFinanceiroDashboard from "@/components/admin/financeiro/AdminFinanceiroDashboard";
import AdminContasPagar from "@/components/admin/financeiro/AdminContasPagar";
import AdminContasReceber from "@/components/admin/financeiro/AdminContasReceber";
import AdminDespesasRecorrentes from "@/components/admin/financeiro/AdminDespesasRecorrentes";
import AdminFornecedores from "@/components/admin/financeiro/AdminFornecedores";
import AdminDRE from "@/components/admin/financeiro/AdminDRE";
import AdminFluxoCaixa from "@/components/admin/financeiro/AdminFluxoCaixa";
import AdminRepasses from "@/components/admin/financeiro/AdminRepasses";

const FinanceiroTab = () => {
  const [subTab, setSubTab] = useState("dashboard");

  return (
    <Tabs value={subTab} onValueChange={setSubTab} className="space-y-4">
      <TabsList className="flex flex-wrap gap-1">
        <TabsTrigger value="dashboard" className="gap-1.5 text-xs">
          <LayoutDashboard size={14} />
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="dre" className="gap-1.5 text-xs">
          <BarChart3 size={14} />
          DRE
        </TabsTrigger>
        <TabsTrigger value="fluxo" className="gap-1.5 text-xs">
          <ArrowLeftRight size={14} />
          Fluxo de Caixa
        </TabsTrigger>
        <TabsTrigger value="contas" className="gap-1.5 text-xs">
          <FileText size={14} />
          Contas a Pagar
        </TabsTrigger>
        <TabsTrigger value="receber" className="gap-1.5 text-xs">
          <Receipt size={14} />
          Contas a Receber
        </TabsTrigger>
        <TabsTrigger value="recorrentes" className="gap-1.5 text-xs">
          <RotateCcw size={14} />
          Recorrentes
        </TabsTrigger>
        <TabsTrigger value="repasses" className="gap-1.5 text-xs">
          <HandCoins size={14} />
          Repasses
        </TabsTrigger>
        <TabsTrigger value="fornecedores" className="gap-1.5 text-xs">
          <Users size={14} />
          Fornecedores
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <AdminFinanceiroDashboard />
      </TabsContent>
      <TabsContent value="dre">
        <AdminDRE />
      </TabsContent>
      <TabsContent value="fluxo">
        <AdminFluxoCaixa />
      </TabsContent>
      <TabsContent value="contas">
        <AdminContasPagar />
      </TabsContent>
      <TabsContent value="receber">
        <AdminContasReceber />
      </TabsContent>
      <TabsContent value="recorrentes">
        <AdminDespesasRecorrentes />
      </TabsContent>
      <TabsContent value="fornecedores">
        <AdminFornecedores />
      </TabsContent>
      <TabsContent value="repasses">
        <AdminRepasses />
      </TabsContent>
    </Tabs>
  );
};

export default FinanceiroTab;
