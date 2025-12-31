import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/", // Change to your Django backend URL
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add JWT token to headers automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh automatically (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const res = await axios.post("http://localhost:8000/api/token/refresh/", {
            refresh: refreshToken,
          });
          localStorage.setItem("access_token", res.data.access);
          axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error("Refresh token expired or invalid", err);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
