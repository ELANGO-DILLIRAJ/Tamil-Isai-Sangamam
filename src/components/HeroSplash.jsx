'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin } from 'lucide-react';

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="relative">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center border border-gold/30 rounded-xl bg-canvas-deep/80 backdrop-blur-sm">
          <span className="text-2xl sm:text-3xl md:text-4xl font-catamaran font-bold text-gold-shimmer">
            {String(value).padStart(2, '0')}
          </span>
        </div>
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-b from-gold/20 to-transparent opacity-50 pointer-events-none" />
      </div>
      <span className="mt-2 text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-inter">
        {label}
      </span>
    </div>
  );
}

function FloatingParticle({ delay, size, x, y, color }) {
  return (
    <motion.div
      className={`particle ${color === 'gold' ? 'particle-gold' : 'particle-blue'}`}
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -80, -30, -100, 0],
        x: [0, 30, -20, 40, 0],
        opacity: [0.05, 0.2, 0.1, 0.15, 0.05],
        scale: [1, 1.5, 0.8, 1.2, 1],
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    />
  );
}

/* Animated audio waveform SVG */
function AudioWave() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
      <svg viewBox="0 0 800 200" className="w-full max-w-4xl" preserveAspectRatio="none">
        {[...Array(40)].map((_, i) => (
          <motion.rect
            key={i}
            x={i * 20}
            width="4"
            rx="2"
            fill="url(#waveGold)"
            initial={{ y: 100, height: 10 }}
            animate={{
              height: [10, 30 + Math.random() * 120, 10],
              y: [100, 40 - Math.random() * 60, 100],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.08,
              ease: 'easeInOut',
            }}
          />
        ))}
        <defs>
          <linearGradient id="waveGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FCF6BA" />
            <stop offset="100%" stopColor="#BF953F" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function HeroSplash() {
  const { t, isTamil } = useLanguage();
  const targetDate = useMemo(() => new Date('2026-10-01T10:00:00+05:30'), []);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calcTime() {
      const now = new Date();
      const diff = Math.max(0, targetDate - now);
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }
    setTimeLeft(calcTime());
    const interval = setInterval(() => setTimeLeft(calcTime()), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const titleText = t('hero.title');
  const words = typeof titleText === 'string' ? titleText.split(' ') : [];

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: i * 0.8,
        size: 40 + Math.random() * 120,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: i % 3 === 0 ? 'blue' : 'gold',
      })),
    []
  );

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden hero-canvas">
      {/* Floating particles */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} {...p} />
      ))}

      {/* Audio waveform background */}
      <AudioWave />

      {/* Dark scrim overlay */}
      <div className="absolute inset-0 bg-black/45 z-[1]" />

      {/* Radial glow accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-[120px] animate-glow-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-blue/5 blur-[100px] animate-glow-pulse z-0" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 sm:pt-28">
        
        {/* Split-text hero title */}
        <div className={`text-safe-hero mb-4 ${isTamil ? 'font-arima' : 'font-catamaran'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block mr-[0.3em] text-gold-shimmer"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className={`text-safe-title text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 ${
            isTamil ? 'font-noto-tamil' : 'font-inter'
          }`}
        >
          {t('hero.tagline')}
        </motion.p>

        {/* Countdown Timer Row (Single full line) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-8 mb-12 flex flex-col items-center justify-center text-center bg-canvas-deep/40 backdrop-blur-md rounded-3xl border border-gold/10 p-6 sm:p-8 shadow-xl shadow-gold/5"
        >
          <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-[0.4em] font-inter mb-4 block">
            {t('hero.countdownLabel')}
          </span>
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
            <CountdownUnit value={timeLeft.days} label={t('hero.days')} />
            <span className="text-gold/40 text-2xl font-light self-start mt-4 sm:mt-6 md:mt-8">:</span>
            <CountdownUnit value={timeLeft.hours} label={t('hero.hours')} />
            <span className="text-gold/40 text-2xl font-light self-start mt-4 sm:mt-6 md:mt-8">:</span>
            <CountdownUnit value={timeLeft.minutes} label={t('hero.minutes')} />
            <span className="text-gold/40 text-2xl font-light self-start mt-4 sm:mt-6 md:mt-8">:</span>
            <CountdownUnit value={timeLeft.seconds} label={t('hero.seconds')} />
          </div>
        </motion.div>

        {/* Event Introduction & Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left bg-canvas-deep/60 backdrop-blur-md rounded-3xl border border-gold/10 p-6 sm:p-8 md:p-10 shadow-2xl shadow-gold/5"
        >
          {/* Left Column: About & Location */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold text-gold-shimmer ${isTamil ? 'font-arima' : 'font-catamaran'}`}>
                {t('intro.title')}
              </h2>
              <p className={`text-sm sm:text-base text-gray-300 leading-relaxed ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>
                {t('intro.desc1')}
              </p>
              <p className={`text-xs sm:text-sm text-gray-400 leading-relaxed ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>
                {t('intro.desc2')}
              </p>
            </div>

            {/* Venue & Location block */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-canvas-deep/80 border border-gold/15 p-4 rounded-2xl">
              <div className="p-3 bg-gold/10 rounded-xl border border-gold/20 text-gold flex-shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="space-y-1">
                <span className="block text-xs uppercase tracking-wider text-gray-500 font-inter font-semibold">{t('intro.venueTitle')}</span>
                <span className="block text-sm sm:text-base text-gray-200 font-inter font-bold">{t('intro.venueName')}</span>
                <a
                  href="https://www.google.com/maps/place/Jawaharlal+Nehru+Stadium/@13.0861017,80.2650832,16.14z/data=!4m10!1m2!2m1!1snehru+stadium!3m6!1s0x3a5265fbe6a909ab:0x5a6046dfc9f0d784!8m2!3d13.0855653!4d80.2717282!15sCg1uZWhydSBzdGFkaXVtWg8iDW5laHJ1IHN0YWRpdW2SAQdzdGFkaXVt4AEA!16zL20vMDc4YzV5?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-gold hover:text-gold-light transition-colors gap-1 font-inter font-semibold underline underline-offset-4"
                >
                  {t('intro.viewMap')} ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: The Grandeur Stats */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:pl-6 lg:border-l border-gold/10">
            <h3 className={`text-lg font-bold text-gold-shimmer tracking-wider ${isTamil ? 'font-arima' : 'font-catamaran'}`}>
              {t('intro.scaleTitle')}
            </h3>
            <div className="grid grid-cols-2 gap-4 flex-grow">
              <div className="bg-canvas-deep/40 border border-gold/5 p-4 rounded-2xl flex flex-col justify-center space-y-1">
                <span className="block text-xl sm:text-2xl font-catamaran font-bold text-gold-shimmer">{t('intro.statArtists')}</span>
                <span className="block text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-inter">{t('intro.statArtistsSub')}</span>
              </div>
              <div className="bg-canvas-deep/40 border border-gold/5 p-4 rounded-2xl flex flex-col justify-center space-y-1">
                <span className="block text-xl sm:text-2xl font-catamaran font-bold text-gold-shimmer">{t('intro.statGuests')}</span>
                <span className="block text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-inter">{t('intro.statGuestsSub')}</span>
              </div>
              <div className="bg-canvas-deep/40 border border-gold/5 p-4 rounded-2xl flex flex-col justify-center space-y-1">
                <span className="block text-xl sm:text-2xl font-catamaran font-bold text-gold-shimmer">{t('intro.statHours')}</span>
                <span className="block text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-inter">{t('intro.statHoursSub')}</span>
              </div>
              <div className="bg-canvas-deep/40 border border-gold/5 p-4 rounded-2xl flex flex-col justify-center space-y-1">
                <span className="block text-xl sm:text-2xl font-catamaran font-bold text-gold-shimmer">{t('intro.statAttendees')}</span>
                <span className="block text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-inter">{t('intro.statAttendeesSub')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Motto ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-12 overflow-hidden"
        >
          <div className="ticker-track">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className={`mx-8 text-lg sm:text-xl text-gold/30 whitespace-nowrap tracking-[0.2em] ${
                  isTamil ? 'font-arima' : 'font-catamaran'
                }`}
              >
                {t('hero.motto')} ✦
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-canvas-deep to-transparent z-10" />
    </section>
  );
}
