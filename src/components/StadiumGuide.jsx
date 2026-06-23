'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Shield, Heart, Users, Star, AlertTriangle } from 'lucide-react';

const zones = [
  {
    id: 'main-stage',
    labelKey: 'stadium.mainStage',
    color: '#D4AF37',
    icon: Star,
    coords: { top: '15%', left: '35%', width: '30%', height: '20%' },
  },
  {
    id: 'general-admission',
    labelKey: 'stadium.generalAdmission',
    color: '#00D4FF',
    icon: Users,
    coords: { top: '40%', left: '15%', width: '70%', height: '25%' },
  },
  {
    id: 'vvip',
    labelKey: 'stadium.vvip',
    color: '#FF00FF',
    icon: Shield,
    coords: { top: '35%', left: '5%', width: '15%', height: '30%' },
  },
  {
    id: 'senior-zone',
    labelKey: 'stadium.seniorZone',
    noteKey: 'stadium.seniorNote',
    color: '#22C55E',
    icon: Heart,
    coords: { top: '35%', left: '80%', width: '15%', height: '30%' },
  },
  {
    id: 'medical',
    labelKey: 'stadium.medical',
    color: '#EF4444',
    icon: Heart,
    coords: { top: '70%', left: '10%', width: '15%', height: '15%' },
  },
  {
    id: 'emergency',
    labelKey: 'stadium.emergency',
    color: '#EF4444',
    icon: AlertTriangle,
    coords: { top: '70%', left: '75%', width: '15%', height: '15%' },
  },
  {
    id: 'ambulance',
    labelKey: 'stadium.ambulance',
    color: '#EF4444',
    icon: Heart,
    coords: { top: '85%', left: '35%', width: '30%', height: '10%' },
  },
];

function ZoneOverlay({ zone, isActive, onClick }) {
  const { t } = useLanguage();
  const Icon = zone.icon;

  return (
    <div
      className="absolute cursor-pointer transition-all duration-300 rounded-lg group"
      style={{
        top: zone.coords.top,
        left: zone.coords.left,
        width: zone.coords.width,
        height: zone.coords.height,
      }}
      onClick={() => onClick(zone.id)}
    >
      {/* Zone highlight */}
      <div
        className={`absolute inset-0 rounded-lg transition-all duration-300 ${
          isActive ? 'opacity-40' : 'opacity-0 group-hover:opacity-20'
        }`}
        style={{
          backgroundColor: zone.color,
          border: `2px solid ${zone.color}`,
          boxShadow: isActive ? `0 0 20px ${zone.color}40, inset 0 0 20px ${zone.color}20` : 'none',
        }}
      />

      {/* Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: zone.color }} />
        <span
          className="text-[8px] sm:text-[10px] font-inter font-bold tracking-wider whitespace-nowrap px-1.5 py-0.5 rounded"
          style={{ color: zone.color, backgroundColor: `${zone.color}15` }}
        >
          {t(zone.labelKey)}
        </span>
      </div>
    </div>
  );
}

export default function StadiumGuide() {
  const { t, isTamil } = useLanguage();
  const [activeZone, setActiveZone] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  const activeData = zones.find((z) => z.id === activeZone);

  return (
    <section id="stadium-guide" className="relative py-24 md:py-32 bg-canvas-deep overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-gold/[0.02] blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={sectionRef} className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] sm:text-xs text-gold/40 tracking-[0.5em] uppercase font-inter block mb-4">
              ✦ {isTamil ? 'அரங்க வரைபடம்' : 'Arena Map'} ✦
            </span>
            <h2 className={`text-safe-hero text-4xl sm:text-5xl md:text-6xl font-bold text-gold-shimmer mb-4 ${
              isTamil ? 'font-arima' : 'font-catamaran'
            }`}>
              {t('stadium.sectionTitle')}
            </h2>
            <p className={`text-safe-body text-base sm:text-lg text-gray-500 ${
              isTamil ? 'font-noto-tamil' : 'font-inter'
            }`}>
              {t('stadium.sectionSubtitle')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Interactive map */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden border-gold-glow">
              {/* Stadium image */}
              <div className="relative aspect-[16/10]">
                <Image
                  src="/Stage/Stadium.jpg"
                  alt="Stadium layout"
                  fill
                  className="object-cover opacity-60"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-canvas-deep/50" />

                {/* Zone overlays */}
                {zones.map((zone) => (
                  <ZoneOverlay
                    key={zone.id}
                    zone={zone}
                    isActive={activeZone === zone.id}
                    onClick={setActiveZone}
                  />
                ))}
              </div>
            </div>

            {/* Stage block images */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/5">
                <Image
                  src="/Stage/stage block.jpg"
                  alt="Stage block layout"
                  fill
                  className="object-cover opacity-50"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-canvas-deep/40" />
                <div className="absolute bottom-2 left-3 text-[10px] text-gold/50 font-inter tracking-wider">
                  Stage Block
                </div>
              </div>
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/5">
                <Image
                  src="/Stage/block 1.jpg"
                  alt="Seating block layout"
                  fill
                  className="object-cover opacity-50"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-canvas-deep/40" />
                <div className="absolute bottom-2 left-3 text-[10px] text-gold/50 font-inter tracking-wider">
                  Seating Block
                </div>
              </div>
            </div>
          </div>

          {/* Zone legend & details panel */}
          <div className="space-y-3">
            {/* Legend items */}
            {zones.map((zone) => {
              const Icon = zone.icon;
              const isActive = activeZone === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(isActive ? null : zone.id)}
                  className={`w-full flex items-start gap-3 p-3 sm:p-4 rounded-xl border transition-all duration-300 text-left ${
                    isActive
                      ? 'glass-panel border-opacity-40'
                      : 'bg-transparent border-white/5 hover:border-white/10'
                  }`}
                  style={{ borderColor: isActive ? `${zone.color}40` : undefined }}
                >
                  <div
                    className="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: `${zone.color}15` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: zone.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isTamil ? 'font-noto-tamil' : 'font-inter'}`} style={{ color: zone.color }}>
                      {t(zone.labelKey)}
                    </p>
                    {isActive && zone.noteKey && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={`text-xs text-gray-400 mt-1 ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}
                      >
                        {t(zone.noteKey)}
                      </motion.p>
                    )}
                  </div>
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: zone.color }} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="section-divider max-w-4xl mx-auto mt-16" />
    </section>
  );
}
