// src/services/api.js
import axiosInstance from "./axiosInstance";

// ----------------- Auth -----------------
export const login = (credentials) =>
  axiosInstance.post("/api/token/", credentials); // credentials: { email, password }

export const refreshToken = () =>
  axiosInstance.post("/api/token/refresh/", {
    refresh: localStorage.getItem("refresh_token"),
  });

// ----------------- Users -----------------
export const getUsers = (role) =>
  axiosInstance.get("/api/users/", { params: { role } });

export const createUser = (data) =>
  axiosInstance.post("/api/users/create/", data); 
// data: { username, email, password, role, first_name, last_name }

export const getUser = (userId) =>
  axiosInstance.get(`/api/users/${userId}/`);

export const updateUser = (userId, data) =>
  axiosInstance.put(`/api/users/${userId}/`, data);

export const deleteUser = (userId) =>
  axiosInstance.delete(`/api/users/${userId}/`);

export const changePassword = (data) =>
  axiosInstance.post("/api/users/change-password/", data); 
// data: { old_password, new_password }

// ----------------- Shipments -----------------

// Customer
export const createShipment = (data) =>
  axiosInstance.post("/api/customer/shipments/create/", data);

export const getCustomerShipments = () =>
  axiosInstance.get("/api/customer/shipments/");

export const trackShipment = (trackingNumber) =>
  axiosInstance.get("/api/customer/shipments/track/", {
    params: { tracking_number: trackingNumber },
  });

export const cancelShipment = (shipmentId) =>
  axiosInstance.post(`/api/customer/shipments/${shipmentId}/cancel/`);

// Courier Staff
export const getCourierShipments = () =>
  axiosInstance.get("/api/courier/shipments/");

export const updateShipmentStatus = (shipmentId, status) =>
  axiosInstance.post(`/api/courier/shipments/${shipmentId}/update-status/`, {
    status,
  });

// Manager
export const getBranchShipments = (branchId) =>
  axiosInstance.get(`/api/manager/branch/${branchId}/shipments/`);

export const assignCourier = (shipmentId, courierId) =>
  axiosInstance.post(`/api/manager/shipments/${shipmentId}/assign-courier/`, {
    courier_id: courierId,
  });

// Super Manager / Admin
export const listStaff = () => axiosInstance.get("/api/super-manager/staff/");
export const listManagers = () =>
  axiosInstance.get("/api/super-manager/managers/");
export const listBranches = () => axiosInstance.get("/api/admin/branches/");

// Admin branch operations
export const createBranch = (data) =>
  axiosInstance.post("/api/admin/branches/create/", data);

export const updateBranch = (branchId, data) =>
  axiosInstance.put(`/api/admin/branches/${branchId}/update/`, data);

export const deleteBranch = (branchId) =>
  axiosInstance.delete(`/api/admin/branches/${branchId}/delete/`);

// Admin / Super Manager shipments
export const getAllShipments = (filters = {}) =>
  axiosInstance.get("/api/admin/shipments/", { params: filters });
