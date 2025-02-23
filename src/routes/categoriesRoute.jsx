import { useActionData, useLoaderData } from "react-router";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../api/categoryApi";

export const categoriesLoader = () => {
  console.log("LOADER");
  
  const response = getCategories();
  return response;
};

export const categoriesAction = async ({ request }) => {
  console.log("ACTION");
  
  const formData = await request.formData();
  const intent = formData.get("intent");

  console.log(formData);
  console.log(intent);

  try {
    if (intent === "create") {
      const name = formData.get("name");
      console.log(name);
      
      await createCategory({ name });
    } else if (intent === "update") {
      const id = formData.get("id");
      const name = formData.get("name");
      await updateCategory(id, { name });
    } else if (intent === "delete") {
      const id = formData.get("id");
      await deleteCategory(id);
    }
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};

export const useCategories = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  return loaderData || actionData;
};
