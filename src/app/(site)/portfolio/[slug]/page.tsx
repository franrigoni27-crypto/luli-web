import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getObraBySlug, getObrasSlugs } from '@/lib/supabase/queries';
import { ImageZoom } from '@/components/ui/ImageZoom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/layout/PageTransition';
import { SITE_CONFIG } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

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
    description: obra.descripcion || `${obra.titulo} — ${obra.tecnica || ''} ${obra.año || ''}`.trim(),
    openGraph: {
      title: `${obra.titulo} | ${SITE_CONFIG.name}`,
      description: obra.descripcion ?? undefined,
      images: obra.imagen_url
        ? [{ url: obra.imagen_url, width: 1200, height: 630, alt: obra.titulo }]
        : [],
    },
  };
}

export const revalidate = 3600;

export default async function ObraDetailPage({ params }: Props) {
  const obra = await getObraBySlug(params.slug);
  if (!obra) notFound();

  const imageUrl = obra.imagen_url || '';

  return (
    <PageTransition>
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-sans mb-10"
          data-cursor="grow"
        >
          <ArrowLeft size={16} />
          Volver al portfolio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image section */}
          <div className="space-y-4">
            <ImageZoom
              src={imageUrl}
              alt={obra.titulo}
            />
            {/* Additional images thumbnails */}
            {obra.imagenes_adicionales && obra.imagenes_adicionales.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {obra.imagenes_adicionales.map((url, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden bg-white/5">
                    <Image
                      src={url}
                      alt={`${obra.titulo} — detalle ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info section */}
          <div className="lg:pt-4">
            <div className="mb-6">
              {obra.categoria && (
                <Badge
                  label={obra.categoria === 'digital' ? 'Digital' : obra.categoria === 'mixto' ? 'Arte mixto' : 'Otro'}
                  variant="accent"
                  className="mb-4"
                />
              )}
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-3 leading-tight">
                {obra.titulo}
              </h1>
              {obra.año && (
                <p className="text-white/40 font-sans text-sm tracking-wide">{obra.año}</p>
              )}
            </div>

            <dl className="space-y-3 mb-8">
              {obra.tecnica && (
                <div>
                  <dt className="text-xs uppercase tracking-widest text-white/30 font-sans mb-0.5">Técnica</dt>
                  <dd className="text-white/70 font-sans text-sm">{obra.tecnica}</dd>
                </div>
              )}
              {obra.dimensiones && (
                <div>
                  <dt className="text-xs uppercase tracking-widest text-white/30 font-sans mb-0.5">Dimensiones</dt>
                  <dd className="text-white/70 font-sans text-sm">{obra.dimensiones}</dd>
                </div>
              )}
            </dl>

            {obra.descripcion && (
              <div className="mb-10 border-t border-white/5 pt-8">
                <p className="text-white/60 font-sans text-base leading-relaxed">{obra.descripcion}</p>
              </div>
            )}

            {/* Store CTA — only when available and not sold */}
            {obra.disponible_en_tienda && !obra.vendida && (
              <div className="border border-white/10 p-6 space-y-3">
                {obra.precio_original && (
                  <p className="font-serif text-2xl text-white">{formatPrice(obra.precio_original)}</p>
                )}
                <Link href={`/tienda/${obra.slug}`}>
                  <Button className="w-full" size="lg">
                    <ShoppingBag size={18} className="mr-2" />
                    Ver en tienda
                  </Button>
                </Link>
              </div>
            )}

            {obra.vendida && (
              <div className="border border-white/10 p-6 text-center">
                <Badge label="Obra vendida" variant="sold" className="text-sm px-4 py-2" />
                <p className="text-white/30 text-sm mt-3 font-sans">
                  Esta obra ya encontró su hogar.{' '}
                  <Link href="/encargos" className="text-accent hover:underline">
                    ¿Querés algo similar?
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
