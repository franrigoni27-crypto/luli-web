'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const schema = z.object({
  nombre: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  asunto: z.string().min(1, 'Asunto requerido'),
  mensaje: z.string().min(10, 'El mensaje es muy corto'),
  _honeypot: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full bg-white/5 border border-white/10 text-white font-sans text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-white/20'
  const labelClass = 'block text-xs uppercase tracking-widest text-white/40 mb-2 font-sans'

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <CheckCircle className="text-accent mx-auto mb-4" size={40} />
        <h3 className="font-serif text-2xl text-white mb-2">Mensaje enviado</h3>
        <p className="text-white/40 font-sans">Te respondo a la brevedad.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-accent text-sm font-sans hover:underline">
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot — campo oculto para detectar bots */}
      <input {...register('_honeypot')} type="text" className="hidden" tabIndex={-1} aria-hidden />

      <div>
        <label className={labelClass}>Nombre *</label>
        <input {...register('nombre')} placeholder="Tu nombre" className={inputClass} />
        {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Email *</label>
        <input {...register('email')} type="email" placeholder="tu@email.com" className={inputClass} />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Asunto *</label>
        <select {...register('asunto')} className={inputClass + ' cursor-pointer'}>
          <option value="">Seleccioná...</option>
          <option value="Consulta general">Consulta general</option>
          <option value="Colaboración">Colaboración</option>
          <option value="Prensa">Prensa</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.asunto && <p className="text-red-400 text-xs mt-1">{errors.asunto.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Mensaje *</label>
        <textarea {...register('mensaje')} rows={5} placeholder="Escribí tu mensaje..." className={inputClass + ' resize-none'} />
        {errors.mensaje && <p className="text-red-400 text-xs mt-1">{errors.mensaje.message}</p>}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm font-sans">
          <AlertCircle size={16} />
          Hubo un error al enviar. Intentá de nuevo.
        </div>
      )}

      <Button type="submit" disabled={status === 'loading'} size="lg">
        {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
      </Button>
    </form>
  )
}
