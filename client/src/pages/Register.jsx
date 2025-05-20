import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {

 
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
  } catch (err) {
    // You can customize error message display based on error response
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
    <>
      register pag


      <div className="relative loginimage flex justify-center items-center min-h-screen ">
  <div className="relative z-10 w-full mx-4 max-w-md p-6 rounded-xl 
                
                  bg-gray-100 border border-transparent">
    <h2 className="text-2xl font-bold mb-6 text-center text-primary">Register</h2>

    <form onSubmit={handleRegister}>
       

      <div className="mb-4">
        <label className="block text-sm font-medium text-accent">Username</label>
        <input
          type="text"
          className="mt-1 w-full px-4 py-2 rounded-lg border-none 
                     bg-secondary text-accent placeholder:text-accent/50 
                     shadow-inner focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-accent">Email</label>
        <input
          type="email"
          className="mt-1 w-full px-4 py-2 rounded-lg border-none 
                     bg-secondary text-accent placeholder:text-accent/50 
                     shadow-inner focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-accent">Password</label>
        <input
          type="password"
          className="mt-1 w-full px-4 py-2 rounded-lg border-none 
                     bg-secondary text-accent placeholder:text-accent/50 
                     shadow-inner focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-2 bg-primary text-white font-semibold 
                   rounded-lg hover:brightness-110 transition-all"
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
      <p className="text-accent">
        Already have an account?{' '}
        <Link to="/login" className="text-primary underline hover:opacity-80 transition-colors">
          Sign in here
        </Link>
      </p>
    </div>
  </div>
</div>

      
    </>
  )
}

export default Register
