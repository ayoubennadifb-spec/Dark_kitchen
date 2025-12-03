import { ShoppingBag, ChefHat, Truck, CreditCard, Package, Star, Bike, Clock, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  icon: React.ElementType;
  title: string;
  titleAr: string;
  description: string;
}

const customerSteps: Step[] = [
  {
    icon: ShoppingBag,
    title: "Parcourez les plats",
    titleAr: "تصفح الأطباق",
    description: "Découvrez des centaines de plats maison préparés par nos chefs locaux.",
  },
  {
    icon: CreditCard,
    title: "Commandez en ligne",
    titleAr: "اطلب عبر الإنترنت",
    description: "Payez en toute sécurité et choisissez votre créneau de livraison.",
  },
  {
    icon: Package,
    title: "Recevez chez vous",
    titleAr: "استلم في المنزل",
    description: "Un livreur vous apporte votre repas chaud, prêt à déguster.",
  },
];

const chefSteps: Step[] = [
  {
    icon: ChefHat,
    title: "Créez votre profil",
    titleAr: "أنشئ حسابك",
    description: "Inscrivez-vous et faites vérifier votre cuisine gratuitement.",
  },
  {
    icon: Star,
    title: "Publiez vos plats",
    titleAr: "انشر أطباقك",
    description: "Ajoutez vos spécialités avec photos et prix.",
  },
  {
    icon: Wallet,
    title: "Gagnez de l'argent",
    titleAr: "اربح المال",
    description: "Recevez vos paiements chaque semaine directement sur votre compte.",
  },
];

const deliverySteps: Step[] = [
  {
    icon: Bike,
    title: "Inscrivez-vous",
    titleAr: "سجّل",
    description: "Créez votre compte livreur en quelques minutes.",
  },
  {
    icon: Clock,
    title: "Choisissez vos horaires",
    titleAr: "اختر أوقاتك",
    description: "Travaillez quand vous voulez, où vous voulez.",
  },
  {
    icon: Wallet,
    title: "Soyez payé",
    titleAr: "احصل على أجرك",
    description: "Paiements quotidiens ou hebdomadaires à votre choix.",
  },
];

interface StepCardProps {
  step: Step;
  index: number;
  variant: "customer" | "chef" | "delivery";
}

function StepCard({ step, index, variant }: StepCardProps) {
  const Icon = step.icon;
  const variantStyles = {
    customer: "bg-primary/10 text-primary",
    chef: "bg-secondary/10 text-secondary",
    delivery: "bg-accent/10 text-accent",
  };

  return (
    <div className="relative group">
      {/* Connector line */}
      {index < 2 && (
        <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border -translate-x-1/2 z-0">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-border" />
        </div>
      )}
      
      <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-card hover:shadow-card transition-all duration-300 group-hover:-translate-y-1">
        {/* Step number */}
        <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-background border-2 border-border flex items-center justify-center text-sm font-bold text-muted-foreground">
          {index + 1}
        </div>
        
        {/* Icon */}
        <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center mb-4", variantStyles[variant])}>
          <Icon className="h-8 w-8" />
        </div>
        
        {/* Content */}
        <h3 className="font-display text-xl font-semibold text-foreground mb-1">
          {step.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2" dir="rtl">
          {step.titleAr}
        </p>
        <p className="text-sm text-muted-foreground">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-warm">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-muted-foreground" dir="rtl">
            كيف يعمل؟
          </p>
        </div>

        {/* Customer Journey */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground">
              Pour les gourmands
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-12">
            {customerSteps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} variant="customer" />
            ))}
          </div>
        </div>

        {/* Chef Journey */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <ChefHat className="h-5 w-5 text-secondary" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground">
              Pour les chefs maison
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-12">
            {chefSteps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} variant="chef" />
            ))}
          </div>
        </div>

        {/* Delivery Journey */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Truck className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground">
              Pour les livreurs
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-12">
            {deliverySteps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} variant="delivery" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
