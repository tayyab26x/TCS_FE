import axios from "./axiosInstance";

// ----------------- Auth -----------------
export const login = (credentials) =>
  axios.post("api/token/", credentials);

export const refreshToken = () =>
  axios.post("api/token/refresh/", {
    refresh: localStorage.getItem("refresh_token"),
  });

// ----------------- Users -----------------
export const getUsers = (role) =>
  axios.get("users/", { params: { role } });

export const createUser = (data) => axios.post("users/create/", data);

export const getUser = (userId) => axios.get(`users/${userId}/`);

export const updateUser = (userId, data) =>
  axios.put(`users/${userId}/`, data);

export const deleteUser = (userId) =>
  axios.delete(`users/${userId}/`);

export const changePassword = (data) =>
  axios.post("users/change-password/", data);

// ----------------- Shipments -----------------
// Customer
export const createShipment = (data) =>
  axios.post("customer/shipments/create/", data);

export const getCustomerShipments = () =>
  axios.get("customer/shipments/");

// Courier Staff
export const getCourierShipments = () =>
  axios.get("courier/shipments/");

export const updateShipmentStatus = (shipmentId, status) =>
  axios.post(`courier/shipments/${shipmentId}/update-status/`, { status });

// Manager
export const getBranchShipments = (branchId) =>
  axios.get(`manager/branch/${branchId}/shipments/`);

export const assignCourier = (shipmentId, courierId) =>
  axios.post(`manager/shipments/${shipmentId}/assign-courier/`, { courier_id: courierId });

// Super Manager / Admin
export const listStaff = () => axios.get("super-manager/staff/");
export const listManagers = () => axios.get("super-manager/managers/");
export const listBranches = () => axios.get("admin/branches/");
