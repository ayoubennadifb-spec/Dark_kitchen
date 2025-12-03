import { useState } from "react";
import { Navbar, MobileNavbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DishCard } from "@/components/DishCard";
import { CitySelector } from "@/components/CitySelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  SlidersHorizontal, 
  X,
  Flame,
  Leaf,
  Clock,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "Tous", labelAr: "الكل" },
  { id: "tajine", label: "Tajines", labelAr: "طاجين" },
  { id: "couscous", label: "Couscous", labelAr: "كسكس" },
  { id: "pastilla", label: "Pastilla", labelAr: "بسطيلة" },
  { id: "harira", label: "Soupes", labelAr: "شوربة" },
  { id: "grills", label: "Grillades", labelAr: "مشاوي" },
  { id: "desserts", label: "Desserts", labelAr: "حلويات" },
];

const filters = [
  { id: "popular", label: "Populaire", icon: Flame },
  { id: "healthy", label: "Healthy", icon: Leaf },
  { id: "fast", label: "Livraison rapide", icon: Clock },
  { id: "top-rated", label: "Top rated", icon: Star },
];

const dishes = [
  {
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&h=450&fit=crop",
    name: "Tajine Poulet Citron",
    nameAr: "طاجين الدجاج بالحامض",
    description: "Tajine de poulet aux olives et citrons confits, préparé selon la recette traditionnelle de Fès.",
    price: 85,
    chef: {
      name: "Fatima Zahra",
      avatar: "https://images.unsplash.com/photo-1595475207225-428b62bda831?w=100&h=100&fit=crop",
      badge: "emerald" as const,
    },
    rating: 4.9,
    reviewCount: 156,
    deliveryTime: "35-45 min",
  },
  {
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=450&fit=crop",
    name: "Couscous Royal",
    nameAr: "كسكس ملكي",
    description: "Couscous aux sept légumes avec agneau, poulet et merguez maison.",
    price: 120,
    chef: {
      name: "Khadija Benali",
      avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop",
      badge: "gold" as const,
    },
    rating: 4.8,
    reviewCount: 98,
    deliveryTime: "40-50 min",
  },
  {
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&h=450&fit=crop",
    name: "Pastilla au Poulet",
    nameAr: "بسطيلة الدجاج",
    description: "Pastilla feuilletée au poulet et amandes, saupoudrée de sucre glace et cannelle.",
    price: 95,
    chef: {
      name: "Aicha El Mansouri",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
      badge: "gold" as const,
    },
    rating: 4.8,
    reviewCount: 72,
    deliveryTime: "30-40 min",
  },
  {
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=450&fit=crop",
    name: "Rfissa Traditionnelle",
    nameAr: "رفيسة تقليدية",
    description: "Rfissa au poulet fermier et lentilles, servie sur msemen fait maison.",
    price: 90,
    chef: {
      name: "Naima Chraibi",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
      badge: "silver" as const,
    },
    rating: 4.7,
    reviewCount: 45,
    deliveryTime: "45-55 min",
  },
  {
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=450&fit=crop",
    name: "Harira Fassi",
    nameAr: "حريرة فاسية",
    description: "Soupe traditionnelle aux tomates, lentilles et pois chiches. Parfaite pour le ftour.",
    price: 35,
    chef: {
      name: "Fatima Zahra",
      avatar: "https://images.unsplash.com/photo-1595475207225-428b62bda831?w=100&h=100&fit=crop",
      badge: "emerald" as const,
    },
    rating: 4.9,
    reviewCount: 203,
    deliveryTime: "20-30 min",
  },
  {
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&h=450&fit=crop",
    name: "Tajine Kefta",
    nameAr: "طاجين الكفتة",
    description: "Boulettes de viande hachée épicées dans une sauce tomate aux œufs pochés.",
    price: 75,
    chef: {
      name: "Khadija Benali",
      avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop",
      badge: "gold" as const,
    },
    rating: 4.8,
    reviewCount: 134,
    deliveryTime: "30-40 min",
  },
];

export default function Discover() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 md:pt-24 pb-24 lg:pb-12">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Découvrez les plats
            </h1>
            <p className="text-muted-foreground" dir="rtl">
              اكتشف أطباقنا اللذيذة
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur-sm py-4 -mx-4 px-4 border-b border-border mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un plat, un chef..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* City Selector */}
              <CitySelector />
              
              {/* Filter button (mobile) */}
              <Button variant="outline" size="default" className="sm:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>

            {/* Categories */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Filters */}
            <div className="hidden sm:flex gap-2 mt-3">
              {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilters.includes(filter.id);
                return (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-card text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Filtres actifs:</span>
              {activeFilters.map((filterId) => {
                const filter = filters.find(f => f.id === filterId);
                return (
                  <Badge key={filterId} variant="secondary" className="gap-1">
                    {filter?.label}
                    <button onClick={() => toggleFilter(filterId)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
              <button 
                onClick={() => setActiveFilters([])}
                className="text-sm text-primary hover:underline"
              >
                Effacer tout
              </button>
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{dishes.length}</span> plats disponibles
            </p>
          </div>

          {/* Dish Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dishes.map((dish, index) => (
              <DishCard key={`${dish.name}-${index}`} {...dish} />
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg">
              Charger plus de plats
            </Button>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNavbar />
    </div>
  );
}
