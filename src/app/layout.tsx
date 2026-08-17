import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { UserProvider } from '@/context/UserContext';
import { AchievementProvider } from '@/context/AchievementContext';
import { CompletionProvider } from '@/context/CompletionContext';
import { AdminProvider } from '@/context/AdminContext';
import AchievementManager from '@/components/AchievementManager';
import XpBar from '@/components/XpBar';
import CompletionChecker from '@/components/CompletionChecker';
import "./globals.css";

import { Inter, Antonio, IM_Fell_English } from 'next/font/google';

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
  style: ['italic'],
  variable: '--font-uncharted-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TechX Research Feedback Portal",
  description: "Feedback collection platform for TechX research labs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${antonio.variable} ${imFell.variable}`}>
      <body>
        <AdminProvider>
          <AchievementProvider>
            <UserProvider>
              <CompletionProvider>
                {children}
                <XpBar />
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