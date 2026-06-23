'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const chiefGuestsData = [
  {
    key: 'vijay',
    image: '/Special Guest/ChiefMinister of TN Joseph Vijay.jpg',
  },
  {
    key: 'stalin',
    image: '/Special Guest/Former CM mk-stalin.jpg',
  },
  {
    key: 'kamal',
    image: '/Special Guest/Actor Ulaga Nayagan Kamal Haasan.webp',
  },
  {
    key: 'rajini',
    image: '/Special Guest/Actor Superstar Rajinikanth.jpg',
  },
  {
    key: 'maniratnam',
    image: '/Special Guest/Director Mani Ratnam.jpg',
  },
  {
    key: 'shankar',
    image: '/Special Guest/Director Shankar.jpg',
  },
];

function ChiefGuestCard({ guest, index }) {
  const { t, isTamil } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative mb-16 md:mb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}>
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 100 : -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full md:w-2/5 flex-shrink-0"
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative overflow-hidden rounded-xl border-gold-glow-strong transition-[transform] duration-200 ease-out cursor-pointer group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={guest.image}
                  alt={t(`chiefGuests.${guest.key}.name`)}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                {/* Dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-canvas-deep via-transparent to-transparent" />
              </div>
              {/* Gold glow pulse underneath */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gold/20 rounded-full blur-xl animate-glow-pulse" />
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -100 : 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full md:w-3/5"
          >
            {/* CHIEF GUEST label */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-4"
            >
              <span className="text-[10px] sm:text-xs text-gold/60 tracking-[0.4em] uppercase font-inter">
                {isTamil ? 'தலைமை விருந்தினர்' : 'Chief Guest'}
              </span>
            </motion.div>

            {/* Name */}
            <h3 className={`text-safe-title text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-gold-shimmer ${
              isTamil ? 'font-arima' : 'font-catamaran'
            }`}>
              {t(`chiefGuests.${guest.key}.name`)}
            </h3>

            {/* Title */}
            <p className={`text-safe-body text-sm sm:text-base text-gold/70 mb-4 tracking-wider ${
              isTamil ? 'font-noto-tamil' : 'font-inter'
            }`}>
              {t(`chiefGuests.${guest.key}.title`)}
            </p>

            {/* Description */}
            <p className={`text-safe-body text-sm sm:text-base text-gray-400 leading-relaxed max-w-lg ${
              isTamil ? 'font-noto-tamil' : 'font-inter'
            }`}>
              {t(`chiefGuests.${guest.key}.desc`)}
            </p>

            {/* Decorative line */}
            <div className="mt-6 w-24 h-[2px] bg-gradient-to-r from-gold-mid to-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ChiefGuests() {
  const { t, isTamil } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section id="chief-guests" className="relative py-24 md:py-32 bg-canvas-deep overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gold/[0.03] blur-[100px]" />
      <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-neon-blue/[0.02] blur-[80px]" />

      {/* Section header */}
      <div ref={sectionRef} className="text-center mb-16 md:mb-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] sm:text-xs text-gold/40 tracking-[0.5em] uppercase font-inter block mb-4">
            ✦ {isTamil ? 'கௌரவம்' : 'Prestige'} ✦
          </span>
          <h2 className={`text-safe-hero text-4xl sm:text-5xl md:text-6xl font-bold text-gold-shimmer mb-4 ${
            isTamil ? 'font-arima' : 'font-catamaran'
          }`}>
            {t('chiefGuests.sectionTitle')}
          </h2>
          <p className={`text-safe-body text-base sm:text-lg text-gray-500 ${
            isTamil ? 'font-noto-tamil' : 'font-inter'
          }`}>
            {t('chiefGuests.sectionSubtitle')}
          </p>
        </motion.div>
      </div>

      {/* Chief Guest Cards */}
      {chiefGuestsData.map((guest, i) => (
        <ChiefGuestCard key={guest.key} guest={guest} index={i} />
      ))}

      {/* Bottom divider */}
      <div className="section-divider max-w-4xl mx-auto mt-8" />
    </section>
  );
}
