import { useActionData, useLoaderData } from "react-router";
import { getCategories } from "../api/categoryApi";
import { getOrderType } from "../api/orderApi";
import { createService } from "../api/serviceApi";

export const insertSrviceLoader = async () => {
  const categories = await getCategories();
  const types = await getOrderType();
  return { categories: categories.data, types: types.data };
};

export const insertServiceAction = async ({ request }) => {
  const formData = await request.formData();
  try {
    const response = await createService(formData);
    return response.data
  } catch (error) {
    throw new Error("unable to create service", {status: 400});
  }
};

export const useInsertService = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  return actionData || loaderData;
};
