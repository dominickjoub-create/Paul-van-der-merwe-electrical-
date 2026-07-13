import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Services } from "@/components/Services";
import { QuoteForm } from "@/components/QuoteForm";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <Services />
        <QuoteForm />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
