'use client';

import { useState } from 'react';
import type { Encargo } from '@/lib/supabase/types';

const ESTADO_LABELS: Record<Encargo['estado'], string> = {
  nuevo: 'Nuevo',
  en_contacto: 'En contacto',
  aceptado: 'Aceptado',
  rechazado: 'Rechazado',
};

const ESTADO_COLORS: Record<Encargo['estado'], string> = {
  nuevo: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  en_contacto: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  aceptado: 'text-green-400 border-green-400/30 bg-green-400/5',
  rechazado: 'text-red-400 border-red-400/30 bg-red-400/5',
};

interface Props {
  initialEncargos: Encargo[];
}

export function EncargosPanel({ initialEncargos }: Props) {
  const [encargos, setEncargos] = useState<Encargo[]>(initialEncargos);
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleEstado = async (encargo: Encargo, estado: Encargo['estado']) => {
    const res = await fetch(`/api/admin/encargos/${encargo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado }),
    });
    if (res.ok) {
      const updated: Encargo = await res.json();
      setEncargos(encargos.map((e) => (e.id === encargo.id ? updated : e)));
    }
  };

  return (
    <div>
      <h2 className="text-white text-lg mb-6">Encargos ({encargos.length})</h2>

      {encargos.length === 0 && (
        <p className="text-white/30 text-sm text-center py-12">No hay encargos todavia.</p>
      )}

      <div className="space-y-3">
        {encargos.map((encargo) => (
          <div key={encargo.id} className="border border-white/10">
            {/* Header row — clickable to expand */}
            <button
              onClick={() => setExpanded(expanded === encargo.id ? null : encargo.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
              aria-expanded={expanded === encargo.id}
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-white text-sm font-medium">{encargo.nombre}</p>
                  <p className="text-white/40 text-xs mt-0.5">{encargo.email}</p>
                </div>
                <span className={`border px-2 py-0.5 text-xs ${ESTADO_COLORS[encargo.estado]}`}>
                  {ESTADO_LABELS[encargo.estado]}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white/20 text-xs">
                  {new Date(encargo.created_at).toLocaleDateString('es-AR')}
                </span>
                <span className="text-white/20 text-xs" aria-hidden>
                  {expanded === encargo.id ? '▲' : '▼'}
                </span>
              </div>
            </button>

            {/* Expanded detail */}
            {expanded === encargo.id && (
              <div className="border-t border-white/10 p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Descripcion</p>
                    <p className="text-white/70">{encargo.descripcion}</p>
                  </div>
                  {encargo.estilo && (
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Estilo</p>
                      <p className="text-white/70">{encargo.estilo}</p>
                    </div>
                  )}
                  {encargo.tamaño && (
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Tamaño</p>
                      <p className="text-white/70">{encargo.tamaño}</p>
                    </div>
                  )}
                  {encargo.uso && (
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Uso</p>
                      <p className="text-white/70 capitalize">{encargo.uso}</p>
                    </div>
                  )}
                  {(encargo.presupuesto_min || encargo.presupuesto_max) && (
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Presupuesto</p>
                      <p className="text-white/70">
                        {encargo.presupuesto_min &&
                          `$${encargo.presupuesto_min.toLocaleString('es-AR')}`}
                        {encargo.presupuesto_min && encargo.presupuesto_max && ' – '}
                        {encargo.presupuesto_max &&
                          `$${encargo.presupuesto_max.toLocaleString('es-AR')}`}{' '}
                        ARS
                      </p>
                    </div>
                  )}
                  {encargo.plazo && (
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Plazo</p>
                      <p className="text-white/70">{encargo.plazo}</p>
                    </div>
                  )}
                  {encargo.referencias && (
                    <div className="sm:col-span-2">
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Referencias</p>
                      <p className="text-white/70">{encargo.referencias}</p>
                    </div>
                  )}
                </div>

                {/* Estado controls */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  <span className="text-white/30 text-xs self-center mr-2">Estado:</span>
                  {(Object.entries(ESTADO_LABELS) as [Encargo['estado'], string][]).map(
                    ([value, label]) => (
                      <button
                        key={value}
                        onClick={() => handleEstado(encargo, value)}
                        className={`px-3 py-1 text-xs border transition-colors ${
                          encargo.estado === value
                            ? ESTADO_COLORS[value]
                            : 'border-white/10 text-white/30 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {label}
                      </button>
                    )
                  )}
                  <a
                    href={`mailto:${encargo.email}?subject=Re: tu encargo`}
                    className="ml-auto border border-[#8B1A3C]/50 text-[#8B1A3C] px-3 py-1 text-xs hover:bg-[#8B1A3C]/10 transition-colors"
                  >
                    Responder por email
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
