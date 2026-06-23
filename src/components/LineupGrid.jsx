'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Play, Volume2 } from 'lucide-react';

const musicians = [
  // High Decibels
  { name: 'A.R. Rahman', genre: 'highDecibels', image: '/Participant/Musician/High Decibels/Musician ARRahman.webp', role: 'Music Director' },
  { name: 'Anirudh', genre: 'highDecibels', image: '/Participant/Musician/High Decibels/Musician Anirudh.avif', role: 'Music Director' },
  { name: 'Harris Jayaraj', genre: 'highDecibels', image: '/Participant/Musician/High Decibels/Musician Harris Jayaraj.webp', role: 'Music Director' },
  { name: 'HipHop Aadhi', genre: 'highDecibels', image: '/Participant/Musician/High Decibels/Musician HipHopAadhi.avif', role: 'Composer & Rapper' },
  { name: 'Sai Abhyankkar', genre: 'highDecibels', image: '/Participant/Musician/High Decibels/Musician Sai Abhyankkar.jpg', role: 'Music Director' },
  { name: 'Santhosh Narayanan', genre: 'highDecibels', image: '/Participant/Musician/High Decibels/Musician Sonthosh Naryanan.png', role: 'Music Director' },
  { name: 'Vijay Antony', genre: 'highDecibels', image: '/Participant/Musician/High Decibels/Musician Vijay Antony.jpg', role: 'Music Director & Actor' },
  // Melody
  { name: 'Ilaiyaraaja', genre: 'melody', image: '/Participant/Musician/Melody/Musician IlaiyaRaja.avif', role: 'Isaignani' },
  // Nostalgic
  { name: 'Devi Sri Prasad', genre: 'nostalgic', image: '/Participant/Musician/Nostalgic/Musician DSP.jpg', role: 'Music Director' },
  // Street Beats
  { name: 'G.V. Prakash', genre: 'streetBeats', image: '/Participant/Musician/Street beats vibes/Musician GVP.jpg', role: 'Music Director & Actor' },
  { name: 'Ghibran', genre: 'streetBeats', image: '/Participant/Musician/Street beats vibes/Musician Ghibran.png', role: 'Music Director' },
  { name: 'D. Imman', genre: 'streetBeats', image: '/Participant/Musician/Street beats vibes/Musician Imman.jpg', role: 'Music Director' },
  { name: 'Sam C.S.', genre: 'streetBeats', image: '/Participant/Musician/Street beats vibes/Musician SamCS.jpeg', role: 'Music Director' },
];

const singers = [
  { name: 'Hariharan', image: '/Participant/Singers/SInger HariHaran.webp', role: 'Playback Singer' },
  { name: 'Chinmayi', image: '/Participant/Singers/SInger Chinmayii.avif', role: 'Playback Singer' },
  { name: 'Shreya Ghoshal', image: '/Participant/Singers/Singer  Shreya Ghosal.jpg', role: 'Playback Singer' },
  { name: 'Saindhavi', image: '/Participant/Singers/Singer  Saindhavi.jpg', role: 'Playback Singer' },
  { name: 'Sid Sriram', image: '/Participant/Singers/Singer Sid sriram.jpg', role: 'Playback Singer' },
  { name: 'Shankar Mahadevan', image: '/Participant/Singers/Singer Shankar Mahadevan.jpg', role: 'Playback Singer' },
  { name: 'S.P.B. Charan', image: '/Participant/Singers/Singer SPCharan.jpg', role: 'Playback Singer' },
  { name: 'K.S. Chithra', image: '/Participant/Singers/Singer Chitra.jpg', role: 'Playback Singer' },
  { name: 'Haricharan', image: '/Participant/Singers/Singer Haricharan.jpg', role: 'Playback Singer' },
  { name: 'Andrea', image: '/Participant/Singers/Singer Andrea.jpg', role: 'Playback Singer' },
  { name: 'Dhee', image: '/Participant/Singers/Singer Dhee.jpg', role: 'Playback Singer' },
  { name: 'Jonita Gandhi', image: '/Participant/Singers/Singer Jonita gandhi.jpg', role: 'Playback Singer' },
  { name: 'Arivu', image: '/Participant/Singers/Singer Arivu.avif', role: 'Singer & Lyricist' },
  { name: 'Asal Kolaar', image: '/Participant/Singers/Singer Asal Kolar.jpg', role: 'Independent Artist' },
  { name: 'Anthony Daasan', image: '/Participant/Singers/Singer anthony dasan.jpg', role: 'Playback Singer' },
  { name: 'Bala', image: '/Participant/Singers/Singer bala.avif', role: 'Playback Singer' },
  { name: 'Deva', image: '/Participant/Singers/Singer Deva.jpg', role: 'Singer' },
  { name: 'Karthik', image: '/Participant/Singers/Singer Karthick.jpg', role: 'Playback Singer' },
  { name: 'Rajalakshmi', image: '/Participant/Singers/Singer Rajalakshmi.jpg', role: 'Playback Singer' },
  { name: 'Senthil', image: '/Participant/Singers/Singer Senthil.jpg', role: 'Playback Singer' },
  { name: 'Muthu', image: '/Participant/Singers/Singer Muthu.jpg', role: 'Playback Singer' },
  { name: 'Paal Dabba', image: '/Participant/Singers/Singer Paal dabbha.jpg', role: 'Independent Artist' },
  { name: 'V.M. Mahalingam', image: '/Participant/Singers/SInger VMMahalingam.jpg', role: 'Playback Singer' },
];

