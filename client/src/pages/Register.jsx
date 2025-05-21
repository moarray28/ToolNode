import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import pattern1 from '../assets/pattern1.png'

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {

  const { login } = useAuth()
  const navigate = useNavigate()
 
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [error, setError] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  

 
 const handleRegister = async (e) => {
  e.preventDefault();

  setLoading(true);
  setMessage('');
  setError('');

  try {
    const response = await axios.post(`${backendUrl}/register`, {
      username,
      email,
      password,
    });

    setMessage(response.data.message || 'Registration successful!');

    if (response.data.token && response.data.user) {
      // Pass both token and user object to login()
      login(response.data.token, response.data.user);
      navigate('/profile'); // Redirect to profile
    } else {
      navigate('/login'); // If no token/user, fallback to login page
    }

  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError('Something went wrong. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

return (
     <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={pattern1}
        alt="Pattern"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-55 p-0 m-0 rounded-3xl"
      />

      {/* Centered Register Box */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="w-full mx-4 max-w-md p-6 rounded-xl bg-gray-100 shadow-md border border-transparent">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">Register</h2>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                className="mt-1 w-full px-4 py-2 rounded-lg border-none bg-gray-200 text-gray-800 placeholder:text-gray-400 shadow-inner focus:ring-2 focus:ring-primary outline-none"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full px-4 py-2 rounded-lg border-none bg-gray-200 text-gray-800 placeholder:text-gray-400 shadow-inner focus:ring-2 focus:ring-primary outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full px-4 py-2 rounded-lg border-none bg-gray-200 text-gray-800 placeholder:text-gray-400 shadow-inner focus:ring-2 focus:ring-primary outline-none"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-2 bg-primary text-white font-semibold rounded-lg hover:brightness-110 transition-all"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          {message && (
            <p className={`mt-4 text-center ${loading ? 'text-primary' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Already have an account?{' '}
              <Link to="/login" className="text-primary underline hover:opacity-80 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
