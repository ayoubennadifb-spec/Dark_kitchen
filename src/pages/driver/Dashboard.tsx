import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Navbar, MobileNavbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Truck, 
  Wallet, 
  Star, 
  Package,
  MapPin,
  Clock,
  Loader2,
  AlertCircle,
  ArrowRight,
  Navigation
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const useDriverProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['driver-profile', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('driver_profiles')
        .select('*, profiles:user_id(full_name, email, avatar_url, phone)')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

const useDriverOrders = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['driver-orders', user?.id],
    queryFn: async () => {
      if (!user) return [];

      // Get driver profile ID first
      const { data: driverProfile } = await supabase
        .from('driver_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!driverProfile) return [];

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('driver_id', driverProfile.id)
        .in('status', ['picked_up', 'delivering'])
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
};

const DriverDashboard = () => {
  const { user } = useAuth();
  const { data: profile, isLoading } = useDriverProfile();
  const { data: activeOrders } = useDriverOrders();
  const [isOnline, setIsOnline] = useState(false);

  const handleToggleOnline = async (online: boolean) => {
    if (!profile) return;

    setIsOnline(online);
    
    const { error } = await supabase
      .from('driver_profiles')
      .update({ is_online: online })
      .eq('id', profile.id);

    if (error) {
      toast.error('Erreur lors de la mise à jour');
      setIsOnline(!online);
      return;
    }

    toast.success(online ? 'Vous êtes maintenant en ligne' : 'Vous êtes hors ligne');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-24 md:pb-8">
          <div className="container max-w-2xl mx-auto px-4 py-16 text-center">
            <AlertCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-display font-bold mb-2">Vous n'êtes pas encore livreur</h1>
            <p className="text-muted-foreground mb-6">
              Inscrivez-vous pour commencer à livrer avec DarFood.
            </p>
            <Button asChild>
              <Link to="/become-driver">
                Devenir livreur
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
        <MobileNavbar />
      </div>
    );
  }

  const isPending = profile.status === 'pending';
  const isApproved = profile.status === 'approved';

  return (
    <>
      <Helmet>
        <title>Tableau de bord Livreur | DarFood</title>
        <meta name="description" content="Gérez vos livraisons et suivez vos gains" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20 pb-24 md:pb-8">
          <div className="container max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold text-foreground">
                    Tableau de bord
                  </h1>
                  <div className="flex items-center gap-2">
                    <Badge variant={isApproved ? 'default' : 'secondary'}>
                      {profile.status === 'pending' && 'En attente'}
                      {profile.status === 'approved' && 'Approuvé'}
                      {profile.status === 'rejected' && 'Refusé'}
                    </Badge>
                    <span className="text-muted-foreground capitalize">
                      {profile.vehicle_type === 'scooter' && 'Scooter'}
                      {profile.vehicle_type === 'moto' && 'Moto'}
                      {profile.vehicle_type === 'bike' && 'Vélo'}
                      {profile.vehicle_type === 'car' && 'Voiture'}
                    </span>
                  </div>
                </div>
              </div>

              {isApproved && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                  <Switch
                    id="online-status"
                    checked={isOnline}
                    onCheckedChange={handleToggleOnline}
                  />
                  <Label htmlFor="online-status" className="cursor-pointer">
                    <span className={isOnline ? 'text-secondary font-medium' : 'text-muted-foreground'}>
                      {isOnline ? 'En ligne' : 'Hors ligne'}
                    </span>
                  </Label>
                </div>
              )}
            </div>

            {isPending && (
              <Card className="mb-8 border-amber-500/30 bg-amber-500/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Clock className="h-8 w-8 text-amber-500" />
                    <div>
                      <h3 className="font-semibold text-foreground">Candidature en cours de traitement</h3>
                      <p className="text-muted-foreground">
                        Notre équipe examine votre candidature. Vous recevrez une notification sous 24h.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gains totaux</p>
                      <p className="text-2xl font-bold">{profile.total_earnings || 0} DH</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <Package className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Livraisons</p>
                      <p className="text-2xl font-bold">{profile.total_deliveries || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Star className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Note moyenne</p>
                      <p className="text-2xl font-bold">{profile.average_rating || 0}/5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <Navigation className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">En cours</p>
                      <p className="text-2xl font-bold">{activeOrders?.length || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Deliveries */}
            {isApproved && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Livraisons actives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activeOrders && activeOrders.length > 0 ? (
                    <div className="space-y-4">
                      {activeOrders.map((order) => (
                        <div key={order.id} className="p-4 rounded-xl bg-muted/50 flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{order.order_number}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <MapPin className="h-4 w-4" />
                              <span>{order.delivery_address || 'Adresse non spécifiée'}</span>
                            </div>
                          </div>
                          <Badge variant={order.status === 'delivering' ? 'default' : 'secondary'}>
                            {order.status === 'picked_up' && 'Récupérée'}
                            {order.status === 'delivering' && 'En livraison'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">
                        {isOnline 
                          ? 'Aucune livraison en cours. Attendez une nouvelle commande !'
                          : 'Passez en ligne pour recevoir des livraisons.'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </main>

        <Footer />
        <MobileNavbar />
      </div>
    </>
  );
};

export default DriverDashboard;
