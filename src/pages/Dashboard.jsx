// src/pages/Dashboard.jsx
import React from "react";
import Card from "../components/Card";

const Dashboard = () => {
  // Dummy shipment list
  const shipments = [
    { tracking_number: "TCS10001", status: "Delivered", sender: "Alice", receiver: "Bob" },
    { tracking_number: "TCS10002", status: "In Transit", sender: "Charlie", receiver: "David" },
    { tracking_number: "TCS10003", status: "Pending", sender: "Eve", receiver: "Frank" },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Shipments</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shipments.map((shipment, index) => (
          <Card key={index} title={`Tracking: ${shipment.tracking_number}`} icon="📦">
            <p><strong>Status:</strong> {shipment.status}</p>
            <p><strong>Sender:</strong> {shipment.sender}</p>
            <p><strong>Receiver:</strong> {shipment.receiver}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
