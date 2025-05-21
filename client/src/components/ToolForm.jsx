 import React, { useState } from 'react';
import axios from 'axios';

const ToolForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    durationInHours: 1,
    ratePerHour: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'durationInHours' || name === 'ratePerHour' ? parseInt(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    try {
      await axios.post('http://localhost:5000/tools', formData, {
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
    <form onSubmit={handleSubmit} className="bg-zinc-800 p-6 rounded-xl text-white space-y-6 shadow-lg">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Tool title"
        className="w-full p-2 rounded-md bg-zinc-900 border border-zinc-600"
        required
      />

      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category (optional)"
        className="w-full p-2 rounded-md bg-zinc-900 border border-zinc-600"
      />

      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL (optional)"
        className="w-full p-2 rounded-md bg-zinc-900 border border-zinc-600"
      />

      {/* Duration Slider */}
      <div>
        <label className="block mb-1 text-zinc-300">Rental Duration: {formData.durationInHours} hours</label>
        <input
          type="range"
          name="durationInHours"
          min="1"
          max="96"
          value={formData.durationInHours}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {/* Rate Slider */}
      <div>
        <label className="block mb-1 text-zinc-300">Rate: ₹{formData.ratePerHour} per hour</label>
        <input
          type="range"
          name="ratePerHour"
          min="1"
          max="200"
          value={formData.ratePerHour}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg"
      >
        Submit Tool
      </button>
    </form>
  );
};

export default ToolForm;
