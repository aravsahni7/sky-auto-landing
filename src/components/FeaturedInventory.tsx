import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { vehicles, Vehicle } from '@/data/inventory';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc';

// ✅ Use this URL for the 2023 Honda Civic Type R image
const CIVIC_TYPE_R_IMAGE_URL =
  'https://mma.prnewswire.com/media/1930875/02_2023_Civic_Type__R.jpg?w=1400';

const FeaturedInventory = () => {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');

  // ✅ Patch vehicles at render-time: if it's the 2023 Honda Civic Type R, force the image URL
  const patchedVehicles = vehicles.map((v) => {
    const isCivicTypeR =
      v.year === 2023 &&
      v.make?.toLowerCase() === 'honda' &&
      v.model?.toLowerCase().includes('civic') &&
      v.model?.toLowerCase().includes('type r');

    return isCivicTypeR ? { ...v, image: CIVIC_TYPE_R_IMAGE_URL } : v;
  });

  const sortedVehicles = [...patchedVehicles].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'year-desc':
        return b.year - a.year;
      case 'mileage-asc':
        return a.mileage - b.mileage;
      default:
        return 0;
    }
  });

  const getBadgeLabel = (badge: string) => {
    switch (badge) {
      case 'certified':
        return t.badges.certified;
      case 'new':
        return t.badges.new;
      case 'hotDeal':
        return t.badges.hotDeal;
      default:
        return badge;
    }
  };

  const getBadgeVariant = (badge: string): 'default' | 'secondary' | 'destructive' => {
    switch (badge) {
      case 'hotDeal':
        return 'destructive';
      case 'new':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <section id="inventory" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{t.featured.title}</h2>
            <div className="w-20 h-1 bg-primary rounded-full" />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm">{t.featured.sortBy}:</span>
            <Select value={sortBy} onValueChange={(val) => setSortBy(val as SortOption)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="price-asc">{t.featured.price} ↑</SelectItem>
                <SelectItem value="price-desc">{t.featured.price} ↓</SelectItem>
                <SelectItem value="year-desc">{t.featured.year} ↓</SelectItem>
                <SelectItem value="mileage-asc">{t.featured.mileage} ↑</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVehicles.map((vehicle, index) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              index={index}
              t={t}
              getBadgeLabel={getBadgeLabel}
              getBadgeVariant={getBadgeVariant}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
  t: ReturnType<typeof useLanguage>['t'];
  getBadgeLabel: (badge: string) => string;
  getBadgeVariant: (badge: string) => 'default' | 'secondary' | 'destructive';
}

const VehicleCard = ({ vehicle, index, t, getBadgeLabel, getBadgeVariant }: VehicleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border card-hover"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        {vehicle.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {vehicle.badges.map((badge) => (
              <Badge key={badge} variant={getBadgeVariant(badge)} className="text-xs font-medium">
                {getBadgeLabel(badge)}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-semibold mb-1">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm text-muted-foreground">
            {vehicle.mileage.toLocaleString()} {t.featured.km} • {vehicle.transmission} • {vehicle.drivetrain}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${vehicle.price.toLocaleString()}</span>
          <Button size="sm" variant="secondary">
            {t.featured.viewDetails}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedInventory;
