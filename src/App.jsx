import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateShipment from "./pages/CreateShipment";
import Login from "./pages/Login";

function AppWrapper() {
  const location = useLocation();

  // Hide Navbar on login page
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />} {/* Only show Navbar if not on login */}
      <div className={!hideNavbar ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-shipment" element={<CreateShipment />} />
          <Route path="/login" element={<Login />} />
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
