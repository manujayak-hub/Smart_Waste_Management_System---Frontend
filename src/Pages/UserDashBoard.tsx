import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Handlers for each button to navigate to different pages
  const goToPage1 = () => navigate('/feedbackForm');
  const goToPage2 = () => navigate('/page2');
  const goToPage3 = () => navigate('/page3');
  const goToPage4 = () => navigate('/page4');
  const goToPage5 = () => navigate('/page5');
  const goToPage6 = () => navigate('/page6');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">User Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Button 1 */}
        <button
          onClick={goToPage1}
          className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Page 1
        </button>
        {/* Button 2 */}
        <button
          onClick={goToPage2}
          className="p-4 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Page 2
        </button>
        {/* Button 3 */}
        <button
          onClick={goToPage3}
          className="p-4 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        >
          Page 3
        </button>
        {/* Button 4 */}
        <button
          onClick={goToPage4}
          className="p-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Page 4
        </button>
        {/* Button 5 */}
        <button
          onClick={goToPage5}
          className="p-4 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Page 5
        </button>
        {/* Button 6 */}
        <button
          onClick={goToPage6}
          className="p-4 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
        >
          Page 6
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
