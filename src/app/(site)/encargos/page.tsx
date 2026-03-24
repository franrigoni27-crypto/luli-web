import { Metadata } from 'next'
import { CommissionForm } from '@/components/encargos/CommissionForm'
import { PageTransition } from '@/components/layout/PageTransition'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Encargos',
  description: `Solicitá una obra personalizada con ${SITE_CONFIG.name}. Arte a medida para vos o para regalar.`,
}

export default function EncargosPage() {
  return (
    <PageTransition>
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <header className="mb-16">
          <p className="text-accent font-sans text-xs uppercase tracking-widest mb-4">Arte a medida</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">Encargos</h1>
          <p className="text-white/50 font-sans text-lg leading-relaxed max-w-2xl">
            Cada encargo es único. Contame tu idea, el estilo que buscás y el uso que le vas a dar.
            Respondemos en 48 horas con una propuesta y presupuesto.
          </p>
        </header>

        <CommissionForm />
      </div>
    </PageTransition>
  )
}
