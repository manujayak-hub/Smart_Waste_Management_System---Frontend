import baseURL from '../Hooks/BaseUrl'; 

export interface Feedback {
  _id: string; 
  emailAddress: string;
  contactNumber: string;
  area: string;
  feedbackType: string;
  message: string;
  date: string; 
 response: string | null | undefined;
 userId: string; 
}

class FeedbackService {
  // Fetch all feedbacks
  static async fetchAllFeedbacks(): Promise<Feedback[]> {
    const response = await baseURL.get('/feedback/all');
    return response.data;
  }

  // Fetch feedbacks by email
  static async fetchFeedbacksByEmail(email: string): Promise<Feedback[]> {
    const response = await baseURL.get(`/feedback/email/${email}`);
    return response.data;
  }

 // Create new feedback with userId
 static async createFeedback(feedbackData: Omit<Feedback, '_id' | 'date'>): Promise<Feedback> {
  const response = await baseURL.post('/feedback', feedbackData); 
  return response.data;
}

 
 
// Delete feedback by ID
static async deleteFeedback(feedbackId: string): Promise<void> {
  await baseURL.delete(`/feedback/${feedbackId}`);
}

  // Fetch feedback by ID
  static async fetchFeedbackById(feedbackId: string): Promise<Feedback> {
    const response = await baseURL.get(`/feedback/doc/${feedbackId}`);
    return response.data;
  }
  
// Update feedback by ID
static async updateFeedback(feedbackId: string, feedbackData: Omit<Feedback, '_id' | 'date'>): Promise<Feedback> {
  const response = await baseURL.put(`/feedback/${feedbackId}`, feedbackData);
  return response.data;
}

// Add a response to feedback
static async addResponse(feedbackId: string, responseText: string): Promise<Feedback> {
  const response = await baseURL.put(`/feedback/response/${feedbackId}`, { response: responseText }); 
  return response.data; 
}

// Delete response from feedback
static async deleteResponse(feedbackId: string): Promise<void> {
  await baseURL.delete(`/feedback/response/${feedbackId}`);
}

 // Fetch feedbacks with responses
 static async fetchFeedbacksWithResponses(): Promise<Feedback[]> {
  const response = await baseURL.get('/feedback/feedbacks-with-response'); 
  return response.data;
}

 // Fetch feedbacks by userId
 static async fetchFeedbacksByUserId(userId: string): Promise<Feedback[]> {
  const response = await baseURL.get(`/feedback/user/${userId}`);
  return response.data;
}

}

export default FeedbackService;
