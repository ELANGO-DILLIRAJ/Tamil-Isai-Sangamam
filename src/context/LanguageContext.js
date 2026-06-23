'use client';

import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import en from '@/locales/en.json';
import ta from '@/locales/ta.json';

const dictionaries = { en, ta };

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ta' : 'en'));
  }, []);

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let value = dictionaries[lang];
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return key;
        }
      }
      return value;
    },
    [lang]
  );

  const value = useMemo(
    () => ({
      lang,
      toggleLang,
      t,
      isTamil: lang === 'ta',
    }),
    [lang, toggleLang, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
