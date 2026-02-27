/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Deep Ocean / Navy
                navy: {
                    50: '#f0f4ff',
                    100: '#e0e9ff',
                    200: '#c7d6fe',
                    300: '#a5b8fd',
                    400: '#8193fb',
                    500: '#6470f7',
                    600: '#4f52ec',
                    700: '#4241d1',
                    800: '#3736a9',
                    900: '#312e8a',
                    950: '#1e1b55',
                },
                ocean: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                teal: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#14b8a6',
                    600: '#0d9488',
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#134e4a',
                    950: '#042f2e',
                },
                gold: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    950: '#451a03',
                },
                midnight: {
                    DEFAULT: '#0a0f1e',
                    light: '#111827',
                    card: '#0d1526',
                    border: '#1f2d4a',
                },
            },
            fontFamily: {
                sans: ['var(--font-plus-jakarta)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
                display: ['var(--font-sora)', 'Sora', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-ocean': 'linear-gradient(135deg, #0a0f1e 0%, #0c4a6e 50%, #042f2e 100%)',
                'gradient-gold': 'linear-gradient(135deg, #b45309 0%, #f59e0b 50%, #fbbf24 100%)',
                'gradient-hero': 'linear-gradient(180deg, rgba(10,15,30,0) 0%, rgba(10,15,30,0.7) 60%, rgba(10,15,30,1) 100%)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 10s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'glow': 'glow 3s ease-in-out infinite',
                'counter': 'counter 2s ease-out forwards',
                'route': 'route 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(251,191,36,0.3)' },
                    '50%': { boxShadow: '0 0 60px rgba(251,191,36,0.6), 0 0 100px rgba(251,191,36,0.2)' },
                },
                route: {
                    '0%': { strokeDashoffset: '1000' },
                    '100%': { strokeDashoffset: '0' },
                },
            },
            boxShadow: {
                'glow-gold': '0 0 30px rgba(251,191,36,0.3)',
                'glow-ocean': '0 0 30px rgba(14,165,233,0.3)',
                'card': '0 25px 50px rgba(0,0,0,0.5)',
                'card-hover': '0 35px 70px rgba(0,0,0,0.7)',
                'glass': '0 8px 32px rgba(0,0,0,0.4)',
                'premium': '0 4px 6px rgba(0,0,0,0.1), 0 10px 15px rgba(0,0,0,0.1), 0 25px 50px rgba(0,0,0,0.25)',
            },
            backdropBlur: {
                xs: '2px',
            },
            transitionTimingFunction: {
                'premium': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
            screens: {
                'xs': '360px',
                '3xl': '1920px',
            },
        },
    },
    plugins: [],
};
