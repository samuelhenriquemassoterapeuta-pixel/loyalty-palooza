import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Trophy, Circle } from "lucide-react";

interface CursoTabButtonProps {
  label: string;
  icon: LucideIcon;
  value: string;
  active: boolean;
  pct: number;
  onClick: () => void;
}

export function CursoTabButton({ label, icon: Icon, value, active, pct, onClick }: CursoTabButtonProps) {
  const completed = pct === 100;
  const started = pct > 0;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl shrink-0 transition-all duration-200 min-w-[72px] tap-bounce",
        active
          ? "bg-primary text-primary-foreground shadow-button"
          : "bg-card border border-border/60 text-muted-foreground hover:bg-muted/50"
      )}
    >
      <div className="relative">
        <Icon size={18} />
        {/* Progress dot */}
        {completed && (
          <Trophy
            size={10}
            className={cn(
              "absolute -top-1 -right-2",
              active ? "text-primary-foreground" : "text-accent"
            )}
          />
        )}
        {started && !completed && (
          <div
            className={cn(
              "absolute -top-0.5 -right-1.5 w-2 h-2 rounded-full",
              active ? "bg-primary-foreground" : "bg-info"
            )}
          />
        )}
      </div>
      <span className="text-[10px] font-semibold whitespace-nowrap">{label}</span>
      {/* Mini progress bar */}
      {started && (
        <div className={cn(
          "w-full h-0.5 rounded-full overflow-hidden",
          active ? "bg-primary-foreground/30" : "bg-border"
        )}>
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              active ? "bg-primary-foreground" : completed ? "bg-accent" : "bg-info"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </button>
  );
}
