import { HeroSection } from '@/components/sections/HeroSection';
import { JourneyStorySection } from '@/components/sections/JourneyStorySection';
import { FeaturedDestinationsSection } from '@/components/sections/FeaturedDestinationsSection';
import { PackagesSection } from '@/components/sections/PackagesSection';
import { CruiseLuxurySection } from '@/components/sections/CruiseLuxurySection';
import { TripBuilderSection } from '@/components/sections/TripBuilderSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection';
import { InquirySection } from '@/components/sections/InquirySection';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <JourneyStorySection />
            <FeaturedDestinationsSection />
            <PackagesSection />
            <CruiseLuxurySection />
            <TripBuilderSection />
            <TestimonialsSection />
            <BlogPreviewSection />
            <InquirySection />
        </>
    );
}
