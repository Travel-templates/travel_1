// Design Tokens and Animation Constants for WanderLux

export const colors = {
    navy: {
        950: '#1e1b55',
        900: '#312e8a',
        800: '#3736a9',
        700: '#4241d1',
    },
    ocean: {
        950: '#082f49',
        900: '#0c4a6e',
        800: '#075985',
        700: '#0369a1',
        600: '#0284c7',
        500: '#0ea5e9',
        400: '#38bdf8',
        300: '#7dd3fc',
    },
    teal: {
        950: '#042f2e',
        900: '#134e4a',
        800: '#115e59',
        700: '#0f766e',
        600: '#0d9488',
        500: '#14b8a6',
        400: '#2dd4bf',
        300: '#5eead4',
    },
    gold: {
        950: '#451a03',
        700: '#b45309',
        600: '#d97706',
        500: '#f59e0b',
        400: '#fbbf24',
        300: '#fcd34d',
        200: '#fde68a',
    },
    midnight: '#0a0f1e',
    midnightLight: '#111827',
    midnightCard: '#0d1526',
    midnightBorder: '#1f2d4a',
};

export const typography = {
    scale: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
    },
    weights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
    },
};

export const motion = {
    duration: {
        instant: 0.1,
        fast: 0.2,
        normal: 0.4,
        slow: 0.6,
        cinematic: 1.0,
        epic: 1.8,
    },
    easing: {
        premium: [0.25, 0.46, 0.45, 0.94],
        cinematic: [0.16, 1, 0.3, 1],
        bounce: [0.34, 1.56, 0.64, 1],
        smooth: [0.43, 0.13, 0.23, 0.96],
    },
    spring: {
        gentle: { type: 'spring', damping: 25, stiffness: 200 },
        snappy: { type: 'spring', damping: 20, stiffness: 400 },
        bouncy: { type: 'spring', damping: 10, stiffness: 300 },
        stiff: { type: 'spring', damping: 30, stiffness: 500 },
    },
};

export const variants = {
    fadeInUp: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1 },
    },
    slideInLeft: {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
    slideInRight: {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    staggerContainer: {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    },
    staggerCard: {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    },
};

export const viewportConfig = {
    once: true,
    margin: '-80px',
};
