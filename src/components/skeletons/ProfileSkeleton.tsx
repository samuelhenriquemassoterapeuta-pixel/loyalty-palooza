import { Skeleton } from "@/components/ui/skeleton";

export const ProfileHeaderSkeleton = () => {
  return (
    <div className="flex items-center gap-4 mb-6 animate-fade-in">
      {/* Avatar with glow effect */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse" />
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-lg animate-pulse" />
      </div>
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      <Skeleton className="h-10 w-10 rounded-xl" />
    </div>
  );
};

export const ProfileStatsSkeleton = () => {
  return (
    <div className="relative overflow-hidden gradient-primary rounded-2xl p-5 mb-6">
      {/* Decorative elements */}
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary-foreground/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-foreground/5 rounded-full blur-lg animate-pulse" />
      
      <div className="relative grid grid-cols-3 gap-4 text-center">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`${i === 2 ? "border-x border-primary-foreground/20" : ""}`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="h-8 w-16 mx-auto mb-1 rounded-lg bg-primary-foreground/20 animate-pulse" />
            <div className="h-3 w-20 mx-auto rounded bg-primary-foreground/15 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProfileMenuSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-card animate-fade-in"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="relative">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl" />
          </div>
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
          <Skeleton className="h-5 w-5 rounded" />
        </div>
      ))}
    </div>
  );
};

export const ProfilePageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 safe-top pt-4">
        <ProfileHeaderSkeleton />
        <ProfileStatsSkeleton />
        <ProfileMenuSkeleton />
      </div>
    </div>
  );
};
