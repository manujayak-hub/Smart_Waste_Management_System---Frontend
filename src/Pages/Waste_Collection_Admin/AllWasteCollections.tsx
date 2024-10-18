import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

interface WasteCollection {
  _id: string;
  residenceId: string;
  collectionDate: string;
  wasteType: string;
  amountCollected: number;
  collectorName: string;
}

const AllWasteCollections: React.FC = () => {
  const [wasteCollections, setWasteCollections] = useState<WasteCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch all waste collection records
  const fetchWasteCollections = async () => {
    try {
      const response = await axios.get('http://localhost:8000/WasteCollection/');
      setWasteCollections(response.data);
    } catch (err) {
      setError('Failed to fetch waste collections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWasteCollections();
  }, []);

  // Handle Delete Record
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/WasteCollection/${id}`);
      setWasteCollections(wasteCollections.filter((item) => item._id !== id));
    } catch (err) {
      setError('Failed to delete record');
    }
  };

  // Handle Update Record
  const handleUpdate = (id: string) => {
    navigate(`/update-waste-collection/${id}`); // Navigate to update page
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
        All Waste Collection Records
      </h2>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && wasteCollections.length === 0 && (
        <p className="text-center text-gray-600">No waste collections found.</p>
      )}

      <div className="flex flex-col space-y-4">
        {wasteCollections.map((collection) => (
          <div
            key={collection._id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            {/* Waste Collection Details */}
            <div className="text-gray-700 w-full md:w-2/3">
              <p>
                <strong>Residence ID:</strong> {collection.residenceId}
              </p>
              <p>
                <strong>Collection Date:</strong>{' '}
                {new Date(collection.collectionDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Waste Type:</strong> {collection.wasteType}
              </p>
              <p>
                <strong>Amount Collected:</strong> {collection.amountCollected} kg
              </p>
              <p>
                <strong>Collector Name:</strong> {collection.collectorName}
              </p>
            </div>

            {/* Buttons (Update and Delete) */}
            <div className="mt-4 md:mt-0 flex space-x-4">
              <button
                onClick={() => handleUpdate(collection._id)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(collection._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllWasteCollections;
