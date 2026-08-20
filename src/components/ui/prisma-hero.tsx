import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "wouter";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] text-[#CDF22B]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
const PrismaHero = () => {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#1E45FB]">

      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
      />

      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
        }}
      />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#1E45FB]/80" />

      {/* Hero content */}
      <div className="absolute bottom-0 left-0 right-0 container-marqo pb-12 md:pb-20">
        <div className="grid grid-cols-12 items-end gap-6">

          <div className="col-span-12 lg:col-span-8">
            <h1
              className="font-display font-semibold leading-[0.85] tracking-[-0.07em] text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[14vw] xl:text-[12vw]"
              style={{ color: "#f3f0e9" }}
            >
              <WordsPullUp text="WORK" showAsterisk />
            </h1>
          </div>

          <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base"
              style={{ lineHeight: 1.4, color: "rgba(243, 240, 233, 0.8)" }}
            >
              I build identities, motion systems, and moving pictures for brands with somewhere to go. Here is a selected collection of work designed to hold attention.
            </motion.p>

            <Link href="/contact">
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center gap-3 self-start rounded-full bg-[#CDF22B] py-1.5 pl-5 pr-1.5 text-xs font-mono-marqo uppercase tracking-wider text-[#1E45FB] transition-all hover:bg-[#f3f0e9] hover:text-[#1E45FB] cursor-pointer"
              >
                Work with me
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E45FB] transition-transform group-hover:scale-110 sm:h-9 sm:w-9">
                  <ArrowRight className="h-4 w-4 text-[#CDF22B]" />
                </span>
              </motion.button>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
