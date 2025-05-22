 import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ToolForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    durationInHours: 1,
    ratePerHour: 1,
  });

  const [owner, setOwner] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'durationInHours' || name === 'ratePerHour' ? parseInt(value) : value
    });
  };

  useEffect(() => {
    const fetchOwner = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const res = await axios.get(`${backendUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOwner(res.data.user);
      } catch (err) {
        console.error('Error fetching owner profile:', err);
      }
    };

    fetchOwner();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    try {
      await axios.post(`${backendUrl}/savetools`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Tool listed successfully!');
      setFormData({
        title: '',
        category: '',
        image: '',
        durationInHours: 1,
        ratePerHour: 1,
      });
    } catch (err) {
      console.error('Error submitting tool:', err);
      alert('Failed to submit tool');
    }
  };

  return (
     <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-xl text-gray-700 space-y-6 shadow-md border border-transparent">
  <h2 className="text-xl font-bold text-primary">List a New Tool</h2>

  {owner && (
    <div className="bg-gray-200 p-4 rounded-md mb-4">
      <h3 className="font-semibold mb-2">Owner Info (auto-linked):</h3>
      <p><strong>Name:</strong> {owner.username}</p>
      <p><strong>Email:</strong> {owner.email}</p>
      <p><strong>Phone:</strong> {owner.phoneNo}</p>
      <p><strong>Location:</strong> {owner.location}</p>
    </div>
  )}

  <input
    type="text"
    name="title"
    value={formData.title}
    onChange={handleChange}
    placeholder="Tool title"
    className="w-full p-2 rounded-lg border-none bg-gray-200 text-gray-700 placeholder:text-slate-400 shadow-inner focus:ring-2 focus:ring-primary outline-none"
    required
  />

  <input
    type="text"
    name="category"
    value={formData.category}
    onChange={handleChange}
    placeholder="Category (optional)"
    className="w-full p-2 rounded-lg border-none bg-gray-200 text-gray-700 placeholder:text-slate-400 shadow-inner focus:ring-2 focus:ring-primary outline-none"
  />

  <input
    type="text"
    name="image"
    value={formData.image}
    onChange={handleChange}
    placeholder="Image URL (optional)"
    className="w-full p-2 rounded-lg border-none bg-gray-200 text-gray-700 placeholder:text-slate-400 shadow-inner focus:ring-2 focus:ring-primary outline-none"
  />

  {/* Duration Slider */}
  <div>
    <label className="block mb-1 text-gray-700">Rental Duration: {formData.durationInHours} hours</label>
    <input
      type="range"
      name="durationInHours"
      min="1"
      max="96"
      value={formData.durationInHours}
      onChange={handleChange}
      className="w-full accent-primary"
    />
  </div>

  {/* Rate Slider */}
  <div>
    <label className="block mb-1 text-gray-700">Rate: ₹{formData.ratePerHour} per hour</label>
    <input
      type="range"
      name="ratePerHour"
      min="1"
      max="200"
      value={formData.ratePerHour}
      onChange={handleChange}
      className="w-full accent-primary"
    />
  </div>

  <button
    type="submit"
    className="w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary transition-all"
  >
    Submit Tool
  </button>
</form>
  );
}
export default ToolForm;
