import axios from "axios";

// Base URL cho backend API
const API_BASE_URL = "http://localhost:5000/api";

// Tạo axios instance với cấu hình mặc định
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để tự động thêm token vào header cho mỗi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response errors (401 -> logout tự động)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login"; // redirect về login
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  // Đăng ký tài khoản mới
  signup: async (name, email, password) => {
    const response = await api.post("/signup", { name, email, password });
    return response.data;
  },

  // Đăng nhập
  login: async (email, password) => {
    const response = await api.post("/login", { email, password });
    return response.data;
  },

  // Đăng xuất
  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },

  // Lấy thông tin profile
  getProfile: async () => {
    const response = await api.get("/profile");
    return response.data;
  },

  // Cập nhật profile
  updateProfile: async (data) => {
    const response = await api.put("/profile", data);
    return response.data;
  },
};

export default api;
