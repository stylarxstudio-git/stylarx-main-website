import Header from '@/components/Header';

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: 'Pure Bake',
      description: 'A simple Blender add-on for fast, clean texture baking',
      category: 'Add-ons',
      plan: 'Pro'
    },
    {
      id: 2,
      name: 'Daylight Studio Scene',
      description: 'A clean studio scene with soft daylight shadows',
      category: 'Scenes',
      plan: 'Pro'
    },
    {
      id: 3,
      name: 'Container 01',
      description: 'Standard shipping container 3D model',
      category: '3D Models',
      plan: 'Standard'
    },
    {
      id: 4,
      name: 'CCTV Camera 01',
      description: 'Premium surveillance camera model',
      category: '3D Models',
      plan: 'Standard'
    }
  ];

  return (
    <div>
      <Header />
      
      <main style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 20px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 'bold', 
              marginBottom: '16px',
              color: '#000'
            }}>
              Products
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Browse our collection of premium 3D assets, tools, and resources
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {products.map((product) => {
              const productUrl = '/products/' + product.id;
              return (
                
                  key={product.id}
                  href={productUrl}
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#f9f9f9',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '300px',
                    backgroundColor: '#e5e5e5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#999'
                  }}>
                    Product Image
                  </div>

                  <div style={{ padding: '24px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {product.category}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        padding: '4px 12px',
                        backgroundColor: product.plan === 'Pro' ? '#000' : '#666',
                        color: 'white',
                        borderRadius: '12px'
                      }}>
                        {product.plan}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      marginBottom: '8px',
                      color: '#000'
                    }}>
                      {product.name}
                    </h3>

                    <p style={{
                      fontSize: '0.95rem',
                      color: '#666',
                      lineHeight: '1.5'
                    }}>
                      {product.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}