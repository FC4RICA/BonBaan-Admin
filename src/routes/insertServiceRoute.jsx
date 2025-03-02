import { useActionData, useLoaderData } from "react-router";
import { getCategories } from "../api/categoryApi";
import { getOrderType } from "../api/orderTypeApi";

export const insertSrviceLoader = async () => {
  const categories = await getCategories();
  const types = await getOrderType();
  return { categories: categories.data, types: types.data };
};

export const insertServiceAction = () => {
  return null;
};

export const useInsertService = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  return actionData || loaderData;
};
