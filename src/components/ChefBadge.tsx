import { cn } from "@/lib/utils";
import { Award, Star, Crown, Sparkles } from "lucide-react";

export type BadgeLevel = "bronze" | "silver" | "gold" | "emerald";

interface ChefBadgeProps {
  level: BadgeLevel;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const badgeConfig = {
  bronze: {
    label: "Bronze",
    labelAr: "برونز",
    icon: Award,
    className: "bg-badge-bronze text-primary-foreground",
  },
  silver: {
    label: "Silver",
    labelAr: "فضي",
    icon: Star,
    className: "bg-badge-silver text-foreground",
  },
  gold: {
    label: "Gold",
    labelAr: "ذهبي",
    icon: Crown,
    className: "bg-badge-gold text-foreground",
  },
  emerald: {
    label: "Top Rated",
    labelAr: "الأفضل",
    icon: Sparkles,
    className: "bg-badge-emerald text-primary-foreground",
  },
};

const sizeConfig = {
  sm: {
    container: "h-5 text-xs gap-1 px-2",
    icon: "h-3 w-3",
  },
  md: {
    container: "h-6 text-sm gap-1.5 px-2.5",
    icon: "h-3.5 w-3.5",
  },
  lg: {
    container: "h-8 text-base gap-2 px-3",
    icon: "h-4 w-4",
  },
};

export function ChefBadge({ level, size = "sm", showLabel = true, className }: ChefBadgeProps) {
  const config = badgeConfig[level];
  const sizeStyles = sizeConfig[size];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-transform hover:scale-105",
        config.className,
        sizeStyles.container,
        className
      )}
    >
      <Icon className={sizeStyles.icon} />
      {showLabel && <span>{config.label}</span>}
    </div>
  );
}

interface BadgeProgressProps {
  currentLevel: BadgeLevel;
  currentOrders: number;
  nextLevelOrders: number;
  className?: string;
}

export function BadgeProgress({ currentLevel, currentOrders, nextLevelOrders, className }: BadgeProgressProps) {
  const progress = Math.min((currentOrders / nextLevelOrders) * 100, 100);
  const levels: BadgeLevel[] = ["bronze", "silver", "gold", "emerald"];
  const currentIndex = levels.indexOf(currentLevel);
  const nextLevel = currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <ChefBadge level={currentLevel} size="sm" />
        {nextLevel && (
          <span className="text-muted-foreground">
            {currentOrders}/{nextLevelOrders} → <ChefBadge level={nextLevel} size="sm" />
          </span>
        )}
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            badgeConfig[currentLevel].className
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
