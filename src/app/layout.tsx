import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClientThemeProvider } from '@/components/providers/ClientThemeProvider';
import { portfolioMetadata, generateJsonLdScript } from './metadata';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

// Export the comprehensive metadata configuration
export const metadata = portfolioMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generateJsonLdScript();

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ClientThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          <div className="min-h-screen bg-background text-foreground">
            {children}
          </div>
        </ClientThemeProvider>
      </body>
    </html>
  );
}