import React from 'react';
import insta_icon from '../../assets/instagram_icon.png';
import pinterst_icon from '../../assets/pintester_icon.png';
import whatsapp_icon from '../../assets/whatsapp_icon.png';



const Footer: React.FC = () => {
  return (
    <footer className='flex flex-col items-center gap-12 mt-8'>
      {/* Logo and Title */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-gray-800 text-4xl font-bold">Smart Waste</p>
      </div>

      {/* About Us and Social Media */}
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl px-6 gap-12">
        {/* About Us Section */}
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">About Us</h3>
          <p className="text-lg text-gray-700 text-justify">
          Smart Waste is a Garbage Management Aplication Designed for urben areas.
          </p>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col items-center md:w-1/2">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Follow Us</h3>
          <div className="flex gap-5">
            <div className="p-3 bg-gray-100 border border-gray-200 rounded-full">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={insta_icon} alt="Instagram" className="h-10 w-10" />
              </a>
            </div>
            <div className="p-3 bg-gray-100 border border-gray-200 rounded-full">
              <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
                <img src={pinterst_icon} alt="Pinterest" className="h-10 w-10" />
              </a>
            </div>
            <div className="p-3 bg-gray-100 border border-gray-200 rounded-full">
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                <img src={whatsapp_icon} alt="WhatsApp" className="h-10 w-10" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider and Copyright Section */}
      <div className="flex flex-col items-center gap-6 w-full mb-8 text-gray-900 text-lg">
        <hr className="w-4/5 border-none rounded-full h-1 bg-gray-300" />
        <p>© 2024 Smart Waste.</p>
      </div>
    </footer>
  );
};

export default Footer;
