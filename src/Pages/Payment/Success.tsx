import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <FaCheckCircle className="text-green-600 text-6xl mb-4 justify" />
        <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">
          Thank you for your payment. Your transaction has been processed successfully.
        </p>
        <p className="text-gray-600 mt-2">You will receive a confirmation email shortly.</p>
        <a href="/" className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}

export default Success;
