'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { COMMISSION_STYLES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const schema = z.object({
  nombre: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  descripcion: z.string().min(20, 'Contanos más sobre lo que querés (mínimo 20 caracteres)'),
  estilo: z.string().optional(),
  tamaño: z.string().optional(),
  uso: z.enum(['personal', 'regalo', 'comercial']).optional(),
  presupuesto_min: z.number().min(0).optional(),
  presupuesto_max: z.number().min(0).optional(),
  plazo: z.string().optional(),
  referencias: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function CommissionForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [selectedEstilo, setSelectedEstilo] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/encargos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      reset()
      setSelectedEstilo('')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full bg-white/5 border border-white/10 text-white font-sans text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-white/20'
  const labelClass = 'block text-xs uppercase tracking-widest text-white/40 mb-2 font-sans'

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <CheckCircle className="text-accent mx-auto mb-4" size={48} />
        <h3 className="font-serif text-3xl text-white mb-3">¡Solicitud enviada!</h3>
        <p className="text-white/50 font-sans text-lg">Respondemos en 48hs.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 text-accent text-sm font-sans hover:underline"
        >
          Enviar otra solicitud
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Nombre y Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
      </div>

      {/* Descripción */}
      <div>
        <label className={labelClass}>¿Qué querés encargar? *</label>
        <textarea
          {...register('descripcion')}
          rows={5}
          placeholder="Describí la obra que tenés en mente — personajes, escena, colores, sensaciones..."
          className={inputClass + ' resize-none'}
        />
        {errors.descripcion && <p className="text-red-400 text-xs mt-1">{errors.descripcion.message}</p>}
      </div>

      {/* Estilo */}
      <div>
        <label className={labelClass}>Estilo</label>
        <div className="flex flex-wrap gap-3">
          {COMMISSION_STYLES.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => {
                setSelectedEstilo(style.value)
                setValue('estilo', style.value)
              }}
              className={cn(
                'px-4 py-2 border text-sm font-sans transition-colors duration-200',
                selectedEstilo === style.value
                  ? 'border-accent text-accent bg-accent/5'
                  : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
              )}
              data-cursor="grow"
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tamaño y Uso */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Tamaño aproximado</label>
          <select {...register('tamaño')} className={inputClass + ' cursor-pointer'}>
            <option value="">Seleccioná...</option>
            <option value="pequeño">Pequeño (hasta A4)</option>
            <option value="mediano">Mediano (A3)</option>
            <option value="grande">Grande (A2 o mayor)</option>
            <option value="digital">Solo digital</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Uso</label>
          <select {...register('uso')} className={inputClass + ' cursor-pointer'}>
            <option value="">Seleccioná...</option>
            <option value="personal">Personal</option>
            <option value="regalo">Regalo</option>
            <option value="comercial">Comercial</option>
          </select>
        </div>
      </div>

      {/* Presupuesto */}
      <div>
        <label className={labelClass}>Presupuesto estimado (ARS)</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register('presupuesto_min', { valueAsNumber: true })}
              type="number"
              placeholder="Mínimo"
              className={inputClass}
            />
          </div>
          <div>
            <input
              {...register('presupuesto_max', { valueAsNumber: true })}
              type="number"
              placeholder="Máximo"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Plazo */}
      <div>
        <label className={labelClass}>Plazo deseado</label>
        <select {...register('plazo')} className={inputClass + ' cursor-pointer'}>
          <option value="">Seleccioná...</option>
          <option value="1-2 semanas">1–2 semanas</option>
          <option value="1 mes">1 mes</option>
          <option value="2-3 meses">2–3 meses</option>
          <option value="sin apuro">Sin apuro</option>
        </select>
      </div>

      {/* Referencias */}
      <div>
        <label className={labelClass}>Referencias o inspiración</label>
        <textarea
          {...register('referencias')}
          rows={3}
          placeholder="Links, artistas de referencia, imágenes que te inspiren..."
          className={inputClass + ' resize-none'}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm font-sans">
          <AlertCircle size={16} />
          Hubo un error al enviar. Intentá de nuevo.
        </div>
      )}

      <div className="pt-4">
        <Button type="submit" size="lg" disabled={status === 'loading'} className="w-full sm:w-auto">
          {status === 'loading' ? 'Enviando...' : 'Enviar solicitud'}
        </Button>
        <p className="text-white/30 text-xs font-sans mt-3">
          * Respondemos en 48 horas hábiles.
        </p>
      </div>
    </form>
  )
}
