import { customStyles } from "./landing/LandingPage.styles";
import { LandingProvider, useLandingContext } from "./landing/LandingPage.context";
import { Navbar } from "./landing/Navbar";
import { Hero } from "./landing/Hero";
import { Features } from "./landing/Features";
import { Pricing } from "./landing/Pricing";
import { Testimonials } from "./landing/Testimonials";
import { FAQ } from "./landing/FAQ";
import { FinalCTA } from "./landing/FinalCTA";
import { Footer } from "./landing/Footer";

function LandingContent() {
  const { lang, theme } = useLandingContext();

  return (
    <div
      className={`${theme.modeClass} min-h-screen transition-colors duration-500`}
      style={{ fontFamily: "'Plus Jakarta Sans', 'Almarai', sans-serif" }}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export function LandingPage() {
  return (
    <>
      <style>{customStyles}</style>
      <LandingProvider>
        <LandingContent />
      </LandingProvider>
    </>
  );
}
