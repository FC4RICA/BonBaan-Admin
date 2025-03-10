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
  const formObject = {}
  
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      // Store file metadata instead of the file object itself
      formObject[key] = {
        name: value.name,
        size: value.size,
        type: value.type,
      };
    } else {
      // Handle multiple values for the same key (checkboxes, etc.)
      if (formObject[key]) {
        if (!Array.isArray(formObject[key])) {
          formObject[key] = [formObject[key]];
        }
        formObject[key].push(value);
      } else {
        formObject[key] = value;
      }
    }
  }

  for (const key in formObject) {
    if (typeof formObject[key] === "string") {
      try {
        formObject[key] = JSON.parse(formObject[key]); // Convert to object/array if possible
      } catch (e) {
        // If parsing fails, keep it as a string
      }
    }
  }

  console.log(formObject);
  
    
  // const response = await createService(formData);
  // console.log(response);
  
  return null
};

export const useInsertService = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  return actionData || loaderData;
};
