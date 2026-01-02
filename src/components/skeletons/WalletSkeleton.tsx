import { Skeleton } from "@/components/ui/skeleton";

export const WalletBalanceSkeleton = () => {
  return (
    <div className="gradient-primary rounded-2xl p-6 mb-6">
      <Skeleton className="h-4 w-20 mb-2 bg-primary-foreground/20" />
      <Skeleton className="h-10 w-40 mb-4 bg-primary-foreground/20" />
      <Skeleton className="h-10 w-full rounded-md bg-primary-foreground/20" />
    </div>
  );
};

export const WalletCardSkeleton = () => {
  return (
    <div className="rounded-2xl p-5 gradient-accent">
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="h-4 w-24 bg-accent-foreground/20" />
        <Skeleton className="h-6 w-6 rounded bg-accent-foreground/20" />
      </div>
      <Skeleton className="h-5 w-48 mb-4 bg-accent-foreground/20" />
      <div className="flex justify-between">
        <div className="space-y-1">
          <Skeleton className="h-2 w-12 bg-accent-foreground/20" />
          <Skeleton className="h-4 w-28 bg-accent-foreground/20" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-2 w-12 bg-accent-foreground/20" />
          <Skeleton className="h-4 w-16 bg-accent-foreground/20" />
        </div>
      </div>
    </div>
  );
};

export const WalletStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[1, 2].map((i) => (
        <div key={i} className="p-4 rounded-2xl bg-card shadow-card space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      ))}
    </div>
  );
};

export const WalletPageSkeleton = () => {
  return (
    <>
      <Skeleton className="h-8 w-24 mb-6" />
      <WalletBalanceSkeleton />
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="space-y-3">
          <WalletCardSkeleton />
          <Skeleton className="h-14 w-full rounded-2xl border-2 border-dashed border-border" />
        </div>
      </section>
      <section>
        <Skeleton className="h-6 w-32 mb-4" />
        <WalletStatsSkeleton />
      </section>
    </>
  );
};
