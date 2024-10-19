import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeroImage from '../../assets/AdminHero.jpg'; 
import Navbar from '../../Components/AdminNav/Navbar';

const UserHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {/* Hero Image */}
        <img
          src={AdminHeroImage}
          alt="Admin Hero"
          className="w-full max-w-lg h-auto mb-6 rounded-lg shadow-lg" 
        />

        {/* Button Container */}
        <div className="w-full max-w-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/WasteCollection')}
              className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add Waste Collection
            </button>

            <button
              onClick={() => navigate('/WasteCollection/all')}
              className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Manage Waste Collections
            </button>

            <button
              onClick={() => navigate('/payment')}
              className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Manage Payment
            </button>

            <button
              onClick={() => navigate('/type')}
              className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add New Waste Type
            </button>

            <button
              onClick={() => navigate('/adminView')}
              className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Feedback
            </button>

            <button
              onClick={() => navigate('/reportNavigation')}
              className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Reports
            </button>

            <button
              onClick={() => navigate('/signup')}
              className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Register User 
            </button>

            <button
              onClick={() => navigate('/schedule/status/admin')}
              className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Update Waste Schedule Status
            </button>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-200 p-4 mt-4">
        <p className="text-center text-gray-700 text-sm md:text-base">
          © 2024 Smart Waste. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserHome;
