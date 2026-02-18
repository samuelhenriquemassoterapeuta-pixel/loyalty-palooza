import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText, CreditCard, FoldVertical, BookOpen, Presentation, Users,
  Eye, Pencil, ExternalLink, Download
} from "lucide-react";
import { toast } from "sonner";

const iconMap: Record<string, React.ElementType> = {
  folder: FileText,
  cartao: CreditCard,
  trifold: FoldVertical,
  catalogo: BookOpen,
  deck: Presentation,
  "kit-parceiro": Users,
};

const defaultMateriais = [
  { id: "folder", title: "Folder Institucional", desc: "A4 frente/verso com serviços e contatos", formatos: ["A4", "PDF"], status: "" },
  { id: "cartao", title: "Cartão de Visita Digital", desc: "Card com QR code compartilhável", formatos: ["Digital", "PNG"], status: "" },
  { id: "trifold", title: "Folder Tri-fold", desc: "DL dobrável em 3 partes", formatos: ["DL", "PDF"], status: "" },
  { id: "catalogo", title: "Catálogo de Serviços", desc: "Multi-página com protocolos e preços", formatos: ["A4", "PDF"], status: "" },
  { id: "deck", title: "Deck Comercial B2B", desc: "Apresentação para empresas", formatos: ["16:9", "PDF"], status: "em breve" },
  { id: "kit-parceiro", title: "Kit Parceiro", desc: "Material para afiliados e terapeutas", formatos: ["A4", "PDF"], status: "em breve" },
];

export const MateriaisAdminTab = () => {
  const navigate = useNavigate();
  const [editDialog, setEditDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const openEdit = (m: any) => {
    setEditingItem({ ...m });
    setEditDialog(true);
  };

  const handleSave = () => {
    toast.success("Material atualizado! (configuração local)");
    setEditDialog(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Materiais Gráficos</h3>
          <p className="text-sm text-muted-foreground">{defaultMateriais.length} materiais · {defaultMateriais.filter(m => !m.status).length} ativos</p>
        </div>
        <Button size="sm" onClick={() => navigate("/materiais")} className="gap-2">
          <ExternalLink className="w-4 h-4" />
          Abrir Editor
        </Button>
      </div>

      <div className="space-y-2">
        {defaultMateriais.map((m) => {
          const Icon = iconMap[m.id] || FileText;
          return (
            <Card key={m.id} className={m.status ? "opacity-60" : ""}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-foreground truncate">{m.title}</h4>
                    {m.status && <Badge variant="secondary" className="text-[9px]">{m.status}</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{m.desc}</p>
                  <div className="flex gap-1 mt-1">
                    {m.formatos.map(f => (
                      <span key={f} className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEdit(m)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  {!m.status && (
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => navigate("/materiais")}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Editar Material</DialogTitle></DialogHeader>
          {editingItem && (
            <div className="space-y-3">
              <div><Label>Título</Label><Input value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} /></div>
              <div><Label>Descrição</Label><Textarea value={editingItem.desc} onChange={e => setEditingItem({ ...editingItem, desc: e.target.value })} rows={2} /></div>
              <div><Label>Formatos (separados por vírgula)</Label><Input value={editingItem.formatos?.join(", ")} onChange={e => setEditingItem({ ...editingItem, formatos: e.target.value.split(",").map((s: string) => s.trim()) })} /></div>
              <div className="flex items-center gap-2">
                <Switch checked={!editingItem.status} onCheckedChange={v => setEditingItem({ ...editingItem, status: v ? "" : "em breve" })} />
                <Label>Ativo</Label>
              </div>
              <Button onClick={handleSave} className="w-full">Salvar</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
