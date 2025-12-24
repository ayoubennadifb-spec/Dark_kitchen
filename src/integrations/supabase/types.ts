export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      cart_items: {
        Row: {
          created_at: string | null
          dish_id: string
          id: string
          quantity: number | null
          special_instructions: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          dish_id: string
          id?: string
          quantity?: number | null
          special_instructions?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          dish_id?: string
          id?: string
          quantity?: number | null
          special_instructions?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_dish_id_fkey"
            columns: ["dish_id"]
            isOneToOne: false
            referencedRelation: "dishes"
            referencedColumns: ["id"]
          },
        ]
      }
      chef_profiles: {
        Row: {
          application_message: string | null
          approved_at: string | null
          average_rating: number | null
          badge: Database["public"]["Enums"]["chef_badge"] | null
          bio: string | null
          commission_rate: number | null
          created_at: string | null
          hygiene_verified: boolean | null
          id: string
          identity_verified: boolean | null
          kitchen_photos: string[] | null
          monthly_earnings: number | null
          rejection_reason: string | null
          specialties: string[] | null
          status: Database["public"]["Enums"]["chef_status"] | null
          total_orders: number | null
          total_reviews: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          application_message?: string | null
          approved_at?: string | null
          average_rating?: number | null
          badge?: Database["public"]["Enums"]["chef_badge"] | null
          bio?: string | null
          commission_rate?: number | null
          created_at?: string | null
          hygiene_verified?: boolean | null
          id?: string
          identity_verified?: boolean | null
          kitchen_photos?: string[] | null
          monthly_earnings?: number | null
          rejection_reason?: string | null
          specialties?: string[] | null
          status?: Database["public"]["Enums"]["chef_status"] | null
          total_orders?: number | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          application_message?: string | null
          approved_at?: string | null
          average_rating?: number | null
          badge?: Database["public"]["Enums"]["chef_badge"] | null
          bio?: string | null
          commission_rate?: number | null
          created_at?: string | null
          hygiene_verified?: boolean | null
          id?: string
          identity_verified?: boolean | null
          kitchen_photos?: string[] | null
          monthly_earnings?: number | null
          rejection_reason?: string | null
          specialties?: string[] | null
          status?: Database["public"]["Enums"]["chef_status"] | null
          total_orders?: number | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      competition_entries: {
        Row: {
          chef_id: string
          competition_id: string
          created_at: string | null
          description: string | null
          dish_name: string
          id: string
          is_winner: boolean | null
          photos: string[] | null
          votes: number | null
        }
        Insert: {
          chef_id: string
          competition_id: string
          created_at?: string | null
          description?: string | null
          dish_name: string
          id?: string
          is_winner?: boolean | null
          photos?: string[] | null
          votes?: number | null
        }
        Update: {
          chef_id?: string
          competition_id?: string
          created_at?: string | null
          description?: string | null
          dish_name?: string
          id?: string
          is_winner?: boolean | null
          photos?: string[] | null
          votes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "competition_entries_chef_id_fkey"
            columns: ["chef_id"]
            isOneToOne: false
            referencedRelation: "chef_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_entries_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
        ]
      }
      competition_votes: {
        Row: {
          created_at: string | null
          entry_id: string
          id: string
          voter_id: string
        }
        Insert: {
          created_at?: string | null
          entry_id: string
          id?: string
          voter_id: string
        }
        Update: {
          created_at?: string | null
          entry_id?: string
          id?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "competition_votes_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "competition_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      competitions: {
        Row: {
          cover_image: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          prize_amount: number | null
          prize_description: string | null
          rules: string | null
          submission_end: string
          submission_start: string
          voting_end: string
          voting_start: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          prize_amount?: number | null
          prize_description?: string | null
          rules?: string | null
          submission_end: string
          submission_start: string
          voting_end: string
          voting_start: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          prize_amount?: number | null
          prize_description?: string | null
          rules?: string | null
          submission_end?: string
          submission_start?: string
          voting_end?: string
          voting_start?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          last_message_at: string | null
          order_id: string | null
          participants: string[]
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          order_id?: string | null
          participants: string[]
        }
        Update: {
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          order_id?: string | null
          participants?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "conversations_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      dish_categories: {
        Row: {
          created_at: string | null
          icon: string | null
          id: string
          name: string
          name_ar: string | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
          name_ar?: string | null
          slug: string
        }
        Update: {
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          name_ar?: string | null
          slug?: string
        }
        Relationships: []
      }
      dishes: {
        Row: {
          allergens: string[] | null
          available_days: string[] | null
          available_time_end: string | null
          available_time_start: string | null
          average_rating: number | null
          category_id: string | null
          chef_id: string
          created_at: string | null
          description: string | null
          id: string
          ingredients: string[] | null
          is_active: boolean | null
          is_healthy: boolean | null
          is_vegetarian: boolean | null
          max_portions_per_day: number | null
          name: string
          name_ar: string | null
          photos: string[] | null
          portion_size: string | null
          preparation_time: number | null
          price: number
          total_orders: number | null
          total_reviews: number | null
          updated_at: string | null
        }
        Insert: {
          allergens?: string[] | null
          available_days?: string[] | null
          available_time_end?: string | null
          available_time_start?: string | null
          average_rating?: number | null
          category_id?: string | null
          chef_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          ingredients?: string[] | null
          is_active?: boolean | null
          is_healthy?: boolean | null
          is_vegetarian?: boolean | null
          max_portions_per_day?: number | null
          name: string
          name_ar?: string | null
          photos?: string[] | null
          portion_size?: string | null
          preparation_time?: number | null
          price: number
          total_orders?: number | null
          total_reviews?: number | null
          updated_at?: string | null
        }
        Update: {
          allergens?: string[] | null
          available_days?: string[] | null
          available_time_end?: string | null
          available_time_start?: string | null
          average_rating?: number | null
          category_id?: string | null
          chef_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          ingredients?: string[] | null
          is_active?: boolean | null
          is_healthy?: boolean | null
          is_vegetarian?: boolean | null
          max_portions_per_day?: number | null
          name?: string
          name_ar?: string | null
          photos?: string[] | null
          portion_size?: string | null
          preparation_time?: number | null
          price?: number
          total_orders?: number | null
          total_reviews?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dishes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "dish_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dishes_chef_id_fkey"
            columns: ["chef_id"]
            isOneToOne: false
            referencedRelation: "chef_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_profiles: {
        Row: {
          application_message: string | null
          approved_at: string | null
          average_rating: number | null
          created_at: string | null
          current_location: Json | null
          id: string
          id_photo_url: string | null
          is_online: boolean | null
          license_number: string | null
          license_photo_url: string | null
          rejection_reason: string | null
          status: Database["public"]["Enums"]["driver_status"] | null
          total_deliveries: number | null
          total_earnings: number | null
          updated_at: string | null
          user_id: string
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
        }
        Insert: {
          application_message?: string | null
          approved_at?: string | null
          average_rating?: number | null
          created_at?: string | null
          current_location?: Json | null
          id?: string
          id_photo_url?: string | null
          is_online?: boolean | null
          license_number?: string | null
          license_photo_url?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["driver_status"] | null
          total_deliveries?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id: string
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
        }
        Update: {
          application_message?: string | null
          approved_at?: string | null
          average_rating?: number | null
          created_at?: string | null
          current_location?: Json | null
          id?: string
          id_photo_url?: string | null
          is_online?: boolean | null
          license_number?: string | null
          license_photo_url?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["driver_status"] | null
          total_deliveries?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id?: string
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"]
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          image_url: string | null
          is_read: boolean | null
          message_type: Database["public"]["Enums"]["message_type"] | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_read?: boolean | null
          message_type?: Database["public"]["Enums"]["message_type"] | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_read?: boolean | null
          message_type?: Database["public"]["Enums"]["message_type"] | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      order_status_history: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          order_id?: string
          status?: Database["public"]["Enums"]["order_status"]
        }
        Relationships: [
          {
            foreignKeyName: "order_status_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          cancellation_reason: string | null
          cancelled_at: string | null
          chef_id: string
          confirmed_at: string | null
          created_at: string | null
          customer_id: string
          delivered_at: string | null
          delivery_address: string | null
          delivery_city: string | null
          delivery_fee: number | null
          delivery_neighborhood: string | null
          delivery_notes: string | null
          discount_amount: number | null
          driver_id: string | null
          estimated_delivery_time: string | null
          estimated_ready_time: string | null
          id: string
          is_pickup: boolean | null
          items: Json
          order_number: string
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          picked_up_at: string | null
          promo_code: string | null
          ready_at: string | null
          scheduled_for: string | null
          service_fee: number | null
          status: Database["public"]["Enums"]["order_status"] | null
          stripe_payment_intent_id: string | null
          subtotal: number
          total: number
          updated_at: string | null
        }
        Insert: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          chef_id: string
          confirmed_at?: string | null
          created_at?: string | null
          customer_id: string
          delivered_at?: string | null
          delivery_address?: string | null
          delivery_city?: string | null
          delivery_fee?: number | null
          delivery_neighborhood?: string | null
          delivery_notes?: string | null
          discount_amount?: number | null
          driver_id?: string | null
          estimated_delivery_time?: string | null
          estimated_ready_time?: string | null
          id?: string
          is_pickup?: boolean | null
          items: Json
          order_number: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          picked_up_at?: string | null
          promo_code?: string | null
          ready_at?: string | null
          scheduled_for?: string | null
          service_fee?: number | null
          status?: Database["public"]["Enums"]["order_status"] | null
          stripe_payment_intent_id?: string | null
          subtotal: number
          total: number
          updated_at?: string | null
        }
        Update: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          chef_id?: string
          confirmed_at?: string | null
          created_at?: string | null
          customer_id?: string
          delivered_at?: string | null
          delivery_address?: string | null
          delivery_city?: string | null
          delivery_fee?: number | null
          delivery_neighborhood?: string | null
          delivery_notes?: string | null
          discount_amount?: number | null
          driver_id?: string | null
          estimated_delivery_time?: string | null
          estimated_ready_time?: string | null
          id?: string
          is_pickup?: boolean | null
          items?: Json
          order_number?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          picked_up_at?: string | null
          promo_code?: string | null
          ready_at?: string | null
          scheduled_for?: string | null
          service_fee?: number | null
          status?: Database["public"]["Enums"]["order_status"] | null
          stripe_payment_intent_id?: string | null
          subtotal?: number
          total?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_chef_id_fkey"
            columns: ["chef_id"]
            isOneToOne: false
            referencedRelation: "chef_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "driver_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          neighborhood: string | null
          phone: string | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          neighborhood?: string | null
          phone?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          neighborhood?: string | null
          phone?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string | null
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string | null
          current_uses: number | null
          discount_type: string
          discount_value: number
          id: string
          is_active: boolean | null
          max_uses: number | null
          min_order_amount: number | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          current_uses?: number | null
          discount_type: string
          discount_value: number
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          min_order_amount?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          current_uses?: number | null
          discount_type?: string
          discount_value?: number
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          min_order_amount?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      recipe_packs: {
        Row: {
          chef_id: string
          cover_image: string | null
          created_at: string | null
          description: string | null
          id: string
          is_published: boolean | null
          name: string
          price: number
          recipe_ids: string[] | null
          total_sales: number | null
        }
        Insert: {
          chef_id: string
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          name: string
          price: number
          recipe_ids?: string[] | null
          total_sales?: number | null
        }
        Update: {
          chef_id?: string
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          name?: string
          price?: number
          recipe_ids?: string[] | null
          total_sales?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_packs_chef_id_fkey"
            columns: ["chef_id"]
            isOneToOne: false
            referencedRelation: "chef_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_purchases: {
        Row: {
          created_at: string | null
          id: string
          pack_id: string | null
          price_paid: number
          recipe_id: string | null
          stripe_payment_intent_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          pack_id?: string | null
          price_paid: number
          recipe_id?: string | null
          stripe_payment_intent_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          pack_id?: string | null
          price_paid?: number
          recipe_id?: string | null
          stripe_payment_intent_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_purchases_pack_id_fkey"
            columns: ["pack_id"]
            isOneToOne: false
            referencedRelation: "recipe_packs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_purchases_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          chef_id: string
          created_at: string | null
          difficulty: Database["public"]["Enums"]["recipe_difficulty"] | null
          duration: number | null
          id: string
          ingredients: Json | null
          is_premium: boolean | null
          is_published: boolean | null
          photos: string[] | null
          price: number | null
          servings: number | null
          steps: Json | null
          story: string | null
          title: string
          title_ar: string | null
          total_revenue: number | null
          total_sales: number | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          chef_id: string
          created_at?: string | null
          difficulty?: Database["public"]["Enums"]["recipe_difficulty"] | null
          duration?: number | null
          id?: string
          ingredients?: Json | null
          is_premium?: boolean | null
          is_published?: boolean | null
          photos?: string[] | null
          price?: number | null
          servings?: number | null
          steps?: Json | null
          story?: string | null
          title: string
          title_ar?: string | null
          total_revenue?: number | null
          total_sales?: number | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          chef_id?: string
          created_at?: string | null
          difficulty?: Database["public"]["Enums"]["recipe_difficulty"] | null
          duration?: number | null
          id?: string
          ingredients?: Json | null
          is_premium?: boolean | null
          is_published?: boolean | null
          photos?: string[] | null
          price?: number | null
          servings?: number | null
          steps?: Json | null
          story?: string | null
          title?: string
          title_ar?: string | null
          total_revenue?: number | null
          total_sales?: number | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipes_chef_id_fkey"
            columns: ["chef_id"]
            isOneToOne: false
            referencedRelation: "chef_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          chef_id: string | null
          comment: string | null
          created_at: string | null
          dish_id: string | null
          driver_id: string | null
          id: string
          is_verified_purchase: boolean | null
          order_id: string | null
          photos: string[] | null
          rating: number
          reviewer_id: string
        }
        Insert: {
          chef_id?: string | null
          comment?: string | null
          created_at?: string | null
          dish_id?: string | null
          driver_id?: string | null
          id?: string
          is_verified_purchase?: boolean | null
          order_id?: string | null
          photos?: string[] | null
          rating: number
          reviewer_id: string
        }
        Update: {
          chef_id?: string | null
          comment?: string | null
          created_at?: string | null
          dish_id?: string | null
          driver_id?: string | null
          id?: string
          is_verified_purchase?: boolean | null
          order_id?: string | null
          photos?: string[] | null
          rating?: number
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_chef_id_fkey"
            columns: ["chef_id"]
            isOneToOne: false
            referencedRelation: "chef_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_dish_id_fkey"
            columns: ["dish_id"]
            isOneToOne: false
            referencedRelation: "dishes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "driver_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_chef_profile_id: { Args: never; Returns: string }
      get_my_driver_profile_id: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "customer" | "chef" | "driver" | "admin"
      chef_badge: "bronze" | "silver" | "gold" | "emerald"
      chef_status: "pending" | "approved" | "rejected" | "suspended"
      driver_status: "pending" | "approved" | "rejected" | "suspended"
      message_type: "text" | "image" | "system"
      order_status:
        | "pending"
        | "confirmed"
        | "cooking"
        | "ready"
        | "picked_up"
        | "delivering"
        | "delivered"
        | "cancelled"
      payment_status: "pending" | "paid" | "failed" | "refunded"
      recipe_difficulty: "easy" | "medium" | "hard"
      subscription_tier: "basic" | "premium_foodie" | "premium_chef"
      vehicle_type: "scooter" | "moto" | "bike" | "car"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["customer", "chef", "driver", "admin"],
      chef_badge: ["bronze", "silver", "gold", "emerald"],
      chef_status: ["pending", "approved", "rejected", "suspended"],
      driver_status: ["pending", "approved", "rejected", "suspended"],
      message_type: ["text", "image", "system"],
      order_status: [
        "pending",
        "confirmed",
        "cooking",
        "ready",
        "picked_up",
        "delivering",
        "delivered",
        "cancelled",
      ],
      payment_status: ["pending", "paid", "failed", "refunded"],
      recipe_difficulty: ["easy", "medium", "hard"],
      subscription_tier: ["basic", "premium_foodie", "premium_chef"],
      vehicle_type: ["scooter", "moto", "bike", "car"],
    },
  },
} as const
