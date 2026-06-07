"use client";
import { motion } from 'framer-motion';

export default function RoutineCalendar({ events = [] }) {
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDayIndex = today.getDay();

    // Sort events by time
    const sortedEvents = [...events].sort((a, b) => {
        return a.time.localeCompare(b.time);
    });

    return (
        <section className="bg-white rounded-2xl p-6 border border-rose-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100 rounded-full blur-3xl -z-10 opacity-50"></div>

            <h2 className="text-xl font-bold text-slate-800 mb-6 font-cinzel flex items-center gap-2">
                <span className="text-rose-500">📅</span> Alchemist's Almanac
            </h2>

            {/* Week View */}
            <div className="grid grid-cols-7 gap-2 mb-6">
                {days.map((d, i) => {
                    const isToday = i === currentDayIndex;
                    // Calculate date number for this day relative to today
                    const dateNum = new Date(today);
                    dateNum.setDate(today.getDate() - (currentDayIndex - i));

                    return (
                        <div key={d} className={`text-center p-2 rounded-xl border transition-all ${isToday ? 'bg-rose-500 text-white border-rose-500 shadow-md transform scale-105' : 'border-slate-100 text-slate-400'}`}>
                            <div className="text-[10px] uppercase font-bold mb-1">{d}</div>
                            <div className="text-lg font-bold">{dateNum.getDate()}</div>
                            {isToday && events.length > 0 && <div className="mx-auto w-1.5 h-1.5 bg-white rounded-full mt-1 animate-pulse"></div>}
                        </div>
                    )
                })}
            </div>

            {/* Daily Schedule */}
            <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Today's Schedule</h3>

                {sortedEvents.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 italic font-cormorant">
                        No rituals scheduled for today.
                    </div>
                ) : (
                    sortedEvents.map((event, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center p-3 bg-rose-50/50 border border-rose-100 rounded-xl hover:bg-rose-100/50 transition-colors group"
                        >
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-sm mr-3 border border-rose-50">
                                {event.icon || '✨'}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-700 text-sm">{event.title}</h4>
                                <p className="text-xs text-rose-500 font-medium">{event.type || 'Ritual'}</p>
                            </div>
                            <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-lg border border-rose-100 group-hover:border-rose-300 transition-colors">
                                {event.time}
                            </span>
                        </motion.div>
                    ))
                )}
            </div>
        </section>
    );
}
