'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Music, Mic2, Disc3, Guitar } from 'lucide-react';

const allArtists = [
  // Musicians
  { name: 'A.R. Rahman', role: 'Isaipuyal — The Mozart of Madras', genre: 'High Decibels / Melody / Nostalgic', image: '/Participant/Musician/High Decibels/Musician ARRahman.webp', bio: 'Academy Award winner, one of the world\'s most prolific film composers. His fusion of Eastern classical music with electronic sounds has redefined modern Indian cinema.' },
  { name: 'Ilaiyaraaja', role: 'Isaignani — The Maestro', genre: 'Melody', image: '/Participant/Musician/Melody/Musician IlaiyaRaja.avif', bio: 'The legendary composer who single-handedly revolutionized Tamil film music. With over 7,000 songs composed, his symphonic genius remains unmatched in Indian cinema history.' },
  { name: 'Anirudh Ravichander', role: 'Music Director & Performer', genre: 'High Decibels', image: '/Participant/Musician/High Decibels/Musician Anirudh.avif', bio: 'The sensation who brought contemporary pop-electronic aesthetics to Tamil cinema. Known for electrifying live performances and chart-topping albums.' },
  { name: 'Harris Jayaraj', role: 'Music Director', genre: 'High Decibels / Nostalgic', image: '/Participant/Musician/High Decibels/Musician Harris Jayaraj.webp', bio: 'The king of melody and electronic orchestration. His lush arrangements and unforgettable tunes defined Tamil cinema in the 2000s era.' },
  { name: 'Vijay Antony', role: 'Music Director & Actor', genre: 'High Decibels', image: '/Participant/Musician/High Decibels/Musician Vijay Antony.jpg', bio: 'A multi-faceted artist who transitioned from delivering mass musical hits to conquering the silver screen as a versatile actor.' },
  { name: 'Santhosh Narayanan', role: 'Music Director', genre: 'High Decibels', image: '/Participant/Musician/High Decibels/Musician Sonthosh Naryanan.png', bio: 'The architect of progressive Tamil film music. His experimental soundscapes blend folk, hip-hop, and classical elements into revolutionary compositions.' },
  { name: 'HipHop Aadhi', role: 'Composer & Rapper', genre: 'High Decibels', image: '/Participant/Musician/High Decibels/Musician HipHopAadhi.avif', bio: 'Pioneer of Tamil hip-hop culture. His raw, street-inspired beats and lyrics brought underground music into the mainstream.' },
  { name: 'Sai Abhyankkar', role: 'Music Director', genre: 'High Decibels', image: '/Participant/Musician/High Decibels/Musician Sai Abhyankkar.jpg', bio: 'The rising star of Tamil music, known for viral indie tracks and fresh sonic textures that resonate with the younger generation.' },
  { name: 'Devi Sri Prasad', role: 'Music Director', genre: 'Nostalgic', image: '/Participant/Musician/Nostalgic/Musician DSP.jpg', bio: 'DSP\'s infectious energy and dance-floor-ready compositions have made him one of India\'s most bankable music directors across multiple languages.' },
  { name: 'G.V. Prakash Kumar', role: 'Music Director & Actor', genre: 'Street Beats', image: '/Participant/Musician/Street beats vibes/Musician GVP.jpg', bio: 'A child prodigy turned versatile composer. His ability to craft both soulful melodies and mass anthems makes him a rare talent.' },
  { name: 'D. Imman', role: 'Music Director', genre: 'Street Beats', image: '/Participant/Musician/Street beats vibes/Musician Imman.jpg', bio: 'The master of folk-infused film music. Imman\'s rooted compositions carry the authentic pulse of Tamil Nadu\'s rural heartland.' },
  { name: 'Ghibran', role: 'Music Director', genre: 'Street Beats', image: '/Participant/Musician/Street beats vibes/Musician Ghibran.png', bio: 'Known for his cinematic orchestral scores and versatile compositions that seamlessly blend Western and Eastern musical traditions.' },
  { name: 'Sam C.S.', role: 'Music Director', genre: 'Street Beats', image: '/Participant/Musician/Street beats vibes/Musician SamCS.jpeg', bio: 'The background score specialist whose intense, pulsating themes elevate Tamil thriller cinema to international standards.' },
  // Key Singers
  { name: 'Sid Sriram', role: 'Playback Singer', genre: 'Vocalist', image: '/Participant/Singers/Singer Sid sriram.jpg', bio: 'The voice that defined a generation. His soulful renditions blend Carnatic classical roots with contemporary pop sensibilities.' },
  { name: 'Shreya Ghoshal', role: 'Playback Singer', genre: 'Vocalist', image: '/Participant/Singers/Singer  Shreya Ghosal.jpg', bio: 'India\'s nightingale of the modern era. Multiple National Award winner whose versatility spans across genres and languages.' },
  { name: 'Shankar Mahadevan', role: 'Playback Singer', genre: 'Vocalist', image: '/Participant/Singers/Singer Shankar Mahadevan.jpg', bio: 'One-third of the legendary Shankar-Ehsaan-Loy trio, his powerful vocals and breathless singing technique remain iconic.' },
  { name: 'Hariharan', role: 'Playback Singer', genre: 'Vocalist', image: '/Participant/Singers/SInger HariHaran.webp', bio: 'The ghazal king who effortlessly bridges classical, folk, and film music. A voice that carries decades of Indian musical tradition.' },
  { name: 'K.S. Chithra', role: 'Playback Singer', genre: 'Vocalist', image: '/Participant/Singers/Singer Chitra.jpg', bio: 'The golden voice of South Indian cinema. National Award-winning singer with a career spanning over four decades of timeless melodies.' },
];

function ArtistDetailCard({ artist, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-12 md:mb-16"
    >
      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-10 items-center`}>
        {/* Image */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-gold-glow group">
            <Image
              src={artist.image}
              alt={artist.name}
              fill
              className="object-cover object-top transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas-deep via-transparent to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-2/3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] tracking-widest uppercase font-inter mb-3">
            <Music className="w-3 h-3" />
            {artist.genre}
          </div>
          <h3 className="text-3xl sm:text-4xl font-catamaran font-bold text-gold-shimmer mb-2">{artist.name}</h3>
          <p className="text-sm text-gold/60 font-inter tracking-wider mb-4">{artist.role}</p>
          <p className="text-sm text-gray-400 leading-relaxed font-inter max-w-xl">{artist.bio}</p>
          <div className="mt-4 w-16 h-[2px] bg-gradient-to-r from-gold-mid to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

export default function LineupPage() {
  const { t, isTamil } = useLanguage();

  return (
    <div className="min-h-screen bg-canvas-deep pt-24 pb-16">
      {/* Header */}
      <div className="text-center px-4 mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] sm:text-xs text-gold/40 tracking-[0.5em] uppercase font-inter block mb-4">
            ✦ {isTamil ? 'கலைஞர்கள் பட்டியல்' : 'Artist Roster'} ✦
          </span>
          <h1 className={`text-safe-hero text-5xl sm:text-6xl md:text-7xl font-bold text-gold-shimmer mb-4 ${
            isTamil ? 'font-arima' : 'font-catamaran'
          }`}>
            {t('lineup.sectionTitle')}
          </h1>
          <p className={`text-safe-body text-lg text-gray-500 max-w-2xl mx-auto ${
            isTamil ? 'font-noto-tamil' : 'font-inter'
          }`}>
            Full bios, genres, and discographies of the masters performing at Tamil Isai Sangamam 2026.
          </p>
        </motion.div>
      </div>

      {/* Artist detail cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {allArtists.map((artist, i) => (
          <ArtistDetailCard key={artist.name} artist={artist} index={i} />
        ))}
      </div>
    </div>
  );
}
