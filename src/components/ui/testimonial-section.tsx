import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  className: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Gopinath Kanniyappan",
    role: "Founder at Shutdown",
    location: "Tamil Nadu, India",
    quote:
      "The motion system they built gave Shutdown an entirely new energy. Every frame feels deliberate and perfectly aligned with our vision.",
    className: "lg:col-span-1 lg:row-span-2 bg-[#CDF22B] text-[#1E45FB] border-transparent",
  },
  {
    name: "Kwame Ouedraogo",
    role: "Creative Director at Abidjan Studios",
    location: "Abidjan, Ivory Coast",
    quote:
      "MARQO is exceptional. We needed a kinetic identity that stood out in a crowded market, and the final delivery blew our expectations out of the water.",
    className: "lg:col-span-1 bg-[#f3f0e9] border border-[#1E45FB]/20 text-[#1E45FB]",
  },
  {
    name: "Aïcha Kone",
    role: "Marketing Head at Cocody Tech",
    location: "Cocody, Ivory Coast",
    quote:
      "Working with this studio felt like having an internal team. Fast communication, brilliant 3D execution, and zero friction.",
    className: "lg:col-span-1 lg:row-span-2 bg-[#1E45FB] text-[#f3f0e9] border-transparent",
  },
  {
    name: "Seydou Bamba",
    role: "CEO at Yamousso Ventures",
    location: "Yamoussoukro, Ivory Coast",
    quote:
      "They don't just do motion design. They engineer feelings. Our rebranding launch was a massive success directly because of their animation work.",
    className: "lg:col-span-1 bg-[#1E45FB] border border-[#CDF22B]/20 text-[#f3f0e9]",
  },
  {
    name: "Mariam Cissé",
    role: "Product Manager at San-Pédro Portals",
    location: "San-Pédro, Ivory Coast",
    quote:
      "From storyboard to the final render, the attention to detail was flawless. Highly recommend their 3D brand systems.",
    className: "lg:col-span-1 bg-[#f3f0e9] border border-[#1E45FB]/20 text-[#1E45FB]",
  },
  {
    name: "Jean-Marc Yobouet",
    role: "Director at Riviera Brands",
    location: "Riviera, Ivory Coast",
    quote:
      "Our campaign went viral, and it was entirely because of the kinetic typography system MARQO developed. Top-tier global standard work from Ivory Coast.",
    className: "lg:col-span-2 bg-[#CDF22B] text-[#1E45FB] border-transparent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function TestimonialSection() {
  return (
    <div className="w-full bg-[#f3f0e9] py-24 md:py-36">
      <div className="container-marqo">
        {/* Header */}
        <div className="mb-16 grid gap-8 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="font-mono-marqo text-[10px] uppercase tracking-[.15em] text-[#CDF22B]">
              ✦ Client voices
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[.9] tracking-[-.09em] text-[#1E45FB]">
              Words from<br />
              <span className="text-[#CDF22B]">good people.</span>
            </h2>
          </div>
          <p className="self-end max-w-[480px] text-lg leading-[1.6] text-[#536078]">
            I work with ambitious brands that refuse to sit still. Here's what some of them have said about the experience.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
              className={cn(
                "flex flex-col justify-between rounded-2xl p-8 md:p-10",
                testimonial.className
              )}
            >
              {/* Quote mark */}
              <span className="mb-6 block font-display text-5xl leading-none opacity-30">"</span>

              <p
                className={cn(
                  "font-display font-semibold leading-[1.1] tracking-[-.04em]",
                  testimonial.className.includes("lg:row-span-2") ||
                    testimonial.className.includes("col-span-2")
                    ? "text-2xl md:text-3xl lg:text-4xl"
                    : "text-xl md:text-2xl"
                )}
              >
                {testimonial.quote}
              </p>

              <div className="mt-10 pt-6 border-t border-current/10">
                <p className="font-display text-base font-bold tracking-[-.04em]">
                  {testimonial.name}
                </p>
                <p className="mt-1 font-mono-marqo text-[10px] uppercase tracking-[.1em] opacity-60">
                  {testimonial.role} • {testimonial.location}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
