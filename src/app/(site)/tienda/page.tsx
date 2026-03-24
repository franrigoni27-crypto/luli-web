import { Metadata } from 'next';
import { getObrasTienda } from '@/lib/supabase/queries';
import { ProductCard } from '@/components/tienda/ProductCard';
import { PageTransition } from '@/components/layout/PageTransition';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Tienda',
  description: `Obras originales y prints de ${SITE_CONFIG.name}. Arte para llevar a tu casa.`,
};

export const revalidate = 60;

export default async function TiendaPage() {
  const obras = await getObrasTienda();

  const originales = obras.filter(
    (o) => o.tipo_venta === 'original' || o.tipo_venta === 'ambos'
  );
  const prints = obras.filter(
    (o) => o.tipo_venta === 'print' || o.tipo_venta === 'ambos'
  );

  return (
    <PageTransition>
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <p className="text-accent font-sans text-xs uppercase tracking-widest mb-4">Arte para tu espacio</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Tienda</h1>
          <p className="text-white/40 font-sans text-lg max-w-md mx-auto">
            Obras originales y prints de alta calidad
          </p>
        </header>

        {/* Originales */}
        {originales.length > 0 && (
          <section className="mb-20">
            <div className="flex items-baseline gap-4 mb-8 border-b border-white/5 pb-4">
              <h2 className="font-serif text-2xl text-white">Obras originales</h2>
              <span className="text-white/30 text-sm font-sans">{originales.length} disponibles</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {originales.map((obra) => (
                <ProductCard key={obra.id} obra={obra} />
              ))}
            </div>
          </section>
        )}

        {/* Prints */}
        {prints.length > 0 && (
          <section>
            <div className="flex items-baseline gap-4 mb-8 border-b border-white/5 pb-4">
              <h2 className="font-serif text-2xl text-white">Prints</h2>
              <span className="text-white/30 text-sm font-sans">Reproducción de alta calidad</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {prints.map((obra) => (
                <ProductCard key={obra.id} obra={obra} />
              ))}
            </div>
          </section>
        )}

        {obras.length === 0 && (
          <div className="text-center py-24">
            <p className="text-white/20 font-serif text-2xl mb-4">La tienda abre pronto</p>
            <p className="text-white/30 font-sans text-sm">Las obras estarán disponibles muy pronto.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
