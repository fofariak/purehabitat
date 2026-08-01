import { Hero } from "@/components/sections/hero";
import { Tracks } from "@/components/sections/tracks";
import { Concept } from "@/components/sections/concept";
import { Projects } from "@/components/sections/projects";
import { BrandMoment } from "@/components/sections/brand-moment";
import { WhyRefer } from "@/components/sections/why-refer";
import { WhoWeReferWith } from "@/components/sections/who-refers";
import { Spaces } from "@/components/sections/spaces";
import { WhyYoga } from "@/components/sections/why-yoga";
import { HowItWorks } from "@/components/sections/how-it-works";
import { NetworkBenefits } from "@/components/sections/network-benefits";
import { Resources } from "@/components/sections/resources";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { BookDemo } from "@/components/sections/book-demo";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { faqs, site } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      {/* The audience fork sits directly under the hero: professionals refer
          and earn, everyone else books a free assessment. */}
      <Tracks />
      <Concept />
      <Projects />
      <BrandMoment />
      <WhyRefer />
      <WhoWeReferWith />
      <Spaces />
      <WhyYoga />
      <HowItWorks />
      <NetworkBenefits />
      <Resources />
      <EnquiryForm />
      <BookDemo />
      <Faq />
      <Contact />
      <StructuredData />
    </>
  );
}

function StructuredData() {
  const jsonLd = [
    {
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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
