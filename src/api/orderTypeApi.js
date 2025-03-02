import api from "./axiosInstance";

export const getOrderType = async () => {
  const response = await api.get("/order-types");  
  console.log(response.data);
  return response.data;
}; 