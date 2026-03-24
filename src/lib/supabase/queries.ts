import { supabase } from './client';
import type { Obra, Artista } from './types';

export async function getObras(): Promise<Obra[]> {
  const { data, error } = await supabase
    .from('obras')
    .select('*')
    .order('año', { ascending: false });
  if (error) { console.error('getObras error:', error); return []; }
  return data || [];
}

export async function getObrasRecientes(limit = 6): Promise<Obra[]> {
  const { data, error } = await supabase
    .from('obras')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) { console.error('getObrasRecientes error:', error); return []; }
  return data || [];
}

export async function getObraDestacada(): Promise<Obra | null> {
  const { data, error } = await supabase
    .from('obras')
    .select('*')
    .eq('destacada', true)
    .limit(1)
    .single();
  if (error) return null;
  return data;
}

export async function getObraBySlug(slug: string): Promise<Obra | null> {
  const { data, error } = await supabase
    .from('obras')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data;
}

export async function getObrasTienda(): Promise<Obra[]> {
  const { data, error } = await supabase
    .from('obras')
    .select('*')
    .eq('disponible_en_tienda', true)
    .order('created_at', { ascending: false });
  if (error) { console.error('getObrasTienda error:', error); return []; }
  return data || [];
}

export async function getObrasSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('obras')
    .select('slug');
  if (error) return [];
  return (data || []).map((o) => o.slug);
}

export async function getArtista(): Promise<Artista | null> {
  const { data, error } = await supabase
    .from('artista')
    .select('*')
    .limit(1)
    .single();
  if (error) return null;
  return data;
}
