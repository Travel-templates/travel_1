import type { Metadata } from 'next';
import { ContactPageContent } from '@/components/pages/ContactPageContent';

export const metadata: Metadata = {
    title: 'Contact WanderLux – Plan Your Dream Trip',
    description: 'Get in touch with our travel experts. We\'re here to help you plan your perfect journey.',
};

export default function ContactPage() {
    return <ContactPageContent />;
}
