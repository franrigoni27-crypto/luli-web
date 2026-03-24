'use client';

import { useEffect, useRef } from 'react';

export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isGrowing = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="grow"]')) {
        isGrowing.current = true;
        cursor.style.width = '48px';
        cursor.style.height = '48px';
        cursor.style.opacity = '0.6';
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="grow"]')) {
        isGrowing.current = false;
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursor.style.opacity = '1';
      }
    };

    // Smooth cursor follow animation using requestAnimationFrame
    const animate = () => {
      const speed = 0.15;
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;
      cursor.style.transform = `translate(${currentX - 6}px, ${currentY - 6}px)`;
      animFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return cursorRef;
}
