// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/tcslogo.png"; // if no dash in file name

const Navbar = () => {
  const [dropdown, setDropdown] = useState({
    about: false,
    domestic: false,
    international: false,
    express: false,
    logistics: false,
  });

  const toggleDropdown = (menu) => {
    setDropdown((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <nav className="bg-red-600 fixed w-full top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="TCS Logo" className="h-10 sm:h-12" />
        </Link>

        {/* Menu */}
        <ul className="flex gap-4 text-white font-medium items-center">
          <li><Link to="/" className="hover:text-gray-200">Home</Link></li>

          <li className="relative">
            <button
              onClick={() => toggleDropdown("about")}
              className="hover:text-gray-200 flex items-center gap-1"
            >
              About Us ▼
            </button>
            {dropdown.about && (
              <ul className="absolute top-10 left-0 bg-red-600 text-white shadow-md py-2 w-40">
                <li className="px-4 py-1 hover:bg-red-500">Company</li>
                <li className="px-4 py-1 hover:bg-red-500">Careers</li>
              </ul>
            )}
          </li>

          <li className="relative">
            <button
              onClick={() => toggleDropdown("domestic")}
              className="hover:text-gray-200 flex items-center gap-1"
            >
              Domestic ▼
            </button>
            {dropdown.domestic && (
              <ul className="absolute top-10 left-0 bg-red-600 text-white shadow-md py-2 w-40">
                <li className="px-4 py-1 hover:bg-red-500">Services</li>
                <li className="px-4 py-1 hover:bg-red-500">Tracking</li>
              </ul>
            )}
          </li>

          <li className="relative">
            <button
              onClick={() => toggleDropdown("international")}
              className="hover:text-gray-200 flex items-center gap-1"
            >
              International ▼
            </button>
            {dropdown.international && (
              <ul className="absolute top-10 left-0 bg-red-600 text-white shadow-md py-2 w-40">
                <li className="px-4 py-1 hover:bg-red-500">Services</li>
                <li className="px-4 py-1 hover:bg-red-500">Tracking</li>
              </ul>
            )}
          </li>

          <li className="relative">
            <button
              onClick={() => toggleDropdown("express")}
              className="hover:text-gray-200 flex items-center gap-1"
            >
              Express ▼
            </button>
            {dropdown.express && (
              <ul className="absolute top-10 left-0 bg-red-600 text-white shadow-md py-2 w-40">
                <li className="px-4 py-1 hover:bg-red-500">Next Day</li>
                <li className="px-4 py-1 hover:bg-red-500">Same Day</li>
              </ul>
            )}
          </li>

          <li className="relative">
            <button
              onClick={() => toggleDropdown("logistics")}
              className="hover:text-gray-200 flex items-center gap-1"
            >
              Logistics ▼
            </button>
            {dropdown.logistics && (
              <ul className="absolute top-10 left-0 bg-red-600 text-white shadow-md py-2 w-40">
                <li className="px-4 py-1 hover:bg-red-500">Solutions</li>
                <li className="px-4 py-1 hover:bg-red-500">Warehousing</li>
              </ul>
            )}
          </li>

          <li><Link to="/ecom" className="hover:text-gray-200">E-com Solutions</Link></li>
          <li><Link to="/contact" className="hover:text-gray-200">Contact Us</Link></li>

          {/* My TCS Button */}
          <li>
            <Link
              to="/my-tcs"
              className="bg-white text-red-600 px-4 py-1 rounded hover:bg-gray-100"
            >
              My TCS
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
