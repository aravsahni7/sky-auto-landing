import { motion } from "framer-motion";
import {
  DollarSign,
  ClipboardCheck,
  CreditCard,
  RefreshCw,
  FileText,
  Languages,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhySkyAuto = () => {
  const { t, language } = useLanguage();

  const benefits = [
    {
      icon: DollarSign,
      title: t.whyUs.transparentPricing,
      description: t.whyUs.transparentPricingDesc,
    },
    {
      icon: ClipboardCheck,
      title: t.whyUs.vehicleInspection,
      description: t.whyUs.vehicleInspectionDesc,
    },
    {
      icon: CreditCard,
      title: t.whyUs.flexibleFinancing,
      description: t.whyUs.flexibleFinancingDesc,
    },
    {
      icon: RefreshCw,
      title: t.whyUs.tradeInSupport,
      description: t.whyUs.tradeInSupportDesc,
    },
    {
      icon: FileText,
      title: t.whyUs.fastPaperwork,
      description: t.whyUs.fastPaperworkDesc,
    },
    {
      icon: Languages,
      title: t.whyUs.bilingualService,
      description: t.whyUs.bilingualServiceDesc,
    },
  ];

  const subtitle =
    language === "fr"
      ? "Une expérience simple, claire et soignée — du premier clic jusqu’aux clés."
      : "A refined, transparent experience — from first click to keys.";

  return (
    <section className="py-20 lg:py-28 bg-background noise-bg">
      <div className="container mx-auto px-4">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-start">
          {/* Left header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 mb-10 lg:mb-0"
          >
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.24em] uppercase text-muted-foreground">
              <span className="w-6 h-px bg-border" />
              {t.whyUs.title}
            </div>

            <h2 className="mt-3 text-3xl md:text-4xl font-semibold leading-tight">
              {t.whyUs.title}
            </h2>

            <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-md">
              {subtitle}
            </p>

            <div className="mt-6 w-28 h-px bg-primary/70" />
          </motion.div>

          {/* Right cards */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -3 }}
                    className="group"
                  >
                    <div className="h-full rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md shadow-sm transition-all duration-200 group-hover:border-border group-hover:shadow-md">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-5">
                          <span className="text-xs tracking-[0.22em] text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="w-11 h-11 rounded-full border border-border/70 bg-background/30 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                        </div>

                        <h3 className="font-semibold text-base leading-snug">
                          {benefit.title}
                        </h3>

                        <div className="mt-3 h-px w-10 bg-border transition-all duration-200 group-hover:w-16 group-hover:bg-primary/60" />

                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySkyAuto;
