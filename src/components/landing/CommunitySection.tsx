import { Button } from "@/components/ui/button";
import { Users, Trophy, BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const communityFeatures = [
  {
    icon: Users,
    title: "Discussions",
    description: "Échangez conseils et astuces avec notre communauté de passionnés.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BookOpen,
    title: "Recettes",
    description: "Découvrez et partagez des recettes exclusives avec la communauté.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Trophy,
    title: "Compétitions",
    description: "Participez à des concours culinaires et gagnez des prix.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Calendar,
    title: "Événements",
    description: "Rejoignez des ateliers cuisine et des rencontres locales.",
    color: "bg-majorelle/10 text-majorelle",
  },
];

export function CommunitySection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Communauté</span>
            </div>

            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Rejoignez une communauté passionnée
              </h2>
              <p className="text-lg text-muted-foreground">
                Plus qu'une plateforme de livraison, DarFood est une communauté de gourmands et de chefs 
                qui partagent leur amour pour la cuisine marocaine authentique.
              </p>
              <p className="text-muted-foreground mt-2" dir="rtl">
                انضم إلى مجتمع عشاق الطبخ المغربي
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {communityFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="p-4 rounded-xl bg-card hover:shadow-soft transition-all duration-300 cursor-pointer group"
                  >
                    <div className={`h-10 w-10 rounded-lg ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <Button variant="default" size="lg" asChild>
              <Link to="/community">
                Rejoindre la communauté
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
            
            <div className="relative bg-card rounded-3xl p-6 shadow-elevated">
              {/* Competition Card Preview */}
              <div className="bg-background rounded-2xl p-5 mb-4 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground">Meilleur Couscous du Vendredi</h4>
                    <p className="text-sm text-muted-foreground">Compétition en cours</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">48 participants</span>
                  <span className="text-primary font-medium">5 jours restants</span>
                </div>
                <div className="h-2 rounded-full bg-muted mt-3 overflow-hidden">
                  <div className="h-full w-3/4 rounded-full bg-primary" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-background border border-border">
                  <div className="font-display text-2xl font-bold text-primary">12K+</div>
                  <div className="text-xs text-muted-foreground">Membres</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-background border border-border">
                  <div className="font-display text-2xl font-bold text-secondary">500+</div>
                  <div className="text-xs text-muted-foreground">Recettes</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-background border border-border">
                  <div className="font-display text-2xl font-bold text-accent">50+</div>
                  <div className="text-xs text-muted-foreground">Concours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
