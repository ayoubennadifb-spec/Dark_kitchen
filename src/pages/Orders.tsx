import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useMyOrders } from '@/hooks/useOrders';
import { Navbar, MobileNavbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Clock, 
  ChefHat,
  Truck,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'pending':
      return { label: 'En attente', icon: Clock, color: 'bg-amber-500/20 text-amber-600' };
    case 'confirmed':
      return { label: 'Confirmée', icon: CheckCircle, color: 'bg-blue-500/20 text-blue-600' };
    case 'cooking':
      return { label: 'En préparation', icon: ChefHat, color: 'bg-orange-500/20 text-orange-600' };
    case 'ready':
      return { label: 'Prête', icon: Package, color: 'bg-secondary/20 text-secondary' };
    case 'picked_up':
      return { label: 'Récupérée', icon: Truck, color: 'bg-primary/20 text-primary' };
    case 'delivering':
      return { label: 'En livraison', icon: Truck, color: 'bg-primary/20 text-primary' };
    case 'delivered':
      return { label: 'Livrée', icon: CheckCircle, color: 'bg-secondary/20 text-secondary' };
    case 'cancelled':
      return { label: 'Annulée', icon: XCircle, color: 'bg-destructive/20 text-destructive' };
    default:
      return { label: status, icon: Package, color: 'bg-muted text-muted-foreground' };
  }
};

const Orders = () => {
  const { user } = useAuth();
  const { data: orders, isLoading } = useMyOrders();

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background pt-20 pb-24">
          <div className="container max-w-2xl mx-auto px-4 py-16 text-center">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-display font-bold mb-2">Connectez-vous</h1>
            <p className="text-muted-foreground mb-6">
              Connectez-vous pour voir vos commandes.
            </p>
            <Button asChild>
              <Link to="/auth">Se connecter</Link>
            </Button>
          </div>
        </div>
        <Footer />
        <MobileNavbar />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Mes Commandes | DarFood</title>
        <meta name="description" content="Suivez vos commandes DarFood" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20 pb-24 md:pb-8">
          <div className="container max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-display font-bold text-foreground mb-8">
              Mes Commandes
            </h1>

            {isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !orders || orders.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Aucune commande</h2>
                <p className="text-muted-foreground mb-6">
                  Vous n'avez pas encore passé de commande.
                </p>
                <Button asChild>
                  <Link to="/discover">
                    Découvrir les plats
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                  const StatusIcon = statusInfo.icon;
                  const items = order.items as any[];

                  return (
                    <Card key={order.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Order Info */}
                          <div className="flex-1 p-4 md:p-6">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <p className="font-semibold">{order.order_number}</p>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(order.created_at), 'PPP à HH:mm', { locale: fr })}
                                </p>
                              </div>
                              <Badge className={statusInfo.color}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {statusInfo.label}
                              </Badge>
                            </div>

                            {/* Items summary */}
                            <div className="text-sm text-muted-foreground mb-3">
                              {items.map((item, idx) => (
                                <span key={idx}>
                                  {item.quantity}x {item.name}
                                  {idx < items.length - 1 && ', '}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="font-bold text-primary">{order.total} DH</span>
                              <Button variant="ghost" size="sm" asChild>
                                <Link to={`/orders/${order.id}`}>
                                  Voir détails
                                  <ArrowRight className="h-4 w-4 ml-1" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </main>

        <Footer />
        <MobileNavbar />
      </div>
    </>
  );
};

export default Orders;
