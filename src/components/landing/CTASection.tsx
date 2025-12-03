import { Button } from "@/components/ui/button";
import { ChefHat, Truck, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary relative overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 moroccan-pattern opacity-10" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Become a Chef */}
          <div className="bg-background/10 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-secondary-foreground/10">
            <div className="h-16 w-16 rounded-2xl bg-accent flex items-center justify-center mb-6">
              <ChefHat className="h-8 w-8 text-accent-foreground" />
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-secondary-foreground mb-4">
              Vous cuisinez comme personne ?
            </h3>
            <p className="text-secondary-foreground/80 mb-2">
              Transformez votre passion en revenus. Rejoignez plus de 500 chefs maison qui 
              partagent leur cuisine avec le Maroc.
            </p>
            <p className="text-secondary-foreground/60 text-sm mb-6" dir="rtl">
              حوّل شغفك بالطبخ إلى دخل
            </p>
            <ul className="space-y-2 mb-8 text-secondary-foreground/90">
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Inscription gratuite
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Fixez vos propres prix
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Paiements hebdomadaires
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Support dédié
              </li>
            </ul>
            <Button variant="accent" size="lg" className="w-full sm:w-auto">
              Commencer comme chef
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Become a Delivery Partner */}
          <div className="bg-background/10 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-secondary-foreground/10">
            <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mb-6">
              <Truck className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-secondary-foreground mb-4">
              Livrez et gagnez votre vie
            </h3>
            <p className="text-secondary-foreground/80 mb-2">
              Rejoignez notre équipe de livreurs partenaires. Horaires flexibles, 
              paiements rapides, et une communauté bienveillante.
            </p>
            <p className="text-secondary-foreground/60 text-sm mb-6" dir="rtl">
              اربح من التوصيل بمرونة تامة
            </p>
            <ul className="space-y-2 mb-8 text-secondary-foreground/90">
              <li className="flex items-center gap-2">
                <span className="text-primary-foreground bg-primary/30 px-1 rounded">✓</span> Horaires à la carte
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-foreground bg-primary/30 px-1 rounded">✓</span> Paiements quotidiens
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-foreground bg-primary/30 px-1 rounded">✓</span> Bonus et primes
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-foreground bg-primary/30 px-1 rounded">✓</span> Assurance fournie
              </li>
            </ul>
            <Button 
              variant="default" 
              size="lg" 
              className="w-full sm:w-auto"
            >
              Devenir livreur partenaire
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
