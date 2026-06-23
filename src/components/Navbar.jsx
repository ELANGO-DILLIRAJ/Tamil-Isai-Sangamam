'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X, Ticket } from 'lucide-react';

export default function Navbar() {
  const { t, toggleLang, isTamil } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/lineup', label: t('nav.lineup') },
    { href: '/schedule', label: t('nav.schedule') },
    { href: '/logistics', label: t('nav.logistics') },
    { href: '/safety', label: t('nav.safety') },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-panel shadow-lg shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* SVG Logo: Microphone + Tamil Arch Emblem */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#BF953F" />
                    <stop offset="50%" stopColor="#FCF6BA" />
                    <stop offset="100%" stopColor="#B38728" />
                  </linearGradient>
                </defs>
                {/* Tamil architectural arch */}
                <path
                  d="M6 40 Q6 12 24 6 Q42 12 42 40"
                  stroke="url(#goldGrad)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M10 40 Q10 18 24 10 Q38 18 38 40"
                  stroke="url(#goldGrad)"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.5"
                  strokeLinecap="round"
                />
                {/* Microphone silhouette */}
                <ellipse cx="24" cy="20" rx="5" ry="7" stroke="url(#goldGrad)" strokeWidth="2" fill="none" />
                <line x1="24" y1="27" x2="24" y2="36" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" />
                <path d="M18 36 L30 36" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" />
                {/* Sound waves */}
                <path d="M15 17 Q12 20 15 23" stroke="url(#goldGrad)" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
                <path d="M33 17 Q36 20 33 23" stroke="url(#goldGrad)" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="text-gold-shimmer text-sm font-catamaran font-bold tracking-wider leading-tight">
                TAMIL ISAI
              </div>
              <div className="text-gold-shimmer text-xs font-catamaran tracking-widest leading-tight">
                SANGAMAM
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-safe-nav px-3 py-2 text-sm font-inter tracking-wide text-gray-400 hover:text-gold transition-colors duration-300 relative group ${
                  isTamil ? 'font-noto-tamil' : ''
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <button
              id="lang-toggle"
              onClick={toggleLang}
              className="px-3 py-1.5 text-xs font-bold border border-gold/30 rounded-full text-gold hover:bg-gold/10 hover:border-gold/60 transition-all duration-300 tracking-wider"
            >
              {t('nav.langSwitch')}
            </button>

            {/* CTA Ticket Button */}
            <Link
              href="/safety#tickets"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-mid to-gold-dark text-canvas-deep text-xs font-bold rounded-full hover:shadow-gold-md transition-all duration-300 tracking-wider"
            >
              <Ticket className="w-3.5 h-3.5" />
              {t('nav.tickets')}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-panel border-t border-gold/10 animate-in slide-in-from-top">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 text-sm text-gray-400 hover:text-gold hover:bg-gold/5 rounded-lg transition-all duration-300 ${
                  isTamil ? 'font-noto-tamil' : 'font-inter'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/safety#tickets"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 mt-4 px-4 py-3 bg-gradient-to-r from-gold-mid to-gold-dark text-canvas-deep text-sm font-bold rounded-lg"
            >
              <Ticket className="w-4 h-4" />
              {t('nav.tickets')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
