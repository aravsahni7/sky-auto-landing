import { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';
import logo from '@/assets/logo.png';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.inventory, href: '#inventory' },
    { label: t.nav.buy, href: '#buy' },
    { label: t.nav.sell, href: '#sell' },
    { label: t.nav.financing, href: '#financing' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - seamlessly integrated */}
          <a href="#" className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-80" />
            <img 
              src={logo} 
              alt="AutoSky" 
              className="h-10 w-auto relative mix-blend-lighten brightness-110" 
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              {t.nav.contact} <span className="text-xs">▾</span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Language Toggle - Clean */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className={`text-xs ${language === 'en' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>EN</span>
              <Switch
                checked={language === 'fr'}
                onCheckedChange={(checked) => setLanguage(checked ? 'fr' : 'en')}
                className="data-[state=checked]:bg-primary h-5 w-9"
              />
              <span className={`text-xs ${language === 'fr' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>FR</span>
            </div>

            {/* Call CTA - Clean pill button */}
            <a
              href="tel:+15141234567"
              className="hidden md:flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {t.nav.callNow}
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('#contact')}
                className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.contact}
              </button>
              <div className="flex items-center gap-2 py-2 text-sm">
                <span className={language === 'en' ? 'text-foreground font-medium' : 'text-muted-foreground'}>EN</span>
                <Switch
                  checked={language === 'fr'}
                  onCheckedChange={(checked) => setLanguage(checked ? 'fr' : 'en')}
                  className="data-[state=checked]:bg-primary"
                />
                <span className={language === 'fr' ? 'text-foreground font-medium' : 'text-muted-foreground'}>FR</span>
              </div>
              <a
                href="tel:+15141234567"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-primary-foreground rounded-full font-medium"
              >
                <Phone className="w-4 h-4" />
                {t.nav.callNow}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
