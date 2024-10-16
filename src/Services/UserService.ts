
import baseURL from '../Hooks/BaseUrl';  

export interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  residenceId: string;
  password: string;
  mobile: string;
  
  admintype: boolean;
}

export interface LoginResponse {
  email: string;
  token: string;
}

export interface SignupData {
  fname: string;
  lname: string;
  email: string;
  residenceId:string;
  password: string;
  mobile: string;
  
  admintype: boolean;
}

export class UserService {
  static async fetchUser(token: string): Promise<User> {
    try {
      const response = await baseURL.get(`/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  static async signupUser(formData: SignupData): Promise<any> {
    try {
      const response = await baseURL.post(`/auth/signup`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error("Error signing up user:", error);
      throw error;
    }
  }

  static async loginUser(email: string, password: string): Promise<LoginResponse> {
    const response = await baseURL.post<LoginResponse>(
      `/auth/login`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' }, 
      }
    );
    return response.data;
  }
  

  static async logoutUser(token: string): Promise<any> {
    try {
      const response = await baseURL.post(
        `${baseURL}/auth/logout`,
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error logging out user:", error);
      throw error;
    }
  }
  static async fetchAllUsers(): Promise<User[]> {
    const response = await baseURL.get(`/auth/getAll`); // Adjust the endpoint if necessary
    return response.data;
  
}
}
