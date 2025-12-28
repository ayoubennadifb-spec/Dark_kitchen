import { Navbar, MobileNavbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChefBadge, BadgeProgress } from "@/components/ChefBadge";
import { ChefApplicationForm } from "@/components/chef/ChefApplicationForm";
import { 
  ChefHat, 
  Wallet, 
  Clock, 
  Shield, 
  Star, 
  Users, 
  ArrowRight,
  CheckCircle,
  Camera,
  FileCheck,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: Wallet,
    title: "Revenus flexibles",
    description: "Gagnez jusqu'à 15,000 DH/mois en cuisinant depuis chez vous.",
  },
  {
    icon: Clock,
    title: "Vos horaires",
    description: "Cuisinez quand vous voulez, fixez vos propres disponibilités.",
  },
  {
    icon: Shield,
    title: "Support dédié",
    description: "Une équipe à votre écoute pour vous accompagner dans votre succès.",
  },
  {
    icon: Users,
    title: "Communauté",
    description: "Rejoignez +500 chefs et partagez vos recettes.",
  },
];

const steps = [
  {
    icon: Camera,
    title: "Créez votre profil",
    description: "Inscrivez-vous et présentez votre cuisine avec de belles photos.",
  },
  {
    icon: FileCheck,
    title: "Vérification",
    description: "Notre équipe vérifie votre cuisine pour garantir l'hygiène.",
  },
  {
    icon: ChefHat,
    title: "Publiez vos plats",
    description: "Ajoutez vos spécialités avec prix et disponibilités.",
  },
  {
    icon: CreditCard,
    title: "Recevez vos paiements",
    description: "Paiements hebdomadaires directement sur votre compte.",
  },
];

export default function BecomeChef() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 moroccan-pattern opacity-30" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent" />
          
          <div className="container relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-accent mb-6">
                <ChefHat className="h-4 w-4" />
                <span className="text-sm font-medium">+500 chefs nous font confiance</span>
              </div>

              <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Transformez votre passion en
                <span className="text-gradient-primary block">revenus</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                Vous cuisinez comme personne ? Partagez vos talents culinaires avec votre 
                communauté et gagnez de l'argent depuis votre cuisine.
              </p>
              <p className="text-muted-foreground mb-8" dir="rtl">
                حوّل موهبتك في الطبخ إلى مصدر دخل
              </p>

              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="xl">
                  Commencer maintenant
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button variant="hero-outline" size="xl">
                  Voir comment ça marche
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
                <div>
                  <div className="font-display text-3xl font-bold text-primary">15K</div>
                  <div className="text-sm text-muted-foreground">DH/mois en moyenne</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-secondary">500+</div>
                  <div className="text-sm text-muted-foreground">Chefs actifs</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-accent">4.8</div>
                  <div className="text-sm text-muted-foreground">Note moyenne</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-card">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Pourquoi devenir chef DarFood ?
              </h2>
              <p className="text-muted-foreground" dir="rtl">
                لماذا تنضم إلينا؟
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="p-6 rounded-2xl bg-background border border-border hover:shadow-card transition-all">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Comment démarrer ?
              </h2>
              <p className="text-muted-foreground">
                En 4 étapes simples, commencez à vendre vos plats
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative">
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                    )}
                    <div className="relative p-6 rounded-2xl bg-card text-center">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div className="h-14 w-14 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-7 w-7 text-secondary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Badge System */}
        <section className="py-20 bg-secondary/5">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Système de badges et récompenses
                </h2>
                <p className="text-muted-foreground mb-6">
                  Plus vous cuisinez, plus vous êtes récompensé. Grimpez les échelons 
                  et débloquez des avantages exclusifs.
                </p>

                <div className="space-y-4">
                  {[
                    { badge: "bronze" as const, orders: 50, benefit: "Badge visible sur votre profil" },
                    { badge: "silver" as const, orders: 150, benefit: "Commission réduite de 2%" },
                    { badge: "gold" as const, orders: 400, benefit: "Mise en avant sur la page d'accueil" },
                    { badge: "emerald" as const, orders: 1000, benefit: "Accès aux compétitions premium" },
                  ].map((level) => (
                    <div key={level.badge} className="flex items-center gap-4 p-4 rounded-xl bg-card">
                      <ChefBadge level={level.badge} size="lg" />
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground">{level.orders}+ commandes</div>
                        <div className="font-medium text-foreground">{level.benefit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-3xl p-8 shadow-elevated">
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                  Votre progression
                </h3>
                <BadgeProgress 
                  currentLevel="silver" 
                  currentOrders={185} 
                  nextLevelOrders={400} 
                />
                <div className="mt-8 p-4 rounded-xl bg-muted">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    Prochain objectif : Badge Gold
                  </div>
                  <p className="text-sm">
                    Plus que <span className="font-semibold text-foreground">215 commandes</span> pour débloquer une commission réduite !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20 bg-primary" id="apply">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                Prêt à commencer ?
              </h2>
              <p className="text-primary-foreground/80 max-w-lg mx-auto">
                L'inscription est gratuite et ne prend que 5 minutes.
              </p>
            </div>
            
            <ChefApplicationForm />
          </div>
        </section>
      </main>

      <Footer />
      <MobileNavbar />
    </div>
  );
}
