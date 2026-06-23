'use client';

import { useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Film, Mic2, PenTool, Clapperboard, Star } from 'lucide-react';

const guestCategories = [
  {
    key: 'actors',
    label: 'Actors',
    labelTa: 'நடிகர்கள்',
    icon: Film,
    color: '#00D4FF',
    guests: [
      { name: 'Aamir Khan', image: '/Special Guest/Actor Aamir Khan.jpg' },
      { name: 'Amitabh Bachchan', image: '/Special Guest/Actor Amitabh Bachchan.webp' },
      { name: 'Dhanush', image: '/Special Guest/Actor Dhanush.jpg' },
      { name: 'Dulquer Salmaan', image: '/Special Guest/Actor Dulquer.jpg' },
      { name: 'Karthick', image: '/Special Guest/Actor Karthick.jpg' },
      { name: 'Mammootty', image: '/Special Guest/Actor Mamooty.jpg' },
      { name: 'Mohanlal', image: '/Special Guest/Actor Mohanlal.jpg' },
      { name: 'Prabhu', image: '/Special Guest/Actor Prabhu.jpg' },
      { name: 'Shah Rukh Khan', image: '/Special Guest/Actor Shah Rukh Khan.jpg' },
      { name: 'Sivakarthikeyan', image: '/Special Guest/Actor SivaKathikeyan.png' },
      { name: 'Suriya', image: '/Special Guest/Actor Suriya.jpg' },
      { name: 'Vikram Prabhu', image: '/Special Guest/Actor Vikram Prabhu.jpg' },
      { name: 'Chiyaan Vikram', image: '/Special Guest/Actor Vikram.jpg' },
      { name: 'Yash', image: '/Special Guest/Actor Yash.jpg' },
    ],
  },
  {
    key: 'actresses',
    label: 'Actresses',
    labelTa: 'நடிகைகள்',
    icon: Star,
    color: '#FF00FF',
    guests: [
      { name: 'Aishwarya Rai', image: '/Special Guest/Actress Aishwarya Rai.jpg' },
      { name: 'Nayanthara', image: '/Special Guest/Actress Nayanthara.webp' },
      { name: 'Sai Pallavi', image: '/Special Guest/Actress Sai Pallavi.jpg' },
      { name: 'Saranya Ponvannan', image: '/Special Guest/Actress Saranya.webp' },
      { name: 'Trisha', image: '/Special Guest/Actress Trisha.jpg' },
      { name: 'Urvashi', image: '/Special Guest/Actress Urvashi.jpg' },
      { name: 'Samantha', image: '/Special Guest/Actress samantha ruth prabhu.jpg' },
    ],
  },
  {
    key: 'directors',
    label: 'Directors & Filmmakers',
    labelTa: 'இயக்குனர்கள்',
    icon: Clapperboard,
    color: '#D4AF37',
    guests: [
      { name: 'Lokesh Kanagaraj', image: '/Special Guest/Director Lokesh Kanagaraj.webp' },
      { name: 'Nelson Dilipkumar', image: '/Special Guest/Director Nelson.webp' },
      { name: 'K. Bhagyaraj', image: '/Special Guest/Bhagyaraj.jpg' },
    ],
  },
  {
    key: 'lyricists',
    label: 'Lyricists',
    labelTa: 'பாடலாசிரியர்கள்',
    icon: PenTool,
    color: '#22C55E',
    guests: [
      { name: 'Kabilan Vairamuthu', image: '/Special Guest/Lyricist Kabilan.jpg' },
      { name: 'Madhan Karky', image: '/Special Guest/Lyricist Madhan Karky.avif' },
      { name: 'Thamarai', image: '/Special Guest/Lyricist Thamamrai.jpg' },
      { name: 'Vairamuthu', image: '/Special Guest/Lyricist Vairamuthu.jpg' },
    ],
  },
];

function GuestCard({ guest, index, accentColor }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3) }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-xl bg-canvas border border-white/5 cursor-pointer group"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out, border-color 0.4s, box-shadow 0.4s',
          borderColor: isHovered ? `${accentColor}50` : undefined,
          boxShadow: isHovered ? `0 0 25px ${accentColor}20, 0 0 50px ${accentColor}10` : 'none',
        }}
      >
        {/* Portrait */}
        <div className="aspect-[3/4] relative overflow-hidden">
          <Image
            src={guest.image}
            alt={guest.name}
            fill
            className={`object-cover object-top transition-all duration-500 ${
              isHovered ? 'scale-110 grayscale-0 saturate-[1.2]' : 'grayscale-[0.6]'
            }`}
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-canvas-deep via-canvas-deep/20 to-transparent" />

          {/* Accent line at top on hover */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
            style={{
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              opacity: isHovered ? 1 : 0,
            }}
          />
        </div>

        {/* Name */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h4 className="text-xs sm:text-sm font-catamaran font-bold text-white truncate leading-tight">
            {guest.name}
          </h4>
          {/* Glowing dot */}
          <div className="flex items-center gap-1.5 mt-1">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
            />
            <span className="text-[9px] text-gray-500 font-inter tracking-wider uppercase">Special Guest</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CategorySection({ category }) {
  const { isTamil } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = category.icon;

  return (
    <div ref={ref} className="mb-14 md:mb-20">
      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-6"
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${category.color}12`, border: `1px solid ${category.color}25` }}
        >
          <Icon className="w-4 h-4" style={{ color: category.color }} />
        </div>
        <div>
          <h3
            className={`text-lg sm:text-xl font-bold ${isTamil ? 'font-arima' : 'font-catamaran'}`}
            style={{ color: category.color }}
          >
            {isTamil ? category.labelTa : category.label}
          </h3>
          <div className="w-12 h-[1px] mt-1" style={{ background: `linear-gradient(90deg, ${category.color}, transparent)` }} />
        </div>
      </motion.div>

      {/* Guest Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4">
        {category.guests.map((guest, i) => (
          <GuestCard key={guest.name} guest={guest} index={i} accentColor={category.color} />
        ))}
      </div>
    </div>
  );
}

export default function SpecialGuests() {
  const { t, isTamil } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section id="special-guests" className="relative py-24 md:py-32 bg-canvas-deep overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-neon-magenta/[0.02] blur-[120px]" />
      <div className="absolute bottom-40 right-10 w-72 h-72 rounded-full bg-neon-blue/[0.02] blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.015] blur-[150px]" />

      {/* Section Header */}
      <div ref={sectionRef} className="text-center mb-16 md:mb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] sm:text-xs text-gold/40 tracking-[0.5em] uppercase font-inter block mb-4">
            ✦ {isTamil ? 'சிறப்பு' : 'Honour'} ✦
          </span>
          <h2 className={`text-safe-hero text-4xl sm:text-5xl md:text-6xl font-bold text-gold-shimmer mb-4 ${
            isTamil ? 'font-arima' : 'font-catamaran'
          }`}>
            {t('specialGuests.sectionTitle')}
          </h2>
          <p className={`text-safe-body text-base sm:text-lg text-gray-500 max-w-xl mx-auto ${
            isTamil ? 'font-noto-tamil' : 'font-inter'
          }`}>
            {t('specialGuests.sectionSubtitle')}
          </p>
        </motion.div>
      </div>

      {/* Category Grids */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {guestCategories.map((category) => (
          <CategorySection key={category.key} category={category} />
        ))}
      </div>

      {/* Bottom divider */}
      <div className="section-divider max-w-4xl mx-auto mt-8" />
    </section>
  );
}
