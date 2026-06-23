'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Sun, CloudSun, Sunset, Moon } from 'lucide-react';

const phases = [
  {
    key: 'morning',
    phaseClass: 'phase-morning',
    icon: Sun,
    accentColor: '#D4AF37',
    bgGlow: 'rgba(212, 175, 55, 0.08)',
  },
  {
    key: 'afternoon',
    phaseClass: 'phase-afternoon',
    icon: CloudSun,
    accentColor: '#4A90D9',
    bgGlow: 'rgba(74, 144, 217, 0.08)',
  },
  {
    key: 'evening',
    phaseClass: 'phase-evening',
    icon: Sunset,
    accentColor: '#DC143C',
    bgGlow: 'rgba(220, 20, 60, 0.08)',
  },
  {
    key: 'night',
    phaseClass: 'phase-night',
    icon: Moon,
    accentColor: '#FF00FF',
    bgGlow: 'rgba(255, 0, 255, 0.08)',
  },
];

function TimelineNode({ phase, index }) {
  const { t, isTamil } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = phase.icon;
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-center mb-16 md:mb-24 ${phase.phaseClass}`}>
      <div className={`w-full flex flex-col md:flex-row items-center ${isLeft ? '' : 'md:flex-row-reverse'}`}>
        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full md:w-5/12"
        >
          <div
            className="relative p-6 sm:p-8 rounded-2xl glass-panel overflow-hidden group hover:border-[var(--phase-color)]/30 transition-colors duration-500"
            style={{ borderColor: `${phase.accentColor}15` }}
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              style={{ background: `radial-gradient(ellipse at center, ${phase.bgGlow}, transparent 70%)` }}
            />

            <div className="relative z-10">
              {/* Time badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-inter tracking-wider"
                style={{
                  backgroundColor: `${phase.accentColor}15`,
                  color: phase.accentColor,
                  border: `1px solid ${phase.accentColor}30`,
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {t(`schedule.${phase.key}.time`)}
              </div>

              {/* Session label */}
              <p
                className={`text-[10px] tracking-[0.3em] uppercase mb-2 ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}
                style={{ color: `${phase.accentColor}99` }}
              >
                {t(`schedule.${phase.key}.label`)}
              </p>

              {/* Title */}
              <h3
                className={`text-safe-title text-2xl sm:text-3xl font-bold mb-3 ${isTamil ? 'font-arima' : 'font-catamaran'}`}
                style={{ color: phase.accentColor }}
              >
                {t(`schedule.${phase.key}.title`)}
              </h3>

              {/* Description */}
              <p className={`text-safe-body text-sm text-gray-400 leading-relaxed ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>
                {t(`schedule.${phase.key}.desc`)}
              </p>

              {/* Mood tag */}
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.accentColor, boxShadow: `0 0 8px ${phase.accentColor}` }} />
                <span className="text-[10px] text-gray-500 tracking-widest uppercase font-inter">
                  {t(`schedule.${phase.key}.mood`)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center timeline node */}
        <div className="hidden md:flex w-2/12 justify-center relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200 }}
            className="relative z-10"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${phase.accentColor}20, ${phase.accentColor}05)`,
                border: `2px solid ${phase.accentColor}40`,
                boxShadow: `0 0 20px ${phase.accentColor}20`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: phase.accentColor }} />
            </div>
          </motion.div>
        </div>

        {/* Empty space */}
        <div className="hidden md:block w-5/12" />
      </div>
    </div>
  );
}

export default function TimeArc() {
  const { t, isTamil } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section id="schedule-preview" className="relative py-24 md:py-32 bg-canvas-deep overflow-hidden">
      {/* Vertical timeline line */}
      <div className="hidden md:block absolute left-1/2 top-48 bottom-32 w-px -translate-x-1/2">
        <div className="w-full h-full bg-gradient-to-b from-gold/20 via-neon-blue/20 via-neon-crimson/20 to-neon-magenta/20" />
      </div>

      {/* Section header */}
      <div ref={sectionRef} className="text-center mb-16 md:mb-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] sm:text-xs text-gold/40 tracking-[0.5em] uppercase font-inter block mb-4">
            ✦ {isTamil ? 'காலவரிசை' : 'Timeline'} ✦
          </span>
          <h2 className={`text-safe-hero text-4xl sm:text-5xl md:text-6xl font-bold text-gold-shimmer mb-4 ${
            isTamil ? 'font-arima' : 'font-catamaran'
          }`}>
            {t('schedule.sectionTitle')}
          </h2>
          <p className={`text-safe-body text-base sm:text-lg text-gray-500 max-w-xl mx-auto ${
            isTamil ? 'font-noto-tamil' : 'font-inter'
          }`}>
            {t('schedule.sectionSubtitle')}
          </p>
        </motion.div>
      </div>

      {/* Timeline nodes */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {phases.map((phase, i) => (
          <TimelineNode key={phase.key} phase={phase} index={i} />
        ))}
      </div>

      {/* Bottom divider */}
      <div className="section-divider max-w-4xl mx-auto mt-8" />
    </section>
  );
}
