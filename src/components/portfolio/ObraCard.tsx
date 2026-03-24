'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import type { Obra } from '@/types';

interface ObraCardProps {
  obra: Obra;
  basePath?: string;
}

export function ObraCard({ obra, basePath = '/portfolio' }: ObraCardProps) {
  const imageUrl = obra.imagen_url || '';

  return (
    <motion.div
      className="masonry-item group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`${basePath}/${obra.slug}`} data-cursor="grow">
        <div className="relative overflow-hidden bg-white/5">
          <Image
            src={imageUrl}
            alt={obra.titulo}
            width={800}
            height={600}
            className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Hover overlay with obra info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="font-serif text-lg text-white leading-tight">{obra.titulo}</h3>
            {obra.año && <p className="text-white/60 text-sm font-sans mt-1">{obra.año}</p>}
            {obra.tecnica && <p className="text-white/50 text-xs font-sans">{obra.tecnica}</p>}
          </div>
          {/* Sold badge */}
          {obra.vendida && (
            <div className="absolute top-2 right-2">
              <Badge label="Vendida" variant="sold" />
            </div>
          )}
          {obra.destacada && !obra.vendida && (
            <div className="absolute top-2 left-2">
              <Badge label="Destacada" variant="accent" />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
