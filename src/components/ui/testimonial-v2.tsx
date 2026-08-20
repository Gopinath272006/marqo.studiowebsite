import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Sun, Moon } from 'lucide-react';

// --- Types ---
export interface Testimonial {
  text: string;
  name: string;
  role: string;
}

// --- Data ---
export const testimonials: Testimonial[] = [
  {
    name: "Gopinath Kanniyappan",
    role: "Founder at Shutdown",
    text: "The motion system they built gave Shutdown an entirely new energy. Every frame feels deliberate and perfectly aligned with our vision.",
  },
  {
    name: "Kwame Ouedraogo",
    role: "Creative Director at Abidjan Studios",
    text: "MARQO is exceptional. We needed a kinetic identity that stood out in a crowded market, and the final delivery blew our expectations out of the water.",
  },
  {
    name: "Aïcha Kone",
    role: "Marketing Head at Cocody Tech",
    text: "Working with this studio felt like having an internal team. Fast communication, brilliant 3D execution, and zero friction.",
  },
  {
    name: "Seydou Bamba",
    role: "CEO at Yamousso Ventures",
    text: "They don't just do motion design. They engineer feelings. Our rebranding launch was a massive success directly because of their animation work.",
  },
  {
    name: "Mariam Cissé",
    role: "Product Manager at San-Pédro Portals",
    text: "From storyboard to the final render, the attention to detail was flawless. Highly recommend their 3D brand systems.",
  },
  {
    name: "Jean-Marc Yobouet",
    role: "Director at Riviera Brands",
    text: "Our campaign went viral, and it was entirely because of the kinetic typography system MARQO developed. Top-tier global standard work from Ivory Coast.",
  },
];

export const firstColumn = testimonials.slice(0, 3);
export const secondColumn = testimonials.slice(3, 6);
export const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role }, i) => (
                <motion.li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileFocus={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-8 rounded-3xl border border-[#1E45FB]/20 shadow-lg shadow-black/5 max-w-xs w-full bg-[#f3f0e9]/80 backdrop-blur-sm transition-all duration-300 cursor-default select-none group focus:outline-none" 
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-black leading-relaxed font-normal m-0 text-sm md:text-base">
                      {text}
                    </p>
                    <footer className="flex items-center gap-3 mt-6">
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-black">
                          {name}
                        </cite>
                        <span className="text-xs leading-5 tracking-tight text-black/70 mt-0.5">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-24 relative overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="container px-4 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
          <div className="flex justify-center">
            <div className="border border-neutral-300 dark:border-neutral-700 py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-neutral-600 dark:text-neutral-400 bg-neutral-100/50 dark:bg-neutral-800/50 transition-colors">
              Testimonials
            </div>
          </div>

          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 text-center text-neutral-900 dark:text-white transition-colors">
            What our users say
          </h2>
          <p className="text-center mt-5 text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed max-w-sm transition-colors">
            Discover how thousands of teams streamline their operations with our platform.
          </p>
        </div>

        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </motion.div>
    </section>
  );
};

// --- Main App Component ---
export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="w-screen min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300 flex flex-col justify-center relative selection:bg-primary selection:text-white">
      {/* Dark Mode Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 shadow-xl hover:scale-110 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <TestimonialsSection />
    </div>
  );
}
