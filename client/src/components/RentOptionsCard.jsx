import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ToolForm from './ToolForm';
import TransactionHistory from './TransactionHistory';

const RentOptionsCard = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption((prev) => (prev === option ? null : option));
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6  rounded-2xl  text-white transition-all duration-300">
      {/* Button Group */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => handleSelect('give')}
          className={`px-6 py-2 rounded-lg font-semibold transition 
            ${selectedOption === 'give' ? 'bg-secondary text-primary' : 'bg-zinc-800 hover:bg-cyan-100 hover:text-black'}`}
        >
          Give to Rent
        </button>

        <button
          onClick={() => handleSelect('transaction')}
          className={`px-6 py-2 rounded-lg font-semibold transition  shadow-lg
            ${selectedOption === 'transaction' ? 'bg-secondary text-primary' : 'bg-zinc-800 hover:bg-cyan-100 hover:text-black'}`}
        >
          Transaction History
        </button>
        
      </div>

      {/* Dynamic Content */}
      <div className="transition-all duration-500">
        {selectedOption === 'transaction' && (
          <div className="bg-zinc-800 p-4 rounded-xl shadow-inner">
            <h3 className="text-xl font-bold mb-2">🔍 Browse & Rent Tools</h3>
            <div className="text-zinc-300">
              Explore tools by category, filter by location and availability, and request items for temporary use.

              <TransactionHistory/>
           
            </div>
          </div>
        )}

        {selectedOption === 'give' && (
          <div className="bg-zinc-800 p-4 rounded-xl shadow-inner">
            <h3 className="text-xl font-bold mb-2">📤 List Your Tool for Rent</h3>
            <div className="text-zinc-300">
                <ToolForm/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentOptionsCard;
