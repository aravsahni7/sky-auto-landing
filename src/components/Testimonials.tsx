import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials = () => {
  const { t, language } = useLanguage();

  const testimonials = [
    {
      quote: language === 'fr' 
        ? "Processus incroyablement simple. J'ai trouvé ma BMW de rêve en moins d'une semaine!"
        : "Incredibly smooth process. Found my dream BMW in less than a week!",
      name: 'Marc L.',
      location: 'Laval, QC',
      rating: 5,
    },
    {
      quote: language === 'fr'
        ? "Le meilleur service que j'ai eu pour un échange. Prix juste et pas de pression."
        : "Best trade-in experience I've ever had. Fair price and no pressure.",
      name: 'Sarah T.',
      location: 'Montreal, QC',
      rating: 5,
    },
    {
      quote: language === 'fr'
        ? "Service bilingue exceptionnel et financement approuvé le même jour!"
        : "Outstanding bilingual service and same-day financing approval!",
      name: 'Jean-Pierre M.',
      location: 'Longueuil, QC',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-secondary/20 noise-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.testimonials.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
              
              {/* Author */}
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
