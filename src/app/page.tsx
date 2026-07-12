import { Hero } from "@/components/sections/hero";
import { Concept } from "@/components/sections/concept";
import { WhyPartner } from "@/components/sections/why-partner";
import { WhoWePartner } from "@/components/sections/who-we-partner";
import { Spaces } from "@/components/sections/spaces";
import { WhyYoga } from "@/components/sections/why-yoga";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PartnerBenefits } from "@/components/sections/partner-benefits";
import { Resources } from "@/components/sections/resources";
import { PartnerForm } from "@/components/sections/partner-form";
import { BookDemo } from "@/components/sections/book-demo";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { site } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Concept />
      <WhyPartner />
      <WhoWePartner />
      <Spaces />
      <WhyYoga />
      <HowItWorks />
      <PartnerBenefits />
      <Resources />
      <PartnerForm />
      <BookDemo />
      <Faq />
      <Contact />
      <StructuredData />
    </>
  );
}

function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.description,
    url: site.url,
    slogan: site.tagline,
    email: site.email,
    contactPoint: site.contacts.map((c) => ({
      "@type": "ContactPoint",
      name: c.name,
      telephone: c.tel,
      contactType: "sales",
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
