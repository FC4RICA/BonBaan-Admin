import api from "./axiosInstance";

export const getOrder = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const getOrders = async (pageSize = 10, currentPage = 1) => {
  const response = await api.get("/orders", {
    params: { pageSize, currentPage },
  });
  return response.data;
};

export const getOrdersByStatus = async (id, pageSize = 10, currentPage = 1) => {
  const response = await api.get(`/orders`, { params: { status: id, pageSize, currentPage } });
  return response.data;
};

export const getAllPendingOrders = async () => {
  const statuses = await getOrderStatuses();
  const pendingStatus = statuses.data.find(
    (status) => status.name == "pending"
  );
  const response = await getOrdersByStatus(pendingStatus.ID, 9999);
  return response.data;
};

// Order Type
export const getOrderType = async () => {
  const response = await api.get("/order-types");
  return response.data;
};

// Order Status
export const getOrderStatuses = async () => {
  const response = await api.get("/statuses");
  return response.data;
};
