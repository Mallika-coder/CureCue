// In frontend/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate(); // Hook for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const response = await axios.post('http://localhost:8000/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      // ** THIS IS THE NEW LOGIC **
      // 1. Get the token from the response
      const { access_token } = response.data;

      // 2. Save the token in the browser's localStorage
      localStorage.setItem('userToken', access_token);

      // 3. Set a success message and redirect
      setMessage('Login successful! Redirecting...');
      setIsError(false);
      
      // 4. Redirect to the dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard'); // We will create this page next
      }, 1000);

    } catch (error) {
      if (error.response) {
        setMessage(`Login failed: ${error.response.data.detail}`);
      } else {
        setMessage('Login failed. Could not connect to the server.');
      }
      setIsError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          {/* Form inputs are the same as before */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <button type="submit" className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md font-bold transition">Login</button>
        </form>
        {message && (
          <p className={`mt-4 text-center text-sm ${isError ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}