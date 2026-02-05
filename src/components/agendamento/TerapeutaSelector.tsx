 import { motion } from "framer-motion";
 import { User, Check, Loader2 } from "lucide-react";
 import { Card } from "@/components/ui/card";
 import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 import { Terapeuta } from "@/hooks/useTerapeutas";
 
 interface TerapeutaSelectorProps {
   terapeutas: Terapeuta[];
   loading: boolean;
   selectedId: string | null;
   onSelect: (terapeuta: Terapeuta) => void;
 }
 
 export const TerapeutaSelector = ({ terapeutas, loading, selectedId, onSelect }: TerapeutaSelectorProps) => {
   if (loading) {
     return (
       <div className="flex justify-center py-12">
         <Loader2 className="w-8 h-8 text-primary animate-spin" />
       </div>
     );
   }
 
   if (terapeutas.length === 0) {
     return (
       <div className="text-center py-8 text-muted-foreground">
         <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
         <p>Nenhum terapeuta disponível no momento.</p>
       </div>
     );
   }
 
   return (
     <div className="space-y-3">
       <h3 className="font-semibold text-foreground flex items-center gap-2">
         <User size={18} className="text-primary" />
         Escolha o terapeuta
       </h3>
       
       <div className="space-y-2">
         {terapeutas.map((terapeuta, index) => (
           <motion.div
             key={terapeuta.id}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: index * 0.05 }}
           >
             <Card
               className={`p-4 cursor-pointer transition-all hover:shadow-elevated ${
                 selectedId === terapeuta.id
                   ? "ring-2 ring-primary bg-primary/5"
                   : ""
               }`}
               onClick={() => onSelect(terapeuta)}
             >
               <div className="flex items-center gap-3">
                 <Avatar className="w-12 h-12">
                   {terapeuta.foto_url ? (
                     <AvatarImage src={terapeuta.foto_url} alt={terapeuta.nome} />
                   ) : null}
                   <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                     {terapeuta.nome.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                   </AvatarFallback>
                 </Avatar>
                 
                 <div className="flex-1">
                   <p className="font-semibold text-foreground">{terapeuta.nome}</p>
                   {terapeuta.especialidade && (
                     <p className="text-xs text-muted-foreground">{terapeuta.especialidade}</p>
                   )}
                 </div>
                 
                 {selectedId === terapeuta.id && (
                   <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                     <Check size={14} className="text-primary-foreground" />
                   </div>
                 )}
               </div>
             </Card>
           </motion.div>
         ))}
       </div>
     </div>
   );
 };