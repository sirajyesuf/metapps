import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'MetApps';
  const description = searchParams.get('description') || 'Ethiopian Tools & Utilities';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}
        />
        
        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px',
            }}
          >
            <span style={{ fontSize: '32px', color: 'white' }}>🇪🇹</span>
          </div>
          <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
            MetApps
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            margin: '0 0 16px 0',
            lineHeight: 1.2,
            maxWidth: '800px',
          }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: '24px',
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            margin: 0,
            maxWidth: '700px',
            lineHeight: 1.4,
          }}
        >
          {description}
        </p>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            right: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)' }}>
            Ethiopian Tools & Utilities
          </span>
          <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)' }}>
            metapps.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
} 