import { Button } from "@/components/ui/button";
import { CitySelector } from "@/components/CitySelector";
import heroImage from "@/assets/hero-food.jpg";
import { ChefHat, Truck, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Authentic Moroccan homemade food"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        <div className="absolute inset-0 moroccan-pattern opacity-30" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 lg:py-32">
        <div className="max-w-2xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-accent border border-accent/30 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-sm font-medium">+500 chefs maison actifs</span>
          </div>

          {/* Headline */}
          <div className="space-y-4 animate-slide-up">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              La cuisine marocaine
              <span className="text-gradient-primary block">faite maison</span>
              livrée chez vous
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg" dir="rtl">
              أطباق مغربية أصيلة من الدار للدار
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-lg animate-slide-up animation-delay-200">
            Découvrez les saveurs authentiques du Maroc préparées avec amour par nos chefs maison. 
            Tajines, couscous, rfissa et plus encore, directement de leur cuisine à votre table.
          </p>

          {/* City Selector */}
          <div className="animate-slide-up animation-delay-400">
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Où souhaitez-vous être livré ?
            </p>
            <CitySelector variant="hero" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 animate-slide-up animation-delay-600">
            <Button variant="hero" size="xl" asChild>
              <Link to="/discover">
                <ShoppingBag className="h-5 w-5" />
                Commander maintenant
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/become-chef">
                <ChefHat className="h-5 w-5" />
                Devenir chef
              </Link>
            </Button>
            <Button variant="ghost" size="lg" className="text-muted-foreground" asChild>
              <Link to="/become-driver">
                <Truck className="h-5 w-5" />
                Devenir livreur
              </Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 pt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-secondary font-bold">✓</span>
              </div>
              <span>Cuisines vérifiées</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-secondary font-bold">🛡️</span>
              </div>
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-secondary font-bold">⭐</span>
              </div>
              <span>+10,000 avis 5 étoiles</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
