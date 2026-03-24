'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AddToCartButton } from './AddToCartButton';
import { PrintSelector } from './PrintSelector';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { PRINT_SIZES } from '@/lib/constants';
import type { Obra } from '@/types';

interface ProductActionsProps {
  obra: Obra;
  imageUrl: string;
}

export function ProductActions({ obra, imageUrl }: ProductActionsProps) {
  const initialSize = PRINT_SIZES[0];
  const [printPrice, setPrintPrice] = useState(
    obra.precio_print_base ? Math.round(obra.precio_print_base * initialSize.multiplier) : 0
  );
  const [printSize, setPrintSize] = useState(initialSize.value);

  const handlePrintSelect = (size: string, price: number) => {
    setPrintSize(size);
    setPrintPrice(price);
  };

  if (obra.vendida) {
    return (
      <div className="border border-white/10 p-6 text-center space-y-3">
        <Badge label="Obra vendida" variant="sold" className="text-sm px-4 py-2" />
        <p className="text-white/30 text-sm font-sans">
          Esta pieza ya fue vendida.{' '}
          <Link href="/encargos" className="text-accent hover:underline">
            ¿Querés algo similar?
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Original artwork purchase section */}
      {(obra.tipo_venta === 'original' || obra.tipo_venta === 'ambos') && obra.precio_original && (
        <div className="border border-white/10 p-6 space-y-4">
          <div className="flex items-baseline justify-between">
            <p className="text-xs uppercase tracking-widest text-white/30 font-sans">Obra original</p>
            <p className="font-serif text-2xl text-white">{formatPrice(obra.precio_original)}</p>
          </div>
          <p className="text-white/30 text-xs font-sans">Pieza única. Incluye certificado de autenticidad.</p>
          <AddToCartButton
            item={{
              id: obra._id,
              titulo: obra.titulo,
              slug: obra.slug.current,
              imagen: imageUrl,
              precio: obra.precio_original,
              cantidad: 1,
              tipo: 'original',
            }}
            className="w-full"
          />
        </div>
      )}

      {/* Print purchase section with size selector */}
      {(obra.tipo_venta === 'print' || obra.tipo_venta === 'ambos') && obra.precio_print_base && (
        <div className="border border-white/10 p-6 space-y-4">
          <div className="flex items-baseline justify-between">
            <p className="text-xs uppercase tracking-widest text-white/30 font-sans">Print</p>
            <p className="font-serif text-2xl text-white">{formatPrice(printPrice)}</p>
          </div>
          <PrintSelector basePrice={obra.precio_print_base} onSelect={handlePrintSelect} />
          <AddToCartButton
            item={{
              id: `${obra._id}-print-${printSize}`,
              titulo: obra.titulo,
              slug: obra.slug.current,
              imagen: imageUrl,
              precio: printPrice,
              cantidad: 1,
              tipo: 'print',
              printSize,
            }}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
