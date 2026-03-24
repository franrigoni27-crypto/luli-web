import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { resend } from '@/lib/resend/client'
import { ContactNotificationEmail } from '@/lib/resend/templates/contact-notification'
import { createElement } from 'react'

const contactSchema = z.object({
  nombre: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  asunto: z.string().min(1, 'Asunto requerido'),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  _honeypot: z.string().max(0, 'Spam detected').optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    if (data._honeypot) {
      return NextResponse.json({ success: true }) // Silent reject spam
    }

    const artistEmail = process.env.ARTIST_EMAIL || 'artist@example.com'

    await resend.emails.send({
      from: 'Contacto <noreply@yourdomain.com>',
      to: artistEmail,
      subject: `Nuevo mensaje: ${data.asunto}`,
      react: createElement(ContactNotificationEmail, {
        nombre: data.nombre,
        email: data.email,
        asunto: data.asunto,
        mensaje: data.mensaje,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
