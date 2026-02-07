import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ButtonLoader } from "@/components/LoadingSpinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AdminFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: string;
  editingItem: any;
  formData: any;
  setFormData: (data: any) => void;
  saving: boolean;
  onSave: () => void;
}

export const AdminFormDialog = ({
  open,
  onOpenChange,
  activeTab,
  editingItem,
  formData,
  setFormData,
  saving,
  onSave,
}: AdminFormDialogProps) => {
  const entityLabel =
    activeTab === "produtos"
      ? "Produto"
      : activeTab === "servicos"
      ? "Serviço"
      : "Pacote";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? "Editar" : "Novo"} {entityLabel}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input
              value={formData.nome || ""}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
              placeholder="Nome"
            />
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea
              value={formData.descricao || ""}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              placeholder="Descrição"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Preço (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.preco || ""}
                onChange={(e) =>
                  setFormData({ ...formData, preco: e.target.value })
                }
                placeholder="0,00"
              />
            </div>

            {activeTab === "produtos" && (
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Input
                  value={formData.categoria || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, categoria: e.target.value })
                  }
                  placeholder="Categoria"
                />
              </div>
            )}

            {activeTab === "servicos" && (
              <>
                <div className="space-y-2">
                  <Label>Duração (min)</Label>
                  <Input
                    type="number"
                    value={formData.duracao || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, duracao: e.target.value })
                    }
                    placeholder="60"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Categoria</Label>
                  <Input
                    value={formData.categoria || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, categoria: e.target.value })
                    }
                    placeholder="Ex: massagem, estética"
                  />
                </div>
              </>
            )}

            {activeTab === "pacotes" && (
              <div className="space-y-2">
                <Label>Total de sessões</Label>
                <Input
                  type="number"
                  value={formData.total_sessoes || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      total_sessoes: e.target.value,
                    })
                  }
                  placeholder="10"
                />
              </div>
            )}
          </div>

          {activeTab === "produtos" && (
            <>
              <div className="space-y-2">
                <Label>URL da imagem</Label>
                <Input
                  value={formData.imagem_url || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, imagem_url: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>Cashback (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.cashback_percentual || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cashback_percentual: e.target.value,
                    })
                  }
                  placeholder="0"
                />
              </div>
            </>
          )}

          {activeTab === "servicos" && (
            <div className="space-y-2">
              <Label>Cashback (%)</Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.cashback_percentual || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cashback_percentual: e.target.value,
                  })
                }
                placeholder="0"
              />
            </div>
          )}

          {activeTab === "pacotes" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preço original (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.preco_original || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preco_original: e.target.value,
                    })
                  }
                  placeholder="0,00"
                />
              </div>
              <div className="space-y-2">
                <Label>Validade (dias)</Label>
                <Input
                  type="number"
                  value={formData.validade_dias || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      validade_dias: e.target.value,
                    })
                  }
                  placeholder="365"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.disponivel ?? true}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, disponivel: checked })
                }
              />
              <Label>Disponível</Label>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button className="flex-1" onClick={onSave} disabled={saving}>
              {saving ? <ButtonLoader /> : "Salvar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
