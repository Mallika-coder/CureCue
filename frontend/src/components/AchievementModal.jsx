import React from 'react';

export default function AchievementModal({ badge, onClose }) {
  if (!badge) return null; // Agar koi badge select nahi hai, toh kuch na dikhayein

  return (
    // Backdrop (kala background)
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
    >
      {/* Modal Content (popup box) */}
      <div 
        onClick={(e) => e.stopPropagation()} // Taaki popup par click karne se woh band na ho
        className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-sm w-full border border-cyan-500"
      >
        <div className="text-center">
          <span className="text-6xl">{badge.unlocked ? badge.icon : '🔒'}</span>
          <h2 className="text-3xl font-bold mt-4 text-cyan-400">{badge.name}</h2>
          <p className="text-gray-300 mt-2 text-lg">{badge.description}</p>
          <button
            onClick={onClose}
            className="mt-6 w-full py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}