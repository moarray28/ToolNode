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

  if (!tool) return <p className="text-white p-4">Loading...</p>;

  const owner = tool.owner || {};

  return (
    <div className="p-6 text-white max-w-xl mx-auto">
      <div className="rounded-lg shadow-md bg-zinc-800 p-6">
        <h2 className="text-2xl font-bold mb-2">{tool.title}</h2>
        <p className="mb-1"><strong>Category:</strong> {tool.category}</p>
        <p className="mb-1"><strong>Rate:</strong> ₹{tool.ratePerHour}/hr</p>
        <p className="mb-4"><strong>Available for:</strong> {tool.durationInHours} hours</p>

        <h3 className="font-semibold text-lg mb-2">Owner Information:</h3>
        <p><strong>Name:</strong> {owner.username || 'N/A'}</p>
        <p><strong>Email:</strong> {owner.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {owner.phoneNo || 'N/A'}</p>
        <p className="mb-4"><strong>Location:</strong> {owner.location || 'N/A'}</p>

        <label className="block mb-2">Select Rental Duration (hours):</label>
        <input
          type="number"
          min="1"
          max={tool.durationInHours}
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          className="w-full p-2 mb-4 bg-zinc-900 border border-zinc-600 rounded"
        />

        <button
          onClick={handleRequest}
          className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded w-full"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default RentTool;
