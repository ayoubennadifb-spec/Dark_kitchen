import { Navbar, MobileNavbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { DriverApplicationForm } from "@/components/driver/DriverApplicationForm";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  Wallet, 
  Clock, 
  Shield, 
  MapPin, 
  Smartphone,
  ArrowRight,
  Bike,
  Car,
  FileText,
  BadgeCheck
} from "lucide-react";

const benefits = [
  {
    icon: Wallet,
    title: "Paiements quotidiens",
    description: "Recevez vos gains chaque jour sur votre compte.",
  },
  {
    icon: Clock,
    title: "Horaires flexibles",
    description: "Travaillez quand vous voulez, autant que vous voulez.",
  },
  {
    icon: Shield,
    title: "Assurance incluse",
    description: "Vous êtes couvert pendant toutes vos livraisons.",
  },
  {
    icon: MapPin,
    title: "Livraisons locales",
    description: "Restez dans votre quartier, pas de longs trajets.",
  },
];

const steps = [
  {
    icon: Smartphone,
    title: "Inscrivez-vous",
    description: "Créez votre compte en quelques minutes depuis l'app.",
  },
  {
    icon: FileText,
    title: "Soumettez vos documents",
    description: "CIN, permis de conduire et photo de votre véhicule.",
  },
  {
    icon: BadgeCheck,
    title: "Validation",
    description: "Notre équipe vérifie vos documents sous 24h.",
  },
  {
    icon: Truck,
    title: "Commencez à livrer",
    description: "Acceptez vos premières livraisons et gagnez de l'argent.",
  },
];

const vehicleTypes = [
  { icon: Bike, label: "Vélo", description: "Idéal pour le centre-ville" },
  { icon: Bike, label: "Moto/Scooter", description: "Le plus populaire" },
  { icon: Car, label: "Voiture", description: "Pour les grandes commandes" },
];

export default function BecomeDriver() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
          <div className="absolute inset-0 moroccan-pattern opacity-20" />
          
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-6">
                  <Truck className="h-4 w-4" />
                  <span className="text-sm font-medium">Rejoignez +200 livreurs partenaires</span>
                </div>

                <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Livrez et gagnez
                  <span className="text-gradient-primary block">à votre rythme</span>
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                  Devenez livreur partenaire DarFood et profitez d'horaires flexibles, 
                  de paiements rapides et d'une communauté bienveillante.
                </p>
                <p className="text-muted-foreground mb-8" dir="rtl">
                  اربح من التوصيل بمرونة تامة
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="xl" asChild>
                    <a href="#apply">
                      Devenir livreur
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="hero-outline" size="xl" asChild>
                    <Link to="/discover">
                      En savoir plus
                    </Link>
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
                  <div>
                    <div className="font-display text-3xl font-bold text-primary">250</div>
                    <div className="text-sm text-muted-foreground">DH/jour en moyenne</div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold text-secondary">200+</div>
                    <div className="text-sm text-muted-foreground">Livreurs actifs</div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold text-accent">24h</div>
                    <div className="text-sm text-muted-foreground">Validation rapide</div>
                  </div>
                </div>
              </div>

              {/* Visual */}
              <div className="relative hidden lg:block">
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
                
                <div className="relative bg-card rounded-3xl p-8 shadow-elevated">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Truck className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="font-display text-2xl font-bold text-foreground">Application livreur</div>
                      <div className="text-muted-foreground">Interface simple et intuitive</div>
                    </div>
                  </div>

                  {/* Mock delivery card */}
                  <div className="bg-background rounded-xl p-4 border border-border mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-foreground">Nouvelle livraison</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">35 DH</span>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-secondary" />
                        <span>Pickup: Maarif, Casa</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>Drop: Anfa, Casa</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">Refuser</Button>
                      <Button variant="default" size="sm" className="flex-1">Accepter</Button>
                    </div>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    📱 Disponible sur iOS et Android
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Types */}
        <section className="py-16 bg-card">
          <div className="container">
            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
              Quel véhicule utilisez-vous ?
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {vehicleTypes.map((vehicle) => {
                const Icon = vehicle.icon;
                return (
                  <div key={vehicle.label} className="p-6 rounded-2xl bg-background border border-border text-center hover:border-primary/30 hover:shadow-card transition-all cursor-pointer">
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{vehicle.label}</h3>
                    <p className="text-sm text-muted-foreground">{vehicle.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Les avantages DarFood
              </h2>
              <p className="text-muted-foreground" dir="rtl">
                مزايا العمل معنا
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="p-6 rounded-2xl bg-card hover:shadow-card transition-all">
                    <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-secondary" />
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
        <section className="py-20 bg-secondary/5">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Comment devenir livreur ?
              </h2>
              <p className="text-muted-foreground">
                4 étapes simples pour commencer
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
                      <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-7 w-7 text-primary" />
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

        {/* Application Form */}
        <section className="py-20 bg-primary" id="apply">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                Prêt à rouler avec nous ?
              </h2>
              <p className="text-primary-foreground/80 max-w-lg mx-auto">
                L'inscription est gratuite. Commencez à gagner de l'argent dès demain !
              </p>
            </div>
            
            <DriverApplicationForm />
          </div>
        </section>
      </main>

      <Footer />
      <MobileNavbar />
    </div>
  );
}
