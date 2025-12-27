import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ChefWithProfile {
  id: string;
  user_id: string;
  bio: string | null;
  specialties: string[] | null;
  badge: 'bronze' | 'silver' | 'gold' | 'emerald';
  average_rating: number;
  total_reviews: number;
  total_orders: number;
  monthly_earnings: number;
  status: string;
  profile?: {
    full_name: string | null;
    avatar_url: string | null;
    city: string | null;
    email: string;
  };
}

export const useChefs = (options?: {
  search?: string;
  limit?: number;
  status?: 'approved' | 'pending' | 'rejected';
}) => {
  return useQuery({
    queryKey: ['chefs', options],
    queryFn: async () => {
      let query = supabase
        .from('chef_profiles')
        .select('*')
        .order('average_rating', { ascending: false });

      if (options?.status) {
        query = query.eq('status', options.status);
      } else {
        query = query.eq('status', 'approved');
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Fetch profiles for each chef
      const chefsWithProfiles = await Promise.all(
        (data || []).map(async (chef) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, avatar_url, city, email')
            .eq('id', chef.user_id)
            .single();
          
          return {
            ...chef,
            profile,
          } as ChefWithProfile;
        })
      );

      // Filter by search if needed
      if (options?.search) {
        const searchLower = options.search.toLowerCase();
        return chefsWithProfiles.filter(
          (c) =>
            c.profile?.full_name?.toLowerCase().includes(searchLower) ||
            c.bio?.toLowerCase().includes(searchLower) ||
            c.specialties?.some((s) => s.toLowerCase().includes(searchLower))
        );
      }

      return chefsWithProfiles;
    },
  });
};

export const useChef = (chefId: string) => {
  return useQuery({
    queryKey: ['chef', chefId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chef_profiles')
        .select('*')
        .eq('id', chefId)
        .single();

      if (error) throw error;

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url, city, email')
        .eq('id', data.user_id)
        .single();

      return {
        ...data,
        profile,
      } as ChefWithProfile;
    },
    enabled: !!chefId,
  });
};

export const useMyChefProfile = () => {
  return useQuery({
    queryKey: ['my-chef-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('chef_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url, city, email')
        .eq('id', user.id)
        .single();

      return {
        ...data,
        profile,
      } as ChefWithProfile;
    },
  });
};
