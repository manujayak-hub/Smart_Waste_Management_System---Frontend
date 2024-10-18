import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReportNavigation: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Report Generation</h1>
      <div className="space-x-4">
        <button
          onClick={() => handleNavigate('/wasteCollectedReport')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Collected Waste
        </button>
        <button
          onClick={() => handleNavigate('/reports/schedules')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Schedules
        </button>
        <button
          onClick={() => handleNavigate('/report3')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Payment
        </button>
      </div>
    </div>
  );
};

export default ReportNavigation;
