import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

const APIService = {
  login: (credentials) => API.post("/users/signin", credentials),
  register: (data, role) => API.post(`/users/signup/${role}`, data),

  getProfile: (userId) => API.get(`/users/${userId}/profile`),
  updateProfile: (userId, data) => API.put(`/users/${userId}/update`, data),
  requestDeletion: (userId, data) =>
    API.post(`/users/${userId}/request-deletion`, data),

  getAllPlayers: () => API.get("/admins/players"),
  getAllOwners: () => API.get("/admins/facility-owners"),
  getDeletionRequests: () => API.get("/admins/deletion-requests"),
  processDeletion: (adminId, requestId, approve) =>
    API.post(
      `/admins/${adminId}/process-deletion/${requestId}?approve=${approve}`
    ),

  createBlog: (bloggerId, data) =>
    API.post(`/blogs/${bloggerId}/newBlog`, data),
  getAllBlogs: () => API.get("/blogs/all-blogs"),
  getUserBlogs: (bloggerId) => API.get(`/blogs/${bloggerId}/user-blogs`),
  deleteBlog: (blogId) => API.delete(`/blogs/delete-blog/${blogId}`),

  registerVenue: (ownerId, data) =>
    API.post(`/venue/${ownerId}/register`, data),
  searchVenues: (params) => API.get("/venue/search", { params }),
  getVenueCourts: (venueId) => API.get(`/venue/${venueId}/courts`),
  addCourt: (ownerId, data) => API.post(`/venue/${ownerId}/courts`, data),

  createBooking: (playerId, data) =>
    API.post(`/booking/${playerId}/create`, data),
  getBookings: (playerId) => API.get(`/booking/${playerId}/view`),
  updateBooking: (playerId, bookingId, data) =>
    API.put(`/booking/${playerId}/update/${bookingId}`, data),
  deleteBooking: (playerId, bookingId) =>
    API.delete(`/booking/${playerId}/delete/${bookingId}`),

  getAllSports: () => API.get("/venue/sports"),
};

export default APIService;
