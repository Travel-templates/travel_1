import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatPrice(priceINR: number, currency: 'INR' | 'USD' = 'INR', priceUSD?: number): string {
    if (currency === 'USD' && priceUSD) {
        return `$${priceUSD.toLocaleString()}`;
    }
    return `₹${priceINR.toLocaleString()}`;
}

export function filterDestinations(
    destinations: any[],
    filters: { category?: string; search?: string; continent?: string }
) {
    return destinations.filter((dest) => {
        const matchesCategory =
            !filters.category || filters.category === 'all'
                ? true
                : dest.category?.includes(filters.category);
        const matchesSearch = !filters.search
            ? true
            : dest.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            dest.country.toLowerCase().includes(filters.search.toLowerCase()) ||
            dest.tagline?.toLowerCase().includes(filters.search.toLowerCase());
        const matchesContinent =
            !filters.continent || filters.continent === 'all'
                ? true
                : dest.continent === filters.continent;
        return matchesCategory && matchesSearch && matchesContinent;
    });
}

export function filterPackages(
    packages: any[],
    filters: { category?: string; maxPrice?: number; duration?: string }
) {
    return packages.filter((pkg) => {
        const matchesCategory =
            !filters.category || filters.category === 'all'
                ? true
                : pkg.category === filters.category;
        const matchesPrice = !filters.maxPrice
            ? true
            : pkg.priceINR <= filters.maxPrice;
        const matchesDuration = !filters.duration || filters.duration === 'all'
            ? true
            : filters.duration === 'short' ? parseInt(pkg.duration) <= 5
                : filters.duration === 'week' ? parseInt(pkg.duration) > 5 && parseInt(pkg.duration) <= 8
                    : parseInt(pkg.duration) > 8;
        return matchesCategory && matchesPrice && matchesDuration;
    });
}

export function generateMockItinerary(
    destination: string,
    days: number,
    interests: string[]
) {
    const activities: Record<string, string[]> = {
        beach: ['Beach morning walk', 'Snorkeling tour', 'Sunset beach dinner', 'Water sports session'],
        culture: ['Heritage site visit', 'Local market tour', 'Cooking class', 'Museum exploration'],
        adventure: ['Mountain trek', 'White water rafting', 'Zip-lining', 'Rock climbing'],
        nature: ['National park safari', 'Bird watching tour', 'Waterfall hike', 'Jungle walk'],
        shopping: ['Local bazaar visit', 'Shopping district tour', 'Artisan workshop', 'Night market'],
        wellness: ['Sunrise yoga', 'Traditional spa', 'Meditation session', 'Sound healing'],
    };

    const itinerary = [];
    for (let i = 1; i <= days; i++) {
        const dayActivities = interests
            .slice(0, 2)
            .flatMap((interest) => activities[interest]?.slice(0, 2) || [])
            .slice(0, 4);

        itinerary.push({
            day: i,
            title: i === 1 ? 'Arrival & Settle In' : i === days ? 'Departure Day' : `Day ${i} in ${destination}`,
            activities: i === 1
                ? ['Airport pickup', 'Hotel check-in', 'Welcome dinner', 'Orientation walk']
                : i === days
                    ? ['Breakfast', 'Last-minute shopping', 'Hotel checkout', 'Airport transfer']
                    : dayActivities,
        });
    }
    return itinerary;
}
