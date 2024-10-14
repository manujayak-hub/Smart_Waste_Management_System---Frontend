import React, { useState } from 'react';
import { UserService } from '../Services/UserService'; // Import UserService

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    mobile: '',
    admintype: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 
    setSuccess(''); 
  
    try {
      const response = await UserService.signupUser(formData); 
      setSuccess('Signup successful! You can now log in.');
      setFormData({
        fname: '',
        lname: '',
        email: '',
        password: '',
        mobile: '',
        admintype: false,
      });
      console.info("Signup successful:", response.message);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.error || 'Server Error occurred');
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        setError('No response from the server');
        console.error('Error request:', error.request);
      } else {
        setError('Error during signup');
        console.error('Error message:', error.message);
      }
    }
  };
  
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form 
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Sign Up</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}


        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Admin</label>
          <input
            type="checkbox"
            name="admintype"
            checked={formData.admintype}
            onChange={handleChange}
            className="w-4 h-4"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-green-500 hover:underline">Log in here</a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
