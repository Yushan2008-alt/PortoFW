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
        <hr className="gradient-divider" />
        <About />
        <hr className="gradient-divider" />
        <Work />
        <hr className="gradient-divider" />
        <Services />
        <hr className="gradient-divider" />
        <TechStack />
        <hr className="gradient-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
