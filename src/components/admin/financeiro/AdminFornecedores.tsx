import { useState } from "react";
import { useFornecedores } from "@/hooks/financeiro";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Building2, Phone, Mail, Trash2 } from "lucide-react";

export default function AdminFornecedores() {
  const { fornecedores, criarFornecedor, desativarFornecedor, isCriando } = useFornecedores();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    cpf_cnpj: "",
    email: "",
    telefone: "",
    chave_pix: "",
  });

  const handleCriar = async () => {
    await criarFornecedor(form);
    setShowForm(false);
    setForm({ nome: "", cpf_cnpj: "", email: "", telefone: "", chave_pix: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {fornecedores.length} fornecedores ativos
        </span>
        <Button size="sm" className="gap-1" onClick={() => setShowForm(true)}>
          <Plus className="h-3.5 w-3.5" /> Novo Fornecedor
        </Button>
      </div>

      <div className="space-y-2">
        {fornecedores.map((f) => (
          <Card key={f.id}>
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Building2 className="h-5 w-5 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{f.nome}</p>
                  <p className="text-[10px] text-muted-foreground">{f.cpf_cnpj || "Sem CNPJ"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground shrink-0">
                {f.telefone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {f.telefone}
                  </span>
                )}
                {f.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" /> {f.email}
                  </span>
                )}
                {f.chave_pix && <span>PIX: {f.chave_pix}</span>}
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => desativarFornecedor(f.id)}
                >
                  <Trash2 className="h-3.5 w-3.5 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {fornecedores.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhum fornecedor cadastrado
          </p>
        )}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Fornecedor</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
            />
            <Input
              placeholder="CPF/CNPJ"
              value={form.cpf_cnpj}
              onChange={(e) => setForm((p) => ({ ...p, cpf_cnpj: e.target.value }))}
            />
            <Input
              placeholder="E-mail"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            />
            <Input
              placeholder="Telefone"
              value={form.telefone}
              onChange={(e) => setForm((p) => ({ ...p, telefone: e.target.value }))}
            />
            <Input
              placeholder="Chave PIX"
              value={form.chave_pix}
              onChange={(e) => setForm((p) => ({ ...p, chave_pix: e.target.value }))}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCriar} disabled={isCriando || !form.nome}>
              Criar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
