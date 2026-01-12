import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import QuickActions from '@/components/QuickActions';
import FeaturedInventory from '@/components/FeaturedInventory';
import WhySkyAuto from '@/components/WhySkyAuto';
import FinancingCTA from '@/components/FinancingCTA';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <QuickActions />
          <FeaturedInventory />
          <WhySkyAuto />
          <FinancingCTA />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
