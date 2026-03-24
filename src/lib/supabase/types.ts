export interface Database {
  public: {
    Tables: {
      obras: {
        Row: Obra;
        Insert: Omit<Obra, 'id' | 'created_at'>;
        Update: Partial<Omit<Obra, 'id' | 'created_at'>>;
      };
      encargos: {
        Row: Encargo;
        Insert: Omit<Encargo, 'id' | 'created_at'>;
        Update: Partial<Omit<Encargo, 'id' | 'created_at'>>;
      };
      artista: {
        Row: Artista;
        Insert: Omit<Artista, 'id'>;
        Update: Partial<Omit<Artista, 'id'>>;
      };
    };
  };
}

export interface Obra {
  id: string;
  created_at: string;
  titulo: string;
  slug: string;
  categoria: 'digital' | 'mixto' | 'otro';
  imagen_url: string | null;
  imagenes_adicionales: string[] | null;
  año: number | null;
  tecnica: string | null;
  dimensiones: string | null;
  descripcion: string | null;
  disponible_en_tienda: boolean;
  tipo_venta: 'original' | 'print' | 'ambos' | null;
  precio_original: number | null;
  precio_print_base: number | null;
  vendida: boolean;
  destacada: boolean;
}

export interface Encargo {
  id: string;
  created_at: string;
  nombre: string;
  email: string;
  descripcion: string;
  estilo: string | null;
  tamaño: string | null;
  uso: 'personal' | 'regalo' | 'comercial' | null;
  presupuesto_min: number | null;
  presupuesto_max: number | null;
  plazo: string | null;
  referencias: string | null;
  estado: 'nuevo' | 'en_contacto' | 'aceptado' | 'rechazado';
}

export interface Artista {
  id: string;
  nombre: string | null;
  bio: string | null;
  foto_url: string | null;
  redes_sociales: {
    instagram?: string;
    behance?: string;
    twitter?: string;
    email?: string;
  } | null;
  exposiciones: Array<{
    año: number;
    titulo: string;
    lugar: string;
  }> | null;
}
