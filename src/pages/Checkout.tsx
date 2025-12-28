import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCart, useCartTotal, useClearCart } from '@/hooks/useCart';
import { useCreateOrder, CreateOrderData } from '@/hooks/useOrders';
import { Navbar, MobileNavbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  ShoppingBag, 
  MapPin, 
  Truck, 
  Package,
  CreditCard,
  Loader2,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { z } from 'zod';

const addressSchema = z.object({
  address: z.string().min(5, 'Adresse requise'),
  city: z.string().min(2, 'Ville requise'),
  neighborhood: z.string().min(2, 'Quartier requis'),
  notes: z.string().optional(),
});

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: cartItems, isLoading } = useCart();
  const { subtotal, itemCount } = useCartTotal();
  const createOrder = useCreateOrder();
  const clearCart = useClearCart();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Casablanca');
  const [neighborhood, setNeighborhood] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const deliveryFee = deliveryType === 'pickup' ? 0 : (subtotal > 100 ? 0 : 15);
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + serviceFee;

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background pt-20 pb-24">
          <div className="container max-w-2xl mx-auto px-4 py-16 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-display font-bold mb-2">Connectez-vous pour commander</h1>
            <p className="text-muted-foreground mb-6">
              Vous devez être connecté pour passer une commande.
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

  if (orderSuccess) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background pt-20 pb-24">
          <div className="container max-w-2xl mx-auto px-4 py-16 text-center">
            <div className="h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-secondary" />
            </div>
            <h1 className="text-2xl font-display font-bold mb-2">Commande confirmée !</h1>
            <p className="text-muted-foreground mb-2">
              Votre commande <span className="font-semibold text-foreground">{orderNumber}</span> a été passée avec succès.
            </p>
            <p className="text-muted-foreground mb-8">
              Vous recevrez une notification dès que le chef confirmera votre commande.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/dashboard">Voir mes commandes</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/discover">Continuer à explorer</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
        <MobileNavbar />
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }

    // Validate address for delivery
    if (deliveryType === 'delivery') {
      const result = addressSchema.safeParse({ address, city, neighborhood, notes });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach(err => {
          fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Group items by chef (for simplicity, we assume single chef per order for now)
      const chefId = cartItems[0].dish?.chef_id;
      if (!chefId) throw new Error('Chef non trouvé');

      const orderItems = cartItems.map(item => ({
        dish_id: item.dish_id,
        name: item.dish?.name || '',
        price: item.dish?.price || 0,
        quantity: item.quantity,
        special_instructions: item.special_instructions,
      }));

      const orderData: CreateOrderData = {
        items: orderItems,
        chefId,
        subtotal,
        deliveryFee,
        serviceFee,
        total,
        deliveryAddress: deliveryType === 'delivery' ? address : undefined,
        deliveryCity: deliveryType === 'delivery' ? city : undefined,
        deliveryNeighborhood: deliveryType === 'delivery' ? neighborhood : undefined,
        deliveryNotes: notes,
        isPickup: deliveryType === 'pickup',
      };

      const order = await createOrder.mutateAsync(orderData);
      
      // Clear cart
      await clearCart.mutateAsync();
      
      setOrderNumber(order.order_number);
      setOrderSuccess(true);
      toast.success('Commande passée avec succès !');
    } catch (error: any) {
      console.error('Order error:', error);
      toast.error(error.message || 'Erreur lors de la commande');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background pt-20 pb-24">
          <div className="container max-w-2xl mx-auto px-4 py-16 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-display font-bold mb-2">Votre panier est vide</h1>
            <p className="text-muted-foreground mb-6">
              Ajoutez des plats à votre panier avant de passer commande.
            </p>
            <Button asChild>
              <Link to="/discover">Découvrir les plats</Link>
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
        <title>Passer commande | DarFood</title>
        <meta name="description" content="Finalisez votre commande DarFood" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20 pb-24 md:pb-8">
          <div className="container max-w-4xl mx-auto px-4 py-8">
            {/* Back button */}
            <Button variant="ghost" className="mb-6" asChild>
              <Link to="/cart">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au panier
              </Link>
            </Button>

            <h1 className="text-2xl font-display font-bold text-foreground mb-8">
              Passer commande
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Delivery Options & Address */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Delivery Type */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Truck className="h-5 w-5 text-primary" />
                        Mode de livraison
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={deliveryType}
                        onValueChange={(v) => setDeliveryType(v as 'delivery' | 'pickup')}
                        className="grid grid-cols-2 gap-4"
                      >
                        <Label
                          htmlFor="delivery"
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            deliveryType === 'delivery' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/30'
                          }`}
                        >
                          <RadioGroupItem value="delivery" id="delivery" className="sr-only" />
                          <Truck className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">Livraison</div>
                            <div className="text-xs text-muted-foreground">
                              {subtotal > 100 ? 'Gratuite' : '15 DH'}
                            </div>
                          </div>
                        </Label>
                        <Label
                          htmlFor="pickup"
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            deliveryType === 'pickup' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/30'
                          }`}
                        >
                          <RadioGroupItem value="pickup" id="pickup" className="sr-only" />
                          <Package className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">À emporter</div>
                            <div className="text-xs text-muted-foreground">Gratuit</div>
                          </div>
                        </Label>
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  {/* Delivery Address */}
                  {deliveryType === 'delivery' && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <MapPin className="h-5 w-5 text-primary" />
                          Adresse de livraison
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Adresse complète *</Label>
                          <Input
                            id="address"
                            placeholder="123 Rue Example, Apt 4"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">Ville *</Label>
                            <Input
                              id="city"
                              placeholder="Casablanca"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                            {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="neighborhood">Quartier *</Label>
                            <Input
                              id="neighborhood"
                              placeholder="Maarif"
                              value={neighborhood}
                              onChange={(e) => setNeighborhood(e.target.value)}
                            />
                            {errors.neighborhood && <p className="text-sm text-destructive">{errors.neighborhood}</p>}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Instructions de livraison (optionnel)</Label>
                          <Textarea
                            id="notes"
                            placeholder="Ex: Sonnez 2 fois, 3ème étage..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={2}
                            className="resize-none"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Payment Notice */}
                  <Card className="border-amber-500/30 bg-amber-500/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-amber-600" />
                        <div>
                          <p className="font-medium text-foreground">Paiement à la livraison</p>
                          <p className="text-sm text-muted-foreground">
                            Le paiement en ligne sera bientôt disponible
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Résumé</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Items */}
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.quantity}x {item.dish?.name}
                            </span>
                            <span>{(item.dish?.price || 0) * item.quantity} DH</span>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sous-total</span>
                          <span>{subtotal} DH</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Livraison</span>
                          <span>{deliveryFee === 0 ? 'Gratuit' : `${deliveryFee} DH`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Frais de service</span>
                          <span>{serviceFee} DH</span>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">{total} DH</span>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Traitement...
                          </>
                        ) : (
                          <>
                            Confirmer la commande
                            <span className="ml-2">({total} DH)</span>
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </main>

        <Footer />
        <MobileNavbar />
      </div>
    </>
  );
};

export default Checkout;
