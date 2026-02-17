import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Clock, Users, Filter, ChevronDown, Leaf, Flame, Snowflake, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Receita {
  id: string;
  nome: string;
  descricao: string;
  tempoPreparo: number;
  porcoes: number;
  fase: string;
  categoria: string;
  ingredientes: string[];
  modoPreparo: string[];
  calorias?: number;
  tags: string[];
  emoji: string;
}

const receitasMock: Receita[] = [
  {
    id: "1",
    nome: "Sopa Detox de Abóbora",
    descricao: "Sopa leve e nutritiva, ideal para o pós-operatório imediato.",
    tempoPreparo: 25,
    porcoes: 4,
    fase: "pos-operatorio",
    categoria: "sopas",
    ingredientes: ["500g abóbora", "1 cenoura", "1 cebola", "2 dentes de alho", "Gengibre ralado", "Cúrcuma", "Sal a gosto"],
    modoPreparo: ["Refogue cebola e alho no azeite.", "Adicione abóbora e cenoura em cubos.", "Cubra com água e cozinhe até amolecer.", "Bata no liquidificador, tempere com gengibre e cúrcuma."],
    calorias: 120,
    tags: ["anti-inflamatória", "low-carb", "sem glúten"],
    emoji: "🎃",
  },
  {
    id: "2",
    nome: "Smoothie Anti-inflamatório",
    descricao: "Bebida refrescante rica em antioxidantes para reduzir inflamação.",
    tempoPreparo: 5,
    porcoes: 1,
    fase: "manutencao",
    categoria: "bebidas",
    ingredientes: ["1 banana congelada", "1 xícara de frutas vermelhas", "1 colher de açaí", "200ml leite de amêndoa", "1 colher de chia"],
    modoPreparo: ["Adicione todos os ingredientes no liquidificador.", "Bata até ficar cremoso.", "Sirva imediatamente."],
    calorias: 180,
    tags: ["anti-inflamatória", "sem lactose", "rápido"],
    emoji: "🫐",
  },
  {
    id: "3",
    nome: "Bowl Proteico de Frango",
    descricao: "Refeição completa e balanceada para fase de manutenção.",
    tempoPreparo: 30,
    porcoes: 2,
    fase: "manutencao",
    categoria: "principais",
    ingredientes: ["200g peito de frango", "1 xícara de quinoa", "Brócolis", "Cenoura ralada", "Abacate", "Molho de tahini"],
    modoPreparo: ["Grelhe o frango temperado.", "Cozinhe a quinoa.", "Monte o bowl com vegetais frescos.", "Regue com molho de tahini."],
    calorias: 420,
    tags: ["proteico", "sem glúten", "balanceado"],
    emoji: "🥗",
  },
  {
    id: "4",
    nome: "Chá Digestivo de Ervas",
    descricao: "Blend calmante para auxiliar a digestão e reduzir inchaço.",
    tempoPreparo: 10,
    porcoes: 2,
    fase: "pre-operatorio",
    categoria: "bebidas",
    ingredientes: ["Hortelã fresca", "Gengibre fatiado", "Camomila", "Mel (opcional)", "500ml água quente"],
    modoPreparo: ["Ferva a água.", "Adicione as ervas e o gengibre.", "Deixe em infusão por 5 minutos.", "Coe e adoce se desejar."],
    calorias: 15,
    tags: ["digestivo", "calmante", "sem cafeína"],
    emoji: "🍵",
  },
  {
    id: "5",
    nome: "Pudim de Chia com Manga",
    descricao: "Sobremesa saudável rica em fibras e ômega-3.",
    tempoPreparo: 10,
    porcoes: 2,
    fase: "manutencao",
    categoria: "sobremesas",
    ingredientes: ["3 colheres de chia", "200ml leite de coco", "1 manga madura", "Mel a gosto", "Canela"],
    modoPreparo: ["Misture chia com leite de coco.", "Leve à geladeira por 4 horas.", "Bata a manga e sirva por cima.", "Finalize com canela."],
    calorias: 210,
    tags: ["sem glúten", "sem lactose", "fibras"],
    emoji: "🥭",
  },
  {
    id: "6",
    nome: "Caldo Verde Nutritivo",
    descricao: "Caldo reconfortante e leve, perfeito para recuperação.",
    tempoPreparo: 35,
    porcoes: 6,
    fase: "pos-operatorio",
    categoria: "sopas",
    ingredientes: ["4 batatas médias", "1 maço de couve", "1 cebola", "2 dentes de alho", "Azeite extra virgem", "Sal e pimenta"],
    modoPreparo: ["Cozinhe as batatas com cebola e alho.", "Bata até virar creme.", "Adicione a couve fatiada fina.", "Cozinhe mais 5 minutos e finalize com azeite."],
    calorias: 150,
    tags: ["reconfortante", "sem glúten", "leve"],
    emoji: "🥬",
  },
];

