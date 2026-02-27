import type { Metadata } from 'next';
import { DestinationsPageContent } from '@/components/pages/DestinationsPageContent';

export const metadata: Metadata = {
    title: 'Destinations – WanderLux',
    description: 'Explore 85+ handpicked travel destinations across the world. Beach, adventure, luxury, honeymoon and more.',
};

export default function DestinationsPage() {
    return <DestinationsPageContent />;
}
