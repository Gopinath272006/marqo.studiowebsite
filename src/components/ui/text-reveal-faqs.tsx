"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Link } from 'wouter'
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function FAQs() {
  const faqItems = [
    {
      id: 'item-1',
      question: 'What is MARQO?',
      answer: 'MARQO is an independent motion design studio based in Ivory Coast. We specialize in kinetic identities, 3D brand systems, and creating motion that engineered feelings.',
    },
    {
      id: 'item-2',
      question: 'Where are you located?',
      answer: 'We are based in Ivory Coast, but we work globally with ambitious brands that refuse to sit still. Our team operates with global standards in motion and design.',
    },
    {
      id: 'item-3',
      question: 'What services do you offer?',
      answer: 'Our expertise covers kinetic typography, 3D animation, brand systems, and fully responsive motion design meant to elevate your digital presence and campaign launches.',
    },
    {
      id: 'item-4',
      question: 'Do you work with startups or established brands?',
      answer: 'Both! We partner with startups looking to make a loud entrance, as well as established enterprises needing to breathe new energy into their brand identity.',
    },
    {
      id: 'item-5',
      question: 'How do we start a project?',
      answer: 'You can reach out to us via our contact page. We will schedule a discovery call to understand your vision, followed by a proposal and an aligned timeline.',
    },
  ];

  return (
    <section className="w-full bg-[#f3f0e9] py-24 md:py-36">
      <div className="container-marqo">
        {/* Header matching the design system */}
        <div className="mb-16 grid gap-8 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="font-mono-marqo text-[10px] uppercase tracking-[.15em] text-[#CDF22B]">
              ✦ Common Queries
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[.9] tracking-[-.09em] text-[#1E45FB]">
              Frequently Asked<br />
              <span className="text-[#CDF22B]">Questions.</span>
            </h2>
          </div>
          
          <div className="self-end max-w-[480px]">
            <p className="text-lg leading-[1.6] text-[#536078] hidden md:block">
              Everything you need to know about working with us. Can’t find what you’re looking for? Reach out to our{' '}
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border-b border-[#1E45FB] pb-1 font-mono-marqo text-[10px] uppercase tracking-[.14em] text-[#1E45FB] hover:text-[#CDF22B] hover:border-[#CDF22B] transition-colors"
              >
                support team
              </Link>{' '}
              for assistance.
            </p>
          </div>
        </div>

        {/* Accordion container */}
        <div className="mx-auto w-full max-w-4xl">
          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-current/10"
              >
                <AccordionTrigger className="cursor-pointer py-6 font-display text-xl md:text-2xl font-semibold leading-[1.1] tracking-[-.04em] text-[#1E45FB] hover:no-underline hover:text-[#CDF22B] transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <BlurredStagger text={item.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <p className="text-lg leading-[1.6] text-[#536078] mt-12 md:hidden">
          Can't find what you're looking for? Contact our{' '}
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border-b border-[#1E45FB] pb-1 font-mono-marqo text-[10px] uppercase tracking-[.14em] text-[#1E45FB] hover:text-[#CDF22B] hover:border-[#CDF22B] transition-colors"
          >
            support team
          </Link>
        </p>
      </div>
    </section>
  )
}

export const BlurredStagger = ({
  text = "built by marqo",
}: {
  text: string;
}) => {
  const headingText = text;
 
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
      },
    },
  };
 
  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };
 
  return (
    <div className="w-full text-lg leading-[1.6] text-[#536078]">
      <motion.p
        variants={container}
        initial="hidden"
        animate="show"
        className="break-words whitespace-normal"
      >
        {headingText.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};
