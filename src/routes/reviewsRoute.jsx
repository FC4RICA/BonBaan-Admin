import { useLoaderData } from "react-router";
import { getReviews } from "../api/reviewApi";

export const reviewsLoader = async () => {
  const response = await getReviews();
  const reviews = response.data
    .map((review) => ({
      ...review,
      CreatedAt: new Date(review.CreatedAt).toLocaleString(),
    }));
  return reviews;
};

export const useReviews = () => {
  const loaderData = useLoaderData();

  return loaderData;
};
