import FeedbackService, { Feedback } from '../../Services/FeedbackService';
import Navheader from '../../Components/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AllFeedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([]); // State for filtered feedbacks
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const navigate = useNavigate();

  // Fetch all feedbacks
  const fetchAllFeedbacks = async () => {
    try {
      const allFeedbacks = await FeedbackService.fetchAllFeedbacks();

      // Filter feedbacks to only include those with not-null responses
      const filteredFeedbacks = allFeedbacks.filter(feedback => feedback.response !== null);
      setFeedbacks(filteredFeedbacks);
      setFilteredFeedbacks(filteredFeedbacks); 
    } catch (error) {
      setError('Failed to fetch feedbacks');
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFeedbacks();
  }, []);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter feedbacks by feedbackType based on the search query
    const searchedFeedbacks = feedbacks.filter(feedback =>
      feedback.feedbackType.toLowerCase().includes(query)
    );
    setFilteredFeedbacks(searchedFeedbacks);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navheader/>
      <div className=" mx-auto p-4 border rounded shadow ">
      
      <h2 className="text-2xl font-bold mb-4 flex justify-center items-center text-center">Feedbacks</h2>

      <div className="max-w-3xl mx-auto p-4 ">
        
      <input
        type="text"
        placeholder="Search by feedback type..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4 px-3 py-2 border rounded w-full"
      />

     
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate('/feedbackForm')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add New Feedback
        </button>
        <button
          onClick={() => navigate('/myFeedback')}
          className="bg-black text-white px-4 py-2 rounded"
        >
          My Feedbacks
        </button>
      </div>

      {filteredFeedbacks.length > 0 ? (
        filteredFeedbacks.map((feedback) => (
          <div key={feedback._id} className="border p-4 mb-4 rounded">
            <p><strong>Email:</strong> {feedback.emailAddress}</p>
            <p><strong>Contact Number:</strong> {feedback.contactNumber}</p>
            <p><strong>Area:</strong> {feedback.area}</p>
            <p><strong>Feedback Type:</strong> {feedback.feedbackType}</p>
            <p><strong>Message:</strong> {feedback.message}</p>
            <p><strong>Date:</strong> {new Date(feedback.date).toLocaleDateString()}</p>
            <p><strong>Response:</strong> {feedback.response}</p>
          </div>
        ))
      ) : (
        <p>No feedbacks with response available.</p>
      )}
      </div>
    </div>
    </div>
  );
};

export default AllFeedback;
