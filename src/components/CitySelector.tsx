import { useState } from "react";
import { cn } from "@/lib/utils";
import { MapPin, ChevronDown, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const cities = [
  { name: "Casablanca", nameAr: "الدار البيضاء", neighborhoods: ["Maarif", "Anfa", "Ain Diab", "Sidi Maarouf", "Hay Hassani"] },
  { name: "Rabat", nameAr: "الرباط", neighborhoods: ["Agdal", "Hassan", "Souissi", "Yacoub El Mansour"] },
  { name: "Marrakech", nameAr: "مراكش", neighborhoods: ["Guéliz", "Médina", "Hivernage", "Palmeraie"] },
  { name: "Tanger", nameAr: "طنجة", neighborhoods: ["Centre Ville", "Malabata", "Boukhalef"] },
  { name: "Fès", nameAr: "فاس", neighborhoods: ["Ville Nouvelle", "Médina", "Saiss"] },
  { name: "Agadir", nameAr: "أكادير", neighborhoods: ["Centre", "Founty", "Talborjt"] },
];

interface CitySelectorProps {
  className?: string;
  variant?: "hero" | "compact";
}

export function CitySelector({ className, variant = "compact" }: CitySelectorProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(search.toLowerCase()) ||
      city.nameAr.includes(search)
  );

  const selectedCityData = cities.find((c) => c.name === selectedCity);

  if (variant === "hero") {
    return (
      <div className={cn("flex flex-col sm:flex-row gap-3", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-3 px-5 py-4 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all text-left min-w-[200px] group">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <span className="text-xs text-muted-foreground block">Ville</span>
                <span className="font-medium text-foreground">
                  {selectedCity || "Choisir une ville"}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0" align="start">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              {filteredCities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => {
                    setSelectedCity(city.name);
                    setSelectedNeighborhood(null);
                    setSearch("");
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors",
                    selectedCity === city.name
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <span className="font-medium">{city.name}</span>
                  <span className="text-sm text-muted-foreground" dir="rtl">
                    {city.nameAr}
                  </span>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {selectedCity && selectedCityData && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-3 px-5 py-4 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all text-left min-w-[200px] group animate-fade-in">
                <div className="h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-secondary" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-muted-foreground block">Quartier</span>
                  <span className="font-medium text-foreground">
                    {selectedNeighborhood || "Tous les quartiers"}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="start">
              <button
                onClick={() => setSelectedNeighborhood(null)}
                className={cn(
                  "w-full px-3 py-2 rounded-lg text-left transition-colors",
                  !selectedNeighborhood
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
              >
                Tous les quartiers
              </button>
              {selectedCityData.neighborhoods.map((n) => (
                <button
                  key={n}
                  onClick={() => setSelectedNeighborhood(n)}
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-left transition-colors",
                    selectedNeighborhood === n
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  {n}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        )}
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-border hover:border-primary/30 transition-all",
            className
          )}
        >
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">
            {selectedCity || "Ville"}
            {selectedNeighborhood && `, ${selectedNeighborhood}`}
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="start">
        {filteredCities.map((city) => (
          <button
            key={city.name}
            onClick={() => {
              setSelectedCity(city.name);
              setSelectedNeighborhood(null);
            }}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors",
              selectedCity === city.name
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted"
            )}
          >
            <span className="font-medium text-sm">{city.name}</span>
            <span className="text-xs text-muted-foreground" dir="rtl">
              {city.nameAr}
            </span>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
