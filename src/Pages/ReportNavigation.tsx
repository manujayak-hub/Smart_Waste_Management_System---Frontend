import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../Components/AdminHeader';

const ReportNavigation: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <AdminNav/>
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Report Generation</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => handleNavigate('/wasteCollectedReport')}
          className="bg-green-500 text-white w-32 h-32 rounded-lg hover:bg-green-600"
        >
          Collected Waste
        </button>
        <button
          onClick={() => handleNavigate('/reports/schedules')}
          className="bg-green-500 text-white w-32 h-32 rounded-lg hover:bg-green-600"
        >
          Schedules
        </button>
        <button
          onClick={() => handleNavigate('/paymentReport')}
          className="bg-green-500 text-white w-32 h-32 rounded-lg hover:bg-green-600"
        >
          Payment
        </button>
      </div>
    </div>
    </div>
  );
};

export default ReportNavigation;
