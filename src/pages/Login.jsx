// src/components/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api"; // Use api.js

const LoginPage = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // For showing login errors
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(formData); // Send { email, password }

      // Save tokens to localStorage
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      // Redirect to home page
      navigate("/"); // <-- changed from /dashboard to /
    } catch (err) {
      console.error("Login failed", err.response?.data);
      setError(
        err.response?.data?.detail || "Login failed. Check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-300 via-pink-200 to-yellow-200">
      <div className="bg-white p-10 rounded-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
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
