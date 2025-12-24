-- Create enums for the platform
CREATE TYPE public.app_role AS ENUM ('customer', 'chef', 'driver', 'admin');
CREATE TYPE public.chef_badge AS ENUM ('bronze', 'silver', 'gold', 'emerald');
CREATE TYPE public.chef_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');
CREATE TYPE public.driver_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'cooking', 'ready', 'picked_up', 'delivering', 'delivered', 'cancelled');
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE public.recipe_difficulty AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE public.vehicle_type AS ENUM ('scooter', 'moto', 'bike', 'car');
CREATE TYPE public.subscription_tier AS ENUM ('basic', 'premium_foodie', 'premium_chef');
CREATE TYPE public.message_type AS ENUM ('text', 'image', 'system');

-- Profiles table for all users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  city TEXT,
  neighborhood TEXT,
  address TEXT,
  subscription_tier subscription_tier DEFAULT 'basic',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Chef profiles
CREATE TABLE public.chef_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  bio TEXT,
  specialties TEXT[],
  badge chef_badge DEFAULT 'bronze',
  status chef_status DEFAULT 'pending',
  total_orders INTEGER DEFAULT 0,
  average_rating NUMERIC(2,1) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  monthly_earnings NUMERIC(10,2) DEFAULT 0,
  commission_rate NUMERIC(3,2) DEFAULT 0.15,
  hygiene_verified BOOLEAN DEFAULT FALSE,
  identity_verified BOOLEAN DEFAULT FALSE,
  kitchen_photos TEXT[],
  application_message TEXT,
  rejection_reason TEXT,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Driver profiles
CREATE TABLE public.driver_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  vehicle_type vehicle_type NOT NULL,
  license_number TEXT,
  license_photo_url TEXT,
  id_photo_url TEXT,
  status driver_status DEFAULT 'pending',
  is_online BOOLEAN DEFAULT FALSE,
  current_location JSONB,
  total_deliveries INTEGER DEFAULT 0,
  average_rating NUMERIC(2,1) DEFAULT 0,
  total_earnings NUMERIC(10,2) DEFAULT 0,
  application_message TEXT,
  rejection_reason TEXT,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Dish categories
CREATE TABLE public.dish_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default categories
INSERT INTO public.dish_categories (name, name_ar, slug, icon) VALUES
('Tajines', 'طاجين', 'tajines', '🥘'),
('Couscous', 'كسكس', 'couscous', '🍚'),
('Pastilla', 'بسطيلة', 'pastilla', '🥧'),
('Healthy', 'صحي', 'healthy', '🥗'),
('Desserts', 'حلويات', 'desserts', '🍰'),
('Soups', 'شوربة', 'soups', '🍲'),
('Grillades', 'مشويات', 'grillades', '🍖'),
('Bread', 'خبز', 'bread', '🍞');

-- Dishes
CREATE TABLE public.dishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chef_id UUID NOT NULL REFERENCES public.chef_profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.dish_categories(id),
  name TEXT NOT NULL,
  name_ar TEXT,
  description TEXT,
  price NUMERIC(8,2) NOT NULL,
  photos TEXT[] DEFAULT '{}',
  ingredients TEXT[],
  allergens TEXT[],
  is_vegetarian BOOLEAN DEFAULT FALSE,
  is_healthy BOOLEAN DEFAULT FALSE,
  preparation_time INTEGER, -- in minutes
  portion_size TEXT,
  max_portions_per_day INTEGER DEFAULT 10,
  available_days TEXT[] DEFAULT ARRAY['monday','tuesday','wednesday','thursday','friday','saturday','sunday'],
  available_time_start TIME,
  available_time_end TIME,
  is_active BOOLEAN DEFAULT TRUE,
  total_orders INTEGER DEFAULT 0,
  average_rating NUMERIC(2,1) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Recipes (digital products)
CREATE TABLE public.recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chef_id UUID NOT NULL REFERENCES public.chef_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  title_ar TEXT,
  story TEXT,
  difficulty recipe_difficulty DEFAULT 'medium',
  duration INTEGER, -- in minutes
  servings INTEGER DEFAULT 4,
  ingredients JSONB DEFAULT '[]',
  steps JSONB DEFAULT '[]',
  photos TEXT[] DEFAULT '{}',
  video_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  price NUMERIC(8,2) DEFAULT 0,
  total_sales INTEGER DEFAULT 0,
  total_revenue NUMERIC(10,2) DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Recipe packs (bundles)
CREATE TABLE public.recipe_packs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chef_id UUID NOT NULL REFERENCES public.chef_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(8,2) NOT NULL,
  cover_image TEXT,
  recipe_ids UUID[] DEFAULT '{}',
  total_sales INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Cart items
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  dish_id UUID NOT NULL REFERENCES public.dishes(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  special_instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, dish_id)
);

-- Orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID NOT NULL REFERENCES auth.users(id),
  chef_id UUID NOT NULL REFERENCES public.chef_profiles(id),
  driver_id UUID REFERENCES public.driver_profiles(id),
  status order_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'pending',
  items JSONB NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  delivery_fee NUMERIC(8,2) DEFAULT 0,
  service_fee NUMERIC(8,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  delivery_address TEXT,
  delivery_city TEXT,
  delivery_neighborhood TEXT,
  delivery_notes TEXT,
  is_pickup BOOLEAN DEFAULT FALSE,
  scheduled_for TIMESTAMPTZ,
  promo_code TEXT,
  discount_amount NUMERIC(8,2) DEFAULT 0,
  stripe_payment_intent_id TEXT,
  estimated_ready_time TIMESTAMPTZ,
  estimated_delivery_time TIMESTAMPTZ,
  confirmed_at TIMESTAMPTZ,
  ready_at TIMESTAMPTZ,
  picked_up_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Order status history
CREATE TABLE public.order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status order_status NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  dish_id UUID REFERENCES public.dishes(id) ON DELETE CASCADE,
  chef_id UUID REFERENCES public.chef_profiles(id) ON DELETE CASCADE,
  driver_id UUID REFERENCES public.driver_profiles(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  photos TEXT[],
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Conversations (for chat)
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  participants UUID[] NOT NULL,
  last_message_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Messages
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type message_type DEFAULT 'text',
  image_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  type TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Competitions
CREATE TABLE public.competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  rules TEXT,
  prize_description TEXT,
  prize_amount NUMERIC(10,2),
  cover_image TEXT,
  submission_start TIMESTAMPTZ NOT NULL,
  submission_end TIMESTAMPTZ NOT NULL,
  voting_start TIMESTAMPTZ NOT NULL,
  voting_end TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Competition entries
CREATE TABLE public.competition_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id UUID NOT NULL REFERENCES public.competitions(id) ON DELETE CASCADE,
  chef_id UUID NOT NULL REFERENCES public.chef_profiles(id) ON DELETE CASCADE,
  dish_name TEXT NOT NULL,
  description TEXT,
  photos TEXT[] DEFAULT '{}',
  votes INTEGER DEFAULT 0,
  is_winner BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(competition_id, chef_id)
);

-- Competition votes
CREATE TABLE public.competition_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id UUID NOT NULL REFERENCES public.competition_entries(id) ON DELETE CASCADE,
  voter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(entry_id, voter_id)
);

-- Recipe purchases
CREATE TABLE public.recipe_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES public.recipes(id) ON DELETE SET NULL,
  pack_id UUID REFERENCES public.recipe_packs(id) ON DELETE SET NULL,
  price_paid NUMERIC(8,2) NOT NULL,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Promo codes
CREATE TABLE public.promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC(8,2) NOT NULL,
  min_order_amount NUMERIC(8,2) DEFAULT 0,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  valid_from TIMESTAMPTZ DEFAULT now(),
  valid_until TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chef_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dish_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competition_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competition_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get chef profile id for current user
CREATE OR REPLACE FUNCTION public.get_my_chef_profile_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.chef_profiles WHERE user_id = auth.uid()
$$;

-- Function to get driver profile id for current user
CREATE OR REPLACE FUNCTION public.get_my_driver_profile_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.driver_profiles WHERE user_id = auth.uid()
$$;

-- Handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name')
  );
  
  -- Add customer role by default
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'customer');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_chef_profiles_updated_at BEFORE UPDATE ON public.chef_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_driver_profiles_updated_at BEFORE UPDATE ON public.driver_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_dishes_updated_at BEFORE UPDATE ON public.dishes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON public.recipes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Generate order number function
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  NEW.order_number := 'BLD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_order_number BEFORE INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION public.generate_order_number();

-- Update chef stats when order is delivered
CREATE OR REPLACE FUNCTION public.update_chef_stats_on_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'delivered' AND OLD.status != 'delivered' THEN
    UPDATE public.chef_profiles
    SET 
      total_orders = total_orders + 1,
      monthly_earnings = monthly_earnings + (NEW.subtotal * (1 - commission_rate))
    WHERE id = NEW.chef_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_order_delivered AFTER UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_chef_stats_on_order();

-- RLS Policies

