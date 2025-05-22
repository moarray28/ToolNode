 import React, { useState ,useEffect} from 'react';
 import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import RentOptionsCard from '../components/RentOptionsCard';

const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad',
  'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Lucknow',
  'Indore', 'Bhopal', 'Nagpur', 'Patna', 'Chandigarh',
];

function Profile() {
  const { user,setUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  

  const [location, setLocation] = useState(user?.location || '');
  const [customLocation, setCustomLocation] = useState('');
  const [phoneNo, setPhoneNo] = useState(user?.phoneNo || '');
  const [address, setAddress] = useState(user?.address || '');
  const [message, setMessage] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;  

  const handleSave = async () => {
  try {
    const res = await axios.put(
      `${backendUrl}/updateprofile`,
      { location, phoneNo, address },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        withCredentials: true,
      }
    );

    // 1. Update auth context
    setUser((prev) => {
      const updatedUser = { ...prev, ...res.data.user };
      // 2. Update localStorage for persistence
      localStorage.setItem('authUser', JSON.stringify(updatedUser));
      return updatedUser;
    });

    // 3. Exit editing mode
    setIsEditing(false);

    setMessage('Profile updated successfully ✅');
  } catch (err) {
    console.error('Update error:', err.message);
    setMessage('Failed to update profile ❌');
  }
};


  // Optional: fetch user profile data if needed
  useEffect(() => {
    if (user?.location) setLocation(user.location);
    if (user?.phoneNo) setPhoneNo(user.phoneNo);
    if (user?.address) setAddress(user.address);
  }, [user]);


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
            {isEditing ? (
              <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
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
            ) : (
              <p className="text-xl text-primary">{user?.location || "Not specified"}</p>
            )}
          </div>

          <div>
            <p className="text-sm text-zinc-800">Phone Number</p>
            {isEditing ? (
              <input
                type="tel"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Enter your phone number"
                className="mt-1 w-full px-4 py-2 rounded-md border border-primary bg-secondary text-primary focus:ring-2 focus:ring-primary"
              />
            ) : (
              <p className="text-xl text-primary">{user?.phoneNo || 'Not specified'}</p>
            )}
          </div>

          <div>
            <p className="text-sm text-zinc-800">Address</p>
            {isEditing ? (
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="mt-1 w-full px-4 py-2 rounded-md border border-primary bg-secondary text-primary focus:ring-2 focus:ring-primary"
                rows={3}
              />
            ) : (
              <p className="text-xl text-primary">{user?.address || 'Not specified'}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          {isEditing ? (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-primary hover:brightness-110 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-zinc-600 hover:brightness-110 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary hover:brightness-110 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <RentOptionsCard />
    </>
  );
}

export default Profile;
