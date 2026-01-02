import { Skeleton } from "@/components/ui/skeleton";

export const ProfileHeaderSkeleton = () => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Skeleton className="w-16 h-16 rounded-full" />
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
    <div className="gradient-primary rounded-2xl p-5 mb-6">
      <div className="grid grid-cols-3 gap-4 text-center">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`${i === 2 ? "border-x border-primary-foreground/20" : ""}`}>
            <Skeleton className="h-8 w-16 mx-auto mb-1 bg-primary-foreground/20" />
            <Skeleton className="h-3 w-20 mx-auto bg-primary-foreground/20" />
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
          className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-card"
        >
          <Skeleton className="h-10 w-10 rounded-xl" />
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
