import api from "./axiosInstance"

export const getServices = async (currentPage = 1, pageSize = 10) => {
  const response = await api.get("/services", {
    params: { pageSize, currentPage },
  });
  return response.data;
};

export const getService = async (id) => {
  const response = await api.get(`/services/${id}`);
  return response.data;
}

export const createService = async (service) => {
  const response = await api.post("/services", service, { headers: "multipart/form-data"})  
  return response.data;
}
export const deleteService = async (id) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
}