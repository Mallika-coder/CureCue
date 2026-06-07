//components/Sidebar.jsx
// import { Home, Award, Settings, Droplet, LogOut, Calendar, Sparkles } from "lucide-react";

// const NAV_ITEMS = [
//   { name: "Dashboard", icon: Home },
//   { name: "Potions", icon: Droplet },
//   { name: "Calendar", icon: Calendar },
//   { name: "Rewards", icon: Award },
//   { name: "Settings", icon: Settings },
// ];

// export default function Sidebar({ activeView, setActiveView }) {
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/';
//   };

//   return (
//     <aside className="w-16 sm:w-20 lg:w-64 bg-white/10 backdrop-blur-sm border-r border-gold-400/30 flex flex-col shadow-2xl">
//       <div className="flex items-center justify-center gap-3 p-4 sm:p-5 border-b border-gold-400/30">
//         <div className="relative">
//           <div className="absolute inset-0 bg-gold-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
//           <div className="relative w-10 h-10 bg-gradient-to-br from-gold-400 to-yellow-500 rounded-full flex items-center justify-center">
//             <Sparkles className="w-6 h-6 text-black" />
//           </div>
//         </div>
//         <span className="hidden lg:inline font-bold text-2xl bg-gradient-to-r from-gold-400 to-yellow-400 bg-clip-text text-transparent">
//           Grimoire
//         </span>
//       </div>

//       <nav className="flex-1 p-2 sm:p-3 space-y-2">
//         {NAV_ITEMS.map((item) => (
//           <button
//             key={item.name}
//             onClick={() => setActiveView(item.name)}
//             className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
//               activeView === item.name
//                 ? "bg-gradient-to-r from-gold-500 to-yellow-500 text-black shadow-lg animate-glow"
//                 : "text-emerald-100 hover:text-white hover:bg-white/10 glass"
//             }`}
//           >
//             <item.icon className="w-5 h-5 flex-shrink-0" />
//             <span className="hidden lg:inline font-medium">{item.name}</span>
//           </button>
//         ))}
//       </nav>

//       <div className="p-2 sm:p-3 border-t border-gold-400/30">
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 text-emerald-100 hover:text-white hover:bg-red-500/20 glass"
//         >
//           <LogOut className="w-5 h-5 flex-shrink-0" />
//           <span className="hidden lg:inline font-medium">Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// }


// components/Sidebar.jsx
import { Home, Award, Settings, Droplet, LogOut, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { name: "Dashboard", icon: Home },
  { name: "Potions", icon: Droplet },
  { name: "Calendar", icon: Calendar },
  { name: "Rewards", icon: Award },
  { name: "Settings", icon: Settings },
];

export default function Sidebar({ activeView, setActiveView }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <aside className="w-16 sm:w-20 lg:w-64 bg-[#021f1e] border-r border-gold-500/30 flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-40 relative">
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 parchment-overlay opacity-[0.05] pointer-events-none" />

      {/* Header / Logo Section */}
      <div className="flex items-center justify-center lg:justify-start gap-3 p-6 border-b border-gold-500/20">
        <div className="relative">
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-gold-500 rounded-full blur-md"
          ></motion.div>
          <div className="relative w-10 h-10 bg-emerald-950 border border-gold-500/50 rounded-lg flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-gold-400" />
          </div>
        </div>
        <span className="hidden lg:inline font-serif font-bold text-2xl text-magic-gold tracking-widest">
          GRIMOIRE
        </span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3 space-y-4 mt-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveView(item.name)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 relative group ${
              activeView === item.name
                ? "text-emerald-950 font-bold"
                : "text-emerald-100/70 hover:text-gold-200"
            }`}
          >
            {/* Active Highlight Background */}
            {activeView === item.name && (
              <motion.div 
                layoutId="activeNav"
                className="absolute inset-0 bg-gradient-to-r from-gold-400 to-yellow-600 rounded-xl shadow-[0_0_15px_rgba(251,191,36,0.4)]"
              />
            )}
            
            {/* Hover Glow Effect (for non-active) */}
            <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <item.icon className={`w-5 h-5 z-10 ${activeView === item.name ? "text-emerald-950" : "group-hover:text-gold-400"}`} />
            <span className="hidden lg:inline font-serif tracking-wide z-10">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gold-500/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group hover:bg-red-950/30 border border-transparent hover:border-red-500/30"
        >
          <LogOut className="w-5 h-5 text-emerald-500 group-hover:text-red-400" />
          <span className="hidden lg:inline font-serif text-emerald-500 group-hover:text-red-400">Logout</span>
        </button>
      </div>
    </aside>
  );
}