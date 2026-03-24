import { Metadata } from 'next'
import { Instagram, Mail } from 'lucide-react'
import { ContactForm } from '@/components/contacto/ContactForm'
import { PageTransition } from '@/components/layout/PageTransition'
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contacto',
  description: `Contactá a ${SITE_CONFIG.name} para consultas, colaboraciones y prensa.`,
}

export default function ContactoPage() {
  return (
    <PageTransition>
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <header className="mb-16">
          <p className="text-accent font-sans text-xs uppercase tracking-widest mb-4">Hablemos</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight">Contacto</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-white/30 mb-4 font-sans">Redes</h3>
              <div className="space-y-3">
                {SOCIAL_LINKS.instagram && (
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/50 hover:text-accent transition-colors text-sm font-sans"
                    data-cursor="grow"
                  >
                    <Instagram size={18} />
                    Instagram
                  </a>
                )}
                {SOCIAL_LINKS.email && (
                  <a
                    href={SOCIAL_LINKS.email}
                    className="flex items-center gap-3 text-white/50 hover:text-accent transition-colors text-sm font-sans"
                    data-cursor="grow"
                  >
                    <Mail size={18} />
                    Email directo
                  </a>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-white/30 mb-4 font-sans">Encargos</h3>
              <p className="text-white/40 font-sans text-sm leading-relaxed">
                Para solicitar una obra personalizada, usá el{' '}
                <a href="/encargos" className="text-accent hover:underline">formulario de encargos</a>
                {' '}con todos los detalles del proyecto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
