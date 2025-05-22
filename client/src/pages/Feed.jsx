 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Feed = () => {
  const [tools, setTools] = useState([]);
  const [filters, setFilters] = useState({ category: '', location: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchTools();
  }, [filters]);

  const fetchTools = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`${backendUrl}/tools?${query}`);
      setTools(res.data);
    } catch (err) {
      console.error('Error fetching tools:', err);
    }
  };

  const handleRentClick = (toolId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    } else {
      navigate(`/rent/${toolId}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl text-white mb-4">Explore Tools</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          name="category"
          placeholder="Filter by Category"
          value={filters.category}
          onChange={handleChange}
          className="p-2 rounded bg-zinc-800 text-white"
        />
        <input
          type="text"
          name="location"
          placeholder="Filter by Location"
          value={filters.location}
          onChange={handleChange}
          className="p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.length === 0 ? (
          <p className="text-zinc-400">No tools found.</p>
        ) : (
          tools.map(tool => (
            <div key={tool._id} className="bg-zinc-800 p-4 rounded-xl text-white shadow">
              <h3 className="text-xl font-semibold">{tool.title}</h3>
              <p>Category: {tool.category || 'N/A'}</p>
              <p>Rate: ₹{tool.ratePerHour}/hr</p>
              <p>Owner: {tool.owner?.username || 'Unknown'}</p>
              <p>Location: {tool.owner?.location || 'Not specified'}</p>

              <button
                className="mt-4 bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded"
                onClick={() => handleRentClick(tool._id)}
              >
                Rent This Tool
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
