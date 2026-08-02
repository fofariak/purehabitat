import type { Metadata } from "next";

import { BrandMoment } from "@/components/sections/brand-moment";
import { Spaces } from "@/components/sections/spaces";
import { WhyYoga } from "@/components/sections/why-yoga";
import { Resources } from "@/components/sections/resources";
import { BookDemo } from "@/components/sections/book-demo";
import { Faq } from "@/components/sections/faq";
import { PageHero } from "@/components/sections/page-hero";
import { EnquiryBand } from "@/components/sections/enquiry-band";
import { faqs, site, technologyPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Technology & Proof",
  description:
    "Independent IIT Delhi results, a Room Purifier vs ERV vs Y-CAB comparison and the full Y-CAB specification. The evidence behind the Clean Air Bubble.",
  alternates: { canonical: "/technology" },
  openGraph: {
    title: `Technology & Proof | ${site.name}`,
    description:
      "IIT Delhi verified results, the full Y-CAB specification, and how it compares with room purifiers and standard ERVs.",
    url: `${site.url}/technology`,
  },
};

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow={technologyPage.eyebrow}
        title={technologyPage.title}
        lead={technologyPage.lead}
      />
      <WhyYoga />
      <Spaces />
      <BrandMoment />
      <Resources />
      <BookDemo />
      <Faq />
      <EnquiryBand />
      <FaqStructuredData />
    </>
  );
}

/** Lives here rather than on home, because this is the page the FAQ is on. */
function FaqStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
