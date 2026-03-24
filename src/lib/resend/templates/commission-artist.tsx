import {
  Html, Head, Body, Container, Section, Heading, Text, Hr, Preview
} from '@react-email/components'

interface CommissionArtistEmailProps {
  nombre: string
  email: string
  descripcion: string
  estilo?: string
  tamaño?: string
  uso?: string
  presupuesto_min?: number
  presupuesto_max?: number
  plazo?: string
  referencias?: string
}

export function CommissionArtistEmail({
  nombre, email, descripcion, estilo, tamaño, uso,
  presupuesto_min, presupuesto_max, plazo, referencias
}: CommissionArtistEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nueva solicitud de encargo de {nombre}</Preview>
      <Body style={{ backgroundColor: '#0A0A0A', fontFamily: 'Georgia, serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading style={{ color: '#8B1A3C', fontSize: '28px', fontWeight: 'normal', marginBottom: '8px' }}>
            Nueva solicitud de encargo
          </Heading>
          <Text style={{ color: '#999', fontSize: '14px', marginBottom: '32px' }}>
            Recibiste una nueva solicitud de encargo personalizado.
          </Text>

          <Hr style={{ borderColor: '#222' }} />

          <Section style={{ marginTop: '24px' }}>
            <Text style={{ color: '#8B1A3C', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>De</Text>
            <Text style={{ color: '#fff', fontSize: '18px', margin: '0 0 4px' }}>{nombre}</Text>
            <Text style={{ color: '#999', fontSize: '14px', margin: '0' }}>{email}</Text>
          </Section>

          <Section style={{ marginTop: '24px' }}>
            <Text style={{ color: '#8B1A3C', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Descripción</Text>
            <Text style={{ color: '#ccc', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>{descripcion}</Text>
          </Section>

          {estilo && (
            <Section style={{ marginTop: '20px' }}>
              <Text style={{ color: '#8B1A3C', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Estilo</Text>
              <Text style={{ color: '#ccc', fontSize: '15px', margin: '0' }}>{estilo}</Text>
            </Section>
          )}

          {tamaño && (
            <Section style={{ marginTop: '20px' }}>
              <Text style={{ color: '#8B1A3C', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Tamaño aproximado</Text>
              <Text style={{ color: '#ccc', fontSize: '15px', margin: '0' }}>{tamaño}</Text>
            </Section>
          )}

          {uso && (
            <Section style={{ marginTop: '20px' }}>
              <Text style={{ color: '#8B1A3C', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Uso</Text>
              <Text style={{ color: '#ccc', fontSize: '15px', margin: '0' }}>{uso}</Text>
            </Section>
          )}

          {(presupuesto_min || presupuesto_max) && (
            <Section style={{ marginTop: '20px' }}>
              <Text style={{ color: '#8B1A3C', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Presupuesto</Text>
              <Text style={{ color: '#ccc', fontSize: '15px', margin: '0' }}>
                {presupuesto_min && presupuesto_max
                  ? `$${presupuesto_min.toLocaleString()} – $${presupuesto_max.toLocaleString()} ARS`
                  : presupuesto_min
                  ? `Desde $${presupuesto_min.toLocaleString()} ARS`
                  : `Hasta $${presupuesto_max!.toLocaleString()} ARS`}
              </Text>
            </Section>
          )}

          {plazo && (
            <Section style={{ marginTop: '20px' }}>
              <Text style={{ color: '#8B1A3C', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Plazo deseado</Text>
              <Text style={{ color: '#ccc', fontSize: '15px', margin: '0' }}>{plazo}</Text>
            </Section>
          )}

          {referencias && (
            <Section style={{ marginTop: '20px' }}>
              <Text style={{ color: '#8B1A3C', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Referencias</Text>
              <Text style={{ color: '#ccc', fontSize: '15px', lineHeight: '1.6', margin: '0' }}>{referencias}</Text>
            </Section>
          )}

          <Hr style={{ borderColor: '#222', marginTop: '32px' }} />
          <Text style={{ color: '#555', fontSize: '12px', textAlign: 'center' as const }}>
            Respondé a este email para contactar a {nombre} en {email}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
