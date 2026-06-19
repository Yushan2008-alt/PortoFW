import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { MetricsTicker } from '@/components/sections/MetricsTicker';
import { About } from '@/components/sections/About';
import { ClientLogoWall } from '@/components/sections/ClientLogoWall';
import { Work } from '@/components/sections/Work';
import { Services } from '@/components/sections/Services';
import { TechStack } from '@/components/sections/TechStack';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Metrics ticker — dark band break after hero */}
        <MetricsTicker />

        <hr className="gradient-divider" />

        {/* 3. About */}
        <About />

        <hr className="gradient-divider" />

        {/* 4. Work / Portfolio */}
        <Work />

        <hr className="gradient-divider" />

        {/* 5. Client logo wall — social proof */}
        <ClientLogoWall />

        <hr className="gradient-divider" />

        {/* 6. Services */}
        <Services />

        <hr className="gradient-divider" />

        {/* 7. Testimonials */}
        <Testimonials />

        <hr className="gradient-divider" />

        {/* 8. FAQ */}
        <FAQ />

        <hr className="gradient-divider" />

        {/* 9. Tech Stack */}
        <TechStack />

        <hr className="gradient-divider" />

        {/* 10. Contact CTA */}
        <Contact />
      </main>
      <Footer />
      {/* Floating WhatsApp CTA — hides automatically when #contact is in view */}
      <WhatsAppButton />
    </>
  );
}
