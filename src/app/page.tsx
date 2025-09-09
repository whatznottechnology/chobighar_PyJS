import HeroSlider from '../../components/HeroSlider';

export default function Home() {
  return (
    <main>
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="w-full mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-text mb-12" style={{ fontFamily: 'Playfair Display, serif' }}>
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Wedding Photography', description: 'Capture your special day with timeless elegance' },
              { title: 'Portrait Sessions', description: 'Professional portraits that tell your story' },
              { title: 'Event Coverage', description: 'Complete event documentation with artistic flair' },
            ].map((service, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-divider hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-maroon mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {service.title}
                </h3>
                <p className="text-muted" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More content to test scroll behavior */}
      <section className="py-20 bg-gray-50">
        <div className="w-full mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-text mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Test Scroll Behavior
          </h2>
          <p className="text-muted mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            Scroll up to see the navbar shadow effect in action.
          </p>
          <div className="h-96 bg-white rounded-lg border border-divider flex items-center justify-center">
            <p className="text-muted">Sample content area</p>
          </div>
        </div>
      </section>
    </main>
  );
}
