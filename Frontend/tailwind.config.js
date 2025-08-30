
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: {
                DEFAULT: '#ffffff',
            },
            green: {
                light: '#6fcf97',
                DEFAULT: '#27AE60',
                dark: '#219653',
                darker: '#1e874b',
            },
            red: {
                light: '#FFEAEA',
                DEFAULT: '#EB5757',
                dark: '#C20D0D',
            },
            orange: {
                light: '#FFEBDA',
                DEFAULT: '#F66A0A',
                dark: '#A04100',
            },
            primary: {
                DEFAULT: "#24292E", 
                dark: "#1B1F23",   
            },
            warning: {
                DEFAULT: "#D1711C", 
                dark: "#A85611",
            },
            blue: {
                light: '#E0F2FE',
                DEFAULT: '#3B82F6',
                dark: '#1E40AF',
            },
            violet: {
                light: '#EDE9FE',
                DEFAULT: '#8B5CF6',
                dark: '#5B21B6',
            },
            pink: {
                light: '#FCE7F3',
                DEFAULT: '#EC4899',
                dark: '#9D174D',
            },
            teal: {
                light: '#CCFBF1',
                DEFAULT: '#14B8A6',
                dark: '#0F766E',
            },
            slate: {
                light: '#F1F5F9',
                DEFAULT: '#64748B',
                dark: '#1E293B',
            },
            indigo: {
                light: '#E0E7FF',
                DEFAULT: '#6366F1',
                dark: '#312E81',
            },
        },
        extend: {
            boxShadow: {
                default: '0px 10px 20px rgba(150, 150, 187, 0.1)',
            },
            fontSize: {
                '2rem': '2rem',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};