import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateShipment from "./pages/CreateShipment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function AppWrapper() {
  const location = useLocation();

  // Hide Navbar on login and signup pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={!hideNavbar ? "pt-16" : ""}>
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Dashboard default redirect */}
          <Route path="/dashboard" element={<Navigate to="/dashboard/admin" />} />

          {/* Dashboard role-based route */}
          <Route path="/dashboard/:role" element={<Dashboard />} />

          {/* Create Shipment default redirect */}
          <Route path="/create-shipment" element={<Navigate to="/create-shipment/customer" />} />

          {/* Create Shipment role-based route */}
          <Route path="/create-shipment/:role" element={<CreateShipment />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Catch-all: redirect unknown routes to dashboard/admin */}
          <Route path="*" element={<Navigate to="/dashboard/admin" />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
