import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DishWithDetails {
  id: string;
  name: string;
  name_ar: string | null;
  description: string | null;
  price: number;
  photos: string[];
  is_active: boolean;
  is_healthy: boolean;
  is_vegetarian: boolean;
  preparation_time: number | null;
  portion_size: string | null;
  allergens: string[] | null;
  ingredients: string[] | null;
  average_rating: number;
  total_reviews: number;
  total_orders: number;
  chef_id: string;
  category_id: string | null;
  created_at: string;
  chef?: {
    id: string;
    badge: string;
    average_rating: number;
    user_id: string;
    profile?: {
      full_name: string | null;
      avatar_url: string | null;
      city: string | null;
    };
  };
  category?: {
    id: string;
    name: string;
    name_ar: string | null;
    slug: string;
    icon: string | null;
  };
}

export const useDishes = (options?: {
  categorySlug?: string;
  chefId?: string;
  search?: string;
  isHealthy?: boolean;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['dishes', options],
    queryFn: async () => {
      let query = supabase
        .from('dishes')
        .select(`
          *,
          chef:chef_profiles!chef_id (
            id,
            badge,
            average_rating,
            user_id
          ),
          category:dish_categories!category_id (
            id,
            name,
            name_ar,
            slug,
            icon
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (options?.chefId) {
        query = query.eq('chef_id', options.chefId);
      }

      if (options?.search) {
        query = query.or(`name.ilike.%${options.search}%,name_ar.ilike.%${options.search}%,description.ilike.%${options.search}%`);
      }

      if (options?.isHealthy) {
        query = query.eq('is_healthy', true);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Fetch profiles for each chef
      const dishesWithProfiles = await Promise.all(
        (data || []).map(async (dish) => {
          if (dish.chef?.user_id) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('full_name, avatar_url, city')
              .eq('id', dish.chef.user_id)
              .single();
            
            return {
              ...dish,
              chef: {
                ...dish.chef,
                profile,
              },
            };
          }
          return dish;
        })
      );

      // Filter by category slug if needed
      if (options?.categorySlug && options.categorySlug !== 'all') {
        return dishesWithProfiles.filter(
          (d) => d.category?.slug === options.categorySlug
        ) as DishWithDetails[];
      }

      return dishesWithProfiles as DishWithDetails[];
    },
  });
};

export const useDish = (dishId: string) => {
  return useQuery({
    queryKey: ['dish', dishId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dishes')
        .select(`
          *,
          chef:chef_profiles!chef_id (
            id,
            badge,
            average_rating,
            user_id
          ),
          category:dish_categories!category_id (
            id,
            name,
            name_ar,
            slug,
            icon
          )
        `)
        .eq('id', dishId)
        .single();

      if (error) throw error;
      
      // Fetch chef profile
      if (data?.chef?.user_id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, avatar_url, city')
          .eq('id', data.chef.user_id)
          .single();
        
        return {
          ...data,
          chef: {
            ...data.chef,
            profile,
          },
        } as DishWithDetails;
      }

      return data as DishWithDetails;
    },
    enabled: !!dishId,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['dish_categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dish_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data;
    },
  });
};
