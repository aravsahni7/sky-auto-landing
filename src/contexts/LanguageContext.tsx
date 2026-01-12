import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface Translations {
  nav: {
    inventory: string;
    buy: string;
    sell: string;
    exchange: string;
    financing: string;
    contact: string;
    callNow: string;
    searchVehicles: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    searchPlaceholder: string;
    browseInventory: string;
    getTradeIn: string;
  };
  search: {
    make: string;
    model: string;
    yearFrom: string;
    yearTo: string;
    priceMin: string;
    priceMax: string;
    bodyType: string;
    moreFilters: string;
    search: string;
    clear: string;
    transmission: string;
    mileageMax: string;
    fuelType: string;
    drivetrain: string;
    condition: string;
    color: string;
    anyMake: string;
    anyModel: string;
    anyYear: string;
    anyPrice: string;
    anyBody: string;
    placeholder: string;
  };
  quickActions: {
    title: string;
    buyTitle: string;
    buyDesc: string;
    buyCta: string;
    sellTitle: string;
    sellDesc: string;
    sellCta: string;
    exchangeTitle: string;
    exchangeDesc: string;
    exchangeCta: string;
  };
  featured: {
    title: string;
    viewDetails: string;
    sortBy: string;
    price: string;
    year: string;
    mileage: string;
    km: string;
  };
  whyUs: {
    title: string;
    transparentPricing: string;
    transparentPricingDesc: string;
    vehicleInspection: string;
    vehicleInspectionDesc: string;
    flexibleFinancing: string;
    flexibleFinancingDesc: string;
    tradeInSupport: string;
    tradeInSupportDesc: string;
    fastPaperwork: string;
    fastPaperworkDesc: string;
    bilingualService: string;
    bilingualServiceDesc: string;
  };
  financing: {
    title: string;
    subtitle: string;
    cta: string;
    name: string;
    email: string;
    phone: string;
    submit: string;
  };
  testimonials: {
    title: string;
  };
  footer: {
    hours: string;
    mondayFriday: string;
    saturday: string;
    sunday: string;
    closed: string;
    address: string;
    quickLinks: string;
    privacy: string;
    terms: string;
    copyright: string;
  };
  badges: {
    certified: string;
    new: string;
    hotDeal: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      inventory: 'Inventory',
      buy: 'Buy',
      sell: 'Sell',
      exchange: 'Exchange',
      financing: 'Financing',
      contact: 'Contact',
      callNow: 'Call Now',
      searchVehicles: 'Search Vehicles',
    },
    hero: {
      headline: 'Find your next vehicle—fast.',
      subheadline: 'Buy, Sell, Exchange. Trusted deals and a smooth process from start to finish.',
      searchPlaceholder: 'Select your vehicle today',
      browseInventory: 'Browse Inventory',
      getTradeIn: 'Get Trade-In Value',
    },
    search: {
      make: 'Make',
      model: 'Model',
      yearFrom: 'Year From',
      yearTo: 'Year To',
      priceMin: 'Min Price',
      priceMax: 'Max Price',
      bodyType: 'Body Type',
      moreFilters: 'More Filters',
      search: 'Search',
      clear: 'Clear',
      transmission: 'Transmission',
      mileageMax: 'Max Mileage',
      fuelType: 'Fuel Type',
      drivetrain: 'Drivetrain',
      condition: 'Condition',
      color: 'Color',
      anyMake: 'Any Make',
      anyModel: 'Any Model',
      anyYear: 'Any Year',
      anyPrice: 'Any Price',
      anyBody: 'Any Body',
      placeholder: 'Make, model, or keyword',
    },
    quickActions: {
      title: 'Buy, Sell, Exchange',
      buyTitle: 'Buy a Vehicle',
      buyDesc: 'Browse our curated selection of quality vehicles at competitive prices.',
      buyCta: 'Start Shopping',
      sellTitle: 'Sell Your Car',
      sellDesc: 'Get a fair market value for your vehicle with our hassle-free process.',
      sellCta: 'Get Your Offer',
      exchangeTitle: 'Trade-In',
      exchangeDesc: 'Exchange your current vehicle and upgrade to something new.',
      exchangeCta: 'Value My Trade',
    },
    featured: {
      title: 'Featured Inventory',
      viewDetails: 'View Details',
      sortBy: 'Sort by',
      price: 'Price',
      year: 'Year',
      mileage: 'Mileage',
      km: 'km',
    },
    whyUs: {
      title: 'Why Choose Sky Auto',
      transparentPricing: 'Transparent Pricing',
      transparentPricingDesc: 'No hidden fees. What you see is what you pay.',
      vehicleInspection: 'Vehicle Inspection',
      vehicleInspectionDesc: 'Every car undergoes a rigorous multi-point inspection.',
      flexibleFinancing: 'Flexible Financing',
      flexibleFinancingDesc: 'Competitive rates and options for every credit situation.',
      tradeInSupport: 'Trade-In Support',
      tradeInSupportDesc: 'Fair valuations and seamless trade-in process.',
      fastPaperwork: 'Fast Paperwork',
      fastPaperworkDesc: 'Get on the road faster with our streamlined process.',
      bilingualService: 'Bilingual Service',
      bilingualServiceDesc: 'Proudly serving you in English and French.',
    },
    financing: {
      title: 'Get Pre-Approved Today',
      subtitle: 'Quick approval process. Find out your options in minutes.',
      cta: 'Get Pre-Approved',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      submit: 'Submit Application',
    },
    testimonials: {
      title: 'What Our Customers Say',
    },
    footer: {
      hours: 'Hours',
      mondayFriday: 'Monday - Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      closed: 'Closed',
      address: '1234 Auto Boulevard, Montreal, QC H1A 2B3',
      quickLinks: 'Quick Links',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      copyright: '© 2024 Sky Auto. All rights reserved.',
    },
    badges: {
      certified: 'Certified',
      new: 'New',
      hotDeal: 'Hot Deal',
    },
  },
  fr: {
    nav: {
      inventory: 'Inventaire',
      buy: 'Acheter',
      sell: 'Vendre',
      exchange: 'Échanger',
      financing: 'Financement',
      contact: 'Contact',
      callNow: 'Appelez-nous',
      searchVehicles: 'Rechercher',
    },
    hero: {
      headline: 'Trouvez votre prochain véhicule—rapidement.',
      subheadline: 'Acheter, vendre, échanger. Des offres fiables et un processus simple du début à la fin.',
      searchPlaceholder: 'Sélectionnez votre véhicule aujourd\'hui',
      browseInventory: 'Voir l\'inventaire',
      getTradeIn: 'Estimer mon échange',
    },
    search: {
      make: 'Marque',
      model: 'Modèle',
      yearFrom: 'Année min',
      yearTo: 'Année max',
      priceMin: 'Prix min',
      priceMax: 'Prix max',
      bodyType: 'Carrosserie',
      moreFilters: 'Plus de filtres',
      search: 'Rechercher',
      clear: 'Effacer',
      transmission: 'Transmission',
      mileageMax: 'Kilométrage max',
      fuelType: 'Carburant',
      drivetrain: 'Transmission',
      condition: 'État',
      color: 'Couleur',
      anyMake: 'Toutes marques',
      anyModel: 'Tous modèles',
      anyYear: 'Toutes années',
      anyPrice: 'Tous prix',
      anyBody: 'Toutes carrosseries',
      placeholder: 'Marque, modèle, ou mot-clé',
    },
    quickActions: {
      title: 'Acheter, Vendre, Échanger',
      buyTitle: 'Acheter un véhicule',
      buyDesc: 'Parcourez notre sélection de véhicules de qualité à prix compétitifs.',
      buyCta: 'Magasiner',
      sellTitle: 'Vendre votre auto',
      sellDesc: 'Obtenez une valeur marchande juste pour votre véhicule.',
      sellCta: 'Obtenir une offre',
      exchangeTitle: 'Échange',
      exchangeDesc: 'Échangez votre véhicule actuel et passez à quelque chose de nouveau.',
      exchangeCta: 'Évaluer mon échange',
    },
    featured: {
      title: 'Inventaire vedette',
      viewDetails: 'Voir détails',
      sortBy: 'Trier par',
      price: 'Prix',
      year: 'Année',
      mileage: 'Kilométrage',
      km: 'km',
    },
    whyUs: {
      title: 'Pourquoi choisir Sky Auto',
      transparentPricing: 'Prix transparents',
      transparentPricingDesc: 'Aucuns frais cachés. Ce que vous voyez est ce que vous payez.',
      vehicleInspection: 'Inspection du véhicule',
      vehicleInspectionDesc: 'Chaque voiture subit une inspection rigoureuse.',
      flexibleFinancing: 'Financement flexible',
      flexibleFinancingDesc: 'Taux compétitifs et options pour chaque situation de crédit.',
      tradeInSupport: 'Support d\'échange',
      tradeInSupportDesc: 'Évaluations justes et processus d\'échange sans tracas.',
      fastPaperwork: 'Paperasse rapide',
      fastPaperworkDesc: 'Prenez la route plus vite avec notre processus simplifié.',
      bilingualService: 'Service bilingue',
      bilingualServiceDesc: 'Fiers de vous servir en français et en anglais.',
    },
    financing: {
      title: 'Obtenez une pré-approbation aujourd\'hui',
      subtitle: 'Processus d\'approbation rapide. Découvrez vos options en quelques minutes.',
      cta: 'Demander une pré-approbation',
      name: 'Nom complet',
      email: 'Courriel',
      phone: 'Téléphone',
      submit: 'Soumettre la demande',
    },
    testimonials: {
      title: 'Ce que disent nos clients',
    },
    footer: {
      hours: 'Heures',
      mondayFriday: 'Lundi - Vendredi',
      saturday: 'Samedi',
      sunday: 'Dimanche',
      closed: 'Fermé',
      address: '1234 Boulevard Auto, Montréal, QC H1A 2B3',
      quickLinks: 'Liens rapides',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions d\'utilisation',
      copyright: '© 2024 Sky Auto. Tous droits réservés.',
    },
    badges: {
      certified: 'Certifié',
      new: 'Neuf',
      hotDeal: 'Aubaine',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
