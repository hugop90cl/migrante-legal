import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Migrante Legal - Asesoría Migratoria en Chile',
  description:
    'Expertos en asesoría legal para regularizar tu situación migratoria en Chile. Visas temporales, reunificación familiar y nacionalidad chilena.',
  keywords: 'migrante legal, asesoría migratoria, visa chile, nacionalidad chilena',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