const filters = [
  { key: 'all', labelKey: 'lineup.filterAll' },
  { key: 'highDecibels', labelKey: 'lineup.filterHighDecibels' },
  { key: 'melody', labelKey: 'lineup.filterMelody' },
  { key: 'nostalgic', labelKey: 'lineup.filterNostalgic' },
  { key: 'streetBeats', labelKey: 'lineup.filterStreetBeats' },
  { key: 'singers', labelKey: 'lineup.filterSingers' },
];

function ArtistCard({ artist, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-xl bg-canvas border border-white/5 transition-all duration-300 cursor-pointer group hover:border-gold/40 hover:shadow-gold-sm"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s' }}
      >
        {/* Image */}
        <div className="aspect-[3/4] relative overflow-hidden">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className={`object-cover object-top transition-all duration-500 ${
              isHovered ? 'saturate-[1.3] scale-105' : 'grayscale contrast-[1.2]'
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
          {/* Hover overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-canvas-deep via-canvas-deep/30 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-80' : 'opacity-60'
          }`} />

          {/* Audio indicator */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30"
            >
              <Volume2 className="w-4 h-4 text-gold" />
            </motion.div>
          )}
        </div>

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <h3 className="text-sm sm:text-base font-catamaran font-bold text-white truncate">{artist.name}</h3>
          <p className="text-[10px] sm:text-xs text-gold/60 font-inter tracking-wider mt-0.5">{artist.role}</p>
        </div>

        {/* Hover glow border */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none rounded-xl glow-neon-dual" />
        )}
      </div>
    </motion.div>
  );
}

export default function LineupGrid() {
  const { t, isTamil } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  const filteredArtists = activeFilter === 'all'
    ? [...musicians, ...singers]
    : activeFilter === 'singers'
    ? singers
    : musicians.filter((m) => m.genre === activeFilter);

  return (
    <section id="lineup" className="relative py-24 md:py-32 bg-canvas-deep overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-neon-blue/[0.03] blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-gold/[0.03] blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={sectionRef} className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] sm:text-xs text-gold/40 tracking-[0.5em] uppercase font-inter block mb-4">
              ✦ {isTamil ? 'இசையின் சக்தி' : 'The Power of Music'} ✦
            </span>
            <h2 className={`text-safe-hero text-4xl sm:text-5xl md:text-6xl font-bold text-gold-shimmer mb-4 ${
              isTamil ? 'font-arima' : 'font-catamaran'
            }`}>
              {t('lineup.sectionTitle')}
            </h2>
            <p className={`text-safe-body text-base sm:text-lg text-gray-500 ${
              isTamil ? 'font-noto-tamil' : 'font-inter'
            }`}>
              {t('lineup.sectionSubtitle')}
            </p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 md:mb-14">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 text-xs sm:text-sm rounded-full border transition-all duration-300 font-inter tracking-wide ${
                activeFilter === filter.key
                  ? 'bg-gold/10 border-gold/50 text-gold shadow-gold-sm'
                  : 'border-white/10 text-gray-500 hover:border-gold/30 hover:text-gray-300'
              }`}
            >
              {t(filter.labelKey)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5"
        >
          {filteredArtists.map((artist, i) => (
            <ArtistCard key={`${artist.name}-${activeFilter}`} artist={artist} index={i} />
          ))}
        </motion.div>

        {/* Hover hint */}
        <p className="text-center mt-8 text-xs text-gray-600 font-inter tracking-wider">
          {t('lineup.hoverHint')}
        </p>
      </div>

      {/* Bottom divider */}
      <div className="section-divider max-w-4xl mx-auto mt-16" />
    </section>
  );
}
