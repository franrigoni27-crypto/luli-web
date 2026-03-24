import { Metadata } from 'next';
import { getObras } from '@/lib/supabase/queries';
import { GalleryGrid } from '@/components/portfolio/GalleryGrid';
import { PageTransition } from '@/components/layout/PageTransition';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: `Galería completa de obras de ${SITE_CONFIG.name} — ilustración digital y arte mixto.`,
};

export const revalidate = 3600;

export default async function PortfolioPage() {
  const obras = await getObras();

  return (
    <PageTransition>
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Portfolio</h1>
          <p className="text-white/40 font-sans text-lg max-w-md mx-auto">
            Ilustración digital y arte mixto
          </p>
        </header>

        {obras.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/30 text-lg">Las obras se cargarán pronto.</p>
          </div>
        ) : (
          <GalleryGrid obras={obras} />
        )}
      </div>
    </PageTransition>
  );
}
