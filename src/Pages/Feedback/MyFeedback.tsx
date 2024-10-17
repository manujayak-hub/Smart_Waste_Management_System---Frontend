import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackService, { Feedback } from '../../Services/FeedbackService';
import { UserService } from '../../Services/UserService'; 

const MyFeedback: React.FC = () => {
  const navigate = useNavigate();
  const [submittedFeedback, setSubmittedFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [uid, setUid] = useState<string | null>(null); 

  // Fetch feedbacks for the logged-in user
  const fetchUserFeedbacks = async (userId: string) => {
    try {
      const feedbacks = await FeedbackService.fetchFeedbacksByUserId(userId); 
      setSubmittedFeedback(feedbacks);
    } catch (error) {
      setError('Failed to fetch feedbacks');
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    if (token) {
      const fetchUserDetails = async () => {
        try {
          const userResponse = await UserService.fetchUser(token); // Fetch user details from token
          setUid(userResponse._id); // Set user ID
        } catch (err) {
          console.error('Error fetching user details:', err);
          setError('Failed to fetch user details');
        }
      };

      fetchUserDetails();
    } else {
      setError('No token found, please log in.');
      setLoading(false);
    }
  }, []);

  // Fetch feedbacks when the uid is set
  useEffect(() => {
    if (uid) {
      fetchUserFeedbacks(uid);
    }
  }, [uid]);

  // Handle deleting feedback
  const deleteFeedback = async (feedbackId: string) => {
    try {
      await FeedbackService.deleteFeedback(feedbackId);
      setSubmittedFeedback(submittedFeedback.filter(feedback => feedback._id !== feedbackId));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  // Navigate to the edit feedback page
  const handleEdit = (feedbackId: string) => {
    navigate(`/editFeedback/update/${feedbackId}`); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Filter feedback based on the search query
  const filteredFeedback = submittedFeedback.filter(feedback =>
    feedback.feedbackType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 ">My Feedback</h2>

     
      <input
        type="text"
        placeholder="Search by feedback type..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border rounded p-2 mb-4 w-full"
      />

      {filteredFeedback.length > 0 ? (
        filteredFeedback.map((feedback) => (
          <div key={feedback._id} className="border p-4 mb-4 rounded max-w-2xl ">
            <p><strong>Email:</strong> {feedback.emailAddress}</p>
            <p><strong>Contact Number:</strong> {feedback.contactNumber}</p>
            <p><strong>Area:</strong> {feedback.area}</p>
            <p><strong>Feedback Type:</strong> {feedback.feedbackType}</p>
            <p><strong>Message:</strong> {feedback.message}</p>
            <p><strong>Date:</strong> {new Date(feedback.date).toLocaleDateString()}</p>
            {feedback.response ? (
              <div>
                <p><strong>Admin Response:</strong> {feedback.response}</p>
              </div>
            ) : (
              <button className="mt-2 p-2 bg-gray-400 text-white rounded mr-6" disabled>
                No Response Yet
              </button>
            )}
            
            <button
              onClick={() => handleEdit(feedback._id)}
              className={`px-4 py-2 mt-2 rounded ${feedback.response ? 'bg-gray-300 text-gray-600 cursor-not-allowed ml-auto' : 'bg-yellow-500 text-white ml-80'}`}
              disabled={!!feedback.response} // Disable button if response exists
            >
              Edit
            </button>
            <button
              onClick={() => deleteFeedback(feedback._id)}
              className="bg-red-600 text-white px-4 py-2 mt-2 ml-3 rounded "
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No feedback submitted yet.</p>
      )}
    </div>
  );
};

export default MyFeedback;
