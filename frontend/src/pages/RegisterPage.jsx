// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function RegisterPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setIsError(false);

//     try {
//       const response = await axios.post("http://localhost:8000/register", {
//         email,
//         password,
//       });

//       setMessage("Registration successful! Redirecting to login...");
//       setIsError(false);
//       console.log("Registered:", response.data);

//       setTimeout(() => {
//         navigate("/login");
//       }, 1000);
//     } catch (error) {
//       if (error.response) {
//         setMessage(`Registration failed: ${error.response.data.detail}`);
//       } else {
//         setMessage("Registration failed. Could not connect to the server.");
//       }
//       setIsError(true);
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
//       <div className="p-8 bg-gray-800 rounded-2xl shadow-lg w-96">
//         <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">
//           Create Your QRQ Account
//         </h2>

//         <form onSubmit={handleRegister}>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block mb-2 text-sm font-medium">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md font-bold transition"
//           >
//             Register
//           </button>
//         </form>

//         {message && (
//           <p
//             className={`mt-4 text-center text-sm ${
//               isError ? "text-red-400" : "text-green-400"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <p className="mt-6 text-center text-sm text-gray-400">
//           Already have an account?{" "}
//           <button
//             onClick={() => navigate("/login")}
//             className="text-cyan-400 hover:underline"
//           >
//             Login here
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Yeh request sahi hai, JSON hi bhejega
      await axios.post('http://localhost:8000/register', {
        email: email,
        password: password
      });
      // Register hone ke baad, login page par bhej dein
      navigate('/login');

    } catch (err) {
      console.error('Registration failed:', err);
      if (err.response && err.response.data.detail) {
        // Backend ka error dikhayein (jaise "Email already registered")
        setError(err.response.data.detail);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">Create Your Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-md font-bold transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}