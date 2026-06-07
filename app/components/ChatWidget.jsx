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
          className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <span className="text-2xl">🌱</span>
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
            className="fixed bottom-6 right-6 z-[100] w-96 h-[520px] bg-[#051512] text-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col border-2 border-[#fbbf24]/60"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-[#0a2520] rounded-t-2xl border-b border-[#fbbf24]/20">
              <div className="flex items-center gap-2">
                <span className="text-[#fbbf24]">🌱</span>
                <h3 className="font-semibold text-[#fbbf24]">
                  The Mystic Oracle
                </h3>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={chatRef}
              className="flex-1 p-4 space-y-3 overflow-y-auto bg-black/20"
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
                    className={`max-w-[80%] rounded-xl p-3 shadow-md ${msg.sender === "user"
                      ? "bg-[#fbbf24] text-black font-medium"
                      : "bg-[#1a3a34] text-white border border-white/10"
                      }`}
                  >
                    {msg.type === "image" ? (
                      <img
                        src={msg.content}
                        alt="Generated"
                        className="rounded-lg border border-white/20"
                      />
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-center py-2">
                  <Loader2 className="animate-spin text-[#fbbf24]" />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 bg-[#0a2520] border-t border-[#fbbf24]/20 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask the ancient wisdom..."
                className="flex-1 px-3 py-2 rounded-lg bg-[#112b26] border border-white/10 outline-none text-sm"
              />
              <button
                onClick={() => sendMessage()}
                className="bg-[#fbbf24] p-2 rounded-lg text-black"
              >
                <Send size={18} />
              </button>
              <button
                onClick={() => sendMessage("image")}
                className="bg-emerald-500 p-2 rounded-lg text-white"
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
