import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, RefObject } from 'react';
import { CircleArrowUp } from 'lucide-react';

interface ScrollAvatarProps {
  containerRef: RefObject<HTMLDivElement | null>;
  heroRef: RefObject<HTMLDivElement | null>;
  secondRef: RefObject<HTMLDivElement | null>;
}

export function ScrollAvatar({ containerRef, heroRef, secondRef }: ScrollAvatarProps) {
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
  
  const badgeOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  if (!layout.ready) return null;

  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block z-50 overflow-hidden">
      <motion.div 
        className="absolute top-0 left-0 origin-center"
        style={{ x, y, scale }}
      >
        <div className="hero-avatar-outer">
          <div className="hero-avatar-wrap">
            <div className="hero-glow" />
            <div className="hero-ring" />
            <div className="hero-ring-inner" />
            <img src="/PHOTO-2026-08-11-18-24-22.jpg" alt="MARQO Studio Avatar" className="hero-avatar pointer-events-auto" loading="eager" />
            <motion.div style={{ opacity: badgeOpacity }} className="hero-badge-wrap pointer-events-auto">
              <CircleArrowUp className="absolute inset-0 h-full w-full animate-[spinSlow_12s_linear_infinite] p-1 text-[#CDF22B]" />
              <span className="relative z-10 font-mono-marqo text-[8px] uppercase leading-[1.5] tracking-[.08em]">Open for<br />good work<br />↗</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
