'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldAlert, Volume2, Heart, Ban, ExternalLink, Ticket, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SafetyPage() {
  const { t, isTamil } = useLanguage();
  const tableRef = useRef(null);
  const isTableInView = useInView(tableRef, { once: true, margin: '-50px' });

  const prohibitedItems = t('safety.prohibited');
  const prohibitedList = Array.isArray(prohibitedItems) ? prohibitedItems : [];

  return (
    <div className="min-h-screen bg-canvas-deep pt-24 pb-16">
      {/* Header */}
      <div className="text-center px-4 mb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[10px] sm:text-xs text-gold/40 tracking-[0.5em] uppercase font-inter block mb-4">
            ✦ {isTamil ? 'கட்டாய வாசிப்பு' : 'Mandatory Read'} ✦
          </span>
          <h1 className={`text-safe-hero text-5xl sm:text-6xl md:text-7xl font-bold text-gold-shimmer mb-4 ${
            isTamil ? 'font-arima' : 'font-catamaran'
          }`}>
            {t('safety.sectionTitle')}
          </h1>
          <p className={`text-safe-body text-lg text-gray-500 max-w-2xl mx-auto ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>
            {t('safety.sectionSubtitle')}
          </p>
        </motion.div>
      </div>

      {/* Rules Table */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <motion.div
          ref={tableRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isTableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-panel rounded-2xl overflow-hidden border-gold-glow">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/10">
                  <th className="px-6 py-4 text-left text-[10px] text-gold/60 font-inter tracking-[0.3em] uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-[10px] text-gold/60 font-inter tracking-[0.3em] uppercase">Rule</th>
                  <th className="px-6 py-4 text-center text-[10px] text-gold/60 font-inter tracking-[0.3em] uppercase">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {/* Age Restriction */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-neon-crimson flex-shrink-0" />
                      <span className="text-sm font-inter text-gray-300">Age Restriction</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 text-sm text-gray-400 ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>
                    {t('safety.ageRestriction')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 text-[10px] bg-red-500/10 text-red-400 rounded-full font-inter tracking-wider">STRICT</span>
                  </td>
                </tr>

                {/* Decibel Warning */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span className="text-sm font-inter text-gray-300">Audio Levels</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 text-sm text-gray-400 ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>
                    {t('safety.decibelWarning')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 text-[10px] bg-amber-500/10 text-amber-400 rounded-full font-inter tracking-wider">WARNING</span>
                  </td>
                </tr>

                {/* Medical Warning */}
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm font-inter text-gray-300">Medical</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 text-sm text-gray-400 ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>
                    {t('safety.medicalWarning')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 text-[10px] bg-red-500/10 text-red-400 rounded-full font-inter tracking-wider">PROHIBITED</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Prohibited Items */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isTamil ? 'font-arima text-gold' : 'font-catamaran text-gold'}`}>
            <Ban className="w-5 h-5" />
            {t('safety.noItems')}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {prohibitedList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/5 border border-red-500/10"
              >
                <Ban className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                <span className={`text-xs text-gray-400 ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Consent Notice */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <div className="glass-panel rounded-xl p-6 border-amber-500/20 bg-amber-500/[0.03]">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className={`text-sm text-gray-400 leading-relaxed ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>
              {t('safety.consent')}
            </p>
          </div>
        </div>
      </div>

      {/* Ticketing Section */}
      <div id="tickets" className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className={`text-3xl sm:text-4xl font-bold text-gold-shimmer ${isTamil ? 'font-arima' : 'font-catamaran'}`}>
              {t('safety.ticketsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* BookMyShow */}
            <a
              href="https://in.bookmyshow.com/explore/home/chennai"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl p-6 sm:p-8 glass-panel border-neon-blue/20 hover:border-neon-blue/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-neon-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Ticket className="w-7 h-7 text-neon-blue" />
                </div>
                <h3 className={`text-lg font-bold text-gray-200 mb-2 ${isTamil ? 'font-noto-tamil' : 'font-catamaran'}`}>
                  {t('safety.bookmyshow')}
                </h3>
                <div className="flex items-center justify-center gap-1 text-neon-blue text-xs font-inter tracking-wider">
                  <span>BookMyShow</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
              {/* Neon glow */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-neon-blue/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>

            {/* District */}
            <a
              href="https://www.district.in/?srsltid=AfmBOoqhqi01LfZKdKKR4h2adv6ZXAjObERhzN9lbrnudaqRsn9XVHsW"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl p-6 sm:p-8 glass-panel border-gold/20 hover:border-gold/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Ticket className="w-7 h-7 text-gold" />
                </div>
                <h3 className={`text-lg font-bold text-gray-200 mb-2 ${isTamil ? 'font-noto-tamil' : 'font-catamaran'}`}>
                  {t('safety.district')}
                </h3>
                <div className="flex items-center justify-center gap-1 text-gold text-xs font-inter tracking-wider">
                  <span>District.in</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
              {/* Gold glow */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
