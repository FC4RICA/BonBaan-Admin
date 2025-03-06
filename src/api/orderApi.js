import api from "./axiosInstance";

export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
}

export const getOrdersByStatus = async (id) => {
  const response = await api.get(`/statuses/${id}/orders`);
  return response.data;
}