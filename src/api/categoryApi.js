import api from "./axiosInstance";

export const getCategories = async () => {
  // const response = await api.get("/categories");
  // return response.data;
  return {
    categories: [
      {
        id: "1234",
        name: "Test",
        count: 0,
        lastUpdateAt: Date.now(),
      },
      {
        id: "1235",
        name: "Test2",
        count: 0,
        lastUpdateAt: Date.now(),
      },
    ],
  };
}; 

export const createCategory = async ({ name }) => {
  const resposne = await api.post("/categories", { name });
  return resposne.data;
};

export const updateCategory = async (id, { name }) => {
  const response = await api.patch(`/categories/${id}`, { name });
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};
