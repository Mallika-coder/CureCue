import { Cinzel, Cormorant_Garamond } from 'next/font/google';
import ChatWidget from '@/components/ChatWidget';
import './globals.css';

const cinzel = Cinzel({
    subsets: ['latin'],
    variable: '--font-cinzel',
    display: 'swap',
});

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-cormorant',
    display: 'swap',
});

export const metadata = {
    title: "The Alchemist's Grimoire | CureCue",
    description: 'Ancient healing wisdom backed by modern science.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${cinzel.variable} ${cormorant.variable}`}>
            <body className="font-serif bg-sky-50 text-slate-900 antialiased min-h-screen">
                {/* Sky Background Texture Overlay */}
                <div
                    className="fixed inset-0 z-[-1] opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: "url('/parchment-bg.png')",
                        backgroundRepeat: 'repeat',
                        backgroundSize: '500px',
                        filter: 'invert(1) hue-rotate(180deg)' // My poor man's way to make dark parchment light blue-ish
                    }}
                />
                {children}
                <ChatWidget />
            </body>
        </html>
    );
}
