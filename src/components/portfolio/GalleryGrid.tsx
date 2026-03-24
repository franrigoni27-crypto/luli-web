'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ObraCard } from './ObraCard';
import { CategoryFilter } from './CategoryFilter';
import type { Obra } from '@/types';

interface GalleryGridProps {
  obras: Obra[];
  showFilter?: boolean;
  basePath?: string;
}

export function GalleryGrid({ obras, showFilter = true, basePath = '/portfolio' }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const filtered = useMemo(() => {
    if (selectedCategory === 'todas') return obras;
    return obras.filter((o) => o.categoria === selectedCategory);
  }, [obras, selectedCategory]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { todas: obras.length };
    obras.forEach((o) => {
      c[o.categoria] = (c[o.categoria] || 0) + 1;
    });
    return c;
  }, [obras]);

  return (
    <div>
      {showFilter && (
        <div className="mb-10">
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            counts={counts}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="masonry-grid"
        >
          {filtered.length === 0 ? (
            <p className="text-white/30 text-center py-16 col-span-full">
              No hay obras en esta categoría.
            </p>
          ) : (
            filtered.map((obra) => (
              <ObraCard key={obra._id} obra={obra} basePath={basePath} />
            ))
          )}
        </motion.div>
      </AnimatePresence>

      {showFilter && filtered.length > 0 && (
        <p className="text-center text-white/30 text-sm mt-8 font-sans">
          {filtered.length} {filtered.length === 1 ? 'obra' : 'obras'}
        </p>
      )}
    </div>
  );
}
