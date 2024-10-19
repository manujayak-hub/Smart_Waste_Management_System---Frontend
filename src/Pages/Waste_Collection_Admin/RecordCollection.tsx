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

  const [errors, setErrors] = useState({
    residenceId: '',
    collectionDate: '',
    wasteType: '',
    amountCollected: '',
    collectorName: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      residenceId: '',
      collectionDate: '',
      wasteType: '',
      amountCollected: '',
      collectorName: ''
    };
    let valid = true;

    // Residence ID validation
    if (!formData.residenceId.trim()) {
      newErrors.residenceId = 'Residence ID is required.';
      valid = false;
    }

    // Collection Date validation
    if (!formData.collectionDate) {
      newErrors.collectionDate = 'Collection Date is required.';
      valid = false;
    }

    // Waste Type validation
    if (!formData.wasteType) {
      newErrors.wasteType = 'Waste Type is required.';
      valid = false;
    }

    // Amount Collected validation
    const amount = parseFloat(formData.amountCollected);
    if (!formData.amountCollected || isNaN(amount) || amount <= 0) {
      newErrors.amountCollected = 'Amount Collected must be a positive number.';
      valid = false;
    }

    // Collector Name validation
    if (!formData.collectorName.trim()) {
      newErrors.collectorName = 'Collector Name is required.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

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
    <div className="flex flex-col min-h-screen">
      <div className="bg-green-600 py-4 flex items-center justify-between px-4">
        <button className="text-white focus:outline-none">&#9776;</button>
        <h2 className="text-white text-xl md:text-2xl font-bold text-center flex-grow">
          Record Waste Collection
        </h2>
        <div className="w-8"></div>
      </div>

      <div className="flex justify-center items-center h-auto bg-gray-100 py-8 px-4 flex-grow">
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
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.residenceId ? 'border-red-500' : 'focus:ring-green-500'}`}
              placeholder="Enter Residence ID"
              required
            />
            {errors.residenceId && <p className="text-red-500 text-sm">{errors.residenceId}</p>}
          </div>

          {/* Collection Date */}
          <div className="mb-4">
            <label className="block text-gray-700">Collection Date</label>
            <input
              type="date"
              name="collectionDate"
              value={formData.collectionDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.collectionDate ? 'border-red-500' : 'focus:ring-green-500'}`}
              required
            />
            {errors.collectionDate && <p className="text-red-500 text-sm">{errors.collectionDate}</p>}
          </div>

          {/* Waste Type */}
          <div className="mb-4">
            <label className="block text-gray-700">Waste Type</label>
            <select
              name="wasteType"
              value={formData.wasteType}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.wasteType ? 'border-red-500' : 'focus:ring-green-500'}`}
              required
            >
              <option value="" disabled>
                Select waste type
              </option>
              <option value="Organic">Organic</option>
              <option value="Recyclable">Recyclable</option>
              <option value="Hazardous">Hazardous</option>
            </select>
            {errors.wasteType && <p className="text-red-500 text-sm">{errors.wasteType}</p>}
          </div>

          {/* Amount Collected */}
          <div className="mb-4">
            <label className="block text-gray-700">Amount Collected (kg)</label>
            <input
              type="number"
              name="amountCollected"
              value={formData.amountCollected}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.amountCollected ? 'border-red-500' : 'focus:ring-green-500'}`}
              placeholder="Enter amount (kg)"
              required
            />
            {errors.amountCollected && <p className="text-red-500 text-sm">{errors.amountCollected}</p>}
          </div>

          {/* Collector Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Collector Name</label>
            <input
              type="text"
              name="collectorName"
              value={formData.collectorName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.collectorName ? 'border-red-500' : 'focus:ring-green-500'}`}
              placeholder="Enter collector name"
              required
            />
            {errors.collectorName && <p className="text-red-500 text-sm">{errors.collectorName}</p>}
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

      <footer className="bg-gray-200 p-4 mt-4">
        <p className="text-center text-gray-700 text-sm md:text-base">© 2024 Smart Waste. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RecordCollection;
