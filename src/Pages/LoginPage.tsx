import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../Services/UserService"; 
import { Player } from '@lottiefiles/react-lottie-player'; 
import garbageAnimation from '../assets/Animation - 1729308161718.json'; 

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For loading spinner animation
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Show loading spinner when login is in progress

    try {
      const response = await UserService.loginUser(email, password);
      const { token } = response;
      localStorage.setItem('token', token);
      const userResponse = await UserService.fetchUser(token);
      const { admintype } = userResponse;

      if (admintype) {
        navigate("/adminhome");
      } else {
        navigate("/user");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false); // Stop loading spinner once login is finished
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <Player
          autoplay
          loop
          src={garbageAnimation}
          className="w-40 h-40 mx-auto mb-6"
        /> {/* Garbage management animation */}
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="mb-5">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && (
            <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg shadow-lg hover:bg-green-600 transition-colors duration-300 transform hover:scale-105"
          >
            {isLoading ? (
              <div className="flex justify-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-green-500 h-6 w-6"></div>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

       
      </div>
    </div>
  );
};

export default LoginPage;
