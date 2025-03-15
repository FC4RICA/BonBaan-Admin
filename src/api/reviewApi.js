import api from "./axiosInstance"

export const getReviews = async () => {
  const response = await api.get("/reviews");
  return response.data;
}