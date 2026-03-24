'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu } from 'lucide-react';
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants';
import { useCartStore } from '@/store/cart';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { getItemCount, openCart } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
          scrolled ? 'bg-background/90 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-serif text-xl lg:text-2xl text-white tracking-wide"
              data-cursor="grow"
            >
              {SITE_CONFIG.name}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'font-sans text-sm tracking-wide transition-colors duration-200',
                    pathname === item.href
                      ? 'text-accent'
                      : 'text-white/70 hover:text-white'
                  )}
                  data-cursor="grow"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={openCart}
                className="relative p-2 text-white/70 hover:text-white transition-colors"
                data-cursor="grow"
                aria-label="Abrir carrito"
              >
                <ShoppingBag size={20} />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-background text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                data-cursor="grow"
                aria-label="Abrir menú"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
