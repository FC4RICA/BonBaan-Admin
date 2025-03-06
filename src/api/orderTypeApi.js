import api from "./axiosInstance";

export const getOrderType = async () => {
  const response = await api.get("/order-types");  
  return response.data;
}; 