import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { getObraBySlug, getObrasSlugs } from '@/lib/supabase/queries';
import { Badge } from '@/components/ui/Badge';
import { PageTransition } from '@/components/layout/PageTransition';
import { ProductActions } from '@/components/tienda/ProductActions';
import { SITE_CONFIG } from '@/lib/constants';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getObrasSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const obra = await getObraBySlug(params.slug);
  if (!obra) return { title: 'Obra no encontrada' };
  return {
    title: obra.titulo,
    description: obra.descripcion || `${obra.titulo} disponible en la tienda de ${SITE_CONFIG.name}`,
    openGraph: {
      images: obra.imagen_url
        ? [{ url: obra.imagen_url, width: 1200, height: 630, alt: obra.titulo }]
        : [],
    },
  };
}

export const revalidate = 60;

export default async function TiendaDetailPage({ params }: Props) {
  const obra = await getObraBySlug(params.slug);
  if (!obra || !obra.disponible_en_tienda) notFound();

  const imageUrl = obra.imagen_url || '';

  return (
    <PageTransition>
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-sans mb-10"
          data-cursor="grow"
        >
          <ArrowLeft size={16} />
          Volver a la tienda
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Main image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
            <Image
              src={imageUrl}
              alt={obra.titulo}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Artwork info + purchase actions */}
          <div className="lg:pt-4">
            {obra.categoria && (
              <Badge
                label={
                  obra.categoria === 'digital'
                    ? 'Digital'
                    : obra.categoria === 'mixto'
                    ? 'Arte mixto'
                    : 'Otro'
                }
                variant="default"
                className="mb-4"
              />
            )}
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-2 leading-tight">
              {obra.titulo}
            </h1>
            {obra.año && <p className="text-white/40 text-sm font-sans mb-6">{obra.año}</p>}

            <dl className="space-y-2 mb-8">
              {obra.tecnica && (
                <div className="flex gap-4">
                  <dt className="text-xs uppercase tracking-wider text-white/30 font-sans w-24 pt-0.5">Técnica</dt>
                  <dd className="text-white/60 font-sans text-sm">{obra.tecnica}</dd>
                </div>
              )}
              {obra.dimensiones && (
                <div className="flex gap-4">
                  <dt className="text-xs uppercase tracking-wider text-white/30 font-sans w-24 pt-0.5">Dimensiones</dt>
                  <dd className="text-white/60 font-sans text-sm">{obra.dimensiones}</dd>
                </div>
              )}
            </dl>

            {obra.descripcion && (
              <p className="text-white/50 font-sans text-sm leading-relaxed mb-8 border-t border-white/5 pt-6">
                {obra.descripcion}
              </p>
            )}

            {/* Client component — handles state for print size selection and cart */}
            <ProductActions obra={obra} imageUrl={imageUrl} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
