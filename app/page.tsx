import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="inline-block text-white/80 text-sm font-medium tracking-wider uppercase border-l-2 border-white pl-4">
              Premium Asset Library
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Premium Asset Library for High-End 3D Artists
          </h1>
          
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Bring your ideas to life with premium 3D models, Scenes, Mockups, and tools built for creators who take their craft seriously.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products" className="group px-8 py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all text-lg font-semibold inline-flex items-center justify-center">
              Browse Products
            </a>
            <a href="/contact" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all text-lg font-semibold">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}