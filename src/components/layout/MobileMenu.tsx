'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md"
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Cerrar menú"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col justify-center flex-1 gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block font-serif text-4xl text-white/80 hover:text-accent transition-colors py-2"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
