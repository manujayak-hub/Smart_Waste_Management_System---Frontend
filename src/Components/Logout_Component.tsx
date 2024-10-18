
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
      className="bg-white text-red-500 font-semibold py-2 px-4 rounded-lg border-2 border-red-500 hover:bg-red-500 hover:text-white transition-all"
    >
      Logout
    </button>
  );
};


export default Logout_Component;

