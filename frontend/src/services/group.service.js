import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getGroupsAPI = async (params) => {
  try {
    const response = await API.get("/groups", {
      params,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleGroupAPI = async (id) => {
  const response = await API.get(`/groups/${id}`);
  return response.data.data;
};

export const createGroupAPI = async (payload) => {
  const response = await API.post("/groups", payload);
  return response.data.data;
};
