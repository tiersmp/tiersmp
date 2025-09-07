import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ToastProvider } from '@/components/ui/toaster';
import './globals.css';
import React from 'react';

// Configuration de la police Inter avec les sous-ensembles de caractères
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

// Métadonnées de la page
export const metadata: Metadata = {
  title: 'SmpTier — Accueil',
  description: 'Classement des meilleurs SMP francophones',
  icons: {
    icon: '/logo.png',
  },
};

// Configuration du viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#1a1a1a',
  maximumScale: 1.0,
  userScalable: false,
};

// Interface pour les props du composant RootLayout
interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Composant racine du layout de l'application
 * @param children - Les composants enfants à afficher
 */
// Composant racine du layout de l'application
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-200`}>
        <ThemeProvider defaultTheme="system" storageKey="smptier-theme">
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

