'use client';

import { useState } from 'react';
import { PRINT_SIZES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PrintSelectorProps {
  basePrice: number;
  onSelect: (size: string, price: number) => void;
}

export function PrintSelector({ basePrice, onSelect }: PrintSelectorProps) {
  const [selected, setSelected] = useState(PRINT_SIZES[0].value);

  const handleSelect = (size: (typeof PRINT_SIZES)[0]) => {
    setSelected(size.value);
    const price = Math.round(basePrice * size.multiplier);
    onSelect(size.value, price);
  };

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-white/30 mb-3 font-sans">Tamaño</p>
      <div className="space-y-2">
        {PRINT_SIZES.map((size) => {
          const price = Math.round(basePrice * size.multiplier);
          return (
            <button
              key={size.value}
              onClick={() => handleSelect(size)}
              data-cursor="grow"
              className={cn(
                'w-full flex items-center justify-between px-4 py-3 border text-sm font-sans transition-colors duration-200 text-left',
                selected === size.value
                  ? 'border-accent bg-accent/5 text-white'
                  : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
              )}
            >
              <span>{size.label}</span>
              <span className={selected === size.value ? 'text-accent' : ''}>{formatPrice(price)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
