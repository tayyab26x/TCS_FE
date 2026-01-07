// src/pages/CreateShipment.jsx
import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "../components/Button";

const cities = ["Lahore", "Islamabad", "Karachi", "Sialkot", "Faisalabad"];
const branches = ["Branch 1", "Branch 2", "Branch 3"];
const staffMembers = ["Staff 1", "Staff 2", "Staff 3"];
const customers = ["Customer 1", "Customer 2", "Customer 3"];

const CreateShipment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useParams(); // role from URL: admin, manager, customer

  // Check if we're editing an existing shipment
  const editingShipment = location.state?.shipment || null;

  const [form, setForm] = useState({
    sender: editingShipment?.sender || "",
    receiver: editingShipment?.receiver || "",
    fromCity: editingShipment?.fromCity || "",
    toCity: editingShipment?.toCity || "",
    address: editingShipment?.address || "",
    weight: editingShipment?.weight || "",
    branchId: editingShipment?.branchId || "",
    assignedStaff: editingShipment?.assignedStaff || "",
    customerId: editingShipment?.customerId || "",
    notes: editingShipment?.notes || "",
    status: editingShipment?.status || "Pending",
    date: editingShipment?.date || new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingShipments = JSON.parse(localStorage.getItem("shipments")) || [];

    let updatedShipments;
    if (editingShipment) {
      // Update existing shipment
      updatedShipments = existingShipments.map((s) =>
        s.id === editingShipment.id ? { ...s, ...form } : s
      );
    } else {
      // Create new shipment
      const nextId = existingShipments.length + 1;
      const newShipment = { ...form, id: `TCS${nextId.toString().padStart(3, "0")}` };
      updatedShipments = [...existingShipments, newShipment];
    }

    localStorage.setItem("shipments", JSON.stringify(updatedShipments));
    alert(`Shipment ${editingShipment ? "updated" : "created"} successfully!`);
    navigate("/dashboard"); // go back to dashboard
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        {editingShipment ? "Edit Shipment" : "Create New Shipment"} ({role})
      </h1>

      <form className="max-w-2xl mx-auto space-y-4" onSubmit={handleSubmit}>
        {/* Sender */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Sender Name</label>
          <input
            type="text"
            name="sender"
            value={form.sender}
            onChange={handleChange}
            placeholder="Enter sender name"
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Receiver */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Receiver Name</label>
          <input
            type="text"
            name="receiver"
            value={form.receiver}
            onChange={handleChange}
            placeholder="Enter receiver name"
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* From City */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">From (Origin City)</label>
          <select
            name="fromCity"
            value={form.fromCity}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select origin city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* To City */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">To (Destination City)</label>
          <select
            name="toCity"
            value={form.toCity}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select destination city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Receiver Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter receiver address"
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            placeholder="Enter package weight"
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Admin / Manager fields */}
        {(role === "admin" || role === "manager") && (
          <>
            {/* Branch */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Branch</label>
              <select
                name="branchId"
                value={form.branchId}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select branch</option>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            {/* Assign Staff */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Assign to Staff</label>
              <select
                name="assignedStaff"
                value={form.assignedStaff}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Select staff</option>
                {staffMembers.map((staff) => (
                  <option key={staff} value={staff}>
                    {staff}
                  </option>
                ))}
              </select>
            </div>

            {/* Customer */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Customer</label>
              <select
                name="customerId"
                value={form.customerId}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select customer</option>
                {customers.map((customer) => (
                  <option key={customer} value={customer}>
                    {customer}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Notes */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Notes (Optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Add any notes about the shipment"
            className="border p-2 rounded w-full"
          />
        </div>

        <Button type="submit" className="w-full mt-4">
          {editingShipment ? "Update Shipment" : "Create Shipment"}
        </Button>
      </form>
    </div>
  );
};

export default CreateShipment;
