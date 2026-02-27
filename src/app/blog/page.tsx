import type { Metadata } from 'next';
import { BlogPageContent } from '@/components/pages/BlogPageContent';

export const metadata: Metadata = {
    title: 'Travel Blog & Guides – WanderLux',
    description: 'Expert travel tips, destination guides, visa information, and travel inspiration from WanderLux.',
};

export default function BlogPage() {
    return <BlogPageContent />;
}
