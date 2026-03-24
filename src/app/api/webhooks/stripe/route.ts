import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { supabaseAdmin } from '@/lib/supabase/client';
import { resend } from '@/lib/resend/client';
import Stripe from 'stripe';

// Disable body parsing — Stripe needs the raw body to verify webhook signature
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Signature verification prevents forged webhook calls
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('[Webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Mark original obras as sold in Supabase
    const obraIds = JSON.parse(session.metadata?.obraIds || '[]') as string[];
    for (const obraId of obraIds) {
      try {
        await supabaseAdmin
          .from('obras')
          .update({ vendida: true })
          .eq('id', obraId);
        console.log(`[Webhook] Obra ${obraId} marked as sold`);
      } catch (err) {
        // Log but don't fail the webhook — payment already processed
        // This can be corrected manually in Supabase
        console.error(`[Webhook] Failed to update obra ${obraId}:`, err);
      }
    }

    // Send order confirmation email to the customer
    if (session.customer_details?.email) {
      try {
        const amountTotal = session.amount_total
          ? (session.amount_total / 100).toLocaleString('es-AR')
          : 'N/A';

        await resend.emails.send({
          from: 'Luli Arte <noreply@yourdomain.com>',
          to: session.customer_details.email,
          subject: 'Confirmación de compra — Luli Arte',
          html: `
            <div style="background:#0A0A0A;color:#fff;font-family:Georgia,serif;padding:40px 20px;max-width:600px;margin:0 auto">
              <h1 style="color:#8B1A3C;font-weight:normal;font-size:28px">¡Gracias por tu compra!</h1>
              <p style="color:#ccc;font-size:16px;line-height:1.7">
                Recibimos tu pago de <strong style="color:#fff">$${amountTotal} ARS</strong>.
              </p>
              <p style="color:#999;font-size:14px">
                Número de pedido: ${session.id}
              </p>
              <hr style="border-color:#222;margin:24px 0" />
              <p style="color:#555;font-size:12px;text-align:center">Luli Arte</p>
            </div>
          `,
        });
      } catch (err) {
        // Email failure doesn't affect order — log for review
        console.error('[Webhook] Failed to send confirmation email:', err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
