import { motion } from "framer-motion";
import { Percent, ChevronRight } from "lucide-react";

interface Offer {
  id: string;
  store: string;
  logo: string;
  cashback: number;
  category: string;
  featured?: boolean;
}

const offers: Offer[] = [
  {
    id: "1",
    store: "Amazon",
    logo: "🛒",
    cashback: 5,
    category: "Compras",
    featured: true,
  },
  {
    id: "2",
    store: "iFood",
    logo: "🍔",
    cashback: 8,
    category: "Alimentação",
  },
  {
    id: "3",
    store: "Uber",
    logo: "🚗",
    cashback: 3,
    category: "Transporte",
  },
  {
    id: "4",
    store: "Netflix",
    logo: "🎬",
    cashback: 10,
    category: "Streaming",
    featured: true,
  },
  {
    id: "5",
    store: "Spotify",
    logo: "🎵",
    cashback: 7,
    category: "Música",
  },
];

export const CashbackOffers = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">Ofertas de Cashback</h3>
        <button className="text-sm font-medium text-primary flex items-center gap-1">
          Ver todas <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-shrink-0 w-36 p-4 rounded-2xl bg-card shadow-card cursor-pointer hover:shadow-elevated transition-all ${
              offer.featured ? "ring-2 ring-primary/20" : ""
            }`}
          >
            <div className="text-3xl mb-3">{offer.logo}</div>
            <h4 className="font-semibold text-foreground mb-1">{offer.store}</h4>
            <p className="text-xs text-muted-foreground mb-2">{offer.category}</p>
            <div className="flex items-center gap-1 text-primary font-bold">
              <Percent size={14} />
              <span>{offer.cashback}%</span>
            </div>
            {offer.featured && (
              <span className="inline-block mt-2 text-[10px] font-semibold bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                Destaque
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
