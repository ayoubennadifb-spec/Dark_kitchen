import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useAuth';
import { useCart, useCartTotal, useUpdateCartItem, useRemoveFromCart, useClearCart } from '@/hooks/useCart';
import { Navbar, MobileNavbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingBag, 
  Minus, 
  Plus, 
  Trash2, 
  ArrowRight,
  Loader2,
  ChefHat
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: cartItems, isLoading } = useCart();
  const { subtotal, itemCount } = useCartTotal();
  const updateCartItem = useUpdateCartItem();
  const removeFromCart = useRemoveFromCart();
  const clearCart = useClearCart();

  const deliveryFee = subtotal > 100 ? 0 : 15;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + serviceFee;

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background pt-20 pb-24">
          <div className="container max-w-2xl mx-auto px-4 py-16 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-display font-bold mb-2">Connectez-vous pour voir votre panier</h1>
            <p className="text-muted-foreground mb-6">
              Vous devez être connecté pour ajouter des articles à votre panier.
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
        <title>Mon Panier | DarFood</title>
        <meta name="description" content="Consultez votre panier et passez votre commande." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20 pb-24 md:pb-8">
          <div className="container max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-display font-bold text-foreground">
                  Mon Panier
                </h1>
                <p className="text-muted-foreground">
                  {itemCount} article{itemCount > 1 ? 's' : ''}
                </p>
              </div>
              {cartItems && cartItems.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => clearCart.mutate()}
                  disabled={clearCart.isPending}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Vider le panier
                </Button>
              )}
            </div>

            {isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !cartItems || cartItems.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
                <p className="text-muted-foreground mb-6">
                  Découvrez nos délicieux plats marocains préparés par nos chefs.
                </p>
                <Button asChild>
                  <Link to="/discover">
                    <ChefHat className="h-4 w-4 mr-2" />
                    Découvrir les plats
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                            <img 
                              src={item.dish?.photos?.[0] || '/placeholder.svg'} 
                              alt={item.dish?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{item.dish?.name}</h3>
                            {item.dish?.name_ar && (
                              <p className="text-sm text-muted-foreground" dir="rtl">
                                {item.dish.name_ar}
                              </p>
                            )}
                            <p className="text-primary font-semibold mt-1">
                              {item.dish?.price} DH
                            </p>
                            {item.special_instructions && (
                              <p className="text-xs text-muted-foreground mt-1 italic">
                                "{item.special_instructions}"
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeFromCart.mutate(item.id)}
                              disabled={removeFromCart.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateCartItem.mutate({ 
                                  cartItemId: item.id, 
                                  quantity: item.quantity - 1 
                                })}
                                disabled={updateCartItem.isPending}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateCartItem.mutate({ 
                                  cartItemId: item.id, 
                                  quantity: item.quantity + 1 
                                })}
                                disabled={updateCartItem.isPending}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Résumé de la commande</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
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
                      {deliveryFee === 0 && (
                        <p className="text-xs text-secondary">
                          🎉 Livraison gratuite pour les commandes +100 DH
                        </p>
                      )}
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">{total} DH</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" size="lg" asChild>
                        <Link to="/checkout">
                          Commander
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
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

export default Cart;
