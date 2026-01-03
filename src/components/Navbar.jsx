// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/tcslogo.png";

const Navbar = () => {
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
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

          {/* About */}
          <Dropdown
            title="About Us"
            open={dropdown.about}
            onClick={() => toggleDropdown("about")}
            items={["Company", "Careers"]}
          />

          {/* Domestic */}
          <Dropdown
            title="Domestic"
            open={dropdown.domestic}
            onClick={() => toggleDropdown("domestic")}
            items={["Services", "Tracking"]}
          />

          {/* International */}
          <Dropdown
            title="International"
            open={dropdown.international}
            onClick={() => toggleDropdown("international")}
            items={["Services", "Tracking"]}
          />

          {/* Express */}
          <Dropdown
            title="Express"
            open={dropdown.express}
            onClick={() => toggleDropdown("express")}
            items={["Next Day", "Same Day"]}
          />

          {/* Logistics */}
          <Dropdown
            title="Logistics"
            open={dropdown.logistics}
            onClick={() => toggleDropdown("logistics")}
            items={["Solutions", "Warehousing"]}
          />

          <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>

          {/* Logout */}
          <li>
            <button
              onClick={handleLogout}
              className="bg-white text-red-600 px-4 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Dropdown = ({ title, open, onClick, items }) => (
  <li className="relative">
    <button onClick={onClick} className="hover:text-gray-200">
      {title} ▼
    </button>
    {open && (
      <ul className="absolute top-10 left-0 bg-red-600 text-white shadow-md py-2 w-40">
        {items.map((item) => (
          <li key={item} className="px-4 py-1 hover:bg-red-500">
            {item}
          </li>
        ))}
      </ul>
    )}
  </li>
);

export default Navbar;
