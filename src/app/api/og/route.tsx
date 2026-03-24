import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Luli Arte';
  const image = searchParams.get('image');
  const subtitle = searchParams.get('subtitle') || 'Portfolio & Tienda de Arte';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#0A0A0A',
          padding: '60px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Background image */}
        {image && (
          <img
            src={image}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.4,
            }}
          />
        )}

        {/* Gradient overlay to ensure text legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(10,10,10,0.95) 40%, rgba(10,10,10,0.3) 100%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <span
            style={{
              color: '#8B1A3C',
              fontSize: '16px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Luli Arte
          </span>
          <h1
            style={{
              color: '#ffffff',
              fontSize: title.length > 30 ? '56px' : '72px',
              fontWeight: 'normal',
              margin: 0,
              lineHeight: 1.1,
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '22px',
                margin: 0,
                fontFamily: 'sans-serif',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
