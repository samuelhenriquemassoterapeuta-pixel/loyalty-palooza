import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Users, BookOpen, Award, ArrowRight,
  ChevronDown, Star, Check, Clock, Sparkles, Trophy,
  Leaf, Heart, Target, Zap, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import academyHero from "@/assets/academy-hero.jpg";

/* ─── Countdown Timer ─── */
const LAUNCH_DATE = new Date("2026-04-15T00:00:00");

function useCountdown() {
  const [now, setNow] = useState(Date.now());
  useState(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  });
  const diff = Math.max(0, LAUNCH_DATE.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

/* ─── Data ─── */
const stats = [
  { icon: BookOpen, value: "17", label: "Cursos" },
  { icon: Clock, value: "1.886h", label: "Conteúdo" },
  { icon: Users, value: "300+", label: "Aulas" },
  { icon: Award, value: "17", label: "Certificados" },
];

const plans = [
  {
    name: "Trilha Essencial",
    price: "R$ 997",
    period: "12 meses",
    highlight: false,
    features: [
      "1 curso (Método Resinkra)",
      "Acesso por 12 meses",
      "Certificado digital",
      "Quizzes e checklists",
      "Suporte por e-mail",
    ],
  },
  {
    name: "Trilha Completa",
    price: "R$ 2.497",
    period: "Vitalício",
    highlight: true,
    features: [
      "Todos os 17 cursos",
      "Acesso vitalício",
      "Certificados + badges",
      "Comunidade VIP",
      "Mentorias mensais",
      "Tutor IA exclusivo",
      "Acesso antecipado",
    ],
  },
  {
    name: "Assinatura Pro",
    price: "R$ 97",
    period: "/mês",
    highlight: false,
    features: [
      "Todos os cursos",
      "Conteúdos novos semanais",
      "Consultoria individual anual",
      "Descontos em produtos",
      "Acesso antecipado a eventos",
    ],
  },
];

const diferenciais = [
  { icon: Sparkles, title: "Tutor IA", desc: "Assistente 24/7 treinado com todo o conteúdo" },
  { icon: Trophy, title: "Gamificação", desc: "Níveis, conquistas, ranking e recompensas" },
  { icon: Target, title: "Prática Real", desc: "Diário de prática com feedback da IA" },
  { icon: Leaf, title: "17 Formações", desc: "De aromaterapia a anatomia aplicada" },
  { icon: Heart, title: "Impacto Social", desc: "Projeto Mãos que Curam e bolsas de estudo" },
  { icon: Globe, title: "Comunidade", desc: "Rede global de terapeutas-curadores" },
];

const cursos = [
  { name: "Método Resinkra", hours: "6h50", modules: 6 },
  { name: "Vendas e Negócios", hours: "24h20", modules: 6 },
  { name: "Aromaterapia Clínica", hours: "58h", modules: 4 },
  { name: "Head SPA Japonês", hours: "47h", modules: 4 },
  { name: "Anatomia e Fisiologia", hours: "116h", modules: 6 },
  { name: "Yūgen FaceSPA", hours: "65h", modules: 5 },
  { name: "Perfumaria Natural", hours: "47h", modules: 4 },
  { name: "Velas Aromáticas", hours: "27h", modules: 4 },
  { name: "Saboaria Artesanal", hours: "27h", modules: 4 },
  { name: "Difusor de Ambientes", hours: "18h", modules: 4 },
  { name: "Fitoterapia", hours: "128h", modules: 5 },
  { name: "Óleos Essenciais", hours: "128h", modules: 5 },
  { name: "Massagem Modeladora", hours: "116h", modules: 6 },
  { name: "Drenagem Linfática", hours: "128h", modules: 6 },
  { name: "Gastronomia Saudável", hours: "56h", modules: 5 },
  { name: "Seitai e New Seitai", hours: "78h", modules: 5 },
  { name: "Bandagem Elástica", hours: "58h", modules: 4 },
];

/* ─── Component ─── */
export default function AcademyLanding() {
  const navigate = useNavigate();
  const countdown = useCountdown();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("academy_waitlist" as any)
        .insert({ email: email.trim().toLowerCase() } as any);
      if (error && error.code === "23505") {
        toast.info("Você já está na lista de espera! 💚");
      } else if (error) {
        throw error;
      } else {
        toast.success("Você está na lista de espera! 🎉");
      }
      setSubscribed(true);
    } catch {
      toast.error("Erro ao inscrever. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="relative h-[55vh] sm:h-[60vh] lg:h-[65vh]">
          <img src={academyHero} alt="Resinkra Academy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-background" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center px-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/15 backdrop-blur-md border border-primary-foreground/20 mb-6">
                <GraduationCap size={16} className="text-primary-foreground" />
                <span className="text-xs font-bold text-primary-foreground tracking-wider uppercase">
                  Resinkra Academy
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight max-w-4xl">
                O toque que cura,{" "}
                <span className="font-serif italic text-accent-foreground">conecta</span>{" "}
                e transforma
              </h1>
              <p className="mt-4 text-sm sm:text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                A maior escola de massoterapia do Brasil. 17 formações, 1.886 horas de conteúdo, certificação profissional.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative -mt-12 z-10 max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <Card className="p-4 text-center bg-card/95 backdrop-blur-sm border-border/50 shadow-card">
                  <s.icon size={20} className="text-primary mx-auto mb-1" />
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Countdown + Waitlist ─── */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Lançamento em breve
            </h2>
            <p className="text-muted-foreground mb-8">
              Inscreva-se na lista de espera e garanta condições exclusivas de pré-lançamento
            </p>

            {/* Countdown */}
            <div className="flex justify-center gap-3 sm:gap-6 mb-10">
              {[
                { val: countdown.days, label: "Dias" },
                { val: countdown.hours, label: "Horas" },
                { val: countdown.minutes, label: "Min" },
                { val: countdown.seconds, label: "Seg" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-bold text-primary">
                      {String(item.val).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Waitlist form */}
            {!subscribed ? (
              <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={submitting} className="group">
                  {submitting ? "Inscrevendo..." : "Quero participar"}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            ) : (
              <Card className="p-6 bg-primary/5 border-primary/20 max-w-md mx-auto">
                <Check size={32} className="text-primary mx-auto mb-2" />
                <p className="font-bold text-foreground">Você está na lista! 🎉</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Fique de olho no seu e-mail para novidades exclusivas
                </p>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Diferenciais ─── */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-10">
            Por que a <span className="font-serif italic text-primary">Resinkra Academy</span>?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {diferenciais.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="p-5 h-full border-border/50 hover:shadow-card transition-shadow">
                  <d.icon size={24} className="text-primary mb-3" />
                  <h3 className="font-bold text-foreground text-sm">{d.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{d.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Catálogo de Cursos ─── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-2">
            17 Formações Profissionais
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            1.886 horas de conteúdo com certificação
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(showAllCourses ? cursos : cursos.slice(0, 6)).map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-4 border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-foreground truncate">{c.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {c.modules} módulos · {c.hours}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          {!showAllCourses && (
            <div className="text-center mt-6">
              <Button variant="outline" onClick={() => setShowAllCourses(true)}>
                Ver todos os 17 cursos
                <ChevronDown size={16} />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ─── Planos ─── */}
      <section className="py-16 px-4 bg-gradient-to-b from-accent/5 to-transparent">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-2">
            Escolha sua <span className="font-serif italic text-primary">trilha</span>
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            Invista no seu futuro como terapeuta
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`p-6 h-full flex flex-col ${
                    plan.highlight
                      ? "border-primary shadow-glow bg-gradient-to-b from-primary/5 to-transparent ring-2 ring-primary/20"
                      : "border-border/50"
                  }`}
                >
                  {plan.highlight && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold mb-4 self-start">
                      <Star size={12} />
                      Mais popular
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm text-foreground">
                        <Check size={16} className="text-primary shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6"
                    variant={plan.highlight ? "default" : "outline"}
                    onClick={() => navigate("/auth")}
                  >
                    Garantir minha vaga
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Manifesto ─── */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <GraduationCap size={48} className="text-primary mx-auto mb-6" />
            <blockquote className="text-xl sm:text-2xl font-serif italic text-foreground leading-relaxed">
              "O mundo está doendo. E você tem o remédio. O toque que cura, conecta e transforma não pode esperar."
            </blockquote>
            <p className="mt-6 text-muted-foreground">— Manifesto Resinkra Academy</p>
            <Button size="lg" className="mt-8 group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Entrar para a lista de espera
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Resinkra Academy · Transformando vidas pelo toque
          </p>
          <Button variant="link" className="mt-2 text-xs" onClick={() => navigate("/")}>
            Voltar ao site principal
          </Button>
        </div>
      </footer>
    </div>
  );
}
