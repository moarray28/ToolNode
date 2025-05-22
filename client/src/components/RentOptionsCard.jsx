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
          <div className=" p-4 rounded-xl ">
            
              <TransactionHistory/>
           
            
          </div>
        )}

        {selectedOption === 'give' && (
          <div className=" p-4 rounded-xl ">
             
          
                <ToolForm/>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default RentOptionsCard;
