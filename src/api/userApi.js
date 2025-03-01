import api from "./axiosInstance";

export const login = async ({ emailOrUsername, password }) => {
  const response = await api.post("/users/login", { emailOrUsername, password });
  return response.data.data;
};

export const getMyData = async () => {{
  const response = await api.get("/users/me");
  return response.data;
}}