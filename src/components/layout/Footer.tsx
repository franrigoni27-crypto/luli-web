import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';
import { NAV_ITEMS, SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <h3 className="font-serif text-xl text-white mb-3">{SITE_CONFIG.name}</h3>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">Navegacion</h4>
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/60 hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">Redes</h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.instagram && (
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-accent transition-colors"
                  aria-label="Instagram"
                  data-cursor="grow"
                >
                  <Instagram size={20} />
                </a>
              )}
              {SOCIAL_LINKS.email && (
                <a
                  href={SOCIAL_LINKS.email}
                  className="text-white/60 hover:text-accent transition-colors"
                  aria-label="Email"
                  data-cursor="grow"
                >
                  <Mail size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-xs text-white/30">
          &copy; {year} {SITE_CONFIG.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
