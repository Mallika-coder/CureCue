"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen text-slate-900 font-serif overflow-hidden relative bg-rose-50">
      <AnimatePresence mode="wait">
        {!isEntered ? (
          /* ================= PORTAL ENTRY ================= */
          <motion.div
            key="portal"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-rose-50"
          >
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-rose-50 to-white opacity-80" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 text-center px-8 max-w-2xl"
            >
              <h2 className="text-rose-500 tracking-[0.3em] uppercase text-sm font-bold mb-4 font-cinzel">
                The New Age of Healing
              </h2>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight font-cinzel text-slate-900">
                <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                  Grimoire
                </span>
              </h1>
              <p className="text-slate-600 text-lg font-cormorant mb-8 leading-relaxed max-w-md mx-auto italic">
                "Where ancient alchemy meets modern science in a sanctuary of clarity."
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEntered(true)}
                className="group relative px-12 py-4 bg-slate-900 text-white font-bold rounded-full text-lg tracking-widest overflow-hidden transition-all duration-300 hover:bg-rose-500 hover:shadow-xl hover:shadow-rose-300/50 font-cinzel"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>ENTER THE REALM</span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          /* ================= MAIN EXPERIENCE ================= */
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen flex flex-col"
          >
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 px-6 py-4">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-2xl text-rose-500">✨</span>
                  <h2 className="text-2xl font-bold text-slate-800 font-cinzel">
                    The Grimoire
                  </h2>
                </motion.div>

                <nav className="flex items-center gap-6">
                  <Link
                    href="/login"
                    className="hidden md:block px-6 py-2 text-slate-600 hover:text-rose-500 font-medium transition-all duration-300 font-cormorant text-lg"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-2 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-600 transition-all duration-300 shadow-lg shadow-rose-300/50 font-cinzel text-sm tracking-wide"
                  >
                    Join
                  </Link>
                </nav>
              </div>
            </header>

            {/* Hero Section */}
            <section className="relative flex-1 flex items-center justify-center px-6 py-24 overflow-hidden bg-rose-50/50">
              {/* Background Blobs */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-200/40 rounded-full blur-3xl -z-10 animate-float" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-100/40 rounded-full blur-3xl -z-10" />

              <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="flex flex-col md:flex-row items-center gap-12">
                  {/* Text Column */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex-1 text-center md:text-left space-y-6"
                  >
                    <h3 className="text-rose-500 uppercase tracking-[0.2em] text-sm font-bold mb-4 font-cinzel">
                      The Alchemist's Path
                    </h3>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-cinzel text-slate-900">
                      <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">Heal with Grace</span>
                    </h1>
                    <p className="text-slate-500 text-xl leading-relaxed mb-10 font-cormorant">
                      Discover remedies hidden in the roots of the earth. Your personalized health journey begins with a single step.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                      <Link
                        href="/oracle"
                        className="group px-8 py-4 bg-white border border-rose-200 text-slate-800 font-bold rounded-xl text-lg tracking-wide shadow-xl hover:shadow-rose-100 transition-all duration-300 hover:-translate-y-1 font-cinzel"
                      >
                        <span className="flex items-center gap-2">
                          <span>Consult Oracle</span>
                          <span className="text-xl">🔮</span>
                        </span>
                      </Link>
                      <Link
                        href="/codex"
                        className="px-8 py-4 bg-rose-500 text-white hover:bg-rose-600 font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 font-cinzel tracking-wide shadow-lg shadow-rose-300/30"
                      >
                        Open Codex
                      </Link>
                    </div>
                  </motion.div>

                  {/* Image Column */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="flex-1 relative"
                  >
                    <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-tr from-rose-200 to-pink-100 rounded-full blur-[80px] opacity-60 animate-pulse"></div>
                      <img
                        src="/hero-grimoire.png"
                        alt="Ancient Grimoire"
                        className="relative z-10 w-full h-full object-contain drop-shadow-2xl animate-float"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
