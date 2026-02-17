 import { useState } from "react";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import { motion } from "framer-motion";
import { User, Plus, Pencil, Trash2, Check, X, Loader2, Mail, Phone } from "lucide-react";
 import { Card } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Switch } from "@/components/ui/switch";
 import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 import { supabase } from "@/integrations/supabase/client";
 import { useQuery, useQueryClient } from "@tanstack/react-query";
 import { toast } from "sonner";
 
interface Terapeuta {
  id: string;
  nome: string;
  especialidade: string | null;
  foto_url: string | null;
  email: string | null;
  telefone: string | null;
  disponivel: boolean;
  created_at: string;
}
 
 export const TerapeutasTab = () => {
   const queryClient = useQueryClient();
   const [dialogOpen, setDialogOpen] = useState(false);
   const [editingItem, setEditingItem] = useState<Terapeuta | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    especialidade: "",
    foto_url: "",
    email: "",
    telefone: "",
    disponivel: true,
  });
   const [saving, setSaving] = useState(false);
 
   const { data: terapeutas = [], isLoading } = useQuery({
     queryKey: ["admin-terapeutas"],
     queryFn: async () => {
       const { data, error } = await supabase
         .from("terapeutas")
         .select("*")
         .order("nome");
       if (error) throw error;
       return data as Terapeuta[];
     },
   });
 
   const openCreateDialog = () => {
     setEditingItem(null);
     setFormData({ nome: "", especialidade: "", foto_url: "", email: "", telefone: "", disponivel: true });
     setDialogOpen(true);
   };
 
   const openEditDialog = (item: Terapeuta) => {
     setEditingItem(item);
    setFormData({
      nome: item.nome,
      especialidade: item.especialidade || "",
      foto_url: item.foto_url || "",
      email: item.email || "",
      telefone: item.telefone || "",
      disponivel: item.disponivel,
    });
     setDialogOpen(true);
   };
 
   const handleSave = async () => {
     if (!formData.nome.trim()) {
       toast.error("Nome é obrigatório");
       return;
     }
 
     setSaving(true);
     try {
      const dataToSave = {
        nome: formData.nome.trim(),
        especialidade: formData.especialidade.trim() || null,
        foto_url: formData.foto_url.trim() || null,
        email: formData.email.trim() || null,
        telefone: formData.telefone.trim() || null,
        disponivel: formData.disponivel,
      };
 
       if (editingItem) {
         const { error } = await supabase
           .from("terapeutas")
           .update(dataToSave)
           .eq("id", editingItem.id);
         if (error) throw error;
         toast.success("Terapeuta atualizado!");
       } else {
         const { error } = await supabase
           .from("terapeutas")
           .insert(dataToSave);
         if (error) throw error;
         toast.success("Terapeuta criado!");
       }
 
       queryClient.invalidateQueries({ queryKey: ["admin-terapeutas"] });
       setDialogOpen(false);
     } catch (error: any) {
       toast.error(error.message || "Erro ao salvar");
     }
     setSaving(false);
   };
 
   const handleDelete = async (id: string) => {
     if (!confirm("Tem certeza que deseja excluir este terapeuta?")) return;
 
     try {
       const { error } = await supabase.from("terapeutas").delete().eq("id", id);
       if (error) throw error;
       toast.success("Terapeuta excluído!");
       queryClient.invalidateQueries({ queryKey: ["admin-terapeutas"] });
     } catch (error: any) {
       toast.error(error.message || "Erro ao excluir");
     }
   };
 
   const toggleDisponivel = async (id: string, disponivel: boolean) => {
     try {
       const { error } = await supabase
         .from("terapeutas")
         .update({ disponivel: !disponivel })
         .eq("id", id);
       if (error) throw error;
       queryClient.invalidateQueries({ queryKey: ["admin-terapeutas"] });
       toast.success(disponivel ? "Terapeuta desativado" : "Terapeuta ativado");
     } catch (error: any) {
       toast.error("Erro ao atualizar");
     }
   };
 
   const getInitials = (nome: string) => {
     return nome
       .split(" ")
       .map((n) => n[0])
       .join("")
       .slice(0, 2)
       .toUpperCase();
   };
 
   if (isLoading) {
     return (
       <div className="flex justify-center py-12">
         <Loader2 className="w-8 h-8 text-primary animate-spin" />
       </div>
     );
   }
 
   return (
     <>
       <div className="flex justify-end mb-4">
         <Button size="sm" onClick={openCreateDialog}>
           <Plus className="w-4 h-4 mr-1" />
           Novo Terapeuta
         </Button>
       </div>
 
       {terapeutas.length === 0 ? (
         <div className="text-center py-12">
           <User className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
           <p className="text-muted-foreground">Nenhum terapeuta cadastrado</p>
           <Button variant="link" onClick={openCreateDialog} className="mt-2">
             Adicionar primeiro terapeuta
           </Button>
         </div>
       ) : (
         <div className="space-y-3">
           {terapeutas.map((terapeuta, index) => (
             <motion.div
               key={terapeuta.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.05 }}
             >
               <Card className={`p-4 ${!terapeuta.disponivel ? "opacity-60" : ""}`}>
                 <div className="flex items-center gap-4">
                   <Avatar className="w-12 h-12">
                     {terapeuta.foto_url ? (
                       <AvatarImage src={terapeuta.foto_url} alt={terapeuta.nome} />
                     ) : null}
                     <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                       {getInitials(terapeuta.nome)}
                     </AvatarFallback>
                   </Avatar>
 
                   <div className="flex-1 min-w-0">
                     <p className="font-semibold text-foreground truncate">
                       {terapeuta.nome}
                     </p>
                    {terapeuta.especialidade && (
                        <p className="text-sm text-muted-foreground truncate">
                          {terapeuta.especialidade}
                        </p>
                      )}
                      {(terapeuta.email || terapeuta.telefone) && (
                        <div className="flex items-center gap-3 mt-0.5">
                          {terapeuta.email && (
                            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <Mail className="w-3 h-3" />
                              <span className="truncate max-w-[120px]">{terapeuta.email}</span>
                            </span>
                          )}
                          {terapeuta.telefone && (
                            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              {terapeuta.telefone}
                            </span>
                          )}
                        </div>
                      )}
                   </div>
 
                   <div className="flex items-center gap-2">
                     <Switch
                       checked={terapeuta.disponivel}
                       onCheckedChange={() =>
                         toggleDisponivel(terapeuta.id, terapeuta.disponivel)
                       }
                     />
                     <Button
                       variant="ghost"
                       size="icon"
                       onClick={() => openEditDialog(terapeuta)}
                     >
                       <Pencil className="w-4 h-4" />
                     </Button>
                     <Button
                       variant="ghost"
                       size="icon"
                       onClick={() => handleDelete(terapeuta.id)}
                       className="text-destructive hover:text-destructive"
                     >
                       <Trash2 className="w-4 h-4" />
                     </Button>
                   </div>
                 </div>
               </Card>
             </motion.div>
           ))}
         </div>
       )}
 
       {/* Dialog */}
       <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
         <DialogContent className="max-w-md">
           <DialogHeader>
             <DialogTitle>
               {editingItem ? "Editar Terapeuta" : "Novo Terapeuta"}
             </DialogTitle>
           </DialogHeader>
 
           <div className="space-y-4 pt-4">
             <div className="space-y-2">
               <Label htmlFor="nome">Nome *</Label>
               <Input
                 id="nome"
                 value={formData.nome}
                 onChange={(e) =>
                   setFormData({ ...formData, nome: e.target.value })
                 }
                 placeholder="Ex: Dra. Ana Silva"
               />
             </div>
 
             <div className="space-y-2">
               <Label htmlFor="especialidade">Especialidade</Label>
               <Input
                 id="especialidade"
                 value={formData.especialidade}
                 onChange={(e) =>
                   setFormData({ ...formData, especialidade: e.target.value })
                 }
                 placeholder="Ex: Massagem Relaxante"
               />
             </div>
 
            <AdminImageUpload label="Foto" value={formData.foto_url} onChange={v => setFormData({ ...formData, foto_url: v })} />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="terapeuta@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) =>
                      setFormData({ ...formData, telefone: e.target.value })
                    }
                    placeholder="(11) 99999-0000"
                  />
                </div>
              </div>

 
             <div className="flex items-center justify-between">
               <Label htmlFor="disponivel">Disponível</Label>
               <Switch
                 id="disponivel"
                 checked={formData.disponivel}
                 onCheckedChange={(checked) =>
                   setFormData({ ...formData, disponivel: checked })
                 }
               />
             </div>
 
             <div className="flex gap-2 pt-4">
               <Button
                 variant="outline"
                 className="flex-1"
                 onClick={() => setDialogOpen(false)}
               >
                 Cancelar
               </Button>
               <Button className="flex-1" onClick={handleSave} disabled={saving}>
                 {saving ? (
                   <Loader2 className="w-4 h-4 animate-spin" />
                 ) : (
                   <>
                     <Check className="w-4 h-4 mr-1" />
                     Salvar
                   </>
                 )}
               </Button>
             </div>
           </div>
         </DialogContent>
       </Dialog>
     </>
   );
 };