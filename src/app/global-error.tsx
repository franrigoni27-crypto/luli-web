'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="es">
      <body
        style={{
          backgroundColor: '#0A0A0A',
          color: '#fff',
          fontFamily: 'serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          padding: '1rem',
        }}
      >
        <p style={{ fontSize: '5rem', color: 'rgba(201,168,76,0.2)', marginBottom: '1rem' }}>
          Error
        </p>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'normal', marginBottom: '1rem' }}>
          Algo salió mal
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '2rem',
            fontSize: '1rem',
          }}
        >
          Ocurrió un error inesperado.
        </p>
        <button
          onClick={reset}
          style={{
            border: '1px solid #8B1A3C',
            color: '#8B1A3C',
            padding: '12px 24px',
            background: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Intentar de nuevo
        </button>
      </body>
    </html>
  );
}
