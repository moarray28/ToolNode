 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const RentTool = () => {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [duration, setDuration] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${backendUrl}/tools/${id}`)
      .then(res => setTool(res.data))
      .catch(err => console.error('Error fetching tool:', err));
  }, [id]);

  const handleRequest = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("You must be logged in to rent a tool.");
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${backendUrl}/tools/${id}/request`, {
        durationHours: duration,
        startDate: new Date()
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Rental request submitted!');
      navigate('/profile');
    } catch (err) {
      console.error('Rental request failed:', err);
      alert('Error submitting request');
    }
  };

  if (!tool) return <p className="text-center text-gray-500 p-4">Loading...</p>;

  const owner = tool.owner || {};

  return (
    <div className="p-6  min-h-screen flex justify-center items-start">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-primary mb-4">{tool.title}</h2>
        
        <div className="space-y-2 text-gray-700">
          <p><strong>Category:</strong> {tool.category}</p>
          <p><strong>Rate:</strong> ₹{tool.ratePerHour}/hr</p>
          <p><strong>Available for:</strong> {tool.durationInHours} hours</p>
        </div>

        <hr className="my-4" />

        <div className="space-y-1 text-gray-700">
          <h3 className="text-lg font-semibold text-primary">Owner Information:</h3>
          <p><strong>Name:</strong> {owner.username || 'N/A'}</p>
          <p><strong>Email:</strong> {owner.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {owner.phoneNo || 'N/A'}</p>
          <p><strong>Location:</strong> {owner.location || 'N/A'}</p>
        </div>

        <div className="mt-4">
          <label className="block mb-1 text-gray-600 font-medium">Select Rental Duration (hours):</label>
          <input
            type="number"
            min="1"
            max={tool.durationInHours}
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full p-2 rounded-lg bg-gray-200 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <button
          onClick={handleRequest}
          className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default RentTool;
