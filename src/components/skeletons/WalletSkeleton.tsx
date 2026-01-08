import { Skeleton } from "@/components/ui/skeleton";

export const WalletBalanceSkeleton = () => {
  return (
    <div className="relative overflow-hidden gradient-primary rounded-2xl p-6 mb-6">
      {/* Decorative glow */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary-foreground/10 rounded-full blur-xl animate-pulse" />
      
      <div className="relative">
        <div className="h-4 w-20 mb-2 rounded bg-primary-foreground/20 animate-pulse" />
        <div className="h-10 w-40 mb-4 rounded-lg bg-primary-foreground/25 animate-pulse" />
        <div className="h-10 w-full rounded-xl bg-primary-foreground/15 animate-pulse" />
      </div>
    </div>
  );
};

export const WalletCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-5 gradient-accent">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-foreground/5 to-transparent animate-[shimmer_2s_infinite]" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <div className="h-4 w-24 rounded bg-accent-foreground/15 animate-pulse" />
          <div className="h-6 w-6 rounded bg-accent-foreground/15 animate-pulse" />
        </div>
        <div className="h-5 w-48 mb-4 rounded bg-accent-foreground/20 animate-pulse" />
        <div className="flex justify-between">
          <div className="space-y-1">
            <div className="h-2 w-12 rounded bg-accent-foreground/10 animate-pulse" />
            <div className="h-4 w-28 rounded bg-accent-foreground/15 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="h-2 w-12 rounded bg-accent-foreground/10 animate-pulse" />
            <div className="h-4 w-16 rounded bg-accent-foreground/15 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const WalletStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[1, 2].map((i) => (
        <div 
          key={i} 
          className="p-4 rounded-2xl bg-card shadow-card space-y-2 animate-fade-in"
          style={{ animationDelay: `${i * 150}ms` }}
        >
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      ))}
    </div>
  );
};

export const WalletPageSkeleton = () => {
  return (
    <div className="animate-fade-in">
      <Skeleton className="h-8 w-24 mb-6" />
      <WalletBalanceSkeleton />
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="space-y-3">
          <WalletCardSkeleton />
          <div className="h-14 w-full rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 animate-pulse" />
        </div>
      </section>
      <section>
        <Skeleton className="h-6 w-32 mb-4" />
        <WalletStatsSkeleton />
      </section>
    </div>
  );
};
