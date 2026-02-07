import { motion } from "framer-motion";
import { Search, Filter, Percent } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

const categories = ["Todos", "Compras", "Alimentação", "Transporte", "Streaming", "Viagens"];

const allOffers = [
  { id: "1", store: "Amazon", logo: "🛒", cashback: 5, category: "Compras" },
  { id: "2", store: "iFood", logo: "🍔", cashback: 8, category: "Alimentação" },
  { id: "3", store: "Uber", logo: "🚗", cashback: 3, category: "Transporte" },
  { id: "4", store: "Netflix", logo: "🎬", cashback: 10, category: "Streaming" },
  { id: "5", store: "Spotify", logo: "🎵", cashback: 7, category: "Música" },
  { id: "6", store: "Booking", logo: "🏨", cashback: 12, category: "Viagens" },
  { id: "7", store: "Mercado Livre", logo: "📦", cashback: 4, category: "Compras" },
  { id: "8", store: "99", logo: "🚕", cashback: 5, category: "Transporte" },
];

const Offers = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background gradient-hero pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 safe-top pt-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-5"
          >
            <motion.h1
              variants={fadeUp}
              className="text-2xl font-bold text-foreground"
            >
              Ofertas
            </motion.h1>

            {/* Search */}
            <motion.div variants={fadeUp} className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar lojas..."
                className="w-full pl-12 pr-12 py-3 rounded-2xl glass-card-strong border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-xl bg-secondary">
                <Filter size={18} className="text-muted-foreground" />
              </button>
            </motion.div>

            {/* Categories */}
            <motion.div variants={fadeUp}>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      index === 0
                        ? "gradient-primary text-primary-foreground shadow-button"
                        : "glass-card-strong text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Offers Grid */}
            <div className="grid grid-cols-2 gap-3">
              {allOffers.map((offer) => (
                <motion.div
                  key={offer.id}
                  variants={fadeUp}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-2xl glass-card-strong cursor-pointer hover:shadow-elevated transition-all"
                >
                  <div className="text-4xl mb-3">{offer.logo}</div>
                  <h4 className="font-semibold text-foreground mb-1">{offer.store}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{offer.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-primary font-bold">
                      <Percent size={14} />
                      <span>{offer.cashback}%</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-8 text-xs rounded-xl">
                      Ativar
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Offers;