// Re-export Supabase types for use across the app
export type { Obra, Encargo, Artista } from '@/lib/supabase/types';

export interface CartItem {
  id: string;
  titulo: string;
  slug: string;
  imagen: string;
  precio: number;
  cantidad: number;
  tipo: 'original' | 'print';
  printSize?: string;
}

export interface PrintVariant {
  id: string;
  name: string;
  size: string;
  price: number;
}
