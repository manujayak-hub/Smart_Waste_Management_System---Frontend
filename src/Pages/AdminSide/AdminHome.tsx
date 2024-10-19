import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeroImage from '../../assets/AdminHero.jpg'; 
import Navbar from '../../Components/AdminNav/Navbar';
import { FaTrash, FaMoneyBillWave, FaRecycle,  FaComments, FaChartBar, FaCalendarAlt, FaUserPlus } from 'react-icons/fa';

const UserHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {/* Hero Section */}
        <div className="w-full max-w-2xl text-center mb-10">
          <img
            src={AdminHeroImage}
            alt="Admin Hero"
            className="w-full h-auto rounded-lg shadow-lg mb-6" 
          />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Smart Waste Management Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage waste collection, payments, and more in one place.
          </p>
        </div>

        {/* Button Container */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Waste Collection */}
            <button
              onClick={() => navigate('/WasteCollection')}
              className="bg-green-500 text-white font-semibold py-4 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-200 transform hover:scale-105 flex flex-col items-center"
            >
              <FaTrash className="text-3xl mb-2" />
              Add Waste Collection
            </button>

            {/* Manage Waste Collection */}
            <button
              onClick={() => navigate('/WasteCollection/all')}
              className="bg-green-500 text-white font-semibold py-4 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-200 transform hover:scale-105 flex flex-col items-center"
            >
              <FaRecycle className="text-3xl mb-2" />
              Manage Waste Collections
            </button>

            {/* Manage Payment */}
            <button
              onClick={() => navigate('/payment')}
              className="bg-green-500 text-white font-semibold py-4 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-200 transform hover:scale-105 flex flex-col items-center"
            >
              <FaMoneyBillWave className="text-3xl mb-2" />
              Manage Payment
            </button>

            {/* Add Waste Type */}
            <button
              onClick={() => navigate('/type')}
              className="bg-green-500 text-white font-semibold py-4 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-200 transform hover:scale-105 flex flex-col items-center"
            >
              <FaRecycle className="text-3xl mb-2" />
              Add New Waste Type
            </button>

            {/* Feedback */}
            <button
              onClick={() => navigate('/adminView')}
              className="bg-green-500 text-white font-semibold py-4 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-200 transform hover:scale-105 flex flex-col items-center"
            >
              <FaComments className="text-3xl mb-2" />
              Feedback
            </button>

            {/* Reports */}
            <button
              onClick={() => navigate('/reportNavigation')}
              className="bg-green-500 text-white font-semibold py-4 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-200 transform hover:scale-105 flex flex-col items-center"
            >
              <FaChartBar className="text-3xl mb-2" />
              Reports
            </button>

            {/* Register User */}
            <button
              onClick={() => navigate('/signup')}
              className="bg-green-500 text-white font-semibold py-4 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-200 transform hover:scale-105 flex flex-col items-center"
            >
              <FaUserPlus className="text-3xl mb-2" />
              Register User
            </button>

            {/* Update Waste Schedule Status */}
            <button
              onClick={() => navigate('/schedule/status/admin')}
              className="bg-green-500 text-white font-semibold py-4 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-200 transform hover:scale-105 flex flex-col items-center"
            >
              <FaCalendarAlt className="text-3xl mb-2" />
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
