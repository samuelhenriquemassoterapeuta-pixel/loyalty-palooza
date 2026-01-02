import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const ProdutoCardSkeleton = () => {
  return (
    <Card className="p-3">
      <Skeleton className="h-12 w-12 mx-auto mb-2 rounded" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-3 w-2/3 mb-2" />
      <div className="flex items-center justify-between mt-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    </Card>
  );
};

export const ProdutosGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <ProdutoCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const ServicoCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="space-y-2 text-right">
          <Skeleton className="h-5 w-16 ml-auto" />
          <Skeleton className="h-5 w-5 ml-auto rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export const ServicosListSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <ServicoCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const PacoteCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export const PacotesListSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <PacoteCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const MeuPacoteCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-3 w-28" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  );
};

export const MeusPacotesListSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <MeuPacoteCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const PedidoCardSkeleton = () => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-5 w-20 mt-2" />
        </div>
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </Card>
  );
};

export const PedidosListSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <PedidoCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const AgendamentoCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="text-right space-y-2">
            <Skeleton className="h-5 w-20 rounded-full ml-auto" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const AgendamentosListSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <AgendamentoCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const NotificacaoCardSkeleton = () => {
  return (
    <Card className="p-4">
      <div className="flex gap-3">
        <Skeleton className="h-8 w-8 rounded" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </Card>
  );
};

export const NotificacoesListSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <NotificacaoCardSkeleton key={i} />
      ))}
    </div>
  );
};
