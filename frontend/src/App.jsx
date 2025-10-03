// In frontend/src/App.jsx

import { Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AddRoutinePage from './pages/AddRoutinePage';

function App() {
  return (
    <div>
      {/* THIS NAVIGATION BAR WAS MISSING */}
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      {/* The routes for all your pages */}
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-routine" element={<AddRoutinePage />} />
      </Routes>
    </div>
  )
}

export default App;