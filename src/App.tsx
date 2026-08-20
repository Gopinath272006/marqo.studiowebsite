import { type FormEvent, type ReactNode, useEffect, useState, useRef } from 'react';
import { ScrollAvatar } from './components/ScrollAvatar';
import { ScrollLogo } from './components/ScrollLogo';
import { InfiniteRibbon } from '@/components/ui/infinite-ribbon';
import TestimonialSection from '@/components/ui/testimonial-section';
import FAQs from '@/components/ui/text-reveal-faqs';
import { ContainerAnimated, ContainerInset, ContainerScroll, ContainerSticky, HeroVideo } from '@/components/ui/animated-video-on-scroll';
import { useScroll, useTransform, motion, useMotionTemplate } from 'motion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { ArrowDownRight, ArrowUpRight, Asterisk, Check, ChevronDown, CircleArrowUp, Instagram, Menu, MoveRight, Pause, Play, Plus, Send, X, Mail, MessageCircle, CheckCircle2, PlayCircle, Loader2 } from 'lucide-react';
import { Link, Route, Switch, useLocation, useParams, Router as WouterRouter } from 'wouter';
import './index.css';
import { PrismaHero } from '@/components/ui/prisma-hero';
import { TestimonialsColumn, firstColumn, secondColumn } from '@/components/ui/testimonial-v2';
import { BookingCalendar } from '@/components/ui/booking-calendar';
import { HowItWorks } from '@/components/ui/how-it-works';

const queryClient = new QueryClient();

type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  type: string;
  description: string;
  color: string;
  ink: string;
  shape?: 'orbit' | 'blocks' | 'ribbon' | 'waves' | 'grid' | 'star';
  videoUrl?: string;
};

// ============================================================
// ⭐ PLACE 1 — YOUR PORTFOLIO PROJECTS (Work Page)
// Each block below is ONE project card on the Work page.
// To ADD a project: copy a block and paste it before the ];
// To EDIT a project: change the text inside the quotes " "
// To DELETE a project: remove the whole block from { to },
// ============================================================
const projects: Project[] = [
  { slug: 'showreel', title: 'Showreel', client: 'MARQO', year: '2024', type: 'Brand film', description: 'Motion design that makes you impossible to ignore.', color: '#1E45FB', ink: '#f3f0e9', videoUrl: '/AQMxTHrvLP_jWU9isTpj4qqkZ7o67_WXBKtxr-nhnCL1Hb310acxZVGLJv7riweexlGon0CM-cMYHCDnhbRwSkKemDTwguAt_dPpZpE.mp4' }, // ← PROJECT 1: change videoUrl to your new video file name
  { slug: 'follow-on-instagram', title: 'follow on instagram', client: 'MARQO', year: '2024', type: 'Social', description: 'Follow me on Instagram for more motion design.', color: '#CDF22B', ink: '#1E45FB', videoUrl: '/AQPnwGKfgTlRYeGsb1ACfJYXgNqoGfa41o85DLxHRJkFQRmKuZqE2FblGEpUXk8AlDZQ8xNzZXko8H5HfDu63r86KOCL2ME6lOXUmvA.mp4' }, // ← PROJECT 2: change videoUrl to your new video file name
];
// ============================================================
// ⭐ PLACE 1 ENDS HERE — project list is above
// ============================================================

const navItems = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

function usePageMeta(title: string, description: string, schemaJson?: string) {
  const [location] = useLocation();
  useEffect(() => {
    // 1. Basic Title & Meta
    document.title = `${title} | MARQO`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 2. Open Graph tags
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (property.startsWith('og:')) el.setAttribute('property', property);
        else el.setAttribute('name', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('og:title', `${title} | MARQO`);
    setMeta('og:description', description);
    setMeta('twitter:title', `${title} | MARQO`);
    setMeta('twitter:description', description);

    // 3. Dynamic Breadcrumb Schema (MNC level)
    const paths = location.split('/').filter(Boolean);
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://marqo.studio/"
        },
        ...paths.map((path, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "name": path.charAt(0).toUpperCase() + path.slice(1),
          "item": `https://marqo.studio/${paths.slice(0, index + 1).join('/')}`
        }))
      ]
    };

    // 4. JSON-LD Schema (remove old, add new if exists)
    const existingSchema = document.getElementById('page-schema');
    if (existingSchema) existingSchema.remove();

    const script = document.createElement('script');
    script.id = 'page-schema';
    script.type = 'application/ld+json';

    // Combine custom schema (if any) with breadcrumbs
    const schemas = [breadcrumbList];
    if (schemaJson) {
      try {
        const customSchema = JSON.parse(schemaJson);
        schemas.push(customSchema);
      } catch (e) {
        // Fallback for valid non-array JSON strings
      }
    }
    script.text = JSON.stringify(schemas);
    document.head.appendChild(script);

  }, [title, description, schemaJson, location]);
}

