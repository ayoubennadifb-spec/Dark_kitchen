import { Shield, CheckCircle, Eye, Leaf, ThermometerSun, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const trustFeatures = [
  {
    icon: Eye,
    title: "Cuisines vérifiées",
    titleAr: "مطابخ موثقة",
    description: "Chaque cuisine est inspectée et certifiée par notre équipe avant d'être mise en ligne.",
  },
  {
    icon: ThermometerSun,
    title: "Hygiène garantie",
    titleAr: "نظافة مضمونة",
    description: "Nos chefs suivent des formations en hygiène alimentaire et sont régulièrement audités.",
  },
  {
    icon: Leaf,
    title: "Ingrédients frais",
    titleAr: "مكونات طازجة",
    description: "Produits locaux, de saison, achetés le jour même de la préparation.",
  },
  {
    icon: Shield,
    title: "Paiement sécurisé",
    titleAr: "دفع آمن",
    description: "Vos données bancaires sont protégées par un cryptage de niveau bancaire.",
  },
  {
    icon: CheckCircle,
    title: "Satisfaction garantie",
    titleAr: "رضا مضمون",
    description: "Pas satisfait ? Nous vous remboursons intégralement, sans condition.",
  },
  {
    icon: Award,
    title: "Chefs certifiés",
    titleAr: "طباخون معتمدون",
    description: "Un système de badges récompense les meilleurs chefs de la communauté.",
  },
];

export function TrustSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/5 relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 moroccan-pattern opacity-50" />
      
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary mb-6">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Confiance & Sécurité</span>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Mangez en toute confiance
          </h2>
          <p className="text-lg text-muted-foreground">
            Nous mettons la sécurité alimentaire et la transparence au cœur de notre plateforme.
          </p>
          <p className="text-muted-foreground mt-2" dir="rtl">
            كُل بثقة مع منصتنا الآمنة
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  "p-6 rounded-2xl bg-card border border-border/50 hover:border-secondary/30 transition-all duration-300 hover:shadow-card hover:-translate-y-1",
                  "animate-slide-up"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2" dir="rtl">
                  {feature.titleAr}
                </p>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
