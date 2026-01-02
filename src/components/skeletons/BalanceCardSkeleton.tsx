import { Skeleton } from "@/components/ui/skeleton";

export const BalanceCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-elevated">
      <div className="absolute inset-0 gradient-primary" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-28 bg-primary-foreground/20" />
          <Skeleton className="h-10 w-10 rounded-full bg-primary-foreground/20" />
        </div>

        <Skeleton className="h-10 w-48 mb-6 bg-primary-foreground/20" />

        <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-2xl px-4 py-3">
          <Skeleton className="h-10 w-10 rounded-xl bg-primary-foreground/20" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-24 bg-primary-foreground/20" />
            <Skeleton className="h-4 w-20 bg-primary-foreground/20" />
          </div>
          <Skeleton className="h-6 w-10 rounded-full bg-primary-foreground/20" />
        </div>
      </div>
    </div>
  );
};
