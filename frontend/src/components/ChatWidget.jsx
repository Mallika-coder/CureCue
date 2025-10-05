// In frontend/src/components/ChatWidget.jsx

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [sessionId, setSessionId] = useState('');

  // Generate a unique session ID when the component first loads
  useEffect(() => {
    setSessionId(uuidv4());
    setMessages([{ from: 'bot', text: "Hello! I am the Mystic. How are you feeling today?" }]);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage = { from: 'user', text: currentMessage };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setCurrentMessage('');

    try {
      // Send message to our backend proxy
      const response = await axios.post('http://localhost:8000/mystic-chat/', {
        text: currentMessage,
        session_id: sessionId,
      });

      const botMessage = { from: 'bot', text: response.data.reply };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error communicating with the mystic:", error);
      const errorMessage = { from: 'bot', text: "Sorry, I'm having trouble connecting right now." };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Bubble */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="bg-cyan-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl animate-bounce">
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-gray-800 rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-gray-900 p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="text-white font-bold">Consult the Mystic</h3>
            <button onClick={() => setIsOpen(false)} className="text-white text-xl">&times;</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <span className={`inline-block p-2 rounded-lg max-w-xs ${msg.from === 'bot' ? 'bg-gray-700' : 'bg-cyan-600'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-2 border-t border-gray-700">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
            />
          </form>
        </div>
      )}
    </div>
  );
}