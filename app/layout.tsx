import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Present.AI — From Thought to Presentation in Seconds',
  description:
    'The AI-powered storyteller that turns your raw ideas into award-winning, cinematic slide decks without touching a single design tool.',
  keywords: [
    'AI presentation generator',
    'Present.AI',
    'AI PowerPoint',
    'AI slide maker',
    'presentation story engine',
    'PPTX generator',
    'PDF presentation exporter',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F4F4F0] text-[#111111] antialiased selection:bg-[#111111] selection:text-white">
        <ErrorBoundary fallbackTitle="Present.AI Application Error">
          <AuthProvider>{children}</AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
