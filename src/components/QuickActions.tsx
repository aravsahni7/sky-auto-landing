import { motion } from "framer-motion";
import { ShoppingCart, DollarSign, RefreshCw, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  const { t } = useLanguage();

  const actions = [
    {
      id: "buy",
      icon: ShoppingCart,
      title: t.quickActions.buyTitle,
      description: t.quickActions.buyDesc,
      cta: t.quickActions.buyCta,
      href: "#inventory",
      details: ["New arrivals updated weekly", "Hand-picked inventory", "Easy search & filters"],
    },
    {
      id: "sell",
      icon: DollarSign,
      title: t.quickActions.sellTitle,
      description: t.quickActions.sellDesc,
      cta: t.quickActions.sellCta,
      href: "#financing",
      details: ["Fast response time", "Fair market valuation", "We handle the paperwork"],
    },
    {
      id: "exchange",
      icon: RefreshCw,
      title: t.quickActions.exchangeTitle,
      description: t.quickActions.exchangeDesc,
      cta: t.quickActions.exchangeCta,
      href: "#financing",
      details: ["Simple trade-in process", "Upgrade options available", "Transparent offers"],
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="buy" className="py-20 lg:py-28 noise-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.quickActions.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {actions.map((action, index) => {
            const Icon = action.icon;

            return (
              <motion.div
                key={action.id}
                id={action.id === "sell" ? "sell" : action.id === "exchange" ? "exchange" : undefined}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                {/* ✅ Single card wrapper: border stays continuous top->bottom */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative bg-card rounded-2xl border border-border overflow-hidden card-hover h-auto"
                >
                  {/* Main content */}
                  <div className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>

                    <h3 className="text-xl font-semibold mb-3">{action.title}</h3>
                    <p className="text-muted-foreground">{action.description}</p>
                  </div>

                  {/* ✅ Expand section INSIDE same border (no overlap, no detached sides) */}
                  <div className="max-h-0 overflow-hidden group-hover:max-h-[260px] transition-[max-height] duration-300 ease-out">
                    <div className="px-8 pb-6">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-semibold">
                          {action.id === "buy"
                            ? "What you get"
                            : action.id === "sell"
                            ? "Selling perks"
                            : "Trade-in perks"}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {action.details.map((line) => (
                          <li key={line} className="flex items-start gap-2">
                            <span className="mt-[3px] inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15">
                              <Check className="h-3 w-3 text-primary" />
                            </span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">Hover to preview • Click to jump</div>

                        <Button
                          onClick={() => scrollToSection(action.href)}
                          size="sm"
                          className="gap-2 glow-red hover:glow-red-strong"
                        >
                          {action.cta}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* ✅ Always visible “peek” bar (fully readable) */}
                  <div className="border-t border-border bg-secondary/40 px-8 py-3 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {action.id === "buy"
                        ? "Browse instantly"
                        : action.id === "sell"
                        ? "Get a quick offer"
                        : "Upgrade smoothly"}
                    </span>
                    <span className="text-primary font-medium">Details on hover</span>
                  </div>

                  {/* Subtle glow on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute -inset-16 bg-primary/10 blur-3xl" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
