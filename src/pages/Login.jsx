// src/components/LoginPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-300 via-pink-200 to-yellow-200">
      <div className="bg-white p-10 rounded-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email or Username
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email or username"
              className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-black font-semibold cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
