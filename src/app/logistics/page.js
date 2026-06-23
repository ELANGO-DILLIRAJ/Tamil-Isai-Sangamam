'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import StadiumGuide from '@/components/StadiumGuide';
import { Car, Train, MapPin, Clock, DoorOpen, Accessibility, Volume2, Wifi } from 'lucide-react';

const facilityItems = [
  { icon: Car, title: 'Parking', desc: 'Dedicated parking zones at East & West gates. VVIP valet available at Gate 1.', color: '#00D4FF' },
  { icon: Train, title: 'Metro Access', desc: 'Nearest Metro: CMRL Blue Line, 500m walk from North Gate entrance.', color: '#4A90D9' },
  { icon: DoorOpen, title: 'Gate Timings', desc: 'Gates open at 8:30 AM. Last entry at 9:00 PM. Wristband scan at every entry.', color: '#D4AF37' },
  { icon: Accessibility, title: 'Accessibility', desc: 'Wheelchair ramps at Gates 2 & 3. Dedicated companion seating in front rows.', color: '#22C55E' },
  { icon: Volume2, title: 'Acoustic Zones', desc: 'Dampened audio zones available near senior citizen seating at Block G3.', color: '#FF00FF' },
  { icon: Wifi, title: 'Connectivity', desc: 'Free event Wi-Fi across all zones. Event companion app for live updates.', color: '#00D4FF' },
];

export default function LogisticsPage() {
  const { t, isTamil } = useLanguage();

  return (
    <div className="min-h-screen bg-canvas-deep pt-24 pb-16">
      {/* Header */}
      <div className="text-center px-4 mb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[10px] sm:text-xs text-gold/40 tracking-[0.5em] uppercase font-inter block mb-4">
            ✦ {isTamil ? 'அரங்க வழிகாட்டி' : 'Ground Guide'} ✦
          </span>
          <h1 className={`text-safe-hero text-5xl sm:text-6xl md:text-7xl font-bold text-gold-shimmer mb-4 ${
            isTamil ? 'font-arima' : 'font-catamaran'
          }`}>
            {t('stadium.sectionTitle')}
          </h1>
          <p className={`text-safe-body text-lg text-gray-500 max-w-2xl mx-auto ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>
            Everything you need to navigate the arena, find your seat, and enjoy the festival.
          </p>
        </motion.div>
      </div>

      {/* Facilities Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilityItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-panel rounded-xl p-5 hover:border-gold/20 transition-colors duration-300 group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h3 className="text-sm font-catamaran font-bold text-gray-200 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 font-inter leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full Stadium Guide */}
      <StadiumGuide />
    </div>
  );
}
