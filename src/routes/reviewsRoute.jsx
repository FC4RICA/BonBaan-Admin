import { useLoaderData } from "react-router";
import { getReviews } from "../api/reviewApi";

export const reviewsLoader = async () => {
  const response = await getReviews();
  // const users = response.data
  //   .filter((user) => user.Role.role.toLowerCase() === "user")
  //   .map((user) => ({
  //     ...user,
  //     CreatedAt: new Date(user.CreatedAt).toLocaleString(),
  //   }));
  return response.data;
};

export const useReviews = () => {
  const loaderData = useLoaderData();

  return loaderData;
};