function MarqoMark({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 font-display text-[1.45rem] font-bold tracking-[-.09em] ${dark ? 'text-[#f5f0e8]' : ''}`} data-testid="link-logo">
      <div className="relative flex h-8 w-8 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,255,61,0.4)_0%,transparent_70%)] blur-[4px]" />
        <img src="/PHOTO-2026-08-11-18-36-50-removebg-preview.png" alt="MARQO logo mark" className={`relative z-10 h-8 w-8 object-contain ${dark ? 'brightness-100' : 'brightness-100'}`} />
      </div>
      MARQO<span className="text-[#CDF22B]">.</span>
    </Link>
  );
}

function MediaVisual({ project, tall = false }: { project: Project; tall?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  if (project.videoUrl) {
    return (
      <div className="media-visual h-full w-full overflow-hidden group relative" style={{ background: project.color, color: project.ink }}>
        <video ref={videoRef} src={project.videoUrl} loop muted playsInline className="absolute inset-0 h-full w-full object-cover" />
        
        <div className={`absolute inset-0 flex items-center justify-center bg-black/20 z-20 transition-opacity duration-300 ${playing ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
          <button 
            onClick={togglePlay}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white hover:bg-white/30 hover:scale-105 transition-all"
            aria-label={playing ? "Pause video" : "Play video"}
          >
            {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </button>
        </div>

        <span className="absolute left-5 top-5 z-10 font-mono-marqo text-[10px] uppercase tracking-[.18em] opacity-75 drop-shadow-md">{project.client} / {project.year}</span>
        <span className="absolute bottom-5 left-5 z-10 font-display text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[.8] tracking-[-.1em] drop-shadow-md">{project.title.split(' / ')[0]}</span>
      </div>
    );
  }

  return (
    <div className="media-visual h-full w-full" style={{ background: project.color, color: project.ink }}>
      <div className="media-scan" />
      <div className={`absolute inset-0 flex items-center justify-center ${tall ? 'scale-[1.18]' : ''}`}>
        {project.shape === 'orbit' && <><div className="h-[58%] w-[58%] rounded-full border-[1px] border-current opacity-60" /><div className="absolute h-[28%] w-[28%] rounded-full bg-current" /><div className="absolute h-[72%] w-[28%] -rotate-45 rounded-[50%] border-[14px] border-current opacity-80" /></>}
        {project.shape === 'blocks' && <><div className="absolute h-[38%] w-[23%] -translate-x-[65%] translate-y-[18%] bg-current" /><div className="absolute h-[52%] w-[23%] translate-x-[35%] -translate-y-[17%] border-[12px] border-current" /><div className="absolute h-[15%] w-[68%] translate-y-[140%] bg-current" /></>}
        {project.shape === 'ribbon' && <><div className="absolute h-[150%] w-[19%] -rotate-[38deg] bg-current" /><div className="absolute h-[150%] w-[19%] rotate-[38deg] bg-current opacity-80" /><div className="absolute h-[32%] w-[32%] rounded-full border-[2px] border-current" /></>}
        {project.shape === 'waves' && <><div className="absolute h-[60%] w-[90%] rounded-[50%] border-[18px] border-current -rotate-12" /><div className="absolute h-[42%] w-[78%] rounded-[50%] border-[12px] border-current rotate-12 opacity-70" /></>}
        {project.shape === 'grid' && <div className="grid w-[64%] grid-cols-5 gap-2 opacity-80">{Array.from({ length: 25 }).map((_, i) => <i key={i} className={`aspect-square rounded-full bg-current ${i % 4 === 0 ? 'opacity-20' : ''}`} />)}</div>}
        {project.shape === 'star' && <><Asterisk className="h-[44%] w-[44%] stroke-[.7]" /><div className="absolute h-[28%] w-[28%] rotate-45 border-[14px] border-current" /></>}
      </div>
      <span className="absolute left-5 top-5 font-mono-marqo text-[10px] uppercase tracking-[.18em] opacity-75">{project.client} / {project.year}</span>
      <span className="absolute bottom-5 left-5 font-display text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[.8] tracking-[-.1em]">{project.title.split(' / ')[0]}</span>
    </div>
  );
}

function CursorTreatment() {
  const [pos, setPos] = useState({ x: -50, y: -50 });
  useEffect(() => {
    const move = (event: MouseEvent) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div className="pointer-events-none fixed z-[60] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CDF22B] mix-blend-multiply lg:block" style={{ left: pos.x, top: pos.y }} />;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => setProgress(window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight));
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <div className="fixed left-0 top-0 z-[55] h-[3px] bg-[#CDF22B] transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />;
}

function Nav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  return <header className="fixed left-0 right-0 top-0 z-40 border-b border-[#1E45FB]/15 bg-[#f3f0e9]/90 backdrop-blur-md">
    <div className="container-marqo flex h-[72px] items-center justify-between">
      <MarqoMark />
      <nav className="hidden items-center gap-8 md:flex">
        {navItems.map((item) => <Link key={item.href} href={item.href} className={`font-mono-marqo text-[11px] uppercase tracking-[.14em] transition-colors hover:text-[#CDF22B] ${location === item.href ? 'text-[#CDF22B]' : ''}`} data-testid={`link-nav-${item.label.toLowerCase()}`}>{item.label}</Link>)}
      </nav>
      <div className="flex items-center gap-3">
        <div className="relative hidden h-8 w-8 items-center justify-center md:flex">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,255,61,0.4)_0%,transparent_70%)] blur-[4px]" />
          <img src="/PHOTO-2026-08-11-18-36-50-removebg-preview.png" alt="MARQO Motion Design Studio Logo" aria-hidden="true" className="relative z-10 h-8 w-8 object-contain opacity-80 transition-opacity hover:opacity-100" />
        </div>
        <button className="flex h-10 w-10 items-center justify-center border border-[#1E45FB]/20 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" data-testid="button-menu">{open ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
    </div>
    {open && <div className="container-marqo border-t border-[#1E45FB]/15 pb-5 pt-4 md:hidden">
      <nav className="flex flex-col gap-1">{navItems.map((item, index) => <Link onClick={() => setOpen(false)} key={item.href} href={item.href} className="flex items-center justify-between border-b border-[#1E45FB]/15 py-4 font-display text-3xl font-semibold tracking-[-.06em]" data-testid={`link-mobile-${index}`}>{item.label}<ArrowUpRight size={22} /></Link>)}</nav>
    </div>}
  </header>;
}

function Footer() {
  return <footer className="relative overflow-hidden bg-[#1E45FB] px-5 py-16 text-[#f3f0e9] md:py-24">
    {/* Faded watermark logo */}
    <img src="/PHOTO-2026-08-11-18-36-50-removebg-preview.png" alt="MARQO Studio Watermark Logo" aria-hidden="true" className="pointer-events-none absolute -right-16 -top-10 h-[420px] w-[420px] select-none object-contain opacity-[0.06] md:h-[580px] md:w-[580px]" />
    <div className="container-marqo relative z-10">
      <div className="flex flex-col justify-between gap-12 md:flex-row">
        <div><p className="font-mono-marqo text-[10px] uppercase tracking-[.18em] text-[#CDF22B]">Have a good one?</p><Link href="/contact" className="mt-5 block max-w-[850px] font-display text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[.9] tracking-[-.07em] hover:text-[#CDF22B] transition-colors" data-testid="link-footer-contact">Motion Design that<br />Makes You<br /><span className="text-[#CDF22B]">Impossible to Ignore.</span></Link></div>
        <div className="flex gap-14 md:pt-2"><div className="flex flex-col gap-3 font-mono-marqo text-[10px] uppercase tracking-[.12em]"><span className="mb-2 text-[#8491aa]">Explore</span>{navItems.map((item) => <Link href={item.href} key={item.href} className="hover:text-[#CDF22B]" data-testid={`link-footer-${item.label.toLowerCase()}`}>{item.label}</Link>)}</div><div className="flex flex-col gap-3 font-mono-marqo text-[10px] uppercase tracking-[.12em]"><span className="mb-2 text-[#8491aa]">Elsewhere</span><a href="https://www.instagram.com/marqo.motion?igsh=MWJlajB3eXN4bjAxeA==" target="_blank" rel="noopener noreferrer" className="hover:text-[#CDF22B]" data-testid="link-instagram">Instagram</a><a href="https://www.tiktok.com/@marqo.motion" target="_blank" rel="noopener noreferrer" className="hover:text-[#CDF22B]" data-testid="link-tiktok">TikTok</a><a href="https://wa.me/2250799836340" target="_blank" rel="noopener noreferrer" className="hover:text-[#CDF22B]" data-testid="link-whatsapp">WhatsApp</a></div></div>
      </div>
      <div className="mt-20 flex flex-col justify-between gap-3 border-t border-[#f3f0e9]/20 pt-5 font-mono-marqo text-[10px] uppercase tracking-[.12em] text-[#8491aa] md:flex-row"><span>MARQO® — Helping brands move.</span><span>© {new Date().getFullYear()} / All rights reserved.</span></div>
    </div>
  </footer>;
}

function Shell({ children }: { children: ReactNode }) {
  const [bookOpen, setBookOpen] = useState(false);
  return (
    <div className="marqo-noise min-h-[100dvh] overflow-x-clip">
      <ScrollProgress />
      <CursorTreatment />
      <Nav />
      {children}
      <Footer />

      {/* Floating Book Now Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Action items — slide up when open */}
        <div
          className={`flex flex-col items-end gap-2 transition-all duration-300 ${
            bookOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {/* WhatsApp */}
          <a
            href="https://wa.me/2250799836340?text=Hi%20MARQO!%20I'd%20like%20to%20book%20a%20call."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full bg-white pl-4 pr-2 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-x-1"
          >
            <span className="font-mono-marqo text-[10px] uppercase tracking-[.12em] text-[#1E45FB] whitespace-nowrap">WhatsApp</span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.532 5.86L.054 23.25a.75.75 0 0 0 .916.916l5.39-1.478A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.69-.5-5.23-1.375l-.374-.214-3.876 1.063 1.063-3.876-.214-.374A9.952 9.952 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </span>
          </a>

          {/* Gmail */}
          <a
            href="mailto:marqostudioss@gmail.com?subject=Booking%20Inquiry&body=Hi%20MARQO!%20I'd%20like%20to%20book%20a%20call."
            className="group flex items-center gap-3 rounded-full bg-white pl-4 pr-2 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_28px_rgba(234,67,53,0.3)] transition-all duration-300 hover:-translate-x-1"
          >
            <span className="font-mono-marqo text-[10px] uppercase tracking-[.12em] text-[#1E45FB] whitespace-nowrap">Gmail</span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EA4335] text-white">
              <Mail size={18} />
            </span>
          </a>

          {/* Contact Form */}
          <Link
            href="/contact"
            onClick={() => setBookOpen(false)}
            className="group flex items-center gap-3 rounded-full bg-white pl-4 pr-2 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_28px_rgba(30,69,251,0.3)] transition-all duration-300 hover:-translate-x-1"
          >
            <span className="font-mono-marqo text-[10px] uppercase tracking-[.12em] text-[#1E45FB] whitespace-nowrap">Contact Form</span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1E45FB] text-[#CDF22B]">
              <MessageCircle size={18} />
            </span>
          </Link>
        </div>

        {/* Main Book Now button */}
        <button
          onClick={() => setBookOpen((v) => !v)}
          data-testid="button-floating-book-now"
          aria-label="Book Now"
          className={`flex items-center gap-3 rounded-full px-5 py-4 font-mono-marqo text-[10px] uppercase tracking-[.14em] shadow-[0_8px_32px_rgba(30,69,251,0.35)] transition-all duration-300 active:scale-95 ${
            bookOpen
              ? 'bg-[#f3f0e9] text-[#1E45FB] shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
              : 'bg-[#1E45FB] text-[#CDF22B] hover:bg-[#CDF22B] hover:text-[#1E45FB] hover:shadow-[0_12px_40px_rgba(205,242,43,0.4)]'
          }`}
        >
          <span className={`transition-transform duration-300 ${bookOpen ? 'rotate-45' : ''}`}>
            <Plus size={16} />
          </span>
          {bookOpen ? 'Close' : 'Book Now'}
        </button>

      </div>
    </div>
  );
}

function SectionLabel({ children, number }: { children: ReactNode; number?: string }) {
  return <div className="mb-8 flex items-center gap-3 font-mono-marqo text-[10px] uppercase tracking-[.15em] text-[#CDF22B]"><span>{number ?? '↳'}</span><span>{children}</span></div>;
}

function Marquee({ text = 'MOTION DESIGN THAT MAKES YOU IMPOSSIBLE TO IGNORE' }: { text?: string }) {
  return <div className="overflow-hidden border-y border-[#1E45FB]/20 py-4"><div className="flex w-max animate-[marquee_24s_linear_infinite]">{Array.from({ length: 5 }).map((_, i) => <span key={i} className="flex items-center font-display text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-none tracking-[-.09em]">{text}<Asterisk className="mx-8 h-[.7em] w-[.7em] text-[#CDF22B] stroke-[1.5]" /></span>)}</div></div>;
}

function InGoodCompanySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const insetY = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const insetX = useTransform(scrollYProgress, [0, 1], [4, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`;

  return (
    <div ref={ref} style={{ height: '115vh', background: '#1E45FB' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#1E45FB' }}>
        {/* Video — explicit 60vh */}
        <div style={{ height: '60vh', position: 'relative', flexShrink: 0 }}>
          <motion.div style={{ position: 'absolute', inset: 0, overflow: 'hidden', clipPath }}>
            {/* ============================================================
              ⭐ PLACE 2 — HOME PAGE SCROLL VIDEO
              This is the big cinematic video on the Home page.
              Replace the filename below with your new video.
              1. Put your video file in the /public folder.
              2. Change the src value below to your new file name.
              Example: src="/my-new-home-video.mp4"
            ============================================================ */}
            <video
              src="/AQPkNfYl92g59UUl2MHDasv0FgtcsG2CAkU5QFV6ttqNS65qx5e6nM1S1FvrKND7nBS_youuXIHfgr29wxJvlOz9EmI-e7N_iUaYVnM.mp4" // ← CHANGE THIS to your new video file name
              autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        </div>

        {/* Text — explicit 40vh */}
        <div style={{ height: '40vh', background: '#1E45FB', color: '#f3f0e9', display: 'flex', flexDirection: 'column', justifyContent: 'center', flexShrink: 0 }}>
          <div className="container-marqo">
            <div className="grid gap-8 md:grid-cols-[.7fr_1.3fr] items-center">
              <SectionLabel number="03">In good company</SectionLabel>
              <div>
                <p className="font-display text-[clamp(1.6rem,2.8vw,2.8rem)] font-semibold leading-[.94] tracking-[-.08em]">
                  From first thought to final frame, I make the work{' '}
                  <span style={{ color: '#CDF22B' }}>feel inevitable.</span>
                </p>
                <div className="mt-5 grid grid-cols-2 gap-y-3 border-t pt-4 font-mono-marqo text-[10px] uppercase tracking-[.12em] sm:grid-cols-4" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(243,240,233,0.7)' }}>
                  <span>Notion</span><span>Arc / Matter</span><span>Daylight</span><span>Field Notes</span>
                  <span>Southbank</span><span>New Territory</span><span>Studio B</span><span>+ good people</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  usePageMeta(
    'Motion Design Studio',
    'I am MARQO, an independent motion design studio building identities, 3D worlds, and kinetic motion systems.'
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return <Shell><main>
    <div ref={containerRef} className="relative">
      <section className="container-marqo flex min-h-[100dvh] flex-col justify-between pb-14 pt-32 md:pb-20 md:pt-40">
        <div className="page-reveal flex items-start justify-between gap-5"><p className="max-w-[240px] font-mono-marqo text-[10px] uppercase leading-[1.6] tracking-[.15em] text-[#536078]">Motion design<br />& brand studio<br /><span className="text-[#CDF22B]">Based everywhere / 2024—</span></p><div className="hidden text-right font-mono-marqo text-[10px] uppercase leading-[1.6] tracking-[.15em] text-[#536078] md:block">Scroll to explore<br /><span className="text-[#1E45FB]">↓ 00:01:24:12</span></div></div>
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-10">
          <div className="flex flex-col max-w-[600px]">
            <h1 className="page-reveal font-display text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[.9] tracking-[-.06em] text-[#1E45FB] uppercase">
              Motion Design<br />
              that Makes You<br />
              <span className="text-[#CDF22B]">Impossible</span><br />
              to Ignore.
            </h1>

            <div className="page-reveal stagger-1 mt-8 flex flex-col gap-4 w-full sm:w-[360px] relative z-30">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full bg-[#1E45FB] text-white px-8 py-4 rounded-full font-display font-medium text-lg hover:bg-[#1E45FB]/90 transition-all shadow-lg shadow-[#1E45FB]/20 border border-[#1E45FB]"
              >
                <span className="flex-1 text-center pl-6">Start Your Project</span>
                <ChevronDown size={20} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-[76px] left-0 w-full bg-white rounded-3xl shadow-2xl border border-[#1E45FB]/10 p-2 animate-in fade-in slide-in-from-top-2">
                  <a href="mailto:marqostudioss@gmail.com" className="flex items-center gap-4 p-4 hover:bg-[#f3f0e9] rounded-2xl transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#1E45FB]/10 flex items-center justify-center text-[#1E45FB] shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-[#1E45FB] text-[15px]">Email Us</p>
                      <p className="font-mono-marqo text-[10px] text-[#536078] mt-0.5">marqostudioss@gmail.com</p>
                    </div>
                  </a>
                  <a href="https://wa.me/2250799836340" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 hover:bg-[#CDF22B]/20 rounded-2xl transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#CDF22B]/50 flex items-center justify-center text-[#1E45FB] shrink-0">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-[#1E45FB] text-[15px]">WhatsApp Us</p>
                      <p className="font-mono-marqo text-[10px] text-[#536078] mt-0.5">Instant chat & fast reply</p>
                    </div>
                  </a>
                </div>
              )}

              <Link 
                href="/work" 
                className="flex items-center justify-center gap-2 w-full border border-[#1E45FB]/20 text-[#1E45FB] px-8 py-4 rounded-full font-display font-medium text-lg hover:border-[#1E45FB] hover:bg-[#1E45FB]/5 transition-all"
              >
                <PlayCircle size={20} className="text-[#1E45FB] fill-transparent" strokeWidth={1.5} />
                View Our Work
              </Link>
            </div>

            <div className="page-reveal stagger-2 mt-8 flex flex-col gap-3 font-display text-[#1E45FB] text-[15px] sm:text-[16px] font-medium tracking-tight">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#1E45FB] shrink-0" />
                <span>Under 10-day turnaround</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#1E45FB] shrink-0" />
                <span>Google Meet & WhatsApp ready</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#1E45FB] shrink-0" />
                <span>60fps crisp UI animations</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-end page-reveal stagger-1 h-[350px] md:h-[450px] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-4">
              <TestimonialsColumn testimonials={firstColumn} duration={15} />
              <TestimonialsColumn testimonials={secondColumn} duration={19} className="hidden xl:block" />
            </div>
          </div>
        </div>
        <div className="page-reveal stagger-2 flex flex-col justify-between gap-8 border-t border-[#1E45FB]/20 pt-5 md:flex-row"><p className="max-w-[430px] font-display text-xl leading-[1.15] tracking-[-.04em] md:text-2xl">I build identities, worlds, and moving pictures for brands with somewhere to go.</p><Link href="/work" className="group flex items-center gap-4 self-start font-mono-marqo text-[10px] uppercase tracking-[.15em]" data-testid="link-home-work">View selected work <span className="flex h-10 w-10 items-center justify-center border border-[#1E45FB] transition-colors group-hover:bg-[#CDF22B] group-hover:text-[#1E45FB]"><ArrowDownRight size={17} /></span></Link></div>
      </section>
      <div className="relative overflow-hidden -mx-0">
        <InfiniteRibbon
          duration={28}
          rotation={-1.8}
          repeat={5}
          className="border-y border-[#1E45FB]/10 bg-[#CDF22B] py-5"
        >
          <span className="font-display text-[clamp(1.6rem,4vw,3.5rem)] font-semibold leading-none tracking-[-.09em] text-[#1E45FB]">
            MOTION DESIGN THAT MAKES YOU IMPOSSIBLE TO IGNORE
            <span className="mx-8 inline-block scale-75 text-[#1E45FB]/40">✦</span>
          </span>
        </InfiniteRibbon>
        <InfiniteRibbon
          duration={22}
          reverse={true}
          rotation={1.8}
          repeat={5}
          className="border-b border-[#CDF22B]/20 bg-[#1E45FB] py-5"
        >
          <span className="font-display text-[clamp(1.6rem,4vw,3.5rem)] font-semibold leading-none tracking-[-.09em] text-[#CDF22B]">
            MAKE IT MOVE. MAKE IT MATTER. MAKE IT MARQO.
            <span className="mx-8 inline-block scale-75 text-[#CDF22B]/40">✦</span>
          </span>
        </InfiniteRibbon>
      </div>

      <section className="container-marqo py-20" id="book">
        <div className="mb-12 text-center md:text-left">
          <SectionLabel number="01">Schedule a Call</SectionLabel>
        </div>
        <BookingCalendar />
      </section>

      <HowItWorks />

      <section className="container-marqo py-28 md:py-44"><div className="grid gap-14 md:grid-cols-[.7fr_1.3fr] md:gap-24"><div className="flex flex-col gap-12 md:gap-24"><div className="flex justify-center md:justify-start"><div className="section-avatar-outer"><div className="section-avatar-wrap"><div className="hero-glow" /><div className="hero-ring" /><div className="hero-ring-inner" /><img src="/PHOTO-2026-08-11-18-24-22.jpg" alt="MARQO - Motion Design Studio Avatar" className="hero-avatar" loading="lazy" /></div></div></div></div><div><h2 className="font-display text-[clamp(2.7rem,6vw,6.5rem)] font-semibold leading-[.9] tracking-[-.09em] text-[#1E45FB]">The world is moving.<br /><span className="text-[#CDF22B]">Your brand should too.</span></h2><p className="mt-12 max-w-[540px] text-lg leading-[1.55] text-[#536078]">MARQO is an independent motion design studio based in Ivory Coast. We turn strategy into motion, motion into feeling, and feeling into the thing people remember.</p><Link href="/about" aria-label="Meet MARQO Motion Design Studio" className="mt-8 inline-flex items-center gap-3 border-b border-[#1E45FB] pb-2 font-mono-marqo text-[10px] uppercase tracking-[.14em] hover:text-[#CDF22B] hover:border-[#CDF22B]" data-testid="link-home-about">Meet us <MoveRight size={15} /></Link></div></div></section>
    </div>
    <section className="bg-[#CDF22B] py-24 md:py-36"><div className="container-marqo grid gap-12 md:grid-cols-[1fr_2fr]"><SectionLabel number="02">A small selection</SectionLabel><div><div className="grid gap-5 sm:grid-cols-2">{projects.slice(0, 3).map((project, index) => <ProjectTile key={project.slug} project={project} featured={index === 0} />)}</div><Link href="/work" className="mt-12 inline-flex items-center gap-3 font-mono-marqo text-[10px] uppercase tracking-[.15em] text-[#1E45FB] hover:underline" data-testid="link-home-all-work">See all projects <ArrowUpRight size={15} /></Link></div></div></section>
    <InGoodCompanySection />
    <TestimonialSection />
    <FAQs />
  </main></Shell>;
}

function ProjectTile({ project, featured = false }: { project: Project; featured?: boolean }) {
  const isInstagram = project.slug === 'follow-on-instagram';
  const inner = (
    <>
      <div className={`aspect-[4/3] ${featured ? 'sm:aspect-[2/1]' : ''}`}><MediaVisual project={project} /></div>
      <div className="flex justify-between gap-4 pt-4 text-[#1E45FB]"><div><h3 className="font-display text-2xl font-semibold tracking-[-.06em]">{project.title}</h3><p className="mt-1 font-mono-marqo text-[9px] uppercase tracking-[.13em] opacity-70">{project.type} / {project.year}</p></div><span className="project-arrow flex h-9 w-9 shrink-0 items-center justify-center border border-[#1E45FB]"><ArrowUpRight size={16} /></span></div>
    </>
  );
  if (isInstagram) {
    return <a href="https://www.instagram.com/marqo.motion?igsh=MWJlajB3eXN4bjAxeA==" target="_blank" rel="noopener noreferrer" className={`project-card group block ${featured ? 'sm:col-span-2' : ''}`} data-testid={`card-project-${project.slug}`}>{inner}</a>;
  }
  return <Link href={`/work/${project.slug}`} className={`project-card group block ${featured ? 'sm:col-span-2' : ''}`} data-testid={`card-project-${project.slug}`}>{inner}</Link>;
}

function Work() {
  const workSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "VideoObject",
          "name": "MARQO Showreel 2024",
          "description": "Motion design that makes you impossible to ignore. A compilation of the best 3D animation and brand motion by MARQO.",
          "thumbnailUrl": "https://marqo.studio/PHOTO-2026-08-11-18-24-22.jpg",
          "uploadDate": "2024-01-01T08:00:00+00:00",
          "contentUrl": "https://marqo.studio/AQMxTHrvLP_jWU9isTpj4qqkZ7o67_WXBKtxr-nhnCL1Hb310acxZVGLJv7riweexlGon0CM-cMYHCDnhbRwSkKemDTwguAt_dPpZpE.mp4"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "VideoObject",
          "name": "Follow MARQO on Instagram",
          "description": "Social media motion design snippet by MARQO.",
          "thumbnailUrl": "https://marqo.studio/PHOTO-2026-08-11-18-24-22.jpg",
          "uploadDate": "2024-01-01T08:00:00+00:00",
          "contentUrl": "https://marqo.studio/AQPnwGKfgTlRYeGsb1ACfJYXgNqoGfa41o85DLxHRJkFQRmKuZqE2FblGEpUXk8AlDZQ8xNzZXko8H5HfDu63r86KOCL2ME6lOXUmvA.mp4"
        }
      }
    ]
  });

  usePageMeta(
    'Selected Motion Design Work',
    'Portfolio of 3D animation, kinetic typography, and brand motion identity projects by MARQO.',
    workSchema
  );
  return (
    <Shell>
      <main className="pb-32">
        {/* Prisma Hero Section – full screen, edge-to-edge */}
        <PrismaHero />

        {/* Grid Section */}
        <div className="container-marqo mt-16 md:mt-24 page-reveal stagger-2">
          <div className="grid gap-x-5 gap-y-14 pt-12 sm:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectTile
                key={project.slug}
                project={project}
                featured={index === 0 && projects.length > 3}
              />
            ))}
          </div>
          {projects.length === 0 && (
            <div className="py-32 text-center">
              <p className="font-display text-4xl tracking-[-.06em]">Nothing here yet.</p>
            </div>
          )}
        </div>
      </main>
    </Shell>
  );
}

function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === slug) ?? projects[0];
  usePageMeta(project.title, project.description);
  return <Shell><main><section className="container-marqo pb-16 pt-36 md:pb-24 md:pt-48"><Link href="/work" className="mb-14 inline-flex items-center gap-2 font-mono-marqo text-[10px] uppercase tracking-[.14em] hover:text-[#CDF22B]" data-testid="link-back-work"><ArrowDownRight className="rotate-135" size={15} /> Back to work</Link><div className="flex flex-col justify-between gap-12 md:flex-row md:items-end"><div><p className="font-mono-marqo text-[10px] uppercase tracking-[.14em] text-[#CDF22B]">{project.type} / {project.year}</p><h1 className="mt-5 max-w-[850px] font-display text-[clamp(4rem,13vw,12rem)] font-semibold leading-[.78] tracking-[-.13em]">{project.title.replace(' / ', ' /\\n')}</h1></div><p className="max-w-[250px] text-sm leading-[1.5] text-[#536078]">{project.description}</p></div></section><div className="container-marqo aspect-[16/10] md:aspect-[2/1]"><MediaVisual project={project} tall /></div><section className="container-marqo grid gap-14 py-28 md:grid-cols-[.7fr_1.3fr] md:py-44"><SectionLabel number="01">The brief</SectionLabel><div><p className="max-w-[720px] font-display text-[clamp(2.3rem,5vw,5rem)] font-semibold leading-[.93] tracking-[-.08em]">Make it unmistakable. Give the idea room to breathe, then make it move.</p><p className="mt-10 max-w-[580px] text-lg leading-[1.6] text-[#536078]">A flexible motion language designed to hold attention in a crowded frame. I created a set of visual principles that could flex from a two-second sting to a full world-building film.</p></div></section><section className="bg-[#1E45FB] py-24 text-[#f3f0e9] md:py-36"><div className="container-marqo grid gap-7 md:grid-cols-3">{['Strategy / 03 weeks', 'Identity / 06 weeks', 'Motion system / 04 weeks'].map((item, i) => <div key={item} className="border-t border-[#f3f0e9]/25 pt-5"><span className="font-mono-marqo text-[10px] text-[#CDF22B]">0{i + 1}</span><p className="mt-16 font-display text-2xl tracking-[-.05em]">{item}</p></div>)}</div></section><section className="container-marqo py-28 md:py-44"><div className="grid gap-5 sm:grid-cols-2"><div className="aspect-square"><MediaVisual project={{ ...project, shape: 'grid', color: '#b9cf67', ink: '#1E45FB' }} /></div><div className="mt-12 aspect-square sm:mt-28"><MediaVisual project={{ ...project, shape: 'ribbon', color: '#d78cc9', ink: '#23223b' }} /></div></div></section><section className="container-marqo border-t border-[#1E45FB]/20 py-20"><p className="font-mono-marqo text-[10px] uppercase tracking-[.15em] text-[#536078]">Next project</p><Link href={`/work/${projects[(projects.indexOf(project) + 1) % projects.length].slug}`} className="group mt-5 flex items-center justify-between font-display text-[clamp(3rem,9vw,8rem)] font-semibold leading-none tracking-[-.1em]" data-testid="link-next-project"><span>{projects[(projects.indexOf(project) + 1) % projects.length].title}</span><ArrowUpRight className="h-[.65em] w-[.65em] text-[#CDF22B] transition-transform group-hover:translate-x-3 group-hover:-translate-y-3" /></Link></section></main></Shell>;
}

function About() {
  usePageMeta(
    'About Me',
    'MARQO is an independent motion design studio based in Ivory Coast. We specialize in Cinema 4D and After Effects.'
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  return <Shell><main>
    <div ref={containerRef} className="relative">
      <ScrollLogo containerRef={containerRef} heroRef={heroRef} secondRef={secondRef} />
      <section className="container-marqo flex min-h-[80vh] flex-col justify-end pb-24 pt-36 md:pb-36 md:pt-48"><div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between"><div><SectionLabel>About MARQO</SectionLabel><h1 className="max-w-[1150px] font-display text-[clamp(4rem,14vw,13rem)] font-semibold leading-[.78] tracking-[-.13em] text-[#1E45FB]">I LIKE<br /><span className="text-[#CDF22B]">TO MOVE.</span></h1></div><div className="hidden shrink-0 justify-end md:flex">
        {/* The tracking placeholder – no animation class so heroReveal doesn't fight opacity */}
        <div ref={heroRef} className="invisible flex items-center justify-center" style={{ width: '280px', height: '280px' }}></div>
      </div></div></section><div className="relative overflow-hidden">
        <InfiniteRibbon
          duration={28}
          rotation={-1.8}
          repeat={5}
          className="border-y border-[#1E45FB]/10 bg-[#CDF22B] py-5"
        >
          <span className="font-display text-[clamp(1.6rem,4vw,3.5rem)] font-semibold leading-none tracking-[-.09em] text-[#1E45FB]">
            ONE CREATIVE WITH A LARGE SIGNAL
            <span className="mx-8 inline-block scale-75 text-[#1E45FB]/40">✦</span>
          </span>
        </InfiniteRibbon>
        <InfiniteRibbon
          duration={22}
          reverse={true}
          rotation={1.8}
          repeat={5}
          className="border-b border-[#CDF22B]/20 bg-[#1E45FB] py-5"
        >
          <span className="font-display text-[clamp(1.6rem,4vw,3.5rem)] font-semibold leading-none tracking-[-.09em] text-[#CDF22B]">
            MOTION IS NOT DECORATION — IT'S HOW A BRAND THINKS OUT LOUD.
            <span className="mx-8 inline-block scale-75 text-[#CDF22B]/40">✦</span>
          </span>
        </InfiniteRibbon>
      </div><section className="container-marqo grid gap-12 py-28 md:grid-cols-[.7fr_1.3fr] md:py-44"><div className="flex flex-col gap-12 md:gap-24"><SectionLabel number="01">My point of view</SectionLabel><div className="flex justify-center md:justify-start">
        {/* Mobile original */}
        <div className="services-logo-wrap md:hidden"><img src="/PHOTO-2026-08-11-18-36-50-removebg-preview.png" alt="MARQO Motion Design Studio Logo" className="h-40 w-40 object-contain filter drop-shadow-[0_0_40px_rgba(212,255,61,0.5)] md:h-[220px] md:w-[220px]" /></div>
        {/* Desktop placeholder – truly hidden, holds layout space only */}
        <div ref={secondRef} className="invisible hidden md:flex items-center justify-center" style={{ width: '220px', height: '220px' }}></div>
      </div></div><div><p className="font-display text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.09em] text-[#1E45FB]">Motion is not decoration. It is how a brand <span className="text-[#CDF22B]">thinks out loud.</span></p><p className="mt-12 max-w-[590px] text-lg leading-[1.6] text-[#536078]">MARQO is a motion design studio, director, and curious collaborator. No layers between the idea and the hands making it. Just good questions, sharp instincts, and a healthy disrespect for the expected.</p></div></section>
    </div>
    <section className="bg-[#CDF22B] py-24 md:py-36"><div className="container-marqo grid gap-14 md:grid-cols-2"><div><SectionLabel number="02">The toolkit</SectionLabel><p className="font-display text-5xl font-semibold leading-[.9] tracking-[-.08em] md:text-7xl">Shape the<br />signal.</p></div><div className="grid grid-cols-2 border-t border-[#1E45FB]/30">{['Cinema 4D', 'After Effects', 'Blender', 'Figma', 'TouchDesigner', 'Premiere Pro', 'Photoshop', 'Good taste'].map((tool, i) => <div key={tool} className="border-b border-[#1E45FB]/30 py-5 font-mono-marqo text-[11px] uppercase tracking-[.1em]">{String(i + 1).padStart(2, '0')} / {tool}</div>)}</div></div></section><section className="container-marqo py-28 md:py-44"><SectionLabel number="03">A brief history of moving forward</SectionLabel><div className="mt-14 border-t border-[#1E45FB]/20">{[['2024', 'Going independent', 'A new name for a familiar feeling.'], ['2022', 'The first big swing', 'I built a visual system seen in 14 countries.'], ['2020', 'The work takes shape', 'One shared hard drive, collaborating with friends, and a lot of late nights.'], ['2017', 'Before the name', 'Learning to make still things feel alive.']].map(([year, title, copy]) => <div key={year} className="grid gap-4 border-b border-[#1E45FB]/20 py-8 md:grid-cols-[.25fr_1fr_1fr]"><span className="font-mono-marqo text-[11px] text-[#CDF22B]">{year}</span><h3 className="font-display text-2xl font-semibold tracking-[-.05em]">{title}</h3><p className="text-sm text-[#536078]">{copy}</p></div>)}</div></section></main></Shell>;
}

const services = [
  { number: '01', title: 'Brand worlds', copy: 'Identity systems with a pulse. I find the visual territory your brand can own, then build the rules for living there.', tags: 'Strategy / Identity / Art direction' },
  { number: '02', title: 'Motion systems', copy: 'A library of movement that makes every touchpoint feel like part of the same conversation.', tags: 'Principles / Toolkit / Guidelines' },
  { number: '03', title: 'Moving pictures', copy: 'Films, launch moments, title sequences, and all the frames in between. Built to hold attention.', tags: 'Direction / Production / Post' },
  { number: '04', title: 'Digital experiences', copy: 'Websites and interactive moments that respond, react, and reward a second look.', tags: 'Experience / Interaction / Prototyping' },
];

function Services() {
  usePageMeta(
    'Motion Design Services',
    'Studio services including 3D Animation, Kinetic Typography, Brand Motion Guidelines, and Campaign Films.'
  );
  const [open, setOpen] = useState(0);
  return (
    <Shell>
      <main className="container-marqo pb-32 pt-36 md:pt-48">
        <section className="border-b border-[#1E45FB]/20 pb-20">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-8 md:gap-12">
              <div className="services-logo-wrap hidden shrink-0 md:block">
                <img
                  src="/PHOTO-2026-08-11-18-36-50-removebg-preview.png"
                  alt="MARQO Motion Design Studio Logo"
                  className="services-logo"
                />
              </div>
              <div>
                <SectionLabel>What I do</SectionLabel>
                <h1 className="max-w-[700px] font-display text-[clamp(4rem,10vw,10rem)] font-semibold leading-[.78] tracking-[-.13em] text-[#1E45FB]">
                  MAKE IT
                  <br />
                  <span className="text-[#CDF22B]">MOVE.</span>
                </h1>
                <p className="mt-12 max-w-[410px] text-lg leading-[1.5] text-[#536078]">
                  A focused set of capabilities for brands that want to be felt, not filed away.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 justify-center md:justify-end">
              <div className="section-avatar-outer">
                <div className="section-avatar-wrap">
                  <div className="hero-glow" />
                  <div className="hero-ring" />
                  <div className="hero-ring-inner" />
                  <img
                    src="/PHOTO-2026-08-11-18-24-22.jpg"
                    alt="MARQO Motion Design Studio Avatar"
                    className="hero-avatar"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <SectionLabel number="01">The offering</SectionLabel>
          <div className="border-t border-[#1E45FB]/20">
            {services.map((service, index) => (
              <div key={service.number} className="border-b border-[#1E45FB]/20">
                <button
                  onClick={() => setOpen(open === index ? -1 : index)}
                  className="flex w-full items-center gap-5 py-7 text-left md:py-10"
                  data-testid={`button-service-${index}`}
                >
                  <span className="font-mono-marqo text-[10px] text-[#CDF22B]">
                    {service.number}
                  </span>
                  <span className="font-display text-[clamp(2rem,5vw,5rem)] font-semibold leading-none tracking-[-.08em]">
                    {service.title}
                  </span>
                  <span
                    className={`ml-auto flex h-10 w-10 shrink-0 items-center justify-center border border-[#1E45FB]/30 transition-transform ${open === index ? 'rotate-45 bg-[#CDF22B] text-[#1E45FB]' : ''
                      }`}
                  >
                    <Plus size={18} />
                  </span>
                </button>
                {open === index && (
                  <div className="grid gap-8 pb-10 pl-10 md:grid-cols-[1fr_1fr] md:pl-16">
                    <p className="max-w-[470px] text-lg leading-[1.5] text-[#536078]">
                      {service.copy}
                    </p>
                    <p className="font-mono-marqo text-[10px] uppercase leading-[2] tracking-[.13em]">
                      {service.tags}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#1E45FB] px-6 py-16 text-[#f3f0e9] md:px-16 md:py-24">
          <SectionLabel number="02">How to start with me</SectionLabel>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              [
                'A quick spark',
                'A focused workshop to find the idea hiding in plain sight.',
                'Let’s talk'
              ],
              [
                'A full world',
                'Strategy, identity, and a motion system your team can run with.',
                'Let’s talk'
              ],
              [
                'The big picture',
                'An end-to-end launch film with all the beautiful bits.',
                'Let’s talk'
              ]
            ].map(([title, copy, price], i) => (
              <div key={title} className="border-t border-[#f3f0e9]/25 pt-5">
                <span className="font-mono-marqo text-[10px] text-[#CDF22B]">0{i + 1}</span>
                <h2 className="mt-12 font-display text-3xl font-semibold tracking-[-.06em]">
                  {title}
                </h2>
                <p className="mt-4 min-h-14 text-sm leading-[1.5] text-[#a7afbf]">{copy}</p>
                <p className="mt-10 font-mono-marqo text-[11px] uppercase tracking-[.13em] text-[#CDF22B]">
                  {price}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 flex justify-between border-t border-[#1E45FB]/20 pt-7">
          <span className="font-mono-marqo text-[10px] uppercase tracking-[.14em]">
            Not sure what you need?
          </span>
          <Link
            href="/contact"
            className="font-mono-marqo text-[10px] uppercase tracking-[.14em] text-[#CDF22B] hover:underline"
            data-testid="link-services-contact"
          >
            Let's figure it out <ArrowUpRight size={14} className="inline" />
          </Link>
        </div>
      </main>
    </Shell>
  );
}

function Contact() {
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does a typical motion design project look like?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Every project starts with a conversation, then a clear plan. A focused sprint can take three weeks; a full brand identity and 3D motion system tends to take eight to twelve weeks."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with in-house agency teams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. I slot into your team as an independent motion design director, bring my point of view, and leave you with a kinetic system you can actually use."
        }
      },
      {
        "@type": "Question",
        "name": "Can you animate an existing brand identity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "That is often where the most interesting work begins. I can add 3D animation, build a kinetic toolkit, or rethink the parts that are not pulling their weight."
        }
      }
    ]
  });

  usePageMeta(
    'Contact & Hire',
    'Hire an independent motion design studio based in Ivory Coast. Available for 3D animation and brand motion projects.',
    faqSchema
  );

  const [faq, setFaq] = useState<number | null>(null);
  return (
    <Shell>
      <main className="container-marqo pb-32 pt-36 md:pt-48">
        <section className="border-b border-[#1E45FB]/20 pb-20">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div>
              <SectionLabel>Start a conversation</SectionLabel>
              <h1 className="max-w-[700px] font-display text-[clamp(4rem,10vw,10rem)] font-semibold leading-[.78] tracking-[-.13em] text-[#1E45FB]">LET'S MAKE<br /><span className="text-[#CDF22B]">SOMETHING.</span></h1>
              <p className="mt-12 max-w-[430px] text-lg leading-[1.5] text-[#536078]">Tell me what you're thinking, even if it's still a little blurry. The good stuff usually starts that way.</p>
            </div>
            <div className="flex shrink-0 justify-center md:justify-end">
              <div className="section-avatar-outer"><div className="section-avatar-wrap"><div className="hero-glow" /><div className="hero-ring" /><div className="hero-ring-inner" /><img src="/PHOTO-2026-08-11-18-24-22.jpg" alt="MARQO Motion Design Studio Avatar" className="hero-avatar" loading="lazy" /></div></div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="mb-16">
            <SectionLabel number="01">The details</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 font-mono-marqo text-[11px] uppercase tracking-[.1em] max-w-[850px]">
              <div>
                <p className="text-[#536078]">Email</p>
                <a href="mailto:marqostudioss@gmail.com" className="mt-2 inline-block border-b border-[#1E45FB] pb-1 hover:text-[#CDF22B]" data-testid="link-email">marqostudioss@gmail.com</a>
              </div>
              <div>
                <p className="text-[#536078]">WhatsApp</p>
                <a href="https://wa.me/2250799836340" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block border-b border-[#1E45FB] pb-1 hover:text-[#CDF22B]" data-testid="link-whatsapp">+225 07 99 83 63 40</a>
              </div>
              <div>
                <p className="text-[#536078]">TikTok</p>
                <a href="https://www.tiktok.com/@marqo.motion" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block border-b border-[#1E45FB] pb-1 hover:text-[#CDF22B]" data-testid="link-tiktok">@marqo.motion</a>
              </div>
              <div>
                <p className="text-[#536078]">Instagram</p>
                <a href="https://www.instagram.com/marqo.motion?igsh=MWJlajB3eXN4bjAxeA==" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block border-b border-[#1E45FB] pb-1 hover:text-[#CDF22B]" data-testid="link-instagram-contact">@marqo.motion</a>
              </div>
              <div>
                <p className="text-[#536078]">Based in</p>
                <p className="mt-2">Ivory Coast / Côte D'Ivoire</p>
              </div>
              <div>
                <p className="text-[#536078]">Response time</p>
                <p className="mt-2">Usually within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <BookingCalendar />
          </div>
        </section>

        <section className="border-t border-[#1E45FB]/20 pt-12">
          <SectionLabel number="02">Good questions</SectionLabel>
          <div className="max-w-[850px] border-t border-[#1E45FB]/20">
            {[['What does a typical project look like?', 'Every project starts with a conversation, then a clear plan. A focused sprint can take three weeks; a full identity and motion system tends to take eight to twelve.'], ['Do you work with in-house teams?', 'Absolutely. I slot into your team, bring my point of view, and leave you with a system you can actually use.'], ['Can you help with an existing identity?', 'That is often where the most interesting work begins. I can add motion, build a toolkit, or rethink the parts that are not pulling their weight.']].map(([question, answer], index) => (
              <div key={question} className="border-b border-[#1E45FB]/20">
                <button onClick={() => setFaq(faq === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-6 text-left font-display text-xl font-semibold tracking-[-.04em]" data-testid={`button-faq-${index}`}>{question}<ChevronDown size={19} className={`shrink-0 transition-transform ${faq === index ? 'rotate-180 text-[#CDF22B]' : ''}`} /></button>
                {faq === index && <p className="max-w-[650px] pb-7 text-sm leading-[1.6] text-[#536078]">{answer}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>
    </Shell>
  );
}

function NotFound() {
  usePageMeta('Page not found', 'This MARQO page could not be found.');
  return <Shell><main className="container-marqo flex min-h-[75vh] flex-col justify-center py-32"><p className="font-mono-marqo text-[10px] uppercase tracking-[.15em] text-[#CDF22B]">Error 404 / Wrong turn</p><h1 className="mt-8 font-display text-[clamp(5rem,18vw,15rem)] font-semibold leading-[.75] tracking-[-.13em]">NOPE.</h1><Link href="/" className="mt-14 inline-flex items-center gap-3 font-mono-marqo text-[10px] uppercase tracking-[.14em] hover:text-[#CDF22B]" data-testid="link-not-found-home">Back to the beginning <ArrowUpRight size={15} /></Link></main></Shell>;
}

function Router() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <Switch><Route path="/" component={Home} /><Route path="/work" component={Work} /><Route path="/work/:slug" component={CaseStudy} /><Route path="/about" component={About} /><Route path="/services" component={Services} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;