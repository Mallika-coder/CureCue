// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setIsError(false);

//     const formData = new URLSearchParams();
//     formData.append("username", email);
//     formData.append("password", password);

//     try {
//       const response = await axios.post("http://localhost:8000/login", formData, {
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       });

//       const { access_token } = response.data;
//       localStorage.setItem("userToken", access_token);

//       setMessage("Login successful! Redirecting...");
//       setIsError(false);

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 800);
//     } catch (error) {
//       if (error.response) {
//         setMessage(`Login failed: ${error.response.data.detail || "Invalid credentials"}`);
//       } else {
//         setMessage("Login failed. Could not connect to the server.");
//       }
//       setIsError(true);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
//       <div className="p-8 bg-gray-800 rounded-2xl shadow-lg w-96">
//         <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">
//           Welcome Back
//         </h2>
//         <form onSubmit={handleLogin}>
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
//             Login
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
//           Don’t have an account?{" "}
//           <button
//             onClick={() => navigate("/register")}
//             className="text-cyan-400 hover:underline"
//           >
//             Register here
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // --- YEH HAI IMPORTANT CHANGE ---
    // FastAPI ke OAuth2PasswordRequestForm ko form-data chahiye, JSON nahi.
    const formData = new URLSearchParams();
    formData.append('username', email);    // 'username' field use karein, email nahi
    formData.append('password', password);

    try {
      const response = await axios.post('http://localhost:8000/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // 'access_token' ko save karein, 'userToken' nahi
      localStorage.setItem('userToken', response.data.access_token);
      
      // Axios ke default headers set karein taaki future requests mein token automatically jaaye
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

      navigate('/dashboard'); // Dashboard par redirect karein

    } catch (err) {
      console.error('Login failed:', err);
      if (err.response && err.response.data.detail) {
        setError(err.response.data.detail); // Backend se real error dikhayein
      } else {
        setError('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">Welcome Back</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email (Username)</label>
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
            Login
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}