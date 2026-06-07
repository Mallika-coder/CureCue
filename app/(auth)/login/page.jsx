"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            let data;
            const text = await res.text();
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error("Server error. Please try again later.");
            }

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            router.push("/lab");
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-rose-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl shadow-rose-200/50 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200 rounded-full blur-3xl opacity-20 -mr-10 -mt-10" />

                <div className="text-center mb-8 relative z-10">
                    <Link href="/" className="inline-block text-4xl mb-2 hover:scale-110 transition-transform">✨</Link>
                    <h1 className="text-3xl font-bold text-slate-800 font-cinzel">
                        Enter the Grimoire
                    </h1>
                    <p className="text-slate-500 text-sm mt-2 font-cormorant italic">
                        "Knowledge awaits those who seek it."
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-slate-600 text-sm font-semibold mb-2 ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full bg-white border border-rose-100 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all font-cormorant text-lg"
                            placeholder="alchemist@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-slate-600 text-sm font-semibold mb-2 ml-1">
                            Secret Key (Password)
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full bg-white border border-rose-100 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all font-cormorant text-lg"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-rose-500 hover:bg-rose-400 text-white font-bold py-3 rounded-xl shadow-lg shadow-rose-200 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed font-cinzel tracking-wide"
                    >
                        {isLoading ? "Opening Portal..." : "Unlock Grimoire"}
                    </button>
                </form>

                <div className="mt-8 text-center relative z-10">
                    <p className="text-slate-400 text-sm">
                        Not initiated yet?{" "}
                        <Link href="/register" className="text-rose-500 hover:text-rose-400 font-semibold hover:underline decoration-rose-200">
                            Begin your apprenticeship
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
