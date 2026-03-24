'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import type { Obra } from '@/lib/supabase/types';

interface Props {
  obra?: Obra | null;
  onSaved: (obra: Obra) => void;
  onCancel: () => void;
}

const EMPTY: Partial<Obra> = {
  titulo: '',
  slug: '',
  categoria: 'digital',
  imagen_url: null,
  año: null,
  tecnica: null,
  dimensiones: null,
  descripcion: null,
  disponible_en_tienda: false,
  tipo_venta: 'original',
  precio_original: null,
  precio_print_base: null,
  vendida: false,
  destacada: false,
};

/** Converts a title string to a URL-safe slug */
function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function ObraForm({ obra, onSaved, onCancel }: Props) {
  const [form, setForm] = useState<Partial<Obra>>(obra || EMPTY);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (field: keyof Obra, value: unknown) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleTituloChange = (titulo: string) => {
    setForm((f) => ({ ...f, titulo, slug: obra ? f.slug : toSlug(titulo) }));
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) {
      set('imagen_url', data.url);
    } else {
      setError(data.error || 'Error al subir la imagen');
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const res = await fetch(obra ? `/api/admin/obras/${obra.id}` : '/api/admin/obras', {
      method: obra ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Error al guardar');
      setSaving(false);
      return;
    }
    onSaved(data);
  };

  const inputClass =
    'w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-[#8B1A3C] transition-colors placeholder:text-white/20';
  const labelClass = 'block text-xs text-white/40 uppercase tracking-wider mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-white font-serif text-xl">{obra ? 'Editar obra' : 'Nueva obra'}</h3>

      {/* Image upload */}
      <div>
        <label className={labelClass}>Imagen</label>
        <div
          role="button"
          tabIndex={0}
          aria-label="Subir imagen"
          className="border-2 border-dashed border-white/10 hover:border-[#8B1A3C]/50 transition-colors cursor-pointer p-6 text-center"
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
        >
          {form.imagen_url ? (
            <div className="relative aspect-video max-w-xs mx-auto">
              <Image
                src={form.imagen_url}
                alt="Vista previa"
                fill
                className="object-contain"
                sizes="400px"
              />
            </div>
          ) : (
            <p className="text-white/30 text-sm">
              {uploading ? 'Subiendo...' : 'Clic para subir imagen'}
            </p>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
          />
        </div>
        <input
          value={form.imagen_url || ''}
          onChange={(e) => set('imagen_url', e.target.value || null)}
          className={inputClass + ' mt-2'}
          placeholder="O pegá una URL directamente"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Titulo *</label>
          <input
            required
            value={form.titulo || ''}
            onChange={(e) => handleTituloChange(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Slug *</label>
          <input
            required
            value={form.slug || ''}
            onChange={(e) => set('slug', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Categoria</label>
          <select
            value={form.categoria || 'digital'}
            onChange={(e) => set('categoria', e.target.value)}
            className={inputClass + ' cursor-pointer'}
          >
            <option value="digital">Digital</option>
            <option value="mixto">Mixto</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Año</label>
          <input
            type="number"
            value={form.año || ''}
            onChange={(e) => set('año', e.target.value ? Number(e.target.value) : null)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Tecnica</label>
          <input
            value={form.tecnica || ''}
            onChange={(e) => set('tecnica', e.target.value || null)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Dimensiones</label>
          <input
            value={form.dimensiones || ''}
            onChange={(e) => set('dimensiones', e.target.value || null)}
            className={inputClass}
            placeholder="ej: 30x40 cm"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Descripcion</label>
        <textarea
          rows={3}
          value={form.descripcion || ''}
          onChange={(e) => set('descripcion', e.target.value || null)}
          className={inputClass + ' resize-none'}
        />
      </div>

      {/* Store settings */}
      <div className="border border-white/10 p-4 space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.disponible_en_tienda || false}
            onChange={(e) => set('disponible_en_tienda', e.target.checked)}
            className="accent-[#8B1A3C] w-4 h-4"
          />
          <span className="text-white/70 text-sm">Disponible en tienda</span>
        </label>

        {form.disponible_en_tienda && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Tipo de venta</label>
              <select
                value={form.tipo_venta || 'original'}
                onChange={(e) => set('tipo_venta', e.target.value)}
                className={inputClass + ' cursor-pointer'}
              >
                <option value="original">Original</option>
                <option value="print">Print</option>
                <option value="ambos">Ambos</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Precio original (ARS)</label>
              <input
                type="number"
                value={form.precio_original || ''}
                onChange={(e) => set('precio_original', e.target.value ? Number(e.target.value) : null)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Precio print base (ARS)</label>
              <input
                type="number"
                value={form.precio_print_base || ''}
                onChange={(e) => set('precio_print_base', e.target.value ? Number(e.target.value) : null)}
                className={inputClass}
              />
            </div>
          </div>
        )}

        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.destacada || false}
              onChange={(e) => set('destacada', e.target.checked)}
              className="accent-[#8B1A3C] w-4 h-4"
            />
            <span className="text-white/70 text-sm">Destacada en home</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.vendida || false}
              onChange={(e) => set('vendida', e.target.checked)}
              className="accent-[#8B1A3C] w-4 h-4"
            />
            <span className="text-white/70 text-sm">Vendida</span>
          </label>
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-[#8B1A3C] text-[#0A0A0A] px-6 py-2.5 text-sm hover:bg-[#A82248] transition-colors disabled:opacity-50"
        >
          {saving ? 'Guardando...' : obra ? 'Guardar cambios' : 'Crear obra'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-white/10 text-white/50 hover:text-white px-6 py-2.5 text-sm transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
