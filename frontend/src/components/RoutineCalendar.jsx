import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';

const localizer = momentLocalizer(moment);

// --- THIS IS THE NEW ALARM FUNCTION ---
const setupAlarms = (routines) => {
  // 1. Ask for permission
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }

  const now = moment();
  routines.forEach(routine => {
    // Parse the time (e.g., "08:00 AM")
    const routineTime = moment(routine.time, 'HH:mm A');
    
    // Check if the time is in the future today
    const timeDiff = routineTime.diff(now, 'milliseconds');

    if (timeDiff > 0) { // If time is in the future
      setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification('CureCue Reminder!', {
            body: `It's time for your routine: ${routine.name}`,
            icon: '/vite.svg', // You can change this to your app's icon
          });
        }
      }, timeDiff);
    }
  });
};

export default function RoutineCalendar() {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    if (!token) return; 

    const fetchRoutines = async () => {
      try {
        const response = await axios.get('http://localhost:8000/routines/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const routines = response.data;

        // Convert routines to calendar 'events'
        const calendarEvents = routines.map(routine => {
          const time = moment(routine.time, 'HH:mm A');
          return {
            id: routine.id,
            title: routine.name,
            start: time.toDate(), // On today's date
            end: time.clone().add(15, 'minutes').toDate(), // 15 min duration
            allDay: false
          };
        });
        
        setEvents(calendarEvents);
        
        // --- ADDED THIS LINE ---
        // Setup alarms after fetching routines
        setupAlarms(routines); 

      } catch (error) {
        console.error("Failed to fetch routines:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('userToken');
          window.location.href = '/login'; 
        }
      }
    };
    fetchRoutines();
  }, [token]);

  if (!token) {
    return <p className="text-gray-400">Please <a href="/login" className="text-cyan-400 underline">login</a> to see your routines.</p>
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg" style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', color: 'white' }}
        views={['month', 'week', 'day']}
        defaultView="day"
      />
    </div>
  );
}