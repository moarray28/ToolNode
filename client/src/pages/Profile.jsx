import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import RentOptionsCard from '../components/RentOptionsCard'

const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad',
  'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Lucknow',
  'Indore', 'Bhopal', 'Nagpur', 'Patna', 'Chandigarh',
];


function Profile() {
  const { user } = useAuth();

  const [location, setLocation] = useState(user?.location || '');
  const [customLocation, setCustomLocation] = useState('');

  const handleLocationChange = (e) => {
    const selected = e.target.value;
    setLocation(selected === 'custom' ? '' : selected);
    setCustomLocation('');
  };

  const handleCustomInput = (e) => {
    setCustomLocation(e.target.value);
    setLocation(e.target.value);
  };


  return (
    <>
     <div className="max-w-3xl mx-auto mt-10 p-6 bg-secondary text-primary rounded-2xl shadow-xl border border-zinc-700">
      <h2 className="text-3xl font-bold text-primary mb-4">Your Profile</h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-zinc-800">Username</p>
          <p className="text-xl font-medium text-primary">{user?.username}</p>
        </div>

        <div>
          <p className="text-sm text-zinc-800">Email</p>
          <p className="text-xl text-primary">{user?.email}</p>
        </div>

        <div>
          <p className="text-sm text-zinc-800">Location</p>
          <p className="text-xl text-primary">{user?.location || "Not specified"}</p>

          <div className="mt-2 flex flex-col sm:flex-row border-primary items-start sm:items-center gap-2">
            <select
              className="bg-secondary text-black px-4 py-2 border-2 border-primary rounded-md focus:ring-2 focus:ring-primary"
              value={indianCities.includes(location) ? location : 'custom'}
              onChange={handleLocationChange}
            >
              <option value="">Select a city</option>
              {indianCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
              <option value="custom">Other...</option>
            </select>

            {(!indianCities.includes(location) || location === 'custom') && (
              <input
                type="text"
                value={customLocation}
                onChange={handleCustomInput}
                placeholder="Enter your city"
                className="bg-secondary text-primary px-4 py-2 rounded-md border border-primary w-full sm:w-64 focus:ring-2 focus:ring-primary"
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => console.log('Save location:', location)}
          className="bg-primary hover:brightness-110 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Save Changes
        </button>
      </div>


    </div>

      <RentOptionsCard />
    </>

  );
}

export default Profile
