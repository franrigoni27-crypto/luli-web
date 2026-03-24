'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Obra, Encargo } from '@/lib/supabase/types';
import { ObrasPanel } from './ObrasPanel';
import { EncargosPanel } from './EncargosPanel';

interface Props {
  initialObras: Obra[];
  initialEncargos: Encargo[];
}

export function AdminDashboard({ initialObras, initialEncargos }: Props) {
  const [tab, setTab] = useState<'obras' | 'encargos'>('obras');
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const newEncargosCount = initialEncargos.filter((e) => e.estado === 'nuevo').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl text-white font-serif">Panel de administración</h1>
          <p className="text-white/30 text-sm mt-1">
            {initialObras.length} obras · {newEncargosCount} encargos nuevos
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white text-sm transition-colors"
          >
            Ver sitio ↗
          </a>
          <button
            onClick={handleLogout}
            className="border border-white/10 text-white/40 hover:text-white px-4 py-2 text-sm transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-white/10 mb-8">
        {(['obras', 'encargos'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-3 text-sm capitalize transition-colors border-b-2 -mb-px ${
              tab === t
                ? 'border-[#8B1A3C] text-[#8B1A3C]'
                : 'border-transparent text-white/40 hover:text-white'
            }`}
          >
            {t === 'obras' ? 'Obras' : 'Encargos'}
            {t === 'encargos' && newEncargosCount > 0 && (
              <span className="ml-2 bg-[#8B1A3C] text-[#0A0A0A] text-xs px-1.5 py-0.5 rounded-full">
                {newEncargosCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 'obras' && <ObrasPanel initialObras={initialObras} />}
      {tab === 'encargos' && <EncargosPanel initialEncargos={initialEncargos} />}
    </div>
  );
}
