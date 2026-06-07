/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // replacing sky with rose palette for the main theme
                sky: {
                    50: '#fff1f2', // rose-50
                    100: '#ffe4e6', // rose-100
                    200: '#fecdd3', // rose-200
                    300: '#fda4af', // rose-300
                    400: '#fb7185', // rose-400
                    500: '#f43f5e', // rose-500
                    600: '#e11d48', // rose-600
                    700: '#be123c', // rose-700
                    800: '#9f1239', // rose-800
                    900: '#881337', // rose-900
                    950: '#4c0519', // rose-950
                },
                rose: {
                    50: '#fff1f2',
                    100: '#ffe4e6',
                    200: '#fecdd3',
                    300: '#fda4af',
                    400: '#fb7185',
                    500: '#f43f5e',
                    600: '#e11d48',
                    700: '#be123c',
                    800: '#9f1239',
                    900: '#881337',
                    950: '#4c0519',
                },
                slate: {
                    850: '#1e293b',
                }
            },
            fontFamily: {
                serif: ['var(--font-cormorant)', 'serif'],
                sans: ['var(--font-cinzel)', 'sans-serif'],
                cinzel: ['var(--font-cinzel)', 'serif'],
                cormorant: ['var(--font-cormorant)', 'serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'mystic-light': 'linear-gradient(to right bottom, #fff1f2, #ffe4e6, #fff)',
            }
        },
    },
    plugins: [],
};
