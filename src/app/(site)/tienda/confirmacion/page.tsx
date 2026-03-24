import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { stripe } from '@/lib/stripe/client';
import { formatPrice } from '@/lib/utils';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Compra confirmada',
};

interface Props {
  searchParams: { session_id?: string };
}

export default async function ConfirmacionPage({ searchParams }: Props) {
  const sessionId = searchParams.session_id;

  if (!sessionId) redirect('/tienda');

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });
  } catch {
    redirect('/tienda');
  }

  // Only show confirmation page for completed payments
  if (!session || session.payment_status !== 'paid') {
    redirect('/tienda');
  }

  const total = session.amount_total ? session.amount_total / 100 : 0;

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <CheckCircle className="text-accent mb-6" size={60} />
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">¡Gracias por tu compra!</h1>
        <p className="text-white/50 font-sans text-lg mb-2">
          Tu pago fue procesado correctamente.
        </p>
        <p className="text-accent font-serif text-2xl mb-8">{formatPrice(total)}</p>

        {session.customer_details?.email && (
          <p className="text-white/30 font-sans text-sm mb-8">
            Enviamos la confirmación a{' '}
            <span className="text-white/50">{session.customer_details.email}</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/tienda">
            <Button variant="secondary">Volver a la tienda</Button>
          </Link>
          <Link href="/portfolio">
            <Button variant="ghost">Ver portfolio</Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
