import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome: React.FC = () => {

    const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-green-600">User Home</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
          <button
            onClick={()=>{navigate('/schedule/view')}}
            className="bg-green-500 text-white font-bold py-4 px-6 rounded-lg w-64 h-24 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Schedule
          </button>

          <button
            
            className="bg-green-500 text-white font-bold py-4 px-6 rounded-lg w-64 h-24 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Button
          </button>
        
          <button
            
            className="bg-green-500 text-white font-bold py-4 px-6 rounded-lg w-64 h-24 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Button
          </button>
        
          <button
            
            className="bg-green-500 text-white font-bold py-4 px-6 rounded-lg w-64 h-24 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Button
          </button>
        
          <button
            
            className="bg-green-500 text-white font-bold py-4 px-6 rounded-lg w-64 h-24 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Button
          </button>
        
          <button
            
            className="bg-green-500 text-white font-bold py-4 px-6 rounded-lg w-64 h-24 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Button
          </button>
        
         
        
        
      </div>
    </div>
  );
};

export default UserHome;
