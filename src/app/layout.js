import { Catamaran, Arima, Inter, Noto_Sans_Tamil } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import './globals.css';

const catamaran = Catamaran({
  subsets: ['latin', 'tamil'],
  variable: '--font-catamaran',
  display: 'swap',
});

const arima = Arima({
  subsets: ['latin', 'tamil'],
  variable: '--font-arima',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  variable: '--font-noto-tamil',
  display: 'swap',
});

export const metadata = {
  title: 'Tamil Isai Sangamam — தமிழ் இசை சங்கமம் | South Asia\'s Greatest Music Festival',
  description:
    'Experience the grandest celebration of Tamil music heritage. Featuring AR Rahman, Anirudh, Ilaiyaraaja, Harris Jayaraj and 50+ artists live in Chennai on October 1, 2026.',
  keywords: [
    'Tamil Isai Sangamam',
    'தமிழ் இசை சங்கமம்',
    'Tamil music festival',
    'AR Rahman live',
    'Anirudh live concert',
    'Chennai music event',
    'South Asian music festival',
  ],
  openGraph: {
    title: 'Tamil Isai Sangamam 2026',
    description: 'South Asia\'s Greatest Music Festival — One Stage, One Sound.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${catamaran.variable} ${arima.variable} ${inter.variable} ${notoTamil.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kavivanar&family=Mukta+Malar:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter bg-canvas-deep text-gray-200 antialiased">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          {/* Footer */}
          <footer className="relative py-16 border-t border-gold/10">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <div className="text-gold-shimmer text-2xl font-arima font-bold mb-4">
                தமிழ் இசை சங்கமம்
              </div>
              <p className="text-gray-500 text-sm mb-2">
                One Stage. One Sound. — ஒரு மேடை, ஒரு ஓசை
              </p>
              <p className="text-gray-600 text-xs">
                © 2026 Tamil Isai Sangamam. All rights reserved. Crafted with passion for Tamil music heritage.
              </p>
            </div>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
