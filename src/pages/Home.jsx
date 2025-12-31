// src/pages/Home.jsx
import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Card from "../components/Card";

const Home = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipmentData] = useState([
    {
      tracking_number: "TCS123456789",
      status: "In Transit",
      sender_name: "John Doe",
      receiver_name: "Jane Smith",
    },
  ]);

  const handleTrack = () => {
    // For now, just log the tracking number
    console.log("Track:", trackingNumber);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Hero / Tracking Section */}
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Track Your Shipment</h1>
        <p className="text-gray-700 mb-6">
          Enter your tracking number to see the status of your shipment.
        </p>
        <div className="flex justify-center gap-2">
          <InputField
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number"
          />
          <Button onClick={handleTrack}>Track</Button>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <Card title="Schedule Pickup" icon="🚚">
          Easily schedule a pickup from your location.
        </Card>
        <Card title="Rate Calculator" icon="💰">
          Calculate shipping cost instantly.
        </Card>
        <Card title="Nearest Branch" icon="📍">
          Find your nearest TCS branch.
        </Card>
      </section>

      {/* Shipment Info (Dummy Data) */}
      <section className="py-6">
        <h2 className="text-xl font-semibold mb-3">Shipment Details</h2>
        {shipmentData.map((shipment, index) => (
          <div key={index} className="border rounded p-4 mb-4">
            <p><strong>Tracking Number:</strong> {shipment.tracking_number}</p>
            <p><strong>Status:</strong> {shipment.status}</p>
            <p><strong>Sender:</strong> {shipment.sender_name}</p>
            <p><strong>Receiver:</strong> {shipment.receiver_name}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
