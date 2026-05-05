import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Work } from '@/components/sections/Work';
import { Services } from '@/components/sections/Services';
import { TechStack } from '@/components/sections/TechStack';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="gradient-divider" />
        <About />
        <div className="gradient-divider" />
        <Work />
        <div className="gradient-divider" />
        <Services />
        <div className="gradient-divider" />
        <TechStack />
        <div className="gradient-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
