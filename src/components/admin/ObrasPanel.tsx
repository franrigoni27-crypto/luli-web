'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Obra } from '@/lib/supabase/types';
import { ObraForm } from './ObraForm';

interface Props {
  initialObras: Obra[];
}

export function ObrasPanel({ initialObras }: Props) {
  const [obras, setObras] = useState<Obra[]>(initialObras);
  const [showForm, setShowForm] = useState(false);
  const [editingObra, setEditingObra] = useState<Obra | null>(null);

  const handleSaved = (obra: Obra) => {
    if (editingObra) {
      setObras(obras.map((o) => (o.id === obra.id ? obra : o)));
    } else {
      setObras([obra, ...obras]);
    }
    setShowForm(false);
    setEditingObra(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta obra?')) return;
    const res = await fetch(`/api/admin/obras/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setObras(obras.filter((o) => o.id !== id));
    }
  };

  const handleToggle = async (obra: Obra, field: 'vendida' | 'destacada' | 'disponible_en_tienda') => {
    const res = await fetch(`/api/admin/obras/${obra.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: !obra[field] }),
    });
    if (res.ok) {
      const updated: Obra = await res.json();
      setObras(obras.map((o) => (o.id === obra.id ? updated : o)));
    }
  };

  const handleEditClick = (obra: Obra) => {
    setEditingObra(obra);
    setShowForm(false);
  };

  const handleNewClick = () => {
    setEditingObra(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingObra(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-lg">Obras ({obras.length})</h2>
        <button
          onClick={handleNewClick}
          className="bg-[#8B1A3C] text-[#0A0A0A] px-4 py-2 text-sm hover:bg-[#A82248] transition-colors"
        >
          + Nueva obra
        </button>
      </div>

      {(showForm || editingObra) && (
        <div className="mb-8 border border-white/10 p-6">
          <ObraForm
            obra={editingObra}
            onSaved={handleSaved}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {obras.map((obra) => (
          <div key={obra.id} className="border border-white/10 overflow-hidden">
            {obra.imagen_url && (
              <div className="relative aspect-[4/3] bg-white/5">
                <Image
                  src={obra.imagen_url}
                  alt={obra.titulo}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-white font-sans text-sm font-medium">{obra.titulo}</h3>
                  <p className="text-white/40 text-xs mt-0.5">
                    {obra.categoria}
                    {obra.año ? ` · ${obra.año}` : ''}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(obra)}
                    className="text-white/30 hover:text-white text-xs transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(obra.id)}
                    className="text-red-400/50 hover:text-red-400 text-xs transition-colors"
                  >
                    Borrar
                  </button>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  { field: 'destacada' as const, label: 'Destacada', active: obra.destacada },
                  { field: 'disponible_en_tienda' as const, label: 'En tienda', active: obra.disponible_en_tienda },
                  { field: 'vendida' as const, label: 'Vendida', active: obra.vendida },
                ].map(({ field, label, active }) => (
                  <button
                    key={field}
                    onClick={() => handleToggle(obra, field)}
                    className={`px-2 py-1 text-xs border transition-colors ${
                      active
                        ? 'border-[#8B1A3C] text-[#8B1A3C] bg-[#8B1A3C]/10'
                        : 'border-white/10 text-white/30 hover:border-white/30'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {obra.precio_original && (
                <p className="text-[#8B1A3C] text-sm mt-2">
                  ${obra.precio_original.toLocaleString('es-AR')}
                  {obra.precio_print_base &&
                    ` · print desde $${obra.precio_print_base.toLocaleString('es-AR')}`}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
