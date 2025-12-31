// src/pages/CreateShipment.jsx
import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

const CreateShipment = () => {
  const [form, setForm] = useState({
    sender: "",
    receiver: "",
    address: "",
    weight: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Create shipment data:", form);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Shipment</h1>
      <form className="max-w-lg mx-auto space-y-4" onSubmit={handleSubmit}>
        <InputField
          name="sender"
          value={form.sender}
          onChange={handleChange}
          placeholder="Sender Name"
        />
        <InputField
          name="receiver"
          value={form.receiver}
          onChange={handleChange}
          placeholder="Receiver Name"
        />
        <InputField
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Receiver Address"
        />
        <InputField
          name="weight"
          value={form.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
        />
        <Button type="submit">Create Shipment</Button>
      </form>
    </div>
  );
};

export default CreateShipment;
