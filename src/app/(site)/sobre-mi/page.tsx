import { Metadata } from 'next';
import Image from 'next/image';
import { getArtista } from '@/lib/supabase/queries';
import { PageTransition } from '@/components/layout/PageTransition';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sobre mí',
  description: `Conocé la historia y el proceso creativo de ${SITE_CONFIG.name}.`,
};

export const revalidate = 3600;

export default async function SobreMiPage() {
  const artista = await getArtista();

  return (
    <PageTransition>
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Artist photo */}
          {artista?.foto_url && (
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={artista.foto_url}
                alt={artista.nombre || SITE_CONFIG.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}

          {/* Bio */}
          <div>
            <p className="text-accent font-sans text-xs uppercase tracking-widest mb-4">Sobre mí</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-8 leading-tight">
              {artista?.nombre || SITE_CONFIG.name}
            </h1>
            {artista?.bio ? (
              <div className="text-white/60 font-sans text-lg leading-relaxed space-y-4">
                {/* Bio is stored as plain text in Supabase */}
                {artista.bio.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="text-white/30 font-sans">Información del artista próximamente.</p>
            )}
          </div>
        </div>

        {/* Exhibitions list sorted by year descending */}
        {artista?.exposiciones && artista.exposiciones.length > 0 && (
          <section className="border-t border-white/5 pt-16">
            <h2 className="font-serif text-3xl text-white mb-10">Exposiciones</h2>
            <div className="space-y-6">
              {artista.exposiciones
                .sort((a, b) => b.año - a.año)
                .map((expo, i) => (
                  <div key={i} className="flex gap-8 items-baseline">
                    <span className="text-accent font-sans text-sm w-12 flex-shrink-0">{expo.año}</span>
                    <div>
                      <p className="font-serif text-xl text-white">{expo.titulo}</p>
                      {expo.lugar && <p className="text-white/40 font-sans text-sm mt-0.5">{expo.lugar}</p>}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}
