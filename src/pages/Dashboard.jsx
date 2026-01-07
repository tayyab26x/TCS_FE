// src/pages/Dashboard.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Truck,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Search,
  Users,
  CalendarCheck,
  BarChart2,
  Trash2,
  Edit,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from "../components/Card";
import Button from "../components/Button";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

/* ================= Role Permissions ================= */
const ROLE_PERMISSIONS = {
  admin: {
    stats: true,
    chart: true,
    shipments: true,
    manageUsers: true,
    actions: ["create", "track"],
    manageRoles: ["manager", "staff", "customer"],
    charts: ["Staff Progress", "Customer Shipments"],
    showIds: true,
    showBranch: true,
    canEdit: true,
    canDelete: true,
  },
  superManager: {
    stats: true,
    chart: true,
    shipments: true,
    manageUsers: true,
    actions: ["track"],
    manageRoles: ["manager", "staff"],
    charts: ["Staff Progress", "Branch Shipments"],
    showIds: true,
    showBranch: true,
    canEdit: false,
    canDelete: false,
  },
  hr: {
    stats: true,
    chart: true,
    shipments: false,
    manageUsers: true,
    actions: [],
    manageRoles: ["staff"],
    charts: ["Staff Attendance", "Staff Performance"],
    showIds: false,
    showBranch: false,
    canEdit: false,
    canDelete: false,
  },
  manager: {
    stats: true,
    chart: true,
    shipments: true,
    manageUsers: true,
    actions: ["create", "track"],
    manageRoles: ["staff", "customer"],
    charts: ["Staff & Customer Progress"],
    showIds: true,
    showBranch: true,
    canEdit: true,
    canDelete: true,
  },
  staff: {
    stats: true,
    chart: true,
    shipments: true,
    manageUsers: false,
    actions: ["track", "create"],
    manageRoles: [],
    charts: ["My Shipments"],
    showIds: false,
    showBranch: true,
    canEdit: true,
    canDelete: false,
  },
  customer: {
    stats: true,
    chart: true,
    shipments: true,
    manageUsers: false,
    actions: ["track", "create"],
    manageRoles: [],
    charts: ["My Shipments"],
    showIds: false,
    showBranch: false,
    canEdit: true,
    canDelete: true,
  },
};

/* ================= Dummy Stats & Chart ================= */
const dummyStats = {
  admin: [
    { title: "Total Shipments", value: 1240, icon: <Package /> },
    { title: "In Transit", value: 320, icon: <Truck /> },
    { title: "Delivered", value: 780, icon: <CheckCircle /> },
    { title: "Pending", value: 110, icon: <Clock /> },
    { title: "Cancelled", value: 30, icon: <XCircle /> },
    { title: "Staff Attendance", value: "95%", icon: <CalendarCheck /> },
    { title: "Team Performance", value: "88%", icon: <BarChart2 /> },
  ],
  manager: [
    { title: "Total Shipments", value: 500, icon: <Package /> },
    { title: "In Transit", value: 150, icon: <Truck /> },
    { title: "Delivered", value: 320, icon: <CheckCircle /> },
  ],
  staff: [
    { title: "My Shipments", value: 120, icon: <Package /> },
    { title: "Delivered", value: 80, icon: <CheckCircle /> },
    { title: "Pending", value: 30, icon: <Clock /> },
  ],
  customer: [
    { title: "My Shipments", value: 50, icon: <Package /> },
    { title: "Delivered", value: 30, icon: <CheckCircle /> },
  ],
};

const dummyChartData = [
  { name: "Pending", value: 110, color: "#FACC15" },
  { name: "In Transit", value: 320, color: "#3B82F6" },
  { name: "Delivered", value: 780, color: "#16A34A" },
  { name: "Cancelled", value: 30, color: "#EF4444" },
];

