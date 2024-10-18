import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logout_Component from '../Logout_Component'; // Import the Logout_Component


const Navbar: React.FC = () => {
    const [menu, setMenu] = useState<string>("home");
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/user':
                setMenu('home');
                break;
            case '#':
                setMenu('support');
                break;
            default:
                setMenu('home');
        }
    }, [location.pathname]);

    return (
        <div className="flex justify-between items-center p-6 shadow-md bg-white">
            <div className="flex items-center gap-4">
                <p className="text-4xl font-bold text-gray-800">Smart Waste</p>
            </div>
            <ul className="flex items-center space-x-12 text-gray-600 text-lg font-medium">
                <li onClick={() => setMenu("home")}>
                    <Link 
                        to='/user' 
                        className={`no-underline ${menu === "home" ? 'text-black border-b-4 border-red-500' : 'text-gray-500'}`}
                    >
                        Home
                    </Link>
                </li>
                <li onClick={() => setMenu("support")}>
                    <Link 
                        to='#' 
                        className={`no-underline ${menu === "support" ? 'text-black border-b-4 border-red-500' : 'text-gray-500'}`}
                    >
                        Support
                    </Link>
                </li>
            </ul>
            <div className="flex items-center space-x-6">
                <Logout_Component /> {/* Use the Logout_Component here */}
            </div>
        </div>
    );
};

export default Navbar;
