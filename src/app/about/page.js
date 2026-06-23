'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Users, UserCheck, ShieldAlert, Calendar, Music } from 'lucide-react';

export default function AboutPage() {
  const { t, isTamil } = useLanguage();

  const titleText = t('aboutPage.title');
  const words = typeof titleText === 'string' ? titleText.split(' ') : [];

  const buttons = [
    {
      href: '/#chief-guests',
      label: t('aboutPage.btnChiefGuests'),
      icon: Users,
      color: 'from-gold-mid to-gold-dark',
      shadow: 'shadow-gold/20',
      border: 'border-gold/30',
    },
    {
      href: '/#special-guests',
      label: t('aboutPage.btnSpecialGuests'),
      icon: UserCheck,
      color: 'from-neon-blue to-indigo-600',
      shadow: 'shadow-neon-blue/20',
      border: 'border-neon-blue/30',
    },
    {
      href: '/lineup',
      label: t('aboutPage.btnLineup'),
      icon: Music,
      color: 'from-neon-magenta to-purple-600',
      shadow: 'shadow-neon-magenta/20',
      border: 'border-neon-magenta/30',
    },
    {
      href: '/schedule',
      label: t('aboutPage.btnSchedule'),
      icon: Calendar,
      color: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/20',
      border: 'border-emerald-500/30',
    },
    {
      href: '/safety',
      label: t('aboutPage.btnTerms'),
      icon: ShieldAlert,
      color: 'from-neon-crimson to-red-700',
      shadow: 'shadow-neon-crimson/20',
      border: 'border-neon-crimson/30',
    },
  ];

  return (
    <main className="relative min-h-screen bg-canvas-deep overflow-hidden pt-24 pb-16 sm:pt-28">
      {/* Cinematic Background Canvas */}
      <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-[120px] animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-blue/5 blur-[100px] animate-glow-pulse pointer-events-none" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Title Reveal */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 ${isTamil ? 'font-arima' : 'font-catamaran'}`}>
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block mr-[0.3em] text-gold-shimmer"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={`text-sm sm:text-base text-gold/70 tracking-widest uppercase ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}
          >
            {t('aboutPage.subtitle')}
          </motion.p>
        </div>

        {/* Detailed Description Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="glass-panel border-gold/10 p-6 sm:p-10 rounded-3xl shadow-2xl mb-12 space-y-6"
        >
          <h2 className={`text-xl sm:text-2xl font-bold text-gold-shimmer ${isTamil ? 'font-arima' : 'font-catamaran'}`}>
            {t('aboutPage.introTitle')}
          </h2>
          <div className={`space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>
            <p>{t('aboutPage.para1')}</p>
            <p>{t('aboutPage.para2')}</p>
            <p>{t('aboutPage.para3')}</p>
          </div>
        </motion.div>

        {/* Navigation Grid Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h3 className={`text-xl sm:text-2xl font-bold text-white mb-2 ${isTamil ? 'font-arima' : 'font-catamaran'}`}>
              {t('aboutPage.navigateTitle')}
            </h3>
            <p className={`text-xs sm:text-sm text-gray-500 ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>
              {t('aboutPage.navigateSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {buttons.map((btn, idx) => {
              const Icon = btn.icon;
              return (
                <motion.div
                  key={btn.href}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={btn.href}
                    className={`flex items-center gap-4 p-4 rounded-2xl bg-canvas-deep border ${btn.border} hover:bg-canvas transition-colors duration-300 shadow-lg hover:${btn.shadow} group h-full`}
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${btn.color} text-canvas-deep flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold text-white group-hover:text-gold transition-colors ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>
                        {btn.label}
                      </span>
                      <span className="text-[10px] text-gray-500 font-inter uppercase tracking-wider mt-0.5">
                        {isTamil ? 'ஆராய்க ↗' : 'Explore ↗'}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </main>
  );
}
