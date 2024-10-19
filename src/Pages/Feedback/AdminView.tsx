import FeedbackService, { Feedback } from '../../Services/FeedbackService';
import React, { useEffect, useState } from 'react';


const AdminView: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<{ [key: string]: string }>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch all feedbacks
  const fetchAllFeedbacks = async () => {
    try {
      const feedbacks = await FeedbackService.fetchAllFeedbacks();
      setFeedbacks(feedbacks);
    } catch (error) {
      setError('Failed to fetch feedbacks');
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding/updating a response to feedback
  const handleAddOrUpdateResponse = async (feedbackId: string) => {
    try {
      await FeedbackService.addResponse(feedbackId, response[feedbackId]);
      setResponse((prevResponses) => ({ ...prevResponses, [feedbackId]: '' })); 
      setEditingId(null); 
      fetchAllFeedbacks(); 
    } catch (error) {
      console.error('Error saving response:', error);
    }
  };

  // Handle delete response
  const handleDeleteResponse = async (feedbackId: string) => {
    try {
      await FeedbackService.deleteResponse(feedbackId); 
      fetchAllFeedbacks(); 
    } catch (error) {
      console.error('Error deleting response:', error);
    }
  };

  // Set editing state for a specific feedback
  const handleEditResponse = (feedback: Feedback) => {
    setEditingId(feedback._id);
    setResponse((prevResponses) => ({ ...prevResponses, [feedback._id]: feedback.response || '' }));
  };

  useEffect(() => {
    fetchAllFeedbacks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Sort feedbacks: those without a response first
  const sortedFeedbacks = feedbacks.sort((a, b) => {
    if (a.response && !b.response) return 1; // b comes first if it has no response
    if (!a.response && b.response) return -1; // a comes first if it has no response
    return 0; // Maintain original order if both have or do not have responses
  });

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">All Feedbacks</h2>
      {sortedFeedbacks.length > 0 ? (
        sortedFeedbacks.map((feedback) => (
          <div key={feedback._id} className="border p-4 mb-4 rounded">
            <p><strong>Email:</strong> {feedback.emailAddress}</p>
            <p><strong>Contact Number:</strong> {feedback.contactNumber}</p>
            <p><strong>Area:</strong> {feedback.area}</p>
            <p><strong>Feedback Type:</strong> {feedback.feedbackType}</p>
            <p><strong>Message:</strong> {feedback.message}</p>
            <p><strong>Date:</strong> {new Date(feedback.date).toLocaleDateString()}</p>
            {feedback.response ? (
              <div className="mt-6">
                <p><strong>Admin Response:</strong> {feedback.response}</p>
                <button
                  onClick={() => handleEditResponse(feedback)}
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-4"
                >
                  Edit Response
                </button>
                <button
                  onClick={() => handleDeleteResponse(feedback._id)}
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-6 mt-4"
                >
                  Delete Response
                </button>
              </div>
            ) : (
              <div>
                <textarea
                  placeholder="Add response..."
                  value={response[feedback._id] || ''}
                  onChange={(e) => setResponse({ ...response, [feedback._id]: e.target.value })}
                  className="border rounded p-2 w-96 mt-2 "
                />
                <button
                  onClick={() => handleAddOrUpdateResponse(feedback._id)}
                  className="bg-green-500 text-white px-4 py-2  rounded ml-44"
                >
                  {editingId === feedback._id ? 'Update Response' : 'Add Response'}
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No feedback submitted yet.</p>
      )}
    </div>
  );
};

export default AdminView;
