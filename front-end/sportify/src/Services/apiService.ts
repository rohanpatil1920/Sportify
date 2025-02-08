import axios from "axios";

const api = axios.create({
  baseURL: "https://www.sportify.com", // Our Custom Base URL
});

export default api;
