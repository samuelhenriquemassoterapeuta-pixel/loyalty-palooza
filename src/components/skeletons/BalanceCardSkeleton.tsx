import { Skeleton } from "@/components/ui/skeleton";

export const BalanceCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-elevated">
      <div className="absolute inset-0 gradient-primary opacity-90" />
      
      {/* Decorative animated blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-foreground/10 rounded-full blur-2xl animate-pulse" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-28 rounded-md bg-primary-foreground/20 animate-pulse" />
          <div className="h-10 w-10 rounded-full bg-primary-foreground/15 animate-pulse" />
        </div>

        <div className="h-10 w-48 mb-6 rounded-lg bg-primary-foreground/20 animate-pulse" />

        <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-2xl px-4 py-3">
          <div className="h-10 w-10 rounded-xl bg-primary-foreground/15 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 rounded bg-primary-foreground/15 animate-pulse" />
            <div className="h-4 w-20 rounded bg-primary-foreground/20 animate-pulse" />
          </div>
          <div className="h-6 w-10 rounded-full bg-primary-foreground/15 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
