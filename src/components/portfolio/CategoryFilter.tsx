'use client';

import { motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selected: string;
  onSelect: (value: string) => void;
  counts?: Record<string, number>;
}

export function CategoryFilter({ selected, onSelect, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          data-cursor="grow"
          className={cn(
            'relative px-4 py-2 font-sans text-sm tracking-wide transition-colors duration-200',
            selected === cat.value
              ? 'text-accent'
              : 'text-white/50 hover:text-white'
          )}
        >
          {cat.label}
          {counts && counts[cat.value] !== undefined && (
            <span className="ml-1.5 text-xs opacity-50">({counts[cat.value]})</span>
          )}
          {/* Animated underline for active category */}
          {selected === cat.value && (
            <motion.div
              layoutId="filter-underline"
              className="absolute bottom-0 left-0 right-0 h-px bg-accent"
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
