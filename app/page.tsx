import Header from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      
      <main style={{ paddingTop: '64px' }}>
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #111827, #1f2937, #000000)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          }}></div>
          
          <div style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '80px 20px',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <span style={{
                display: 'inline-block',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderLeft: '2px solid white',
                paddingLeft: '16px'
              }}>
                Premium Asset Library
              </span>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              The Premium Asset Library for High-End 3D Artists
            </h1>
            
            <p style={{
              fontSize: '1.25rem',
              color: 'white',
              marginBottom: '48px',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.7'
            }}>
              Bring your ideas to life with premium 3D models, Scenes, Mockups, and tools built for creators who take their craft seriously.
            </p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <a href="/products" style={{
                padding: '16px 32px',
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '9999px',
                fontSize: '1.125rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'background-color 0.3s'
              }}>
                Browse Products
              </a>
              <a href="/contact" style={{
                padding: '16px 32px',
                backgroundColor: 'transparent',
                border: '2px solid white',
                color: 'white',
                borderRadius: '9999px',
                fontSize: '1.125rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s'
              }}>
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}