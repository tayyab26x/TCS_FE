import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateShipment from "./pages/CreateShipment";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // <-- import Signup page

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

          {/* Dashboard default redirects to admin */}
          <Route path="/dashboard" element={<Navigate to="/dashboard/admin" />} />

          {/* Dashboard role-based route */}
          <Route path="/dashboard/:role" element={<Dashboard />} />

          {/* Other pages */}
          <Route path="/create-shipment" element={<CreateShipment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Optional: catch all unknown routes */}
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
