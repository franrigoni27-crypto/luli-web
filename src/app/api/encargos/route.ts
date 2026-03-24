import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { resend } from '@/lib/resend/client';
import { CommissionArtistEmail } from '@/lib/resend/templates/commission-artist';
import { CommissionClientEmail } from '@/lib/resend/templates/commission-client';
import { supabaseAdmin } from '@/lib/supabase/client';
import { createElement } from 'react';

const encargosSchema = z.object({
  nombre: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  descripcion: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  estilo: z.string().optional(),
  tamaño: z.string().optional(),
  uso: z.enum(['personal', 'regalo', 'comercial']).optional(),
  presupuesto_min: z.number().optional(),
  presupuesto_max: z.number().optional(),
  plazo: z.string().optional(),
  referencias: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = encargosSchema.parse(body);

    // Save to Supabase
    await supabaseAdmin.from('encargos').insert({
      nombre: data.nombre,
      email: data.email,
      descripcion: data.descripcion,
      estilo: data.estilo ?? null,
      tamaño: data.tamaño ?? null,
      uso: data.uso ?? null,
      presupuesto_min: data.presupuesto_min ?? null,
      presupuesto_max: data.presupuesto_max ?? null,
      plazo: data.plazo ?? null,
      referencias: data.referencias ?? null,
      estado: 'nuevo',
    });

    const artistEmail = process.env.ARTIST_EMAIL || 'artist@example.com';

    // Send email to artist
    await resend.emails.send({
      from: 'Encargos <noreply@yourdomain.com>',
      to: artistEmail,
      subject: `Nuevo encargo de ${data.nombre}`,
      react: createElement(CommissionArtistEmail, data),
    });

    // Send confirmation to client
    await resend.emails.send({
      from: 'Luli Arte <noreply@yourdomain.com>',
      to: data.email,
      subject: 'Recibimos tu solicitud de encargo',
      react: createElement(CommissionClientEmail, { nombre: data.nombre }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Encargos API error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
