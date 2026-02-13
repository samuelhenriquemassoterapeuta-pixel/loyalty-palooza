import { ReactNode } from "react";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { BottomNavigation } from "@/components/BottomNavigation";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";

interface AppLayoutProps {
  children: ReactNode;
  hideBottomNav?: boolean;
}

export const AppLayout = ({ children, hideBottomNav = false }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <DesktopSidebar />
      <main className="flex-1 min-w-0">
        {children}
      </main>
      {!hideBottomNav && (
        <div className="lg:hidden">
          <BottomNavigation />
        </div>
      )}
      <FloatingContactButtons />
    </div>
  );
};
