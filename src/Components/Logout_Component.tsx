
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout_Component: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  
    localStorage.clear();

    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
    >
      Logout
    </button>
  );
};


export default Logout_Component;

