import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Inter, Antonio, IM_Fell_English, Courier_Prime, Cinzel, Caveat, EB_Garamond } from 'next/font/google';
import { UserProvider } from '@/context/UserContext';
import { AchievementProvider } from '@/context/AchievementContext';
import { CompletionProvider } from '@/context/CompletionContext';
import { AdminProvider } from '@/context/AdminContext';
import AchievementManager from '@/components/AchievementManager';
import CompletionChecker from '@/components/CompletionChecker';
import "./globals.css";

// 1. Local Uncharted Game Font (Base 02)
const unchartedFont = localFont({
  src: '../../public/assets/fonts/Base 02.ttf',
  variable: '--font-uncharted',
  display: 'swap',
});

// 2. Nathan Drake Handwriting Font for Journal Notes
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting',
  weight: ['400', '600', '700'],
  display: 'swap',
});

// 3. Renaissance Cartographer Serif
const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
  weight: ['400', '600', '700'],
  display: 'swap',
});

// 4. UI & Display Fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-uncharted-title',
  display: 'swap',
});

const imFell = IM_Fell_English({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic', 'normal'],
  variable: '--font-uncharted-serif',
  display: 'swap',
});

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-courier',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600', '800'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TechX Expedition // Field Recon",
  description: "Feedback collection platform for TechX research labs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        ${unchartedFont.variable}
        ${caveat.variable}
        ${garamond.variable}
        ${inter.variable}
        ${antonio.variable}
        ${imFell.variable}
        ${courierPrime.variable}
        ${cinzel.variable}
      `}
    >
      <body className="bg-[#050302] text-[#2c1a0e] antialiased selection:bg-[#d4af37]/30 selection:text-[#1a0e05]">
        <AdminProvider>
          <AchievementProvider>
            <UserProvider>
              <CompletionProvider>
                {children}
                <CompletionChecker />
              </CompletionProvider>
            </UserProvider>
            <AchievementManager />
          </AchievementProvider>
        </AdminProvider>
      </body>
    </html>
  );
}