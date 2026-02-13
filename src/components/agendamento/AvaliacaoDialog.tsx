import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ButtonLoader } from "@/components/LoadingSpinner";
import { GoogleReviewPrompt } from "@/components/GoogleReviewPrompt";
 
 interface AvaliacaoDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   servicoNome: string;
   terapeutaNome?: string;
   onSubmit: (nota: number, comentario?: string) => Promise<void>;
 }
 
 export const AvaliacaoDialog = ({
   open,
   onOpenChange,
   servicoNome,
   terapeutaNome,
   onSubmit,
 }: AvaliacaoDialogProps) => {
  const [nota, setNota] = useState(0);
  const [hoveredNota, setHoveredNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [saving, setSaving] = useState(false);
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const [submittedNota, setSubmittedNota] = useState(0);

  const handleSubmit = async () => {
    if (nota === 0) return;
    
    setSaving(true);
    await onSubmit(nota, comentario.trim() || undefined);
    setSaving(false);
    
    const finalNota = nota;
    // Reset form
    setNota(0);
    setComentario("");
    onOpenChange(false);

    // Show Google review prompt for good ratings
    if (finalNota >= 4) {
      setSubmittedNota(finalNota);
      setTimeout(() => setShowGooglePrompt(true), 400);
    }
  };
 
   const displayNota = hoveredNota || nota;
 
    return (
      <>
      <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="sm:max-w-md">
         <DialogHeader>
           <DialogTitle>Avaliar atendimento</DialogTitle>
           <DialogDescription>
             Como foi sua experiência com {servicoNome}
             {terapeutaNome && ` com ${terapeutaNome}`}?
           </DialogDescription>
         </DialogHeader>
 
         <div className="space-y-4 py-4">
           {/* Star Rating */}
           <div className="flex flex-col items-center gap-2">
             <div className="flex gap-1">
               {[1, 2, 3, 4, 5].map((star) => (
                 <button
                   key={star}
                   type="button"
                   className="p-1 transition-transform hover:scale-110"
                   onClick={() => setNota(star)}
                   onMouseEnter={() => setHoveredNota(star)}
                   onMouseLeave={() => setHoveredNota(0)}
                 >
                   <Star
                     size={32}
                     className={`transition-colors ${
                       star <= displayNota
                         ? "fill-yellow-400 text-yellow-400"
                         : "text-muted-foreground"
                     }`}
                   />
                 </button>
               ))}
             </div>
             <span className="text-sm text-muted-foreground">
               {displayNota === 0 && "Toque para avaliar"}
               {displayNota === 1 && "Muito ruim"}
               {displayNota === 2 && "Ruim"}
               {displayNota === 3 && "Regular"}
               {displayNota === 4 && "Bom"}
               {displayNota === 5 && "Excelente"}
             </span>
           </div>
 
           {/* Comentário */}
           <div className="space-y-2">
             <label className="text-sm font-medium">
               Comentário (opcional)
             </label>
             <Textarea
               placeholder="Conte-nos mais sobre sua experiência..."
               value={comentario}
               onChange={(e) => setComentario(e.target.value)}
               rows={3}
             />
           </div>
         </div>
 
         <DialogFooter>
           <Button variant="outline" onClick={() => onOpenChange(false)}>
             Cancelar
           </Button>
           <Button onClick={handleSubmit} disabled={nota === 0 || saving}>
             {saving ? <ButtonLoader /> : "Enviar avaliação"}
           </Button>
         </DialogFooter>
        </DialogContent>
      </Dialog>

      <GoogleReviewPrompt
        open={showGooglePrompt}
        onOpenChange={setShowGooglePrompt}
        nota={submittedNota}
      />
    </>
  );
};