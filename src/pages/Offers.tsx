import { motion } from "framer-motion";
import { Search, Filter, Percent } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 safe-top pt-4">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-foreground mb-4"
        >
          Ofertas
        </motion.h1>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-4"
        >
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar lojas..."
            className="w-full pl-12 pr-12 py-3 rounded-xl bg-card shadow-card border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-secondary">
            <Filter size={18} className="text-muted-foreground" />
          </button>
        </motion.div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                index === 0
                  ? "gradient-primary text-primary-foreground"
                  : "bg-card text-foreground shadow-card"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-2 gap-3">
          {allOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 rounded-2xl bg-card shadow-card cursor-pointer hover:shadow-elevated transition-all"
            >
              <div className="text-4xl mb-3">{offer.logo}</div>
              <h4 className="font-semibold text-foreground mb-1">{offer.store}</h4>
              <p className="text-xs text-muted-foreground mb-3">{offer.category}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-primary font-bold">
                  <Percent size={14} />
                  <span>{offer.cashback}%</span>
                </div>
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  Ativar
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
    </AppLayout>
  );
};

export default Offers;
