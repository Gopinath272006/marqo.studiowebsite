import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, RefObject } from 'react';

interface ScrollLogoProps {
  containerRef: RefObject<HTMLDivElement | null>;
  heroRef: RefObject<HTMLDivElement | null>;
  secondRef: RefObject<HTMLDivElement | null>;
}

export function ScrollLogo({ containerRef, heroRef, secondRef }: ScrollLogoProps) {
  const [layout, setLayout] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    endScale: 1,
    ready: false
  });

  useEffect(() => {
    const updateLayout = () => {
      if (!heroRef.current || !secondRef.current || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const heroRect = heroRef.current.getBoundingClientRect();
      const secondRect = secondRef.current.getBoundingClientRect();
      
      const startX = heroRect.left - containerRect.left + (heroRect.width / 2);
      const startY = heroRect.top - containerRect.top + (heroRect.height / 2);
      const endX = secondRect.left - containerRect.left + (secondRect.width / 2);
      const endY = secondRect.top - containerRect.top + (secondRect.height / 2);
      
      const endScale = secondRect.width / heroRect.width;

      setLayout({
        startX, startY, 
        endX, endY, endScale,
        ready: true
      });
    };

    const timer = setTimeout(updateLayout, 100);
    window.addEventListener('resize', updateLayout);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateLayout);
    }
  }, [heroRef, secondRef, containerRef]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] 
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90, mass: 0.1 });

  const rawX = useTransform(smoothProgress, [0, 1], [layout.startX, layout.endX]);
  const rawY = useTransform(smoothProgress, [0, 1], [layout.startY, layout.endY]);
  
  const x = useTransform(rawX, v => `calc(${v}px - 50%)`);
  const y = useTransform(rawY, v => `calc(${v}px - 50%)`);
  const scale = useTransform(smoothProgress, [0, 1], [1, layout.endScale]);

  if (!layout.ready) return null;

  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block z-50 overflow-hidden">
      <motion.div 
        className="absolute top-0 left-0 origin-center"
        style={{ x, y, scale }}
      >
        <div className="services-logo-wrap pointer-events-auto flex items-center justify-center">
            <img src="/PHOTO-2026-08-11-18-36-50-removebg-preview.png" alt="MARQO logo" className="h-48 w-48 object-contain filter drop-shadow-[0_0_40px_rgba(212,255,61,0.5)] md:h-[280px] md:w-[280px] lg:h-[400px] lg:w-[400px]" loading="eager" />
        </div>
      </motion.div>
    </div>
  );
}
