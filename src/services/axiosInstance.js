import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // removed trailing slash
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          // Use axiosInstance to include baseURL automatically
          const res = await axiosInstance.post("/api/token/refresh/", {
            refresh: refreshToken,
          });

          // Save new access token
          localStorage.setItem("access_token", res.data.access);

          // Update Authorization header
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.access}`;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${res.data.access}`;

          // Retry original request
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error("Refresh token expired or invalid", err);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
