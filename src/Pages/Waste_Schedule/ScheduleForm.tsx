import React, { useState,useEffect } from 'react';
import axios from 'axios';

const ScheduleForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    cdate: '',
    area:'',
    timeslot: '',
    type: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      const fetchUserDetails = async () => {
        try {
          const userResponse = await axios.get("http://localhost:8000/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(userResponse.data); // Handle the user details
          const { _id} = userResponse.data;
          setUid(_id)
        } catch (err) {
          console.error('Error fetching user details:', err);
          setError('Failed to fetch user details. Please log in again.');
        }
      };

      fetchUserDetails();
    } else {
      console.log("No token found, please log in.");
      setError('No token found. Please log in.');
    }
  }, []); // Empty dependency array ensures this runs on component mount




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
       await axios.post('http://localhost:8000/schedule/create', {
        ...formData,
        jobstatus: false,
        userid:uid,
      });

      setSuccess('Schedule created successfully!');
      setFormData({
        fname: '',
        lname: '',
        mobile: '',
        email: '',
        cdate: '',
        area:'',
        timeslot: '',
        type: '',
        description: '',
      });
    } catch (error: any) {
      setError(error.response?.data?.error || 'Error submitting form.');
    } finally {
      setLoading(false);
    }
  };

  

  return (
<>
<div className="bg-green-600 py-4 flex items-center justify-between px-4">
    <button className="text-white focus:outline-none">

      &#9776; 
    </button>
    <h2 className="text-white text-2xl font-bold text-center flex-grow">Waste Collection Scheduling</h2>
    <div className="w-8"></div> 
  </div>
<div className="flex justify-center items-center h-auto bg-gray-100 overflow-auto">
<h2 className="text-2xl font-bold text-center mb-6 text-green-600">Create Waste Collection Schedule</h2>
</div>

    <div className="flex justify-center items-center h-auto bg-gray-100 overflow-auto">
    <form
      className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:max-w-md"
      onSubmit={handleSubmit}
    >
      
  
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
        <label className="block text-gray-700">Mobile</label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
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
        <label className="block text-gray-700">Collection Date</label>
        <input
          type="date"
          name="cdate"
          value={formData.cdate}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Area</label>
        <select
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Select Area</option>
          <option value="Morning">Colombo</option>
          <option value="Afternoon">Kandy</option>
          <option value="Evening">Galle</option>
        </select>
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700">Timeslot</label>
        <select
          name="timeslot"
          value={formData.timeslot}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Select timeslot</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700">Waste Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Select waste type</option>
          <option value="Organic">Organic</option>
          <option value="Recyclable">Recyclable</option>
          <option value="Hazardous">Hazardous</option>
        </select>
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
  
      <button
        type="submit"
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  </div>
</>
  
  );
};

export default ScheduleForm;
