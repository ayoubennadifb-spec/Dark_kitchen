import { ChefCard } from "@/components/ChefCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const featuredChefs = [
  {
    avatar: "https://images.unsplash.com/photo-1595475207225-428b62bda831?w=400&h=400&fit=crop",
    name: "Fatima Zahra",
    location: "Casablanca, Maarif",
    badge: "emerald" as const,
    rating: 4.9,
    reviewCount: 342,
    completedOrders: 1250,
    specialties: ["Tajine", "Couscous", "Pastilla"],
  },
  {
    avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
    name: "Khadija Benali",
    location: "Rabat, Agdal",
    badge: "gold" as const,
    rating: 4.8,
    reviewCount: 218,
    completedOrders: 890,
    specialties: ["Rfissa", "Harira", "Briouates"],
  },
  {
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    name: "Aicha El Mansouri",
    location: "Marrakech, Guéliz",
    badge: "gold" as const,
    rating: 4.8,
    reviewCount: 185,
    completedOrders: 720,
    specialties: ["Tanjia", "Mechoui", "Zaalouk"],
  },
  {
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    name: "Naima Chraibi",
    location: "Fès, Ville Nouvelle",
    badge: "silver" as const,
    rating: 4.7,
    reviewCount: 98,
    completedOrders: 340,
    specialties: ["Pastilla Fassi", "Seffa", "Mrouzia"],
  },
];

export function FeaturedChefsSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Nos chefs les mieux notés
            </h2>
            <p className="text-muted-foreground" dir="rtl">
              أفضل الطباخين تقييماً
            </p>
          </div>
          <Button variant="ghost" className="self-start sm:self-auto">
            Voir tous les chefs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Chef Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredChefs.map((chef) => (
            <ChefCard key={chef.name} {...chef} />
          ))}
        </div>
      </div>
    </section>
  );
}
