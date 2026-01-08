import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const ProdutoCardSkeleton = () => {
  return (
    <Card className="p-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent" />
      <Skeleton className="h-12 w-12 mx-auto mb-2 rounded-lg" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-3 w-2/3 mb-2" />
      <div className="flex items-center justify-between mt-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    </Card>
  );
};

export const ProdutosGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
          <ProdutoCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export const ServicoCardSkeleton = () => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
      <CardContent className="p-4 flex justify-between items-center relative">
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
        <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
          <ServicoCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export const PacoteCardSkeleton = () => {
  return (
    <Card className="overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
      <CardContent className="p-4 relative">
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
          <Skeleton className="h-9 w-20 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
};

export const PacotesListSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
          <PacoteCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export const MeuPacoteCardSkeleton = () => {
  return (
    <Card className="overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-highlight/5 to-transparent" />
      <CardHeader className="pb-2 relative">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="h-6 w-24 rounded-full bg-primary/10 animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 relative">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="h-2 w-full rounded-full bg-primary/10 overflow-hidden">
            <div className="h-full w-1/3 bg-primary/30 animate-pulse rounded-full" />
          </div>
        </div>
        <Skeleton className="h-10 w-full rounded-xl" />
      </CardContent>
    </Card>
  );
};

export const MeusPacotesListSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
          <MeuPacoteCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export const PedidoCardSkeleton = () => {
  return (
    <Card className="p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent" />
      <div className="flex justify-between items-start relative">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-5 w-20 mt-2" />
        </div>
        <div className="h-5 w-20 rounded-full bg-accent/10 animate-pulse" />
      </div>
    </Card>
  );
};

export const PedidosListSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
          <PedidoCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export const AgendamentoCardSkeleton = () => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <CardContent className="p-4 relative">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="text-right space-y-2">
            <div className="h-5 w-20 rounded-full bg-primary/10 animate-pulse ml-auto" />
            <Skeleton className="h-8 w-24 rounded-xl" />
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
        <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
          <AgendamentoCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export const NotificacaoCardSkeleton = () => {
  return (
    <Card className="p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-info/5 to-transparent" />
      <div className="flex gap-3 relative">
        <div className="relative">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="absolute inset-0 bg-primary/10 rounded-lg blur animate-pulse" />
        </div>
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
        <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
          <NotificacaoCardSkeleton />
        </div>
      ))}
    </div>
  );
};
