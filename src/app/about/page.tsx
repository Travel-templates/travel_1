import type { Metadata } from 'next';
import { AboutPageContent } from '@/components/pages/AboutPageContent';

export const metadata: Metadata = {
    title: 'About WanderLux – Our Story & Mission',
    description: 'Learn about WanderLux, our travel philosophy, and the passionate team behind your most memorable journeys.',
};

export default function AboutPage() {
    return <AboutPageContent />;
}
