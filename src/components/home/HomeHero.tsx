'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';
import type { Obra } from '@/types';
import { ArrowDown } from 'lucide-react';

interface HomeHeroProps {
  obra: Obra | null;
}

export function HomeHero({ obra }: HomeHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax: image moves down at 30% of scroll speed
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  // Fade out text before hero leaves viewport
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const imageUrl = obra?.imagen_url || null;

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* Background image with parallax effect */}
      {imageUrl ? (
        <motion.div className="absolute inset-0" style={{ y }}>
          <Image
            src={imageUrl}
            alt={obra?.titulo || 'Obra destacada'}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/90" />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-accent/5" />
      )}

      {/* Hero content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        style={{ opacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-accent font-sans text-sm uppercase tracking-[0.3em] mb-6"
        >
          Portfolio & Tienda
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-none mb-8"
        >
          {SITE_CONFIG.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-white/60 font-sans text-lg md:text-xl mb-10 leading-relaxed"
        >
          Ilustración digital · Arte mixto
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/portfolio">
            <Button size="lg">Ver Portfolio</Button>
          </Link>
          <Link href="/tienda">
            <Button variant="secondary" size="lg">Visitar Tienda</Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — bounces to hint user to scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