/* ================= Dashboard ================= */
const Dashboard = ({ currentUser = {} }) => {
  const { role } = useParams();
  const navigate = useNavigate();
  const currentRole = role || currentUser.role || "admin";

  const permissions = useMemo(() => ROLE_PERMISSIONS[currentRole], [currentRole]);
  const stats = dummyStats[currentRole] || dummyStats["admin"];

  // ---------- SHIPMENTS STATE WITH LOCAL STORAGE ----------
  const [shipments, setShipments] = useState(() => {
    const saved = localStorage.getItem("shipments");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("shipments", JSON.stringify(shipments));
  }, [shipments]);

  // ---------- FILTER SHIPMENTS BASED ON ROLE ----------
  const filteredShipments = useMemo(() => {
    return shipments
      .filter((s) => {
        switch (currentRole) {
          case "admin":
          case "superManager":
            return true;
          case "manager":
            return s.branchId === currentUser?.branchId || s.customerId === currentUser?.id;
          case "staff":
            return s.assignedStaffId === currentUser?.id || s.branchId === currentUser?.branchId;
          case "customer":
            return s.customerId === currentUser?.id;
          default:
            return false;
        }
      })
      .filter((s) => {
        if (!searchQuery) return true;
        return (
          s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.receiver.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
      .filter((s) => (statusFilter !== "All" ? s.status === statusFilter : true));
  }, [shipments, currentRole, currentUser, searchQuery, statusFilter]);

  // ---------- HANDLERS ----------
  const handleEditShipment = (shipment) => {
    navigate(`/create-shipment/${currentRole}`, { state: { shipment } });
  };

  const handleDeleteShipment = (id) => {
    if (window.confirm("Are you sure you want to delete this shipment?")) {
      setShipments(shipments.filter((s) => s.id !== id));
      toast.info("Shipment deleted!");
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      {permissions.stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} title={stat.title} icon={stat.icon}>
              <p className="text-2xl font-bold text-black">{stat.value}</p>
            </Card>
          ))}
        </div>
      )}

      {/* Charts / Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {permissions.chart &&
          permissions.charts.map((chartTitle, idx) => (
            <div
              key={idx}
              className="lg:col-span-2 bg-white rounded-3xl p-6 mb-6"
            >
              <h3 className="text-lg font-semibold mb-4 text-black">{chartTitle}</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dummyChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                      {dummyChartData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}

        {/* Quick Action Buttons */}
        <div className="bg-white rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-black">Quick Actions</h3>
          {permissions.actions.includes("create") && (
            <Button
              onClick={() => navigate(`/create-shipment/${currentRole}`)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Plus size={18} /> Create Shipment
            </Button>
          )}
          {permissions.actions.includes("track") && (
            <Button
              onClick={() => toast.info("Track Shipment clicked")}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black"
            >
              <Search size={18} /> Track Shipment
            </Button>
          )}
          {permissions.manageUsers && permissions.manageRoles.length > 0 && (
            <Button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700">
              <Users size={18} /> Manage Users
            </Button>
          )}
        </div>
      </div>

      {/* Shipments Table */}
      {permissions.shipments && (
        <div className="bg-white rounded-3xl p-6 space-y-4 overflow-x-auto">
          <h3 className="text-lg font-semibold text-black">Shipments</h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by ID, Sender, Receiver"
              className="border p-2 rounded w-full sm:w-1/2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="border p-2 rounded w-full sm:w-1/4"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">Tracking ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                {permissions.showIds && <th>Customer ID</th>}
                {permissions.showIds && <th>Assigned Staff</th>}
                {permissions.showBranch && <th>Branch ID</th>}
                <th>Status</th>
                <th>Date</th>
                {(permissions.canEdit || permissions.canDelete) && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((s, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="py-3 font-medium">{s.id}</td>
                  <td>{s.sender}</td>
                  <td>{s.receiver}</td>
                  {permissions.showIds && <td>{s.customerId}</td>}
                  {permissions.showIds && <td>{s.assignedStaffId}</td>}
                  {permissions.showBranch && <td>{s.branchId}</td>}
                  <td
                    className={`font-semibold ${
                      s.status === "Delivered"
                        ? "text-green-600"
                        : s.status === "In Transit"
                        ? "text-blue-600"
                        : s.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {s.status}
                  </td>
                  <td>{s.date}</td>
                  {(permissions.canEdit || permissions.canDelete) && (
                    <td className="flex gap-2">
                      {permissions.canEdit && (
                        <Button
                          onClick={() => handleEditShipment(s)}
                          className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                        >
                          <Edit size={16} />
                        </Button>
                      )}
                      {permissions.canDelete && (
                        <Button
                          onClick={() => handleDeleteShipment(s.id)}
                          className="p-1 bg-red-500 hover:bg-red-600 text-white rounded"
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
