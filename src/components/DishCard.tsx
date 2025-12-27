import { cn } from "@/lib/utils";
import { ChefBadge, BadgeLevel } from "./ChefBadge";
import { Button } from "./ui/button";
import { Star, Plus, Clock } from "lucide-react";

interface DishCardProps {
  image: string;
  name: string;
  nameAr?: string;
  description: string;
  price: number;
  chef: {
    name: string;
    avatar: string;
    badge: BadgeLevel;
  };
  rating: number;
  reviewCount: number;
  deliveryTime?: string;
  className?: string;
  onAddToCart?: () => void;
}

export function DishCard({
  image,
  name,
  nameAr,
  description,
  price,
  chef,
  rating,
  reviewCount,
  deliveryTime = "30-45 min",
  className,
  onAddToCart,
}: DishCardProps) {
  return (
    <div className={cn("card-dish group cursor-pointer", className)}>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        
        {/* Price tag */}
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full font-semibold text-sm shadow-lg">
          {price} DH
        </div>
        
        {/* Delivery time */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium">
          <Clock className="h-3 w-3" />
          {deliveryTime}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and rating */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-semibold text-foreground truncate">
              {name}
            </h3>
            {nameAr && (
              <p className="text-sm text-muted-foreground font-medium" dir="rtl">
                {nameAr}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 text-accent shrink-0">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground text-xs">({reviewCount})</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Chef info */}
        <div className="flex items-center gap-2 pt-1">
          <img
            src={chef.avatar}
            alt={chef.name}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-background"
          />
          <span className="text-sm font-medium text-foreground flex-1 truncate">
            {chef.name}
          </span>
          <ChefBadge level={chef.badge} size="sm" showLabel={false} />
        </div>

        {/* CTA */}
        <Button variant="default" size="sm" className="w-full mt-2" onClick={onAddToCart}>
          <Plus className="h-4 w-4" />
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
}
