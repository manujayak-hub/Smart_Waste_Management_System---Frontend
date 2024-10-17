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
          onClick={() => handleNavigate('/report1')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate Report 1
        </button>
        <button
          onClick={() => handleNavigate('/report2')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate Report 2
        </button>
        <button
          onClick={() => handleNavigate('/report3')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate Report 3
        </button>
      </div>
    </div>
  );
};

export default ReportNavigation;
