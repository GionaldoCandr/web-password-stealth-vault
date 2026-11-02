import type { Metadata } from 'next';
import './globals.css';

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
      <body className="font-sans bg-slate-950 text-slate-100 flex flex-col min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}