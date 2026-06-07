"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SettingsPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error("Not authenticated");
            })
            .then((data) => {
                setUser(data.user);
                setLoading(false);
            })
            .catch(() => {
                router.push("/login");
            });
    }, [router]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
        router.refresh();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-rose-50">
                <p className="text-slate-500 font-cormorant text-xl">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-rose-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-800 font-cinzel mb-2">Settings</h1>
                    <p className="text-slate-500 font-cormorant italic">Manage your alchemical profile</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-rose-100 rounded-3xl p-8 shadow-xl space-y-8">
                    <div>
                        <h2 className="text-lg font-bold text-slate-700 mb-4 font-cinzel">Profile</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-rose-50">
                                <span className="text-slate-500 text-sm">Name</span>
                                <span className="text-slate-800 font-medium">{user?.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-rose-50">
                                <span className="text-slate-500 text-sm">Email</span>
                                <span className="text-slate-800 font-medium">{user?.email}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-rose-50">
                                <span className="text-slate-500 text-sm">Rank</span>
                                <span className="text-emerald-600 font-medium capitalize">{user?.role || "Novice"}</span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <span className="text-slate-500 text-sm">Badges</span>
                                <span className="text-slate-800 font-medium">{user?.badges?.length || 0} earned</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-slate-700 mb-4 font-cinzel">Account</h2>
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 bg-red-50 border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {message && (
                    <p className="text-center mt-4 text-emerald-600 text-sm">{message}</p>
                )}
            </motion.div>
        </div>
    );
}
