'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import type { Obra } from '@/types';

interface ProductCardProps {
  obra: Obra;
}

export function ProductCard({ obra }: ProductCardProps) {
  const imageUrl = obra.imagen_url || '';
  const isSold = obra.vendida;
  const isPrint = obra.tipo_venta === 'print';
  const basePrice = isPrint ? obra.precio_print_base : obra.precio_original;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={isSold ? 'opacity-60' : ''}
    >
      <Link
        href={`/tienda/${obra.slug}`}
        className="group block"
        data-cursor="grow"
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-white/5 aspect-[4/5] mb-4">
          <Image
            src={imageUrl}
            alt={obra.titulo}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {isSold && <Badge label="Vendida" variant="sold" />}
            {!isSold && obra.tipo_venta === 'ambos' && (
              <Badge label="Original + Print" variant="accent" />
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h3 className="font-serif text-lg text-white group-hover:text-accent transition-colors leading-tight">
            {obra.titulo}
          </h3>
          {obra.tecnica && (
            <p className="text-white/40 font-sans text-xs">{obra.tecnica}</p>
          )}
          {basePrice && (
            <p className="text-accent font-sans text-sm mt-1">
              {isPrint ? 'Desde ' : ''}{formatPrice(basePrice)}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
