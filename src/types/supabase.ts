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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      artista: {
        Row: {
          bio: string | null
          exposiciones: Json | null
          foto_url: string | null
          id: string
          nombre: string | null
          redes_sociales: Json | null
        }
        Insert: {
          bio?: string | null
          exposiciones?: Json | null
          foto_url?: string | null
          id?: string
          nombre?: string | null
          redes_sociales?: Json | null
        }
        Update: {
          bio?: string | null
          exposiciones?: Json | null
          foto_url?: string | null
          id?: string
          nombre?: string | null
          redes_sociales?: Json | null
        }
        Relationships: []
      }
      encargos: {
        Row: {
          created_at: string | null
          descripcion: string
          email: string
          estado: string | null
          estilo: string | null
          id: string
          nombre: string
          plazo: string | null
          presupuesto_max: number | null
          presupuesto_min: number | null
          referencias: string | null
          tama├▒o: string | null
          uso: string | null
        }
        Insert: {
          created_at?: string | null
          descripcion: string
          email: string
          estado?: string | null
          estilo?: string | null
          id?: string
          nombre: string
          plazo?: string | null
          presupuesto_max?: number | null
          presupuesto_min?: number | null
          referencias?: string | null
          tama├▒o?: string | null
          uso?: string | null
        }
        Update: {
          created_at?: string | null
          descripcion?: string
          email?: string
          estado?: string | null
          estilo?: string | null
          id?: string
          nombre?: string
          plazo?: string | null
          presupuesto_max?: number | null
          presupuesto_min?: number | null
          referencias?: string | null
          tama├▒o?: string | null
          uso?: string | null
        }
        Relationships: []
      }
      obras: {
        Row: {
          a├▒o: number | null
          categoria: string
          created_at: string | null
          descripcion: string | null
          destacada: boolean | null
          dimensiones: string | null
          disponible_en_tienda: boolean | null
          id: string
          imagen_url: string | null
          imagenes_adicionales: string[] | null
          precio_original: number | null
          precio_print_base: number | null
          slug: string
          tecnica: string | null
          tipo_venta: string | null
          titulo: string
          vendida: boolean | null
        }
        Insert: {
          a├▒o?: number | null
          categoria?: string
          created_at?: string | null
          descripcion?: string | null
          destacada?: boolean | null
          dimensiones?: string | null
          disponible_en_tienda?: boolean | null
          id?: string
          imagen_url?: string | null
          imagenes_adicionales?: string[] | null
          precio_original?: number | null
          precio_print_base?: number | null
          slug: string
          tecnica?: string | null
          tipo_venta?: string | null
          titulo: string
          vendida?: boolean | null
        }
        Update: {
          a├▒o?: number | null
          categoria?: string
          created_at?: string | null
          descripcion?: string | null
          destacada?: boolean | null
          dimensiones?: string | null
          disponible_en_tienda?: boolean | null
          id?: string
          imagen_url?: string | null
          imagenes_adicionales?: string[] | null
          precio_original?: number | null
          precio_print_base?: number | null
          slug?: string
          tecnica?: string | null
          tipo_venta?: string | null
          titulo?: string
          vendida?: boolean | null
        }
        Relationships: []
      }
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
    Enums: {},
  },
} as const
