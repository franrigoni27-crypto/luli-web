'use client';

import { useCustomCursor } from '@/hooks/useCustomCursor';

export function CustomCursor() {
  const cursorRef = useCustomCursor();

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] w-3 h-3 rounded-full bg-accent mix-blend-difference transition-[width,height,opacity] duration-200 ease-out"
      style={{ transform: 'translate(-100px, -100px)' }}
      aria-hidden
    />
  );
}
