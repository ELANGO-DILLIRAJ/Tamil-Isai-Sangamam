'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

/**
 * AboutSection
 * Renders the detailed "About" content for the festival.
 * All textual values are pulled from the `about` namespace in the locale files.
 * The layout is deliberately flexible: a glass‑styled panel with a minimum height
 * to avoid cumulative layout shift (CLS) when Tamil translations, which are longer,
 * are rendered.
 */
export default function AboutSection() {
  const { t, isTamil } = useLanguage();

  // Helper to render a paragraph with safe text wrapping.
  const renderParagraph = (key) => (
    <p className={`text-sm sm:text-base text-gray-300 leading-relaxed ${isTamil ? 'font-noto-tamil' : 'font-inter'}`}>
      {t(key)}
    </p>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9 }}
      // Minimum height prevents layout shift when Tamil text expands.
      className="glass-panel border-gold/10 p-6 sm:p-10 rounded-3xl shadow-2xl mb-12 space-y-6 min-h-[300px]"
    >
      {/* Title */}
      <h2 className={`text-xl sm:text-2xl font-bold text-gold-shimmer ${isTamil ? 'font-arima' : 'font-catamaran'}`}>
        {t('about.title')}
      </h2>

      {/* Union subtitle */}
      <h3 className={`text-lg sm:text-xl font-medium text-gold ${isTamil ? 'font-arima' : 'font-catamaran'}`}>
        {t('about.union_title')}
      </h3>

      {/* Core paragraphs */}
      {renderParagraph('about.p1')}
      {renderParagraph('about.p2')}
      {renderParagraph('about.p3')}

      {/* Strategic necessity section */}
      <h4 className={`text-lg sm:text-xl font-semibold text-gold-shimmer mt-4 ${isTamil ? 'font-arima' : 'font-catamaran'}`}>
        {t('about.necessity_title')}
      </h4>
      {renderParagraph('about.chief_guest_desc')}
      {renderParagraph('about.special_guest_desc')}
      {renderParagraph('about.honouring_desc')}
    </motion.div>
  );
}
