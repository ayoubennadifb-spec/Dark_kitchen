import { cn } from "@/lib/utils";
import { ChefBadge, BadgeLevel } from "./ChefBadge";
import { Star, MapPin, Utensils } from "lucide-react";

interface ChefCardProps {
  avatar: string;
  name: string;
  location: string;
  badge: BadgeLevel;
  rating: number;
  reviewCount: number;
  completedOrders: number;
  specialties: string[];
  className?: string;
}

export function ChefCard({
  avatar,
  name,
  location,
  badge,
  rating,
  reviewCount,
  completedOrders,
  specialties,
  className,
}: ChefCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer group",
        className
      )}
    >
      {/* Avatar and badge */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="h-24 w-24 rounded-full overflow-hidden ring-4 ring-accent/20 group-hover:ring-accent/40 transition-all">
            <img
              src={avatar}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <ChefBadge level={badge} size="md" />
          </div>
        </div>

        {/* Name */}
        <h3 className="font-display text-xl font-semibold text-foreground mt-2">
          {name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
          <MapPin className="h-3.5 w-3.5" />
          {location}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center gap-1 text-accent">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold">{rating.toFixed(1)}</span>
          </div>
          <span className="text-muted-foreground text-sm">
            ({reviewCount} avis)
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-1 text-secondary text-sm mt-2">
          <Utensils className="h-3.5 w-3.5" />
          <span className="font-medium">{completedOrders} commandes</span>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {specialties.slice(0, 3).map((specialty) => (
            <span
              key={specialty}
              className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
