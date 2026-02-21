export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          locale: "en" | "ar";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          locale?: "en" | "ar";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          locale?: "en" | "ar";
          created_at?: string;
          updated_at?: string;
        };
      };
      pricing_tiers: {
        Row: {
          id: number;
          key: "free" | "basic" | "pro" | "premium";
          name_en: string;
          name_ar: string;
          price_sar: number;
          period_en: string;
          period_ar: string;
          description_en: string;
          description_ar: string;
          features_en: string[];
          features_ar: string[];
          is_popular: boolean;
          max_resumes: number;
          has_ai_writing: boolean;
          has_cover_letter: boolean;
          has_linkedin_optimization: boolean;
          has_cv_review: boolean;
          has_priority_support: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          key: "free" | "basic" | "pro" | "premium";
          name_en: string;
          name_ar: string;
          price_sar: number;
          period_en: string;
          period_ar: string;
          description_en: string;
          description_ar: string;
          features_en?: string[];
          features_ar?: string[];
          is_popular?: boolean;
          max_resumes?: number;
          has_ai_writing?: boolean;
          has_cover_letter?: boolean;
          has_linkedin_optimization?: boolean;
          has_cv_review?: boolean;
          has_priority_support?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          key?: "free" | "basic" | "pro" | "premium";
          name_en?: string;
          name_ar?: string;
          price_sar?: number;
          period_en?: string;
          period_ar?: string;
          description_en?: string;
          description_ar?: string;
          features_en?: string[];
          features_ar?: string[];
          is_popular?: boolean;
          max_resumes?: number;
          has_ai_writing?: boolean;
          has_cover_letter?: boolean;
          has_linkedin_optimization?: boolean;
          has_cv_review?: boolean;
          has_priority_support?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: number;
          user_id: string;
          tier_id: number;
          status: "active" | "expired" | "cancelled" | "refunded";
          purchased_at: string;
          expires_at: string | null;
          payment_provider: "stripe" | "paypal" | "manual" | null;
          payment_reference: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          tier_id: number;
          status?: "active" | "expired" | "cancelled" | "refunded";
          purchased_at?: string;
          expires_at?: string | null;
          payment_provider?: "stripe" | "paypal" | "manual" | null;
          payment_reference?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          tier_id?: number;
          status?: "active" | "expired" | "cancelled" | "refunded";
          purchased_at?: string;
          expires_at?: string | null;
          payment_provider?: "stripe" | "paypal" | "manual" | null;
          payment_reference?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      resumes: {
        Row: {
          id: number;
          user_id: string;
          title: string;
          language_mode: "AR" | "EN" | "BILINGUAL";
          template_key: "classic" | "modern-minimal" | "executive";
          contact: Json;
          summary: string | null;
          skills: string[] | null;
          experience: Json;
          education: Json;
          certifications: Json;
          projects: Json;
          languages: Json;
          awards: Json;
          volunteering: Json;
          ats_settings: Json;
          is_archived: boolean;
          last_exported_at: string | null;
          export_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          title: string;
          language_mode?: "AR" | "EN" | "BILINGUAL";
          template_key?: "classic" | "modern-minimal" | "executive";
          contact?: Json;
          summary?: string | null;
          skills?: string[] | null;
          experience?: Json;
          education?: Json;
          certifications?: Json;
          projects?: Json;
          languages?: Json;
          awards?: Json;
          volunteering?: Json;
          ats_settings?: Json;
          is_archived?: boolean;
          last_exported_at?: string | null;
          export_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          title?: string;
          language_mode?: "AR" | "EN" | "BILINGUAL";
          template_key?: "classic" | "modern-minimal" | "executive";
          contact?: Json;
          summary?: string | null;
          skills?: string[] | null;
          experience?: Json;
          education?: Json;
          certifications?: Json;
          projects?: Json;
          languages?: Json;
          awards?: Json;
          volunteering?: Json;
          ats_settings?: Json;
          is_archived?: boolean;
          last_exported_at?: string | null;
          export_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      cover_letters: {
        Row: {
          id: number;
          user_id: string;
          resume_id: number | null;
          title: string;
          company_name: string | null;
          job_title: string | null;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          resume_id?: number | null;
          title: string;
          company_name?: string | null;
          job_title?: string | null;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          resume_id?: number | null;
          title?: string;
          company_name?: string | null;
          job_title?: string | null;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      resume_analytics: {
        Row: {
          id: number;
          resume_id: number;
          event_type: "view" | "export_pdf" | "export_docx" | "share";
          created_at: string;
        };
        Insert: {
          id?: number;
          resume_id: number;
          event_type: "view" | "export_pdf" | "export_docx" | "share";
          created_at?: string;
        };
        Update: {
          id?: number;
          resume_id?: number;
          event_type?: "view" | "export_pdf" | "export_docx" | "share";
          created_at?: string;
        };
      };
    };
    Views: {
      user_subscription_view: {
        Row: {
          user_id: string;
          subscription_id: number;
          subscription_status: string;
          purchased_at: string;
          expires_at: string | null;
          tier_key: string;
          tier_name_en: string;
          tier_name_ar: string;
          max_resumes: number;
          has_ai_writing: boolean;
          has_cover_letter: boolean;
          has_linkedin_optimization: boolean;
          has_cv_review: boolean;
          has_priority_support: boolean;
        };
      };
    };
    Functions: {
      get_user_limits: {
        Args: Record<string, never>;
        Returns: Json;
      };
      can_create_resume: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      duplicate_resume: {
        Args: { p_resume_id: number };
        Returns: number;
      };
      record_resume_event: {
        Args: { p_resume_id: number; p_event_type: string };
        Returns: void;
      };
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      get_admin_analytics: {
        Args: { p_start_date?: string; p_end_date?: string };
        Returns: Json;
      };
      update_pricing_tier: {
        Args: {
          p_tier_id: number;
          p_price_sar?: number;
          p_name_en?: string;
          p_name_ar?: string;
          p_description_en?: string;
          p_description_ar?: string;
          p_features_en?: string[];
          p_features_ar?: string[];
          p_is_popular?: boolean;
          p_max_resumes?: number;
          p_has_ai_writing?: boolean;
          p_has_cover_letter?: boolean;
          p_has_linkedin_optimization?: boolean;
          p_has_cv_review?: boolean;
          p_has_priority_support?: boolean;
          p_is_active?: boolean;
        };
        Returns: void;
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type PricingTier = Database["public"]["Tables"]["pricing_tiers"]["Row"];
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
export type ResumeRow = Database["public"]["Tables"]["resumes"]["Row"];
export type CoverLetter = Database["public"]["Tables"]["cover_letters"]["Row"];
export type ResumeAnalytics = Database["public"]["Tables"]["resume_analytics"]["Row"];
export type UserSubscriptionView = Database["public"]["Views"]["user_subscription_view"]["Row"];
