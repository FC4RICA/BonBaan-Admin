import api from "./axiosInstance";

export const getCategories = async () => {
  const response = await api.get("/categories");  
  return response.data;
}; 

export const createCategory = async ({ name }) => {
  const resposne = await api.post("/categories", { name });
  return resposne.data;
};

export const updateCategory = async (id, { name }) => {
  const response = await api.put(`/categories/${id}`, { name });
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

export const getCategoryServiceCount = async (id) => {
  const response = await api.get(`/categories/${id}/services`)
  return response.data.data.length;
}