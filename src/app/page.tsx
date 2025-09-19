import HeroSlider from '../../components/HeroSlider';
import AlbumsShowcase from '../../components/AlbumsShowcase';
import VideoShowcase from '../../components/VideoShowcase';
import VendorSection from '../../components/VendorSection';
import ShoppingSection from '../../components/ShoppingSection';
import CounterSection from '../../components/CounterSection';
import ContactForm from '../../components/ContactForm';
import TestimonialsSection from '../../components/TestimonialsSection';
import FAQSection from '../../components/FAQSection';

export default function Home() {
  return (
    <main>
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Albums Showcase Section - 6 Albums with See More */}
      <AlbumsShowcase />

      {/* Video Showcase Section - Auto-playing Video */}
      <VideoShowcase />

      {/* Associate Vendors Section - Interactive */}
      <VendorSection />

      {/* Shopping Section - Interactive */}
      <ShoppingSection />

      {/* Enhanced Counter Section with Parallax */}
      <CounterSection />

      {/* Testimonials Section - Video & Text Reviews */}
      <TestimonialsSection />

      {/* Contact Form Section */}
      <ContactForm />

      {/* FAQ Section */}
      <FAQSection />
    </main>
  );
}
