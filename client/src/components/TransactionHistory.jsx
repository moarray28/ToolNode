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
     <div className="p-6 space-y-10 bg-gray-100 rounded-xl shadow-md border border-transparent">
  <h2 className="text-2xl font-bold text-center text-primary">Your Transaction History</h2>

  <div>
    <h3 className="text-xl font-semibold text-indigo-600 mb-4">Tools You Rented</h3>
    <div className="grid md:grid-cols-2 gap-4">
      {transactions.rented.length === 0 ? (
        <p className="text-gray-500">You haven’t rented any tools yet.</p>
      ) : (
        transactions.rented.map(tool => (
          <div key={tool._id} className="bg-gray-200 p-4 rounded-lg shadow-inner text-gray-800">
            <h4 className="text-lg font-bold">{tool.title}</h4>
            <p><strong>Category:</strong> {tool.category || 'N/A'}</p>
            <p><strong>Rate:</strong> ₹{tool.ratePerHour}/hr</p>
            <p>
              <strong>Rental Requests:</strong>{" "}
              {tool.rentalRequests.filter(r => r.renterId === localStorage.getItem('userId')).length}
            </p>
          </div>
        ))
      )}
    </div>
  </div>

  <div>
    <h3 className="text-xl font-semibold text-purple-700 mt-8 mb-4">Tools You Listed for Rent</h3>
    <div className="grid md:grid-cols-2 gap-4">
      {transactions.givenForRent.length === 0 ? (
        <p className="text-gray-500">You haven’t listed any tools for rent yet.</p>
      ) : (
        transactions.givenForRent.map(tool => (
          <div key={tool._id} className="bg-gray-200 p-4 rounded-lg shadow-inner text-gray-800">
            <h4 className="text-lg font-bold">{tool.title}</h4>
            <p><strong>Category:</strong> {tool.category || 'N/A'}</p>
            <p><strong>Rate:</strong> ₹{tool.ratePerHour}/hr</p>
            <p><strong>Total Rental Requests:</strong> {tool.rentalRequests.length}</p>
          </div>
        ))
      )}
    </div>
  </div>
</div>
  );
}   

export default TransactionHistory;