import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateWasteCollection: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id from route params
  const navigate = useNavigate();
  const [wasteCollection, setWasteCollection] = useState({
    residenceId: '',
    collectionDate: '',
    wasteType: '',
    amountCollected: 0,
    collectorName: '',
  });
  const [error, setError] = useState('');

  // Fetch the specific waste collection data by id
  useEffect(() => {
    const fetchWasteCollection = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/WasteCollection/${id}`);
        setWasteCollection(response.data);
      } catch (err) {
        console.error(err); // Log the full error for more insight
        setError('Failed to fetch waste collection details');
      }
    };
    fetchWasteCollection();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/WasteCollection/${id}`, wasteCollection);
      navigate('/WasteCollection/all'); // Navigate back to the main page after update
    } catch (err) {
      setError('Failed to update waste collection');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update Waste Collection</h2>

        {error && <p className="text-center text-red-500">{error}</p>}

        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Residence ID</label>
            <input
              type="text"
              value={wasteCollection.residenceId}
              onChange={(e) => setWasteCollection({ ...wasteCollection, residenceId: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Collection Date</label>
            <input
              type="date"
              value={wasteCollection.collectionDate}
              onChange={(e) => setWasteCollection({ ...wasteCollection, collectionDate: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Waste Type</label>
            <input
              type="text"
              value={wasteCollection.wasteType}
              onChange={(e) => setWasteCollection({ ...wasteCollection, wasteType: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Amount Collected (kg)</label>
            <input
              type="number"
              value={wasteCollection.amountCollected}
              onChange={(e) => setWasteCollection({ ...wasteCollection, amountCollected: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Collector Name</label>
            <input
              type="text"
              value={wasteCollection.collectorName}
              onChange={(e) => setWasteCollection({ ...wasteCollection, collectorName: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateWasteCollection;
