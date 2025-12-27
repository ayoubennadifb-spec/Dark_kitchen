import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Menu,
  X,
  ChefHat,
  Truck,
  Users,
  Trophy,
  ShoppingBag,
  User,
  LogOut,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const navLinks = [
  { href: "/discover", label: "Commander", labelAr: "اطلب", icon: ShoppingBag },
  { href: "/community", label: "Communauté", labelAr: "المجتمع", icon: Users },
  { href: "/competitions", label: "Compétitions", labelAr: "مسابقات", icon: Trophy },
  { href: "/become-chef", label: "Devenir Chef", labelAr: "كن طباخاً", icon: ChefHat },
  { href: "/become-driver", label: "Devenir Livreur", labelAr: "كن موصّلاً", icon: Truck },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, isChef, isDriver } = useAuth();

  const getInitials = (name?: string | null) => {
    if (!name) return user?.email?.charAt(0).toUpperCase() || 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <ChefHat className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground hidden sm:block">
              DarFood
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {getInitials(user.user_metadata?.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden xl:inline">
                      {user.user_metadata?.full_name || 'Mon compte'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Tableau de bord
                    </Link>
                  </DropdownMenuItem>
                  {isChef && (
                    <DropdownMenuItem asChild>
                      <Link to="/chef/dashboard" className="cursor-pointer">
                        <ChefHat className="mr-2 h-4 w-4" />
                        Espace Chef
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {isDriver && (
                    <DropdownMenuItem asChild>
                      <Link to="/driver/dashboard" className="cursor-pointer">
                        <Truck className="mr-2 h-4 w-4" />
                        Espace Livreur
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Paramètres
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">
                    <User className="h-4 w-4 mr-2" />
                    Connexion
                  </Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/auth">Inscription</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bg-background border-b border-border transition-all duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="container py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
                <span className="text-xs opacity-60 ml-auto" dir="rtl">
                  {link.labelAr}
                </span>
              </Link>
            );
          })}
          <div className="flex gap-2 pt-4 border-t border-border mt-4">
            {user ? (
              <>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    Mon compte
                  </Link>
                </Button>
                <Button variant="ghost" className="flex-1" onClick={() => { signOut(); setIsOpen(false); }}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    Connexion
                  </Link>
                </Button>
                <Button variant="default" className="flex-1" asChild>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    Inscription
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export function MobileNavbar() {
  const location = useLocation();
  const { user } = useAuth();
  
  const mobileLinks = [
    { href: "/", label: "Accueil", icon: ShoppingBag },
    { href: "/discover", label: "Découvrir", icon: ChefHat },
    { href: "/community", label: "Communauté", icon: Users },
    { href: "/orders", label: "Commandes", icon: Truck },
    { href: user ? "/dashboard" : "/auth", label: user ? "Profil" : "Connexion", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {mobileLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-0",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
              <span className="text-[10px] font-medium truncate">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
