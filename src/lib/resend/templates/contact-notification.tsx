import { Html, Head, Body, Container, Section, Heading, Text, Hr, Preview } from '@react-email/components'

interface ContactNotificationEmailProps {
  nombre: string
  email: string
  asunto: string
  mensaje: string
}

export function ContactNotificationEmail({ nombre, email, asunto, mensaje }: ContactNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nuevo mensaje de contacto de {nombre}</Preview>
      <Body style={{ backgroundColor: '#0A0A0A', fontFamily: 'Georgia, serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading style={{ color: '#8B1A3C', fontSize: '28px', fontWeight: 'normal', marginBottom: '8px' }}>
            Nuevo mensaje de contacto
          </Heading>
          <Section style={{ marginTop: '24px' }}>
            <Text style={{ color: '#8B1A3C', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>De</Text>
            <Text style={{ color: '#fff', fontSize: '18px', margin: '0 0 4px' }}>{nombre}</Text>
            <Text style={{ color: '#999', fontSize: '14px', margin: '0' }}>{email}</Text>
          </Section>
          <Section style={{ marginTop: '20px' }}>
            <Text style={{ color: '#8B1A3C', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Asunto</Text>
            <Text style={{ color: '#ccc', fontSize: '15px', margin: '0' }}>{asunto}</Text>
          </Section>
          <Section style={{ marginTop: '20px' }}>
            <Text style={{ color: '#8B1A3C', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Mensaje</Text>
            <Text style={{ color: '#ccc', fontSize: '15px', lineHeight: '1.7', margin: '0' }}>{mensaje}</Text>
          </Section>
          <Hr style={{ borderColor: '#222', marginTop: '32px' }} />
          <Text style={{ color: '#555', fontSize: '12px', textAlign: 'center' as const }}>
            Respondé a este email para contactar a {nombre}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
