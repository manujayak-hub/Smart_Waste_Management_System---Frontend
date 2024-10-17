import React, { useState, useEffect } from 'react';
import FeedbackService, { Feedback } from '../../Services/FeedbackService'; // Adjust the path as needed
import axios from 'axios';

const FeedbackForm: React.FC = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [area, setArea] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);

  // Retrieve the user ID on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserDetails = async () => {
        try {
          const userResponse = await axios.get('http://localhost:8000/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { _id } = userResponse.data;
          setUid(_id); // Store the logged-in user ID
        } catch (err) {
          console.error('Error fetching user details:', err);
          setError('Failed to fetch user details. Please log in again.');
        }
      };
      fetchUserDetails();
    } else {
      setError('No token found. Please log in.');
    }
  }, []);

 // Function to validate email format
 const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate contact number format (for example: 10 digits)
const validateContactNumber = (contact: string) => {
  const contactRegex = /^\d{10}$/; // Adjust as needed (e.g., allow country code)
  return contactRegex.test(contact);
};

  // Function to submit new feedback
  const submitNewFeedback = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uid) {
      setError('User not authenticated. Please log in to submit feedback.');
      return;
    }

    // Validate email and contact number
    if (!validateEmail(emailAddress)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    if (!validateContactNumber(contactNumber)) {
      setError('Contact number must be 10 digits long.');
      return;
    }
    const newFeedback: Omit<Feedback, '_id' | 'date'> = {
      emailAddress,
      contactNumber,
      area,
      feedbackType,
      message,
      response: null,
      userId: uid,
    };

    setLoading(true); // Set loading to true when submission starts
    setError(null); // Reset error state

    try {
      await FeedbackService.createFeedback(newFeedback); 
      clearForm(); 
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to clear form inputs
  const clearForm = () => {
    setEmailAddress('');
    setContactNumber('');
    setArea('');
    setFeedbackType('');
    setMessage('');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded shadow flex flex-col justify-center mt-5 mb-10">
    <h2 className="text-xl font-bold mb-10 text-center">Add Feedback </h2>
    {error && <p className="text-red-600">{error}</p>}
    <form onSubmit={submitNewFeedback} className="flex flex-col"> 
      <label className="mb-5"> 
        Email Address:
        <input
          type="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          placeholder="Email Address"
          required
          className="w-full p-2 mb-4 border rounded" // Use mb-4 for gap below the input
        />
      </label>
      <label className="mb-5">
        Contact Number:
        <input
          type="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder="Contact Number"
          required
          className="w-full p-2 mb-4 border rounded" // Use mb-4 for gap below the input
        />
      </label>
      <label className="mb-5">
        Area:
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded" // Use mb-4 for gap below the input
        >
          <option value="">Select Area</option>
          <option value="Colombo">Colombo</option>
          <option value="Kandy">Kandy</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Galle">Galle</option>
          <option value="Malabe">Malabe</option>
        </select>
      </label>

      <label className="mb-5">
        Feedback Type:
        <select
          value={feedbackType}
          onChange={(e) => setFeedbackType(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded" // Use mb-4 for gap below the select
        >
          <option value="">Select Feedback Type</option>
          <option value="complaint">Complaint</option>
          <option value="suggestion">Suggestion</option>
          <option value="query">Positive Feedback</option>
        </select>
      </label>
      <label className="mb-5">
        Your Feedback:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Feedback"
          required
          className="w-full p-2 mb-4 border rounded" // Use mb-4 for gap below the textarea
        />
      </label>
      <div className="flex justify-center w-full">
        <button
          type="submit"
          className="w-md p-2 bg-green-600 text-white rounded hover:bg-green-800"
          disabled={loading} 
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>
    </form>
  </div>
  
  );
};

export default FeedbackForm;
