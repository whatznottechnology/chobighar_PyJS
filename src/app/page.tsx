import HeroSlider from '../../components/HeroSlider';
import AlbumsShowcase from '../../components/AlbumsShowcase';
import VideoShowcase from '../../components/VideoShowcase';
import ContactForm from '../../components/ContactForm';
import Testimonials from '../../components/Testimonials';

export default function Home() {
  return (
    <main>
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Albums Showcase Section - 6 Albums with See More */}
      <AlbumsShowcase />

      {/* Video Showcase Section - Auto-playing Video */}
      <VideoShowcase />

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

      {/* User Testimonials Section */}
      <Testimonials />

      {/* Contact Form Section */}
      <ContactForm />
    </main>
  );
}
