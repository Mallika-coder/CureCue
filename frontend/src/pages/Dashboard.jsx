import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RoutineCalendar from '../components/RoutineCalendar';
import ChatWidget from "../components/ChatWidget";
import AchievementModal from '../components/AchievementModal'; // <-- (STEP 1) Naya modal import karein

// --- UPDATED BADGE COMPONENT ---
// Ab yeh clickable hai aur description rakhta hai
function AchievementBadges({ routineCount, onBadgeClick }) {
  
  // Badges mein description add karein taaki modal mein dikha sakein
  const badges = [
    { name: "First Potion", unlocked: routineCount >= 1, icon: "🧪", description: "You brewed your first potion! The journey begins." },
    { name: "Budding Alchemist", unlocked: routineCount >= 3, icon: "✨", description: "Three potions on your list! You're building a real habit." },
    { name: "Master Brewer", unlocked: routineCount >= 5, icon: "🏆", description: "Five unique potions! Your grimoire is growing powerful." },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 border-b-2 border-cyan-500 pb-2">Achievements</h2>
      <div className="space-y-3">
        {badges.map(badge => (
          // div ko <button> se replace karein
          <button
            key={badge.name}
            onClick={() => onBadgeClick(badge)} // <-- (STEP 2) Click handler add karein
            className={`w-full p-3 rounded-md flex items-center text-left transition-all ${
              badge.unlocked 
                ? 'bg-green-800 hover:bg-green-700' 
                : 'bg-gray-700 opacity-50 cursor-not-allowed'
            }`}
            disabled={!badge.unlocked} // Agar unlocked nahi hai toh disable kar dein
          >
            <span className="text-2xl mr-3">{badge.unlocked ? badge.icon : '🔒'}</span>
            <span className="font-semibold">{badge.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}


export default function Dashboard() {
  const [userName, setUserName] = useState('User');
  const [syncMessage, setSyncMessage] = useState('');
  const [routineCount, setRoutineCount] = useState(0); 
  const [selectedBadge, setSelectedBadge] = useState(null); // <-- (STEP 3) Modal ke liye naya state

  // Routine count fetch karne ke liye useEffect (same as before)
  useEffect(() => {
    const fetchRoutineCount = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) return;
      try {
        const response = await axios.get('http://localhost:8000/routines/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setRoutineCount(response.data.length);
      } catch (error) {
        console.error("Failed to fetch routine count:", error);
      }
    };
    fetchRoutineCount();
  }, []);

  // Google Sync function (same as before)
  const handleSync = async () => {
    setSyncMessage('Syncing to Google Calendar...');
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post('http://localhost:8000/sync-calendar', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSyncMessage(response.data.message);
    } catch (error) {
      console.error('Failed to sync calendar:', error);
      setSyncMessage('Sync failed. Check console for errors.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex flex-col sm:flex-row justify-between sm:items-center">
          <div>
            <h1 className="text-4xl font-bold text-cyan-400">Welcome, {userName}!</h1>
            <p className="text-gray-400">Here is your wellness command center.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={handleSync}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Sync to Google Calendar
            </button>
            {syncMessage && <p className="text-sm text-gray-400 text-right mt-2">{syncMessage}</p>}
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-cyan-500 pb-2">Your Daily Potions</h2>
            <RoutineCalendar />
            <Link to="/add-routine" className="block text-center mt-6 w-full py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md font-bold transition">
              + Brew a New Potion
            </Link>
          </div>
          
          <div className="lg:col-span-1">
            {/* (STEP 4) onBadgeClick prop pass karein */}
            <AchievementBadges 
              routineCount={routineCount} 
              onBadgeClick={setSelectedBadge} 
            />
          </div>

        </main>
      </div>
      
      <div className="fixed bottom-6 right-6 z-50">
        <ChatWidget />
      </div>

      {/* --- (STEP 5) Modal ko render karein --- */}
      {/* Yeh tabhi dikhega jab selectedBadge null nahi hoga */}
      <AchievementModal 
        badge={selectedBadge} 
        onClose={() => setSelectedBadge(null)} 
      />
    </div>
  );
}