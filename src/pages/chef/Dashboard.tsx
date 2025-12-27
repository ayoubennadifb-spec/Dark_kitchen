import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useAuth';
import { useMyChefProfile } from '@/hooks/useChefs';
import { useDishes } from '@/hooks/useDishes';
import { Navbar, MobileNavbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChefBadge } from '@/components/ChefBadge';
import { 
  Plus,
  DollarSign,
  ShoppingBag,
  Star,
  Clock,
  TrendingUp,
  Utensils,
  Edit,
  Eye,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ChefDashboard = () => {
  const { user } = useAuth();
  const { data: chefProfile, isLoading: profileLoading } = useMyChefProfile();
  const { data: dishes, isLoading: dishesLoading } = useDishes({ 
    chefId: chefProfile?.id,
    limit: 10 
  });

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!chefProfile) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background pt-20 pb-24">
          <div className="container max-w-2xl mx-auto px-4 py-16 text-center">
            <Utensils className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-display font-bold mb-2">Vous n'êtes pas encore chef</h1>
            <p className="text-muted-foreground mb-6">
              Rejoignez notre communauté de chefs et partagez vos délicieuses recettes marocaines.
            </p>
            <Button asChild>
              <Link to="/become-chef">Devenir Chef</Link>
            </Button>
          </div>
        </div>
        <Footer />
        <MobileNavbar />
      </>
    );
  }

  const pendingOrders = 0; // TODO: Fetch from orders

  return (
    <>
      <Helmet>
        <title>Espace Chef | DarFood</title>
        <meta name="description" content="Gérez vos plats, commandes et revenus sur DarFood." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20 pb-24 md:pb-8">
          <div className="container max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Utensils className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -bottom-1 -right-1">
                    <ChefBadge level={chefProfile.badge} size="sm" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold text-foreground">
                    Espace Chef
                  </h1>
                  <p className="text-muted-foreground">
                    {chefProfile.profile?.full_name || user?.email}
                  </p>
                  {chefProfile.status === 'pending' && (
                    <Badge variant="outline" className="mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      En attente d'approbation
                    </Badge>
                  )}
                </div>
              </div>
              <Button asChild>
                <Link to="/chef/dishes/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un plat
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{chefProfile.monthly_earnings?.toFixed(0) || 0} DH</p>
                    <p className="text-sm text-muted-foreground">Ce mois</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <ShoppingBag className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{chefProfile.total_orders || 0}</p>
                    <p className="text-sm text-muted-foreground">Commandes</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <Star className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{chefProfile.average_rating?.toFixed(1) || '0.0'}</p>
                    <p className="text-sm text-muted-foreground">{chefProfile.total_reviews || 0} avis</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-majorelle/20 rounded-lg">
                    <Utensils className="h-5 w-5 text-majorelle" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{dishes?.length || 0}</p>
                    <p className="text-sm text-muted-foreground">Plats actifs</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Pending Orders */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Commandes en cours
                    {pendingOrders > 0 && (
                      <Badge variant="destructive">{pendingOrders}</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>Commandes à préparer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Aucune commande en cours</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Taux d'acceptation</span>
                    <span className="font-semibold">100%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Temps moyen</span>
                    <span className="font-semibold">35 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Commission</span>
                    <span className="font-semibold">{((chefProfile.commission_rate || 0.15) * 100).toFixed(0)}%</span>
                  </div>
                </CardContent>
              </Card>

              {/* My Dishes */}
              <Card className="lg:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="h-5 w-5" />
                      Mes plats
                    </CardTitle>
                    <CardDescription>Gérez votre menu</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/chef/dishes">Voir tout</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {dishesLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : dishes && dishes.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {dishes.slice(0, 6).map((dish) => (
                        <div key={dish.id} className="bg-muted rounded-xl p-4 flex gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                            <img 
                              src={dish.photos?.[0] || '/placeholder.svg'} 
                              alt={dish.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{dish.name}</h4>
                            <p className="text-sm text-muted-foreground">{dish.price} DH</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 text-accent fill-current" />
                              <span className="text-xs">{dish.average_rating?.toFixed(1) || '0.0'}</span>
                              <span className="text-xs text-muted-foreground">({dish.total_orders || 0})</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Utensils className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Aucun plat pour le moment</p>
                      <Button asChild className="mt-4">
                        <Link to="/chef/dishes/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter votre premier plat
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
        <MobileNavbar />
      </div>
    </>
  );
};

export default ChefDashboard;
