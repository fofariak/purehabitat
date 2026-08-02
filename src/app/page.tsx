import { Hero } from "@/components/sections/hero";
import { Tracks } from "@/components/sections/tracks";
import { Concept } from "@/components/sections/concept";
import { Projects } from "@/components/sections/projects";
import { WhyRefer } from "@/components/sections/why-refer";
import { WhoWeReferWith } from "@/components/sections/who-refers";
import { HowItWorks } from "@/components/sections/how-it-works";
import { NetworkBenefits } from "@/components/sections/network-benefits";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { Contact } from "@/components/sections/contact";
import { TechnologyBand } from "@/components/sections/technology-band";
import { site } from "@/lib/content";

/**
 * Home is the pitch and the conversion path. The heavy evidence — comparison
 * table, full specs, resources and the FAQ — lives on /technology, which is
 * what kept this page feeling endless.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Tracks />
      <Concept />
      <Projects />
      <WhyRefer />
      <WhoWeReferWith />
      <HowItWorks />
      <NetworkBenefits />
      <TechnologyBand />
      <EnquiryForm />
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
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: site.contacts.map((c) => ({
      "@type": "ContactPoint",
      name: c.name,
      telephone: c.tel,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
