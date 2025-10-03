import React, { useState } from 'react';
import axios from 'axios'; // Import axios

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setIsError(false);

    try {
      // Send a POST request to our backend's /register endpoint
      const response = await axios.post('http://localhost:8000/register', {
        email: email,
        password: password,
      });

      // If the request is successful
      setMessage('Registration successful! You can now log in.');
      setIsError(false);
      console.log('Success:', response.data);

    } catch (error) {
      // If the request fails
      if (error.response) {
        // The server responded with a status code (e.g., 400 for duplicate email)
        setMessage(`Registration failed: ${error.response.data.detail}`);
      } else {
        // Something else went wrong (e.g., network error)
        setMessage('Registration failed. Could not connect to the server.');
      }
      setIsError(true);
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">Create Your CureCue Account</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md font-bold transition">
            Register
          </button>
        </form>
        {/* Display success (green) or error (red) messages */}
        {message && (
          <p className={`mt-4 text-center text-sm ${isError ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}