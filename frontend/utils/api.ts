import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; 

export const registerUser = async (userData: any) => {
  return await axios.post(`${API_BASE_URL}/register`, userData, { withCredentials: true });
};

export const loginUser = async (userData: any) => {
  return await axios.post(`${API_BASE_URL}/user/login`, userData, { withCredentials: true });
};

export const logoutUser = async () => {
  return await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
};
