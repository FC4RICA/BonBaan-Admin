import { useLoaderData } from "react-router";
import { getUsers } from "../api/userApi";
import { getOrderByUserID } from "../api/orderApi";

export const usersLoader = async () => {
  const response = await getUsers();
  const users = await Promise.all(response.data
    .filter((user) => user.Role.role.toLowerCase() === "user")
    .map(async (user) => {
      const orders = await getOrderByUserID(user.ID);
      const totalSpend = orders?.reduce((sum, order) => (sum + order.price)) || 0;
      return{
      ...user,
      order: orders?.length || 0,
      totalSpend: totalSpend,
      CreatedAt: new Date(user.CreatedAt).toLocaleString(),
    }}));
  return users;
};

export const useUsers = () => {
  const loaderData = useLoaderData();

  return loaderData;
};
