import axios from "axios";

// Front-end ile back-end arasındaki base URL'i .env dosyasından okur
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
