export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      about: {
        Row: {
          content: string | null
          id: string
          mission: string | null
          photo_url: string | null
          title: string | null
          updated_at: string | null
          vision: string | null
        }
        Insert: {
          content?: string | null
          id?: string
          mission?: string | null
          photo_url?: string | null
          title?: string | null
          updated_at?: string | null
          vision?: string | null
        }
        Update: {
          content?: string | null
          id?: string
          mission?: string | null
          photo_url?: string | null
          title?: string | null
          updated_at?: string | null
          vision?: string | null
        }
      }
      // Add other tables based on ARCHITECTURE.md as needed
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
