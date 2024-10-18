import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeroImage from '../../assets/AdminHero.jpg'; 

const UserHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-green-600 p-4 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">Admin Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {/* Hero Image */}
        <img
          src={AdminHeroImage} // Use the imported image
          alt="Admin Hero"
          className="w-full max-w-lg h-auto mb-6 rounded-lg shadow-lg" // Adjusted image size and shadow
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <button
            onClick={() => { navigate('/WasteCollection') }}
            className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Waste Collection
          </button>

          <button
            onClick={() => { navigate('/WasteCollection/all') }}
            className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Manage Waste Collections
          </button>

          <button
            onClick={() => { navigate('/payment') }}
            className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Manage Payment
          </button>

          <button
            className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Button 4
          </button>

          <button
            onClick={() => { navigate('/adminView') }}
            className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Feedback
          </button>

          <button
            onClick={() => { navigate('/reportNavigation') }}
            className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Reports
          </button>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-200 p-4 mt-4">
        <p className="text-center text-gray-700 text-sm md:text-base">© 2024 Smart Waste. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserHome;
