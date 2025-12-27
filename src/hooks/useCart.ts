import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  dish_id: string;
  quantity: number;
  special_instructions?: string;
  dish?: {
    id: string;
    name: string;
    name_ar?: string;
    price: number;
    photos: string[];
    preparation_time?: number;
    chef_id: string;
    chef_profiles?: {
      id: string;
      profiles?: {
        full_name?: string;
      };
    };
  };
}

export const useCart = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['cart', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          dish:dish_id (
            id,
            name,
            name_ar,
            price,
            photos,
            preparation_time,
            chef_id,
            chef_profiles:chef_id (
              id,
              profiles:user_id (full_name)
            )
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data as unknown as CartItem[];
    },
    enabled: !!user,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ dishId, quantity = 1, specialInstructions }: {
      dishId: string;
      quantity?: number;
      specialInstructions?: string;
    }) => {
      if (!user) throw new Error('Vous devez être connecté');

      // Check if item already exists in cart
      const { data: existing } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('dish_id', dishId)
        .maybeSingle();

      if (existing) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + quantity })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Insert new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            dish_id: dishId,
            quantity,
            special_instructions: specialInstructions,
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Ajouté au panier !');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cartItemId, quantity }: {
      cartItemId: string;
      quantity: number;
    }) => {
      if (quantity <= 0) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', cartItemId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', cartItemId);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartItemId: string) => {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Retiré du panier');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Non connecté');

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useCartTotal = () => {
  const { data: cartItems } = useCart();

  const subtotal = cartItems?.reduce((acc, item) => {
    return acc + (item.dish?.price || 0) * item.quantity;
  }, 0) || 0;

  const itemCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return { subtotal, itemCount, cartItems };
};
