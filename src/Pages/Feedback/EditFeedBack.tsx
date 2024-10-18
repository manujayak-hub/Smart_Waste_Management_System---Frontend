import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeedbackService, { Feedback } from '../../Services/FeedbackService';

const EditFeedback: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch feedback details for editing
  const fetchFeedbackDetails = async () => {
    try {
      const feedbackData = await FeedbackService.fetchFeedbackById(id!);
      setFeedback(feedbackData);
    } catch (error) {
      setError('Failed to fetch feedback details');
      console.error('Error fetching feedback details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (feedback) {
      setFeedback({ ...feedback, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback) {
      try {
        await FeedbackService.updateFeedback(id!, feedback);
        navigate('/myFeedback'); 
      } catch (error) {
        setError('Failed to update feedback');
        console.error('Error updating feedback:', error);
      }
    }
  };

  useEffect(() => {
    fetchFeedbackDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded shadow flex flex-col justify-center mt-5 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Feedback</h2>
      {feedback && (
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="emailAddress"
              value={feedback.emailAddress}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-1">Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={feedback.contactNumber}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-1">Area:</label>
            <select
              name="area"
              value={feedback.area} 
              onChange={handleChange}
              required
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="">Select Area</option>
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Galle">Galle</option>
              <option value="Malabe">Malabe</option>
            </select>
          </div>
          <div className="mb-5">
            <label className="block mb-1">Feedback Type:</label>
            <select
              name="feedbackType"
              value={feedback.feedbackType}
              onChange={handleChange}
              required
              
              className="w-full p-2 mb-4 border rounded" // Use mb-4 for gap below the select
              >
                <option value="">Select Feedback Type</option>
                <option value="complaint">Complaint</option>
                <option value="suggestion">Suggestion</option>
                <option value="query">Positive Feedback</option>
              </select>
          </div>
          <div className="mb-5">
            <label className="block mb-1">Message:</label>
            <textarea
              name="message"
              value={feedback.message}
              onChange={handleChange}
              required
              className="border p-2 w-full"
              rows={4}
            />
          </div>
          <div className="flex justify-center w-full">
          <button
            type="submit"
            className="w-md p-2 bg-green-600 text-white rounded hover:bg-green-800"
          >
            Update Feedback
          </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditFeedback;
