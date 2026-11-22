import type { Metadata } from 'next';
import './globals.css';
import { CipherLockSnowfall } from '@/components/common/CipherLockSnowfall';

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
      <body className="font-sans bg-[#0c1427] text-slate-100 flex flex-col min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200 relative">
        {/* Subtle Cyber Padlock & Cipher Snowfall Background FX */}
        <CipherLockSnowfall />
        {/* Foreground Content */}
        <div className="relative z-10 flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}