import { useAuth } from '@/hooks/useAuth';
import { Navbar, MobileNavbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Settings, 
  ChefHat, 
  Truck,
  Clock,
  Star,
  Package
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, signOut, isChef, isDriver } = useAuth();

  const getInitials = (name?: string | null) => {
    if (!name) return user?.email?.charAt(0).toUpperCase() || 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <Helmet>
        <title>Mon Compte | DarFood</title>
        <meta name="description" content="Gérez votre compte DarFood, vos commandes et vos préférences." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20 pb-24 md:pb-8">
          <div className="container max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {getInitials(user?.user_metadata?.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-display font-bold text-foreground">
                    {user?.user_metadata?.full_name || 'Mon Compte'}
                  </h1>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <div className="flex gap-2 mt-1">
                    {isChef && <Badge variant="secondary"><ChefHat className="w-3 h-3 mr-1" /> Chef</Badge>}
                    {isDriver && <Badge variant="outline"><Truck className="w-3 h-3 mr-1" /> Livreur</Badge>}
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={signOut}>
                Se déconnecter
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Commandes</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <Heart className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Favoris</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <Star className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Avis</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-majorelle/20 rounded-lg">
                    <Package className="h-5 w-5 text-majorelle" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Recettes</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Recent Orders */}
              <Card className="md:col-span-2 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Commandes récentes
                  </CardTitle>
                  <CardDescription>Vos dernières commandes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Aucune commande pour le moment</p>
                    <Button asChild className="mt-4">
                      <Link to="/discover">Découvrir les plats</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Mon compte
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/profile">
                      <Settings className="mr-2 h-4 w-4" />
                      Modifier le profil
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/addresses">
                      <MapPin className="mr-2 h-4 w-4" />
                      Mes adresses
                    </Link>
                  </Button>
                  
                  {!isChef && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/become-chef">
                        <ChefHat className="mr-2 h-4 w-4" />
                        Devenir Chef
                      </Link>
                    </Button>
                  )}
                  
                  {!isDriver && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/become-driver">
                        <Truck className="mr-2 h-4 w-4" />
                        Devenir Livreur
                      </Link>
                    </Button>
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

export default Dashboard;
