import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const Cancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <FaTimesCircle className="text-red-600 text-6xl mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Payment Canceled</h1>
        <p className="text-gray-600 mt-2">
          Your payment has been canceled. If this was a mistake, please try again.
        </p>
        <p className="text-gray-600 mt-2">If you need assistance, please contact support.</p>
        <a href="/wallet" className="mt-4 inline-block bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
          Go Back to Wallet
        </a>
      </div>
    </div>
  );
}

export default Cancel;
