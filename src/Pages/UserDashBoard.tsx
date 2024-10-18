import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navheader from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { FaComments, FaCalendarAlt, FaEye, FaTrash, FaWallet, FaFileAlt } from 'react-icons/fa'; // Importing icons

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Handlers for each button to navigate to different pages
  const goToPage1 = () => navigate('/feedbackForm');
  const goToPage2 = () => navigate('/schedule');
  const goToPage3 = () => navigate('/schedule/view');
  const goToPage4 = () => navigate('/wcuser');
  const goToPage5 = () => navigate('/wallet');
  const goToPage6 = () => navigate('/page6');

  return (
    <div className={`flex flex-col min-h-screen bg-green-50`}>
      <Navheader />
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Button 1 */}
          <button
            onClick={goToPage1}
            className="w-full h-48 bg-green-100 text-green-800 rounded-lg shadow-lg hover:bg-green-200 transition-transform transform hover:scale-105 flex items-center justify-center text-lg font-semibold p-4"
          >
            <FaComments className="mr-2 text-2xl" />
            Feedback Form
          </button>
          {/* Button 2 */}
          <button
            onClick={goToPage2}
            className="w-full h-48 bg-green-100 text-green-800 rounded-lg shadow-lg hover:bg-green-200 transition-transform transform hover:scale-105 flex items-center justify-center text-lg font-semibold p-4"
          >
            <FaCalendarAlt className="mr-2 text-2xl" />
            Schedule Bulky Collection
          </button>
          {/* Button 3 */}
          <button
            onClick={goToPage3}
            className="w-full h-48 bg-green-100 text-green-800 rounded-lg shadow-lg hover:bg-green-200 transition-transform transform hover:scale-105 flex items-center justify-center text-lg font-semibold p-4"
          >
            <FaEye className="mr-2 text-2xl" />
            View Schedules
          </button>
          {/* Button 4 */}
          <button
            onClick={goToPage4}
            className="w-full h-48 bg-green-100 text-green-800 rounded-lg shadow-lg hover:bg-green-200 transition-transform transform hover:scale-105 flex items-center justify-center text-lg font-semibold p-4"
          >
            <FaTrash className="mr-2 text-2xl" />
            Monitor Waste Collection
          </button>
          {/* Button 5 */}
          <button
            onClick={goToPage5}
            className="w-full h-48 bg-green-100 text-green-800 rounded-lg shadow-lg hover:bg-green-200 transition-transform transform hover:scale-105 flex items-center justify-center text-lg font-semibold p-4"
          >
            <FaWallet className="mr-2 text-2xl" />
            My Wallet
          </button>
          {/* Button 6 */}
          <button
            onClick={goToPage6}
            className="w-full h-48 bg-green-100 text-green-800 rounded-lg shadow-lg hover:bg-green-200 transition-transform transform hover:scale-105 flex items-center justify-center text-lg font-semibold p-4"
          >
            <FaFileAlt className="mr-2 text-2xl" />
            Page 6
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
