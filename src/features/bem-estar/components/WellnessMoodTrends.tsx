import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { format, subDays } from "date-fns";

const WellnessMoodTrends = () => {
  const { user } = useAuth();

  const { data: checkins } = useQuery({
    queryKey: ["wellness-mood-trends", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const since = format(subDays(new Date(), 14), "yyyy-MM-dd");
      const { data } = await supabase
        .from("wellness_checkins")
        .select("data, humor, energia")
        .eq("user_id", user!.id)
        .gte("data", since)
        .order("data");
      return data || [];
    },
  });

  if (!checkins || checkins.length < 4) return null;

  const humorData = checkins.map(c => c.humor);
  const energiaData = checkins.map(c => c.energia);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      className="mb-6"
    >
      <p className="text-xs font-medium text-muted-foreground mb-2 px-1">
        Tendência — últimos {checkins.length} dias
      </p>
      <div className="glass-card rounded-xl p-3 flex gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs">😊</span>
            <span className="text-[10px] text-muted-foreground">Humor</span>
          </div>
          <Sparkline data={humorData} color="hsl(var(--primary))" />
        </div>
        <div className="w-px bg-border" />
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs">⚡</span>
            <span className="text-[10px] text-muted-foreground">Energia</span>
          </div>
          <Sparkline data={energiaData} color="hsl(var(--accent))" />
        </div>
      </div>
    </motion.div>
  );
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 120;
  const h = 32;
  const max = 5;
  const min = 1;
  const range = max - min || 1;
  const stepX = w / (data.length - 1);

  const points = data.map((v, i) => ({
    x: i * stepX,
    y: h - ((v - min) / range) * (h - 4) - 2,
  }));

  const pathD = points
    .map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
    .join(" ");

  const areaD = pathD + ` L${points[points.length - 1].x},${h} L${points[0].x},${h} Z`;

  const last = data[data.length - 1];
  const prev = data[data.length - 2];
  const trend = last > prev ? "↑" : last < prev ? "↓" : "→";

  return (
    <div className="flex items-end gap-2">
      <svg width={w} height={h} className="flex-1" viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${color})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="2.5" fill={color} />
      </svg>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold text-foreground leading-none">{last}</p>
        <p className="text-[9px] text-muted-foreground">{trend}</p>
      </div>
    </div>
  );
}

export default WellnessMoodTrends;
