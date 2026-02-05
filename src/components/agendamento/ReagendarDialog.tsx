 import { useState, useEffect } from "react";
 import { CalendarDays, Clock } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Calendar } from "@/components/ui/calendar";
 import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 import { ButtonLoader } from "@/components/LoadingSpinner";
 import { LoadingSpinner } from "@/components/LoadingSpinner";
 import { ptBR } from "date-fns/locale";
 import { format } from "date-fns";
 
 const horarios = [
   "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"
 ];
 
 interface ReagendarDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   servicoNome: string;
   terapeutaId?: string;
   terapeutaNome?: string;
   onSubmit: (novaDataHora: Date) => Promise<void>;
   getHorariosOcupados: (data: Date, terapeutaId?: string) => Promise<string[]>;
 }
 
 export const ReagendarDialog = ({
   open,
   onOpenChange,
   servicoNome,
   terapeutaId,
   terapeutaNome,
   onSubmit,
   getHorariosOcupados,
 }: ReagendarDialogProps) => {
   const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
   const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
   const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
   const [loadingHorarios, setLoadingHorarios] = useState(false);
   const [saving, setSaving] = useState(false);
 
   useEffect(() => {
     if (!open) {
       setSelectedDate(undefined);
       setSelectedHorario(null);
       setHorariosOcupados([]);
     }
   }, [open]);
 
   const handleDateSelect = async (date: Date | undefined) => {
     setSelectedDate(date);
     setSelectedHorario(null);
     
     if (date) {
       setLoadingHorarios(true);
       const ocupados = await getHorariosOcupados(date, terapeutaId);
       setHorariosOcupados(ocupados);
       setLoadingHorarios(false);
     } else {
       setHorariosOcupados([]);
     }
   };
 
   const handleSubmit = async () => {
     if (!selectedDate || !selectedHorario) return;
     
     const [hours, minutes] = selectedHorario.split(":").map(Number);
     const novaDataHora = new Date(selectedDate);
     novaDataHora.setHours(hours, minutes, 0, 0);
     
     setSaving(true);
     await onSubmit(novaDataHora);
     setSaving(false);
     onOpenChange(false);
   };
 
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
         <DialogHeader>
           <DialogTitle>Reagendar</DialogTitle>
           <DialogDescription>
             Escolha uma nova data e horário para {servicoNome}
             {terapeutaNome && ` com ${terapeutaNome}`}.
           </DialogDescription>
         </DialogHeader>
 
         <div className="space-y-4 py-4">
           {/* Calendário */}
           <div>
             <label className="text-sm font-medium flex items-center gap-2 mb-2">
               <CalendarDays size={16} />
               Nova data
             </label>
             <div className="flex justify-center">
               <Calendar
                 mode="single"
                 selected={selectedDate}
                 onSelect={handleDateSelect}
                 locale={ptBR}
                 disabled={(date) => date < new Date() || date.getDay() === 0}
                 className="rounded-md border"
               />
             </div>
           </div>
 
           {/* Horários */}
           {selectedDate && (
             <div>
               <label className="text-sm font-medium flex items-center gap-2 mb-2">
                 <Clock size={16} />
                 Novo horário
               </label>
               {loadingHorarios ? (
                 <div className="flex justify-center py-4">
                   <LoadingSpinner size="sm" />
                 </div>
               ) : (
                 <div className="grid grid-cols-4 gap-2">
                   {horarios.map((horario) => {
                     const isOcupado = horariosOcupados.includes(horario);
                     return (
                       <Button
                         key={horario}
                         variant={selectedHorario === horario ? "default" : "outline"}
                         size="sm"
                         className={isOcupado ? "opacity-50 line-through" : ""}
                         onClick={() => !isOcupado && setSelectedHorario(horario)}
                         disabled={isOcupado}
                       >
                         {horario}
                       </Button>
                     );
                   })}
                 </div>
               )}
             </div>
           )}
 
           {/* Resumo */}
           {selectedDate && selectedHorario && (
             <div className="bg-primary/5 rounded-lg p-3 text-sm">
               <p className="font-medium">Nova data e horário:</p>
               <p className="text-muted-foreground">
                 {format(selectedDate, "dd/MM/yyyy", { locale: ptBR })} às {selectedHorario}
               </p>
             </div>
           )}
         </div>
 
         <DialogFooter>
           <Button variant="outline" onClick={() => onOpenChange(false)}>
             Cancelar
           </Button>
           <Button 
             onClick={handleSubmit} 
             disabled={!selectedDate || !selectedHorario || saving}
           >
             {saving ? <ButtonLoader /> : "Confirmar reagendamento"}
           </Button>
         </DialogFooter>
       </DialogContent>
     </Dialog>
   );
 };