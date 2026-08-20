import { useState } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mic, Video, FileText, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Brief & Intake',
    description:
      'We send a structured intake form. You share your brand assets, UI references, and inspiration videos. If you have a script ready, include it — if not, we write it together.',
    visual: 'intake',
  },
  {
    id: 2,
    title: 'Storyboard & Script',
    description:
      'We build a visual storyboard and refine the script together until the concept is locked. Every scene is mapped and approved before a single frame is animated.',
    visual: 'storyboard',
  },
  {
    id: 3,
    title: 'Finalization Call',
    description:
      'A short WhatsApp call to walk through the storyboard and confirm the creative direction is exactly right. No surprises once production begins.',
    visual: 'call',
  },
  {
    id: 4,
    title: 'Production',
    description:
      'We animate the full video: motion graphics, UI animation, sound design, and voiceover sync — all matched to your brand. Delivered within 10 business days.',
    visual: 'production',
  },
  {
    id: 5,
    title: 'Revision & Delivery',
    description:
      'You review the draft and leave feedback. We apply one round of revisions, then deliver the final file in your required format — MP4, MOV, GIF, whatever you need.',
    visual: 'delivery',
  },
];

/* ── Right-panel visuals ─────────────────────────────── */

function IntakeVisual() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#1E45FB] text-[#CDF22B] px-5 py-3 font-mono-marqo text-[10px] uppercase tracking-[.15em] rounded-t-xl">
        Project Intake Form
      </div>
      <div className="flex-1 bg-[#f3f0e9] rounded-b-xl p-6 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="h-9 bg-white border border-[#1E45FB]/20 rounded-lg" />
          <div className="h-9 bg-white border border-[#1E45FB]/20 rounded-lg" />
        </div>
        <div className="h-9 bg-white border border-[#1E45FB]/20 rounded-lg" />
        <div className="h-9 bg-white border border-[#1E45FB]/20 rounded-lg w-3/4" />
        <div className="h-24 bg-white border border-[#1E45FB]/20 rounded-lg" />
        <div className="flex items-center gap-2 mt-1">
          <div className="w-6 h-6 rounded-full bg-[#1E45FB]/10 flex items-center justify-center shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#1E45FB]" />
          </div>
          <div className="h-8 bg-white border border-[#1E45FB]/20 rounded-lg flex-1" />
        </div>
        <div className="mt-auto h-10 bg-[#1E45FB] rounded-full flex items-center justify-center">
          <span className="text-[#CDF22B] font-mono-marqo text-[10px] uppercase tracking-[.15em] font-bold">Submit</span>
        </div>
      </div>
    </div>
  );
}

function StoryboardVisual() {
  const scenes = ['Opening', 'Problem', 'Solution', 'Feature 1', 'Feature 2', 'CTA'];
  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#18181b] rounded-t-xl px-4 py-2.5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center font-mono-marqo text-[10px] text-white/50 uppercase tracking-wider">
          MARQO — Storyboard v2.fig
        </div>
        <div className="bg-[#CDF22B] text-[#1E45FB] text-[9px] font-bold px-2 py-0.5 rounded font-mono-marqo uppercase">Share</div>
      </div>
      <div className="flex-1 bg-[#1c1c1e] rounded-b-xl p-4">
        <p className="text-white/40 font-mono-marqo text-[9px] uppercase tracking-wider mb-3">Page 1 — Storyboard</p>
        <div className="grid grid-cols-3 gap-2">
          {scenes.map((scene) => (
            <div key={scene} className="flex flex-col gap-1">
              <div className="aspect-[4/3] bg-[#2c2c2e] rounded-lg flex items-center justify-center border border-white/5">
                <div className="space-y-1 w-3/4">
                  <div className="h-1 bg-white/20 rounded" />
                  <div className="h-1 bg-white/15 rounded w-3/4" />
                  <div className="h-1 bg-white/10 rounded w-1/2" />
                </div>
              </div>
              <p className="text-white/40 font-mono-marqo text-[8px] text-center">{scene}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CallVisual() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#18181b] rounded-t-xl px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center">
            <MessageCircle size={9} className="text-white" />
          </div>
          <span className="font-mono-marqo text-[10px] text-white/70 uppercase tracking-wider">WhatsApp Call</span>
        </div>
        <span className="font-mono-marqo text-[10px] text-white/40">15:24</span>
      </div>
      <div className="flex-1 bg-[#1c1c1e] rounded-b-xl p-4 flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2 flex-1">
          {[
            { initial: 'G', name: 'Gopinath', active: true },
            { initial: 'A', name: 'Alex', active: false },
            { initial: 'J', name: 'Jordan', active: false },
          ].map((person) => (
            <div
              key={person.name}
              className={`rounded-xl flex flex-col items-center justify-center gap-2 py-4 border ${
                person.active ? 'border-[#CDF22B]/50 bg-[#2c2c2e]' : 'border-white/5 bg-[#2c2c2e]'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-lg ${
                person.active ? 'bg-[#1E45FB] text-[#CDF22B]' : 'bg-[#3c3c3e] text-white/60'
              }`}>
                {person.initial}
              </div>
              <p className="font-mono-marqo text-[9px] text-white/50 uppercase">{person.name}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 pt-2">
          <button className="w-10 h-10 rounded-full bg-[#2c2c2e] flex items-center justify-center border border-white/10">
            <Mic size={14} className="text-white/60" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#2c2c2e] flex items-center justify-center border border-white/10">
            <Video size={14} className="text-white/60" />
          </button>
          <button className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30">
            <div className="w-5 h-2 bg-white rounded-full rotate-[135deg]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductionVisual() {
  const tracks = [
    { label: 'Motion Graphics', color: '#1E45FB', width: '75%' },
    { label: 'Voiceover', color: '#CDF22B', width: '55%' },
    { label: 'Music', color: '#f59e0b', width: '80%' },
    { label: 'SFX', color: '#a855f7', width: '45%' },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#18181b] rounded-t-xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#1E45FB] flex items-center justify-center">
            <Play size={12} className="text-[#CDF22B] fill-[#CDF22B]" />
          </div>
          <div>
            <p className="font-mono-marqo text-[9px] text-white/60 uppercase">Brand Film v3.mp4</p>
            <p className="font-mono-marqo text-[10px] text-white font-bold">00:34 / 01:41</p>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-[#1c1c1e] rounded-b-xl p-4">
        <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center border border-white/5">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <Play size={18} className="text-white fill-white ml-1" />
          </div>
        </div>
        <div className="space-y-2">
          {tracks.map((track) => (
            <div key={track.label} className="flex items-center gap-3">
              <p className="font-mono-marqo text-[9px] text-white/50 w-[90px] shrink-0 uppercase">{track.label}</p>
              <div className="flex-1 h-3 bg-[#2c2c2e] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: track.width, backgroundColor: track.color, opacity: 0.85 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeliveryVisual() {
  const comments = [
    { initial: 'G', name: 'Gopinath', time: '9:15', text: 'Can we nudge the logo slightly to the left here?', reply: '1 reply' },
    { initial: 'J', name: 'Jordan K.', time: '9:42', text: 'Love this transition — keep exactly as is.' },
    { initial: 'G', name: 'Gopinath', time: '1:14', text: 'The headline text feels a touch small. Can we go up one size?', reply: '2 replies' },
    { initial: 'J', name: 'Jordan K.', time: '1:18', text: 'Sound design is perfect. No notes.' },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#f3f0e9] border border-[#1E45FB]/20 rounded-t-xl px-5 py-3 flex items-center justify-between">
        <p className="font-display font-semibold text-[#1E45FB] text-sm tracking-tight">Revision Comments</p>
        <div className="bg-[#CDF22B] text-[#1E45FB] font-mono-marqo text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">4 comments</div>
      </div>
      <div className="flex-1 bg-white border border-[#1E45FB]/10 border-t-0 rounded-b-xl p-4 overflow-y-auto space-y-1">
        {comments.map((c, i) => (
          <div key={i} className="flex gap-3 py-3 border-b border-[#1E45FB]/10 last:border-0">
            <div className="w-7 h-7 rounded-full bg-[#1E45FB]/10 text-[#1E45FB] flex items-center justify-center font-display font-bold text-xs shrink-0">
              {c.initial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-display font-semibold text-[#1E45FB] text-xs tracking-tight">{c.name}</p>
                <p className="font-mono-marqo text-[9px] text-[#1E45FB] shrink-0">{c.time}</p>
              </div>
              <p className="text-[#536078] text-xs mt-0.5 leading-relaxed">{c.text}</p>
              {c.reply && <p className="font-mono-marqo text-[9px] text-[#1E45FB]/60 mt-1 uppercase tracking-wider">{c.reply}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Play } from 'lucide-react';

const visualMap: Record<string, React.ReactElement> = {
  intake: <IntakeVisual />,
  storyboard: <StoryboardVisual />,
  call: <CallVisual />,
  production: <ProductionVisual />,
  delivery: <DeliveryVisual />,
};

/* ── Main Component ─────────────────────────────────── */

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep];

  return (
    <section className="container-marqo py-24 md:py-36">
      {/* Header */}
      <div className="mb-14">
        <p className="font-mono-marqo text-[10px] uppercase tracking-[.2em] text-[#CDF22B] bg-[#1E45FB] inline-block px-3 py-1 rounded-full mb-5">
          ✦ How it works
        </p>
        <h2 className="font-display text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[.9] tracking-[-.09em] text-[#1E45FB]">
          Five steps from brief<br />
          to <span className="text-[#CDF22B]">final file.</span>
        </h2>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-10 items-start">

        {/* Left: Step list */}
        <div className="flex flex-col gap-2">
          {steps.map((step, i) => {
            const isActive = i === activeStep;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(i)}
                className={`w-full text-left rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-[#1E45FB] shadow-xl shadow-[#1E45FB]/20'
                    : 'bg-white border border-[#1E45FB]/15 hover:border-[#1E45FB]/40 hover:bg-[#1E45FB]/3'
                }`}
              >
                <div className={`flex items-center gap-4 px-6 py-5 ${isActive && step.description ? '' : ''}`}>
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-mono-marqo text-[11px] font-bold shrink-0 transition-colors duration-300 ${
                      isActive
                        ? 'bg-[#CDF22B] text-[#1E45FB]'
                        : 'bg-[#1E45FB]/10 text-[#1E45FB]'
                    }`}
                  >
                    {String(step.id).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display font-semibold tracking-tight text-lg transition-colors duration-300 ${
                      isActive ? 'text-[#f3f0e9]' : 'text-[#1E45FB]'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[#f3f0e9]/80 text-sm leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* Right: Visual panel */}
        <div className="lg:sticky lg:top-28 h-[360px] md:h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.visual}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              {visualMap[current.visual]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
