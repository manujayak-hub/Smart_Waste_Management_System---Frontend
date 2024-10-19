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
            default:
                setMenu('home');
        }
    }, [location.pathname]);

    return (
        <div className="flex justify-between items-center p-6 shadow-md bg-white">
            <div className="flex items-center gap-4">
                <p className="text-4xl font-bold text-gray-800">Smart Waste</p>
            </div>
            <div className="flex items-center space-x-6">
                <Link
                    to='/user'
                    className={`no-underline ${menu === "home" ? 'text-black border-b-4 border-red-500' : 'text-gray-500'}`}
                    onClick={() => setMenu("home")}
                >
                    Home
                </Link>
                <Logout_Component /> {/* Logout button */}
            </div>
        </div>
    );
};

export default Navbar;