-- Profiles: Users can read all, update own
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- User roles: Only admins can manage, users can see own
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Chef profiles: Public read for approved, users can manage own
CREATE POLICY "Approved chef profiles are viewable" ON public.chef_profiles FOR SELECT USING (status = 'approved' OR user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can create own chef profile" ON public.chef_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own chef profile" ON public.chef_profiles FOR UPDATE USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Driver profiles
CREATE POLICY "Approved driver profiles are viewable" ON public.driver_profiles FOR SELECT USING (status = 'approved' OR user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can create own driver profile" ON public.driver_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own driver profile" ON public.driver_profiles FOR UPDATE USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Categories: Public read
CREATE POLICY "Categories are viewable by everyone" ON public.dish_categories FOR SELECT USING (true);

-- Dishes: Public read for active, chefs manage own
CREATE POLICY "Active dishes are viewable" ON public.dishes FOR SELECT USING (is_active = true OR chef_id = public.get_my_chef_profile_id() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Chefs can create dishes" ON public.dishes FOR INSERT WITH CHECK (chef_id = public.get_my_chef_profile_id());
CREATE POLICY "Chefs can update own dishes" ON public.dishes FOR UPDATE USING (chef_id = public.get_my_chef_profile_id() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Chefs can delete own dishes" ON public.dishes FOR DELETE USING (chef_id = public.get_my_chef_profile_id() OR public.has_role(auth.uid(), 'admin'));

-- Recipes
CREATE POLICY "Published recipes are viewable" ON public.recipes FOR SELECT USING (is_published = true OR chef_id = public.get_my_chef_profile_id());
CREATE POLICY "Chefs can create recipes" ON public.recipes FOR INSERT WITH CHECK (chef_id = public.get_my_chef_profile_id());
CREATE POLICY "Chefs can update own recipes" ON public.recipes FOR UPDATE USING (chef_id = public.get_my_chef_profile_id());
CREATE POLICY "Chefs can delete own recipes" ON public.recipes FOR DELETE USING (chef_id = public.get_my_chef_profile_id());

-- Recipe packs
CREATE POLICY "Published packs are viewable" ON public.recipe_packs FOR SELECT USING (is_published = true OR chef_id = public.get_my_chef_profile_id());
CREATE POLICY "Chefs can manage own packs" ON public.recipe_packs FOR ALL USING (chef_id = public.get_my_chef_profile_id());

-- Cart items: Users manage own
CREATE POLICY "Users can view own cart" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to cart" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete from cart" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

-- Orders
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (
  auth.uid() = customer_id 
  OR chef_id = public.get_my_chef_profile_id() 
  OR driver_id = public.get_my_driver_profile_id()
  OR public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Participants can update orders" ON public.orders FOR UPDATE USING (
  auth.uid() = customer_id 
  OR chef_id = public.get_my_chef_profile_id() 
  OR driver_id = public.get_my_driver_profile_id()
  OR public.has_role(auth.uid(), 'admin')
);

-- Order status history
CREATE POLICY "Order participants can view history" ON public.order_status_history FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders o 
    WHERE o.id = order_id 
    AND (o.customer_id = auth.uid() OR o.chef_id = public.get_my_chef_profile_id() OR o.driver_id = public.get_my_driver_profile_id())
  )
);
CREATE POLICY "Order participants can add history" ON public.order_status_history FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders o 
    WHERE o.id = order_id 
    AND (o.customer_id = auth.uid() OR o.chef_id = public.get_my_chef_profile_id() OR o.driver_id = public.get_my_driver_profile_id())
  )
);

-- Reviews
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = reviewer_id);

-- Conversations
CREATE POLICY "Participants can view conversations" ON public.conversations FOR SELECT USING (auth.uid() = ANY(participants));
CREATE POLICY "Participants can create conversations" ON public.conversations FOR INSERT WITH CHECK (auth.uid() = ANY(participants));

-- Messages
CREATE POLICY "Participants can view messages" ON public.messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = conversation_id AND auth.uid() = ANY(c.participants))
);
CREATE POLICY "Participants can send messages" ON public.messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id AND 
  EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = conversation_id AND auth.uid() = ANY(c.participants))
);
CREATE POLICY "Recipients can mark as read" ON public.messages FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = conversation_id AND auth.uid() = ANY(c.participants))
);

-- Notifications
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Competitions
CREATE POLICY "Active competitions are viewable" ON public.competitions FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage competitions" ON public.competitions FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Competition entries
CREATE POLICY "Entries are viewable" ON public.competition_entries FOR SELECT USING (true);
CREATE POLICY "Chefs can create entries" ON public.competition_entries FOR INSERT WITH CHECK (chef_id = public.get_my_chef_profile_id());
CREATE POLICY "Chefs can update own entries" ON public.competition_entries FOR UPDATE USING (chef_id = public.get_my_chef_profile_id());

-- Competition votes
CREATE POLICY "Users can vote" ON public.competition_votes FOR INSERT WITH CHECK (auth.uid() = voter_id);
CREATE POLICY "Users can view votes" ON public.competition_votes FOR SELECT USING (true);

-- Recipe purchases
CREATE POLICY "Users can view own purchases" ON public.recipe_purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create purchases" ON public.recipe_purchases FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Promo codes: Public read for active
CREATE POLICY "Active promo codes are viewable" ON public.promo_codes FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage promo codes" ON public.promo_codes FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Enable realtime for orders, messages, and notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_status_history;