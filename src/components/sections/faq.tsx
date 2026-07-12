import { faqs } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-border bg-secondary/30 py-16 sm:py-28"
    >
      <div className="container-px mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered."
          description="The essentials architects, designers and consultants ask before recommending YOGa."
        />

        <Reveal className="mt-12">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="rounded-2xl border border-border bg-card px-6"
          >
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
