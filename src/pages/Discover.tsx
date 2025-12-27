import { useState } from "react";
import { Navbar, MobileNavbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DishCard } from "@/components/DishCard";
import { CitySelector } from "@/components/CitySelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useDishes, useCategories } from "@/hooks/useDishes";
import { useAddToCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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

const defaultCategories = [
  { id: "all", slug: "all", name: "Tous", name_ar: "الكل" },
  { id: "tajine", slug: "tajine", name: "Tajines", name_ar: "طاجين" },
  { id: "couscous", slug: "couscous", name: "Couscous", name_ar: "كسكس" },
  { id: "pastilla", slug: "pastilla", name: "Pastilla", name_ar: "بسطيلة" },
  { id: "harira", slug: "harira", name: "Soupes", name_ar: "شوربة" },
  { id: "grills", slug: "grills", name: "Grillades", name_ar: "مشاوي" },
  { id: "desserts", slug: "desserts", name: "Desserts", name_ar: "حلويات" },
];

const filters = [
  { id: "popular", label: "Populaire", icon: Flame },
  { id: "healthy", label: "Healthy", icon: Leaf },
  { id: "fast", label: "Livraison rapide", icon: Clock },
  { id: "top-rated", label: "Top rated", icon: Star },
];

// Fallback mock data for when database is empty
const mockDishes = [
  {
    id: "1",
    photos: ["https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&h=450&fit=crop"],
    name: "Tajine Poulet Citron",
    name_ar: "طاجين الدجاج بالحامض",
    description: "Tajine de poulet aux olives et citrons confits, préparé selon la recette traditionnelle de Fès.",
    price: 85,
    average_rating: 4.9,
    total_reviews: 156,
    preparation_time: 40,
    chef_id: "1",
    chef: {
      id: "1",
      badge: "emerald" as const,
      average_rating: 4.9,
      user_id: "1",
      profile: {
        full_name: "Fatima Zahra",
        avatar_url: "https://images.unsplash.com/photo-1595475207225-428b62bda831?w=100&h=100&fit=crop",
        city: "Casablanca"
      }
    }
  },
  {
    id: "2",
    photos: ["https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=450&fit=crop"],
    name: "Couscous Royal",
    name_ar: "كسكس ملكي",
    description: "Couscous aux sept légumes avec agneau, poulet et merguez maison.",
    price: 120,
    average_rating: 4.8,
    total_reviews: 98,
    preparation_time: 50,
    chef_id: "2",
    chef: {
      id: "2",
      badge: "gold" as const,
      average_rating: 4.8,
      user_id: "2",
      profile: {
        full_name: "Khadija Benali",
        avatar_url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop",
        city: "Rabat"
      }
    }
  },
  {
    id: "3",
    photos: ["https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&h=450&fit=crop"],
    name: "Pastilla au Poulet",
    name_ar: "بسطيلة الدجاج",
    description: "Pastilla feuilletée au poulet et amandes, saupoudrée de sucre glace et cannelle.",
    price: 95,
    average_rating: 4.8,
    total_reviews: 72,
    preparation_time: 35,
    chef_id: "3",
    chef: {
      id: "3",
      badge: "gold" as const,
      average_rating: 4.8,
      user_id: "3",
      profile: {
        full_name: "Aicha El Mansouri",
        avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
        city: "Marrakech"
      }
    }
  },
  {
    id: "4",
    photos: ["https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=450&fit=crop"],
    name: "Rfissa Traditionnelle",
    name_ar: "رفيسة تقليدية",
    description: "Rfissa au poulet fermier et lentilles, servie sur msemen fait maison.",
    price: 90,
    average_rating: 4.7,
    total_reviews: 45,
    preparation_time: 55,
    chef_id: "4",
    chef: {
      id: "4",
      badge: "silver" as const,
      average_rating: 4.7,
      user_id: "4",
      profile: {
        full_name: "Naima Chraibi",
        avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
        city: "Fès"
      }
    }
  },
  {
    id: "5",
    photos: ["https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=450&fit=crop"],
    name: "Harira Fassi",
    name_ar: "حريرة فاسية",
    description: "Soupe traditionnelle aux tomates, lentilles et pois chiches. Parfaite pour le ftour.",
    price: 35,
    average_rating: 4.9,
    total_reviews: 203,
    preparation_time: 25,
    chef_id: "1",
    chef: {
      id: "1",
      badge: "emerald" as const,
      average_rating: 4.9,
      user_id: "1",
      profile: {
        full_name: "Fatima Zahra",
        avatar_url: "https://images.unsplash.com/photo-1595475207225-428b62bda831?w=100&h=100&fit=crop",
        city: "Casablanca"
      }
    }
  },
  {
    id: "6",
    photos: ["https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&h=450&fit=crop"],
    name: "Tajine Kefta",
    name_ar: "طاجين الكفتة",
    description: "Boulettes de viande hachée épicées dans une sauce tomate aux œufs pochés.",
    price: 75,
    average_rating: 4.8,
    total_reviews: 134,
    preparation_time: 35,
    chef_id: "2",
    chef: {
      id: "2",
      badge: "gold" as const,
      average_rating: 4.8,
      user_id: "2",
      profile: {
        full_name: "Khadija Benali",
        avatar_url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop",
        city: "Rabat"
      }
    }
  },
];

export default function Discover() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const addToCart = useAddToCart();

  const { data: dbCategories } = useCategories();
  const { data: dishes, isLoading } = useDishes({
    categorySlug: selectedCategory,
    search: searchQuery || undefined,
    isHealthy: activeFilters.includes('healthy') || undefined,
  });

  const categories = dbCategories && dbCategories.length > 0 
    ? [{ id: "all", slug: "all", name: "Tous", name_ar: "الكل" }, ...dbCategories.map(c => ({ ...c, slug: c.slug }))]
    : defaultCategories;

  // Use real data if available, otherwise use mock data
  const displayDishes = dishes && dishes.length > 0 ? dishes : mockDishes;

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const handleAddToCart = (dishId: string) => {
    if (!user) {
      toast.error('Connectez-vous pour ajouter au panier');
      navigate('/auth');
      return;
    }
    addToCart.mutate({ dishId });
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
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    selectedCategory === cat.slug
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {cat.name}
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
              <span className="font-semibold text-foreground">{displayDishes.length}</span> plats disponibles
            </p>
          </div>

          {/* Dish Grid */}
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayDishes.map((dish) => (
                <DishCard 
                  key={dish.id}
                  image={dish.photos?.[0] || '/placeholder.svg'}
                  name={dish.name}
                  nameAr={dish.name_ar || undefined}
                  description={dish.description || ''}
                  price={dish.price}
                  chef={{
                    name: dish.chef?.profile?.full_name || 'Chef',
                    avatar: dish.chef?.profile?.avatar_url || '/placeholder.svg',
                    badge: (dish.chef?.badge as any) || 'bronze',
                  }}
                  rating={dish.average_rating || 0}
                  reviewCount={dish.total_reviews || 0}
                  deliveryTime={`${dish.preparation_time || 30}-${(dish.preparation_time || 30) + 10} min`}
                  onAddToCart={() => handleAddToCart(dish.id)}
                />
              ))}
            </div>
          )}

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
