import axios from "axios";

const VITE_APP_BASE_URL = "http://localhost:3000/api";

const baseUrl = VITE_APP_BASE_URL + "/users";
console.log("VITE_APP_BASE_URL", import.meta.env.VITE_APP_BASE_URL);

const login = async (email, password) => {
  const response = await axios.post(`${baseUrl}/login`, { email, password });
  return response.data;
};

const signup = async (data) => {
  const response = await axios.post(`${baseUrl}/signup`, data);
  return response.data;
};

const getProfile = async (token) => {
  const response = await axios.get(`${baseUrl}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const updateProfile = async (token, profile) => {
  const response = await axios.patch(`${baseUrl}/profile`, profile, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default { login, signup, getProfile, updateProfile };