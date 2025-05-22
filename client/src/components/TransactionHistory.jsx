import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState({ givenForRent: [], rented: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const res = await axios.get(`${backendUrl}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error('Error fetching transaction history:', err);
        alert('Failed to load transaction history');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-2xl text-purple-400 font-bold">Your Transaction History</h2>

      <div>
        <h3 className="text-xl text-green-300 mb-2">Tools You Rented</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {transactions.rented.length === 0 ? (
            <p className="text-zinc-400">You haven’t rented any tools yet.</p>
          ) : (
            transactions.rented.map(tool => (
              <div key={tool._id} className="bg-zinc-800 p-4 rounded-lg text-white shadow">
                <h4 className="text-lg font-semibold">{tool.title}</h4>
                <p>Category: {tool.category || 'N/A'}</p>
                <p>Rate: ₹{tool.ratePerHour}/hr</p>
                <p>Rental Requests: {
                  tool.rentalRequests.filter(r => r.renterId === localStorage.getItem('userId')).length
                }</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl text-blue-300 mt-8 mb-2">Tools You Listed for Rent</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {transactions.givenForRent.length === 0 ? (
            <p className="text-zinc-400">You haven’t listed any tools for rent yet.</p>
          ) : (
            transactions.givenForRent.map(tool => (
              <div key={tool._id} className="bg-zinc-800 p-4 rounded-lg text-white shadow">
                <h4 className="text-lg font-semibold">{tool.title}</h4>
                <p>Category: {tool.category || 'N/A'}</p>
                <p>Rate: ₹{tool.ratePerHour}/hr</p>
                <p>Total Rental Requests: {tool.rentalRequests.length}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
