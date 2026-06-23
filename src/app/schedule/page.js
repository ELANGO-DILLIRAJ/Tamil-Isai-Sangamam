'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Sun, CloudSun, Sunset, Moon, MapPin, Clock } from 'lucide-react';

const stages = [
  { name: 'Chola Arena', desc: 'Main stage — 50,000 capacity open amphitheatre' },
  { name: 'Pandya Dome', desc: 'Acoustic dome — 15,000 capacity enclosed hall' },
  { name: 'Chera Plaza', desc: 'Open-air plaza — 10,000 capacity street-stage' },
];

const scheduleData = [
  {
    key: 'morning',
    icon: Sun,
    color: '#D4AF37',
    stage: 'Chola Arena',
    performers: [
      { time: '10:00 AM', name: 'Ilaiyaraaja', set: 'Classical Overture — Symphonic Medley' },
      { time: '10:45 AM', name: 'A.R. Rahman', set: 'Rahman Unplugged — Orchestra Set' },
      { time: '11:30 AM', name: 'K.S. Chithra & Hariharan', set: 'Duet Legends — Golden Hits' },
    ],
  },
  {
    key: 'afternoon',
    icon: CloudSun,
    color: '#4A90D9',
    stage: 'Pandya Dome',
    performers: [
      { time: '1:30 PM', name: 'Harris Jayaraj', set: 'Harris Live — Nostalgic Waves' },
      { time: '2:15 PM', name: 'Devi Sri Prasad', set: 'DSP Energy — Dance Anthems' },
      { time: '3:00 PM', name: 'G.V. Prakash', set: 'GVP Sessions — Raw & Unplugged' },
      { time: '3:45 PM', name: 'Sid Sriram & Shreya Ghoshal', set: 'Soulful Duets' },
    ],
  },
  {
    key: 'evening',
    icon: Sunset,
    color: '#DC143C',
    stage: 'Chera Plaza',
    performers: [
      { time: '5:00 PM', name: 'Vijay Antony', set: 'Vijay Antony LIVE — Kuthu Madness' },
      { time: '5:45 PM', name: 'Santhosh Narayanan', set: 'Folk Fusion Revolution' },
      { time: '6:30 PM', name: 'HipHop Aadhi', set: 'Street Cypher — Tamil Rap' },
      { time: '7:15 PM', name: 'D. Imman', set: 'Imman\'s Folk Arena' },
    ],
  },
  {
    key: 'night',
    icon: Moon,
    color: '#FF00FF',
    stage: 'Chola Arena',
    performers: [
      { time: '8:00 PM', name: 'Sai Abhyankkar', set: 'Opening Act — Viral Hits' },
      { time: '8:45 PM', name: 'Ghibran & Sam C.S.', set: 'Cinematic Score Experience' },
      { time: '9:30 PM', name: 'Anirudh Ravichander', set: 'THE FINALE — Full Anirudh Experience' },
    ],
  },
];

function SessionBlock({ session, index }) {
  const { t, isTamil } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = session.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-12"
    >
      <div className="glass-panel rounded-2xl overflow-hidden" style={{ borderColor: `${session.color}20` }}>
        {/* Session header */}
        <div
          className="px-6 py-5 flex items-center gap-4 border-b"
          style={{ borderColor: `${session.color}15`, background: `linear-gradient(135deg, ${session.color}08, transparent)` }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${session.color}15`, border: `1px solid ${session.color}30` }}
          >
            <Icon className="w-5 h-5" style={{ color: session.color }} />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isTamil ? 'font-arima' : 'font-catamaran'}`} style={{ color: session.color }}>
              {t(`schedule.${session.key}.title`)}
            </h3>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-[10px] text-gray-500 font-inter tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {t(`schedule.${session.key}.time`)}
              </span>
              <span className="text-[10px] text-gray-500 font-inter tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {session.stage}
              </span>
            </div>
          </div>
        </div>

        {/* Performer rows */}
        <div className="divide-y divide-white/5">
          {session.performers.map((perf, i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors duration-300">
              <span className="text-xs text-gray-600 font-mono w-20 flex-shrink-0">{perf.time}</span>
              <div className="flex-1">
                <p className="text-sm font-catamaran font-semibold text-gray-200">{perf.name}</p>
                <p className="text-xs text-gray-500 font-inter">{perf.set}</p>
              </div>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: session.color, boxShadow: `0 0 6px ${session.color}` }} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SchedulePage() {
  const { t, isTamil } = useLanguage();

  return (
    <div className="min-h-screen bg-canvas-deep pt-24 pb-16">
      {/* Header */}
      <div className="text-center px-4 mb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[10px] sm:text-xs text-gold/40 tracking-[0.5em] uppercase font-inter block mb-4">
            ✦ {isTamil ? 'விரிவான அட்டவணை' : 'Detailed Schedule'} ✦
          </span>
          <h1 className={`text-safe-hero text-5xl sm:text-6xl md:text-7xl font-bold text-gold-shimmer mb-4 ${
            isTamil ? 'font-arima' : 'font-catamaran'
          }`}>
            {t('schedule.sectionTitle')}
          </h1>
          <p className={`text-safe-body text-lg text-gray-500 max-w-2xl mx-auto ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>
            {t('schedule.sectionSubtitle')}
          </p>
        </motion.div>
      </div>

      {/* Stages overview */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stages.map((stage) => (
            <div key={stage.name} className="glass-panel rounded-xl p-4 border-gold-glow text-center">
              <MapPin className="w-5 h-5 text-gold mx-auto mb-2" />
              <h4 className="text-sm font-catamaran font-bold text-gold">{stage.name}</h4>
              <p className="text-[10px] text-gray-500 font-inter mt-1">{stage.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule blocks */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {scheduleData.map((session, i) => (
          <SessionBlock key={session.key} session={session} index={i} />
        ))}
      </div>
    </div>
  );
}
