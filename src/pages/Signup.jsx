// src/components/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/api";

const SignupPage = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
    first_name: "",
    last_name: "",
  });

  const [error, setError] = useState("");
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
      await createUser(formData);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Signup failed", err.response?.data);
      // Show backend error messages
      const backendError =
        err.response?.data?.username ||
        err.response?.data?.email ||
        err.response?.data?.password ||
        err.response?.data?.role ||
        "Signup failed. Check your input.";
      setError(backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-300 via-pink-200 to-yellow-200">
      <div className="bg-white p-10 rounded-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="first_name" className="block text-gray-700 font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Enter your first name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Enter your last name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-gray-700 font-medium mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
              required
            >
              <option value="customer">Customer</option>
              <option value="staff">Courier Staff</option>
              <option value="manager">Manager</option>
              <option value="super_manager">Super Manager / HR</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-black font-semibold cursor-pointer"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
