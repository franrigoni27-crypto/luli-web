import { Metadata } from 'next';
import Link from 'next/link';
import { getObraDestacada, getObrasRecientes } from '@/lib/supabase/queries';
import { HomeHero } from '@/components/home/HomeHero';
import { RecentWorks } from '@/components/home/RecentWorks';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
};

export const revalidate = 3600;

export default async function HomePage() {
  const [obraDestacada, obrasRecientes] = await Promise.all([
    getObraDestacada(),
    getObrasRecientes(),
  ]);

  return (
    <>
      <HomeHero obra={obraDestacada} />
      <RecentWorks obras={obrasRecientes} />

      {/* Encargos CTA section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <p className="text-accent font-sans text-sm uppercase tracking-widest mb-4">¿Tenés algo en mente?</p>
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Arte personalizado</h2>
        <p className="text-white/50 font-sans text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Cada encargo es una colaboración única. Contame tu idea y la hacemos realidad.
        </p>
        <Link href="/encargos">
          <Button variant="secondary" size="lg">Solicitar un encargo</Button>
        </Link>
      </section>
    </>
  );
}
