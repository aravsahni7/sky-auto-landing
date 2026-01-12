import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { t, language } = useLanguage();

  // ✅ Replace this with DT MTL's exact address (or keep the query as-is)
  // You can also swap to a "place_id:" query if you have it.
  const googleMapsQuery = encodeURIComponent("DT MTL Montreal");

  // ✅ Embed URL (no API key required for simple embeds)
  const mapSrc = `https://www.google.com/maps?q=${googleMapsQuery}&output=embed`;

  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <img src={logo} alt="AutoSky" className="h-10 mb-4" />
            <p className="text-muted-foreground text-sm mb-6">
              {language === "fr"
                ? "Votre destination de confiance pour l'achat, la vente et l'échange de véhicules de qualité."
                : "Your trusted destination for buying, selling, and exchanging quality vehicles."}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                {t.footer.address}
              </li>
              <li>
                <a
                  href="tel:+15141234567"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  (514) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@skyauto.ca"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  info@skyauto.ca
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              {t.footer.hours}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>{t.footer.mondayFriday}</span>
                <span>9:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>{t.footer.saturday}</span>
                <span>9:00 - 17:00</span>
              </li>
              <li className="flex justify-between">
                <span>{t.footer.sunday}</span>
                <span>{t.footer.closed}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inventory" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.nav.inventory}
                </a>
              </li>
              <li>
                <a href="#financing" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.nav.financing}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.terms}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ✅ Embedded Google Map (dark-styled container) */}
        <div className="mt-12 rounded-xl overflow-hidden border border-border bg-secondary/40">
          {/* NOTE: Google’s embed doesn’t always fully support “true dark mode”.
              This applies a dark-ish presentation with overlay + grayscale/contrast. */}
          <div className="relative h-48 md:h-56">
            <iframe
              title="DT MTL Google Map"
              src={mapSrc}
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                border: 0,
                filter: "grayscale(20%) invert(90%) hue-rotate(180deg) contrast(90%)",
              }}
              allowFullScreen
            />
            {/* Optional dark overlay so it matches your theme better */}
            <div className="pointer-events-none absolute inset-0 bg-black/20" />
          </div>

          <div className="px-4 py-3 flex items-center justify-between text-sm text-muted-foreground">
            <span>{language === "fr" ? "Emplacement : DT MTL (Montréal)" : "Location: DT MTL (Montreal)"}</span>
            <a
              className="hover:text-foreground transition-colors"
              href={`https://www.google.com/maps/search/?api=1&query=${googleMapsQuery}`}
              target="_blank"
              rel="noreferrer"
            >
              {language === "fr" ? "Ouvrir dans Google Maps" : "Open in Google Maps"}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
