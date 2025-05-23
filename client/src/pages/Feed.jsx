 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad',
  'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Lucknow',
  'Indore', 'Bhopal', 'Nagpur', 'Patna', 'Chandigarh', 'Other City'
];

const toolCategories = [
  'Construction', 'Gardening', 'Power Tools', 'Hand Tools',
  'Cleaning Equipment', 'Painting Tools', 'Electrical Tools',
  'Measuring Instruments', 'Automotive Tools', 'Ladders & Scaffolding',
  'Plumbing Tools', 'Miscellaneous'
];

const Feed = () => {
  const [tools, setTools] = useState([]);
  const [filters, setFilters] = useState({ category: '', location: '', search: '' });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const navigate = useNavigate();

  // Debounce logic: update debouncedFilters only after 500ms of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => clearTimeout(timer); // Clear timer if filters change quickly
  }, [filters]);

  // Fetch tools only when debounced filters change
  useEffect(() => {
    fetchTools();
  }, [debouncedFilters]);

  const fetchTools = async () => {
    try {
      const query = new URLSearchParams(debouncedFilters).toString();
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
    <div className="p-6 min-h-screen rounded-xl">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Explore Tools</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        {/* Search Bar */}
        <input
          type="text"
          name="search"
          placeholder="Search by tool name or keyword"
          value={filters.search}
          onChange={handleChange}
          className="w-full md:w-64 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 placeholder:text-slate-500 shadow-inner focus:ring-2 focus:ring-primary outline-none"
        />

        {/* Category Dropdown */}
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full md:w-64 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 shadow-inner focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="">All Categories</option>
          {toolCategories.map((category, idx) => (
            <option key={idx} value={category}>{category}</option>
          ))}
        </select>

        {/* Location Dropdown */}
        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="w-full md:w-64 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 shadow-inner focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="">All Locations</option>
          {indianCities.map((city, idx) => (
            <option key={idx} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.length === 0 ? (
          <p className="text-center text-gray-500">No tools found.</p>
        ) : (
          tools.map(tool => (
            <div key={tool._id} className="bg-gray-200 p-6 rounded-xl text-gray-800 shadow-inner">
              <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
              <p><strong>Category:</strong> {tool.category || 'N/A'}</p>
              <p><strong>Rate:</strong> ₹{tool.ratePerHour}/hr</p>
              <p><strong>Owner:</strong> {tool.owner?.username || 'Unknown'}</p>
              <p><strong>Location:</strong> {tool.owner?.location || 'Not specified'}</p>

              <button
                className="mt-4 w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
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
