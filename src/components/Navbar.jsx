// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">TCS Express</div>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <Link to="/login" className="hover:text-blue-600">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
