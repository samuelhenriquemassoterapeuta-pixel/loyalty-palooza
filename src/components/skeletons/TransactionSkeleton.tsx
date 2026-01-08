import { Skeleton } from "@/components/ui/skeleton";

export const TransactionSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-2xl bg-card shadow-card animate-fade-in"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="relative">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl" />
          </div>
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-5 w-20 rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export const TransactionHistorySkeleton = () => {
  return (
    <section className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <TransactionSkeleton />
    </section>
  );
};
