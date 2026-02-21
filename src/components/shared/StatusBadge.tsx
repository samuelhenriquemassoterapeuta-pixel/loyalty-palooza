import { Badge } from "@/components/ui/badge";
import { cva, type VariantProps } from "class-variance-authority";

const statusVariants = cva("", {
  variants: {
    status: {
      ativo: "bg-green-100 text-green-800 border-green-200",
      inativo: "bg-gray-100 text-gray-800 border-gray-200",
      pendente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      pago: "bg-green-100 text-green-800 border-green-200",
      cancelado: "bg-red-100 text-red-800 border-red-200",
      expirado: "bg-orange-100 text-orange-800 border-orange-200",
      confirmado: "bg-blue-100 text-blue-800 border-blue-200",
      aguardando: "bg-purple-100 text-purple-800 border-purple-200",
      concluido: "bg-emerald-100 text-emerald-800 border-emerald-200",
      erro: "bg-red-100 text-red-800 border-red-200",
    },
  },
});

const STATUS_LABELS: Record<string, string> = {
  ativo: "Ativo",
  inativo: "Inativo",
  pendente: "Pendente",
  pago: "Pago",
  cancelado: "Cancelado",
  expirado: "Expirado",
  confirmado: "Confirmado",
  aguardando: "Aguardando",
  concluido: "Concluído",
  erro: "Erro",
};

type StatusKey = keyof typeof STATUS_LABELS;

interface StatusBadgeProps {
  status: string;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replace(/\s/g, "_");
  const validStatuses = Object.keys(STATUS_LABELS);
  const statusKey = validStatuses.includes(normalizedStatus)
    ? (normalizedStatus as "ativo" | "inativo" | "pendente" | "pago" | "cancelado" | "expirado" | "confirmado" | "aguardando" | "concluido" | "erro")
    : undefined;

  return (
    <Badge
      variant="outline"
      className={statusKey ? statusVariants({ status: statusKey }) : ""}
    >
      {label || STATUS_LABELS[normalizedStatus] || status}
    </Badge>
  );
}
