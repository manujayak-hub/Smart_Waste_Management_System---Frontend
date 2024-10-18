import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logout_Component from '../Logout_Component'; // Import the Logout_Component

const Navbar: React.FC = () => {
    const [menu, setMenu] = useState<string>("home");
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/adminhome':
                setMenu('home');
                break;
            default:
                setMenu('home');
        }
    }, [location.pathname]);

    return (
        <div className="flex justify-between items-center p-6 shadow-md bg-green-600">
            {/* Title */}
            <div className="flex items-center gap-4">
                <p className="text-3xl font-bold text-white">Smart Waste Management Dashboard</p>
            </div>

            {/* Navigation Links (moved to the right side) */}
            <div className="flex items-center space-x-6">
                <ul className="flex items-center space-x-6 text-lg font-medium">
                    <li onClick={() => setMenu("home")}>
                        {/* Home Button */}
                        <Link
                            to='/adminhome'
                            className={`no-underline ${
                                menu === "home" ? 'bg-white text-black-500' : 'bg-gray-100 text-red-500'
                            } font-semibold py-2 px-4 rounded-lg border-2 border-black-500 hover:bg-red-500 hover:text-white transition-all`}
                        >
                            Home
                        </Link>
                    </li>
                </ul>

                {/* Logout Button */}
                <button
                    className="flex items-center space-x-6"    
                >
                    <Logout_Component />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
