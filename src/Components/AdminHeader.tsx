import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logout_Component from './Logout_Component';

const Navbar: React.FC = () => {
    const [menu, setMenu] = useState<string>("home");
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/adminhome':
                setMenu('adminhome');
                break;
            case '#':
                setMenu('support');
                break;
            default:
                setMenu('adminhome');
        }
    }, [location.pathname]);

    return (
        <div className="navbar">
            <div className="nav-log">
                <p className="text-4xl font-bold text-gray-800">Smart Waste</p>
            </div>
            <ul className="nav-manu">
                <li onClick={() => setMenu("adminhome")}>
                    <Link 
                        to='/adminhome' 
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
            <div className="nav-login-cart">
                <Logout_Component /> {/* Use the Logout_Component here */}
            </div>
        </div>
    );
};

export default Navbar;

// CSS Styles
const styles = `
.navbar {
    display: flex;
    justify-content: space-around;
    padding: 16px;
    box-shadow: 0 1px 3px -2px black;
}

.nav-log {
    display: flex;
    align-items: center;
    gap: 10px;
}

.nav-log p {
    color: #171717;
    font-size: 38px;
    font-weight: 600;
}

.nav-manu {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 50px;
    color: #626262;
    font-size: 20px;
    font-weight: 500;
}

.nav-manu li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    cursor: pointer;
}

.nav-manu hr {
    border: none;
    width: 80%;
    height: 3px;
    border-radius: 10px;
    background: #ff4141;
}

.nav-login-cart {
    display: flex;
    align-items: center;
    gap: 45px;  
}

.nav-login-cart button {
    width: 157px;
    height: 58px;
    outline: none;
    border: 1px solid #7a7a7a;
    border-radius: 75px;
    color: #515151;
    font-size: 20px;
    font-weight: 500;
    background: white;
    cursor: pointer;
}

.nav-login-cart button:active {
    background: #f3f3f3;
}

.nav-cart-counter {
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -35px;
    margin-left: -55px;
    border-radius: 11px;
    font-size: 14px;
    background: red;
    color: white;
}
`;

// Injecting styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
