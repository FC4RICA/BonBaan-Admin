import { useLoaderData } from "react-router";
import { getUsers } from "../api/userApi";

export const usersLoader = async () => {
  const response = await getUsers();
  const users = response.data
    .filter((user) => user.Role.role.toLowerCase() === "admin")
    .map((user) => ({
      ...user,
      CreatedAt: new Date(user.CreatedAt).toLocaleString(),
    }));
  return users;
};

export const useUsers = () => {
  const loaderData = useLoaderData();

  return loaderData;
};
