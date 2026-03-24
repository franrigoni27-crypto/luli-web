import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe/client';
import { supabase } from '@/lib/supabase/client';
import { PRINT_SIZES } from '@/lib/constants';
import type { Obra } from '@/lib/supabase/types';

const cartItemSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  slug: z.string(),
  imagen: z.string(),
  precio: z.number(),
  cantidad: z.number().int().positive(),
  tipo: z.enum(['original', 'print']),
  printSize: z.string().optional(),
});

const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1, 'El carrito está vacío'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items } = checkoutSchema.parse(body);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    // Track original obra IDs to mark them as sold after payment
    const obraIds: string[] = [];

    for (const item of items) {
      // Fetch obra from Supabase to verify price and availability server-side
      const { data: obra } = await supabase
        .from('obras')
        .select('*')
        .eq('slug', item.slug)
        .single() as { data: Obra | null; error: unknown };

      if (!obra) {
        return NextResponse.json(
          { error: `Obra "${item.titulo}" no encontrada` },
          { status: 400 }
        );
      }

      if (item.tipo === 'original') {
        if (obra.vendida) {
          return NextResponse.json(
            { error: `"${obra.titulo}" ya fue vendida` },
            { status: 400 }
          );
        }
        if (!obra.precio_original) {
          return NextResponse.json(
            { error: `"${obra.titulo}" no tiene precio definido` },
            { status: 400 }
          );
        }
        // Verify price hasn't been tampered on the client side (allow ±1 for rounding)
        if (Math.abs(obra.precio_original - item.precio) > 1) {
          return NextResponse.json(
            { error: `Precio incorrecto para "${obra.titulo}"` },
            { status: 400 }
          );
        }
        obraIds.push(obra.id);
        lineItems.push({
          price_data: {
            currency: 'ars',
            product_data: {
              name: obra.titulo,
              images: item.imagen ? [item.imagen] : [],
              metadata: { tipo: 'original', obraId: obra.id },
            },
            unit_amount: Math.round(obra.precio_original * 100),
          },
          quantity: 1,
        });
      } else if (item.tipo === 'print' && item.printSize) {
        if (!obra.precio_print_base) {
          return NextResponse.json(
            { error: `"${obra.titulo}" no tiene precio de print definido` },
            { status: 400 }
          );
        }
        const sizeConfig = PRINT_SIZES.find((s) => s.value === item.printSize);
        const expectedPrice = Math.round(obra.precio_print_base * (sizeConfig?.multiplier || 1));
        // Verify print price hasn't been tampered (allow ±1 for rounding)
        if (Math.abs(expectedPrice - item.precio) > 1) {
          return NextResponse.json(
            { error: `Precio incorrecto para print de "${obra.titulo}"` },
            { status: 400 }
          );
        }
        lineItems.push({
          price_data: {
            currency: 'ars',
            product_data: {
              name: `${obra.titulo} — Print ${item.printSize.toUpperCase()}`,
              images: item.imagen ? [item.imagen] : [],
              metadata: { tipo: 'print', obraId: obra.id, size: item.printSize },
            },
            unit_amount: Math.round(expectedPrice * 100),
          },
          quantity: item.cantidad,
        });
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${siteUrl}/tienda/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/tienda`,
      metadata: {
        obraIds: JSON.stringify(obraIds),
      },
      payment_method_types: ['card'],
      locale: 'es-419',
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['AR', 'CL', 'UY', 'BR', 'MX', 'ES'],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('[Checkout] Error creating session:', error);
    return NextResponse.json({ error: 'Error al crear la sesión de pago' }, { status: 500 });
  }
}
