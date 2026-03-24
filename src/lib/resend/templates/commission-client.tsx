import { Html, Head, Body, Container, Section, Heading, Text, Hr, Preview } from '@react-email/components'

interface CommissionClientEmailProps {
  nombre: string
}

export function CommissionClientEmail({ nombre }: CommissionClientEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Recibimos tu solicitud de encargo</Preview>
      <Body style={{ backgroundColor: '#0A0A0A', fontFamily: 'Georgia, serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading style={{ color: '#8B1A3C', fontSize: '28px', fontWeight: 'normal', marginBottom: '8px' }}>
            Solicitud recibida
          </Heading>
          <Text style={{ color: '#ccc', fontSize: '18px', marginBottom: '24px' }}>
            Gracias, {nombre}.
          </Text>
          <Text style={{ color: '#999', fontSize: '15px', lineHeight: '1.7', margin: '0 0 16px' }}>
            Recibí tu solicitud de encargo y la estoy revisando con atención.
            Me pondré en contacto con vos dentro de las próximas <strong style={{ color: '#fff' }}>48 horas</strong>.
          </Text>
          <Text style={{ color: '#999', fontSize: '15px', lineHeight: '1.7' }}>
            Mientras tanto, podés ver más de mi trabajo en el{' '}
            <a href={`${process.env.NEXT_PUBLIC_SITE_URL}/portfolio`} style={{ color: '#8B1A3C' }}>
              portfolio
            </a>.
          </Text>
          <Hr style={{ borderColor: '#222', margin: '32px 0' }} />
          <Text style={{ color: '#555', fontSize: '12px', textAlign: 'center' as const }}>
            Luli Arte · Si no solicitaste este encargo, ignorá este email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
