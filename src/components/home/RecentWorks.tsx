'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ObraCard } from '@/components/portfolio/ObraCard';
import { Button } from '@/components/ui/Button';
import type { Obra } from '@/types';
import { ArrowRight } from 'lucide-react';

interface RecentWorksProps {
  obras: Obra[];
}

export function RecentWorks({ obras }: RecentWorksProps) {
  if (obras.length === 0) return null;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-12"
      >
        <div>
          <p className="text-accent font-sans text-xs uppercase tracking-widest mb-2">Últimas obras</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white">Trabajo reciente</h2>
        </div>
        <Link
          href="/portfolio"
          className="hidden sm:flex items-center gap-2 text-white/40 hover:text-accent transition-colors text-sm font-sans"
          data-cursor="grow"
        >
          Ver todo <ArrowRight size={16} />
        </Link>
      </motion.div>

      {/* Grid limited to 6 most recent obras */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {obras.slice(0, 6).map((obra, i) => (
          <motion.div
            key={obra._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <ObraCard obra={obra} />
          </motion.div>
        ))}
      </div>

      {/* Mobile-only CTA — desktop uses the header link */}
      <div className="text-center mt-12 sm:hidden">
        <Link href="/portfolio">
          <Button variant="ghost">
            Ver todo el portfolio <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
