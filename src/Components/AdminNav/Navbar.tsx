import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logout_Component from '../Logout_Component'; // Import the Logout_Component

const Navbar: React.FC = () => {
    const [menu, setMenu] = useState<string>("home");
    const location = useLocation();
    const [isOpen, setIsOpen] = useState<boolean>(false); // State to manage mobile menu open/close

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
                <p className="text-3xl font-bold text-white">Smart Waste Dashboard</p>
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="block lg:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                    {/* Hamburger Icon */}
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Navigation Links */}
            <div className={`flex items-center space-x-6 ${isOpen ? "flex" : "hidden"} lg:flex`}>
                <ul className="flex items-center space-x-6 text-lg font-medium">
                    <li onClick={() => setMenu("home")}>
                        {/* Home Button */}
                        <Link
                            to='/adminhome'
                            className={`no-underline ${
                                menu === "home" ? 'bg-white text-black' : 'bg-gray-100 text-red-500'
                            } font-semibold py-2 px-4 rounded-lg border-2 border-black hover:bg-red-500 hover:text-white transition-all`}
                        >
                            Home
                        </Link>
                    </li>
                </ul>

                {/* Logout Button */}
                <button className="flex items-center space-x-6">
                    <Logout_Component />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