const fases = [
  { value: "todos", label: "Todos", icon: Filter },
  { value: "pre-operatorio", label: "Pré-op", icon: Snowflake },
  { value: "pos-operatorio", label: "Pós-op", icon: Heart },
  { value: "manutencao", label: "Manutenção", icon: Leaf },
];

const categorias = ["todos", "sopas", "bebidas", "principais", "sobremesas"];

export const ReceitasSection = () => {
  const [faseFilter, setFaseFilter] = useState("todos");
  const [catFilter, setCatFilter] = useState("todos");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = receitasMock.filter((r) => {
    if (faseFilter !== "todos" && r.fase !== faseFilter) return false;
    if (catFilter !== "todos" && r.categoria !== catFilter) return false;
    return true;
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <ChefHat size={16} className="text-highlight" />
        <h3 className="text-sm font-semibold text-foreground">Receitas Recomendadas</h3>
      </div>

      {/* Fase filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {fases.map((f) => (
          <Button
            key={f.value}
            variant={faseFilter === f.value ? "default" : "outline"}
            size="sm"
            className="rounded-full text-xs gap-1 shrink-0 h-7 px-3"
            onClick={() => setFaseFilter(f.value)}
          >
            <f.icon size={12} />
            {f.label}
          </Button>
        ))}
      </div>

      {/* Category pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categorias.map((c) => (
          <Badge
            key={c}
            variant={catFilter === c ? "default" : "outline"}
            className="cursor-pointer text-[10px] px-2.5 py-0.5 rounded-full capitalize shrink-0"
            onClick={() => setCatFilter(c)}
          >
            {c === "todos" ? "Todas" : c}
          </Badge>
        ))}
      </div>

      {/* Recipe cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground text-sm border border-dashed rounded-xl">
            <ChefHat size={32} className="mx-auto mb-2 opacity-30" />
            <p>Nenhuma receita encontrada para este filtro.</p>
          </div>
        ) : (
          filtered.map((receita) => {
            const isOpen = expandedId === receita.id;
            return (
              <motion.div
                key={receita.id}
                layout
                className="rounded-2xl border glass-card-strong overflow-hidden"
              >
                {/* Card header */}
                <button
                  onClick={() => setExpandedId(isOpen ? null : receita.id)}
                  className="w-full text-left p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{receita.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm leading-tight">{receita.nome}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{receita.descricao}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                          <Clock size={10} /> {receita.tempoPreparo} min
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                          <Users size={10} /> {receita.porcoes} porções
                        </span>
                        {receita.calorias && (
                          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                            <Flame size={10} /> {receita.calorias} kcal
                          </span>
                        )}
                      </div>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={14} className="text-muted-foreground mt-1" />
                    </motion.div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {receita.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>

                {/* Expanded detail */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
                        <div>
                          <p className="text-xs font-semibold text-highlight uppercase tracking-wider mb-1">Ingredientes</p>
                          <ul className="space-y-0.5">
                            {receita.ingredientes.map((ing, i) => (
                              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                                <span className="text-highlight mt-1.5 text-[6px]">●</span>
                                {ing}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Modo de Preparo</p>
                          <ol className="space-y-1">
                            {receita.modoPreparo.map((step, i) => (
                              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                                <span className="text-primary font-bold text-xs mt-0.5 shrink-0">{i + 1}.</span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
