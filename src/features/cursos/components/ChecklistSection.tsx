import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, Circle, ClipboardCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ChecklistSectionProps {
  items: string[];
  persistKey?: string;
}

export function ChecklistSection({ items, persistKey }: ChecklistSectionProps) {
  const [checked, setChecked] = useState<Set<number>>(() => {
    if (!persistKey) return new Set();
    try {
      const saved = localStorage.getItem(persistKey);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    if (persistKey) {
      localStorage.setItem(persistKey, JSON.stringify([...checked]));
    }
  }, [checked, persistKey]);

  const toggle = useCallback((i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    }), []);

  return (
    <Card className="p-4 border-accent/20">
      <div className="flex items-center gap-2 mb-3">
        <ClipboardCheck size={18} className="text-accent-foreground" />
        <span className="text-xs font-bold">Checklist Prático</span>
        <span className="text-[10px] text-muted-foreground ml-auto">
          {checked.size}/{items.length}
        </span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className="w-full flex items-center gap-2 text-left text-sm"
          >
            {checked.has(i) ? (
              <CheckCircle2 size={16} className="text-primary shrink-0" />
            ) : (
              <Circle size={16} className="text-muted-foreground shrink-0" />
            )}
            <span className={checked.has(i) ? "line-through text-muted-foreground" : ""}>
              {item}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
