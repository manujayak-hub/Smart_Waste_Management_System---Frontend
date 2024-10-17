import React, { useState } from 'react';
import axios from 'axios';

const RecordCollection: React.FC = () => {
  const [formData, setFormData] = useState({
    residenceId: '',
    collectionDate: '',
    wasteType: '',
    amountCollected: '',
    collectorName: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:8000/WasteCollection/create', formData);

      setSuccess('Collection recorded successfully!');
      setFormData({
        residenceId: '',
        collectionDate: '',
        wasteType: '',
        amountCollected: '',
        collectorName: ''
      });
    } catch (error: any) {
      setError(error.response?.data?.error || 'Error submitting record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-green-600 py-4 flex items-center justify-between px-4">
        <button className="text-white focus:outline-none">&#9776;</button>
        <h2 className="text-white text-xl md:text-2xl font-bold text-center flex-grow">
          Record Waste Collection
        </h2>
        <div className="w-8"></div>
      </div>

      {/* Form Section */}
      <div className="flex justify-center items-center h-auto bg-gray-100 py-8 px-4">
        <form
          className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          {/* Residence ID */}
          <div className="mb-4">
            <label className="block text-gray-700">Residence ID</label>
            <input
              type="text"
              name="residenceId"
              value={formData.residenceId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Residence ID"
              required
            />
          </div>

          {/* Collection Date */}
          <div className="mb-4">
            <label className="block text-gray-700">Collection Date</label>
            <input
              type="date"
              name="collectionDate"
              value={formData.collectionDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Waste Type */}
          <div className="mb-4">
            <label className="block text-gray-700">Waste Type</label>
            <select
              name="wasteType"
              value={formData.wasteType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
               <option value="" disabled>
                Select waste type
               </option> 
              <option value="Organic">Organic</option>
              <option value="Recyclable">Recyclable</option>
              <option value="Hazardous">Hazardous</option>
            </select>
          </div>

          {/* Amount Collected */}
          <div className="mb-4">
            <label className="block text-gray-700">Amount Collected (kg)</label>
            <input
              type="number"
              name="amountCollected"
              value={formData.amountCollected}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter amount (kg)"
              required
            />
          </div>

          {/* Collector Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Collector Name</label>
            <input
              type="text"
              name="collectorName"
              value={formData.collectorName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter collector name"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default RecordCollection;
