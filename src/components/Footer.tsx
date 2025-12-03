import { Link } from "react-router-dom";
import { ChefHat, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const footerLinks = {
  platform: {
    title: "Plateforme",
    titleAr: "المنصة",
    links: [
      { label: "Comment ça marche", href: "/how-it-works" },
      { label: "Devenir chef", href: "/become-chef" },
      { label: "Devenir livreur", href: "/become-driver" },
      { label: "Tarifs", href: "/pricing" },
    ],
  },
  community: {
    title: "Communauté",
    titleAr: "المجتمع",
    links: [
      { label: "Discussions", href: "/community" },
      { label: "Recettes", href: "/recipes" },
      { label: "Compétitions", href: "/competitions" },
      { label: "Événements", href: "/events" },
    ],
  },
  support: {
    title: "Support",
    titleAr: "الدعم",
    links: [
      { label: "Centre d'aide", href: "/help" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Sécurité alimentaire", href: "/safety" },
    ],
  },
  legal: {
    title: "Légal",
    titleAr: "قانوني",
    links: [
      { label: "Conditions d'utilisation", href: "/terms" },
      { label: "Politique de confidentialité", href: "/privacy" },
      { label: "Cookies", href: "/cookies" },
      { label: "Mentions légales", href: "/legal" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">DarFood</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              La plateforme qui connecte les cuisines marocaines aux gourmands. 
              Authentique, fait maison, livré avec amour.
            </p>
            <p className="text-muted-foreground text-sm mb-6" dir="rtl">
              الطبخ المغربي من الدار للدار
            </p>

            {/* Newsletter */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Newsletter</p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Votre email" 
                  className="max-w-[200px]"
                />
                <Button variant="default" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
            <span>© 2024 DarFood. Tous droits réservés.</span>
            <div className="flex items-center gap-4">
              <a href="tel:+212600000000" className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Phone className="h-3.5 w-3.5" />
                +212 6 00 00 00 00
              </a>
              <a href="mailto:contact@darfood.ma" className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Mail className="h-3.5 w-3.5" />
                contact@darfood.ma
              </a>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
