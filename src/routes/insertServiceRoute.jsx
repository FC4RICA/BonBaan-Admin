import { useActionData, useLoaderData } from "react-router";
import { getCategories } from "../api/categoryApi";

export const insertSrviceLoader = async () => {
  const categories = await getCategories();
  const types = [
    {
      ID: "1",
      name: "บนบาน",
    },
    {
      ID: "2",
      name: "แก้บน",
    },
  ];
  return { categories: categories.data, types: types };
};

export const insertServiceAction = () => {
  return null;
};

export const useInsertService = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  return actionData || loaderData;
};
