import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/common/NavBar';
import { Footer } from '@/components/common/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Stealth Password Vault | Docs & Interactive Lab Hub',
  description: 'Dokumentasi resmi dan arena simulasi interaktif TryHackMe-style untuk Stealth Password Vault.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.variable} ${mono.variable} font-sans bg-slate-950 text-slate-100 flex flex-col min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200`}>
        <NavBar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}