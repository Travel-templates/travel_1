import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { FloatingExpertButton } from '@/components/ui/FloatingExpertButton';

export const metadata: Metadata = {
    title: 'WanderLux – Curated Luxury Travel Experiences',
    description: 'Crafted escapes designed around your pace. From ocean cruises to mountain retreats, every itinerary is crafted to feel effortless. Discover world-class travel with WanderLux.',
    keywords: 'luxury travel, honeymoon packages, international tours, cruise packages, Bali, Maldives, Europe tours, travel agency India',
    openGraph: {
        title: 'WanderLux – Curated Luxury Travel Experiences',
        description: 'Luxury planning. Human support. Memorable journeys.',
        type: 'website',
    },
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
            </head>
            <body className="bg-midnight text-white antialiased">
                <ScrollProgress />
                <Navbar />
                <main>{children}</main>
                <Footer />
                <FloatingExpertButton />
            </body>
        </html>
    );
}
