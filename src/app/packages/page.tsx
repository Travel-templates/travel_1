import type { Metadata } from 'next';
import { PackagesPageContent } from '@/components/pages/PackagesPageContent';

export const metadata: Metadata = {
    title: 'Travel Packages – WanderLux',
    description: 'Browse curated travel packages for honeymoon, family, cruise, group tours and more.',
};

export default function PackagesPage() {
    return <PackagesPageContent />;
}
