"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Image as ImageIcon, Loader2 } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            type: "text",
            content: "Hello 🌿 I’m your Empathetic AI Companion. How are you feeling today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatRef = useRef(null);

    /* Auto-scroll */
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages, loading]);

    /* ===== TEXT AI ===== */
    const getAIResponse = async (message) => {
        const url =
            "https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQm81Qnd5eHIwYkVfbkEwcGJOX21LYmpSU2tpWnlTYmlNYW9IWGluZE5TWEFKc2sxUTdQWFZrQldMVVVmSDJyQ3pWMEdFbFBxbkVleF9VMTR5ZDgzQVpTbmVrZ3c9PQ==";

        try {
            const res = await axios.post(url, { prompt: message });
            return res.data?.status === "success"
                ? res.data.text
                : "Oops, something went wrong 😔";
        } catch {
            return "Oops, something went wrong 😔";
        }
    };

    /* ===== IMAGE AI ===== */
    const generateImage = async (prompt) => {
        const url =
            "https://backend.buildpicoapps.com/aero/run/image-generation-api?pk=v1-Z0FBQUFBQm81QnhYQnhfTUhCSlVvMlV1dFg1WURLVTZBWmNtNHNTLVZKb0VnMk1tLTRTdVI1aXItNTl4alJvUDN5NXZVZUdCMnlpMG43MndlZnhqV3Q0UXVKMlRMQjEyYnc9PQ==";

        try {
            const res = await axios.post(url, { prompt });
            return res.data?.status === "success" ? res.data.imageUrl : null;
        } catch {
            return null;
        }
    };

    /* ===== SEND MESSAGE ===== */
    const sendMessage = async (mode = "text") => {
        if (!input.trim()) return;

        const userText = input;
        setMessages((prev) => [
            ...prev,
            { sender: "user", type: "text", content: userText },
        ]);
        setInput("");
        setLoading(true);

        try {
            if (mode === "image") {
                const imageUrl = await generateImage(userText);
                if (!imageUrl) throw new Error();

                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", type: "image", content: imageUrl },
                ]);
            } else {
                const reply = await getAIResponse(userText);
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", type: "text", content: reply },
                ]);
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    type: "text",
                    content: "⚠️ Something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-rose-400 to-pink-500 p-4 rounded-full shadow-2xl hover:scale-110 transition shadow-rose-300/50"
                >
                    <MessageCircle className="w-6 h-6 text-white" />
                </button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-6 right-6 z-[100] w-96 h-[520px] bg-white/95 backdrop-blur-md text-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col border border-rose-200"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 bg-rose-400 rounded-t-2xl border-b border-rose-300">
                            <div className="flex items-center gap-2">
                                <span className="text-white text-xl">🧙‍♀️</span>
                                <h3 className="font-semibold text-white font-cinzel">
                                    The Mystic Oracle
                                </h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                                <X />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={chatRef}
                            className="flex-1 p-4 space-y-3 overflow-y-auto bg-rose-50/30"
                        >
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.sender === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${msg.sender === "user"
                                            ? "bg-rose-500 text-white font-medium rounded-tr-sm"
                                            : "bg-white text-slate-700 border border-rose-100 rounded-tl-sm"
                                            }`}
                                    >
                                        {msg.type === "image" ? (
                                            <img
                                                src={msg.content}
                                                alt="Generated"
                                                className="rounded-lg border border-rose-100"
                                            />
                                        ) : (
                                            msg.content
                                        )}
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex justify-center py-2">
                                    <Loader2 className="animate-spin text-rose-400" />
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white border-t border-rose-100 flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="Ask the ancient wisdom..."
                                className="flex-1 px-4 py-2 rounded-xl bg-rose-50 border-none outline-none text-sm text-slate-800 placeholder-rose-300 focus:ring-2 focus:ring-rose-200"
                            />
                            <button
                                onClick={() => sendMessage()}
                                className="bg-rose-400 p-2 rounded-xl text-white hover:bg-rose-500 transition-colors shadow-lg shadow-rose-200"
                            >
                                <Send size={18} />
                            </button>
                            <button
                                onClick={() => sendMessage("image")}
                                className="bg-pink-400 p-2 rounded-xl text-white hover:bg-pink-500 transition-colors shadow-lg shadow-pink-200"
                            >
                                <ImageIcon size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}