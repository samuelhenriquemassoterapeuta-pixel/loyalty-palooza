import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { useTerapeuta } from "@/hooks/useTerapeuta";
import { Navigate } from "react-router-dom";
import { Leaf } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  /** Restrict to specific roles. User passes if they have ANY of the listed roles. */
  allowRoles?: ("admin" | "terapeuta")[];
}

export const ProtectedRoute = ({ children, requireAdmin = false, allowRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { isTerapeuta, loadingTerapeuta } = useTerapeuta();

  const needsRoleCheck = requireAdmin || (allowRoles && allowRoles.length > 0);

  if (loading || (needsRoleCheck && (adminLoading || loadingTerapeuta))) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Leaf className="w-12 h-12 text-primary animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (allowRoles && allowRoles.length > 0) {
    const hasAccess = allowRoles.some((role) => {
      if (role === "admin") return isAdmin;
      if (role === "terapeuta") return isTerapeuta;
      return false;
    });
    if (!hasAccess) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};
