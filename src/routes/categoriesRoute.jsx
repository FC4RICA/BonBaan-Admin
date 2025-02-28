import { useActionData, useLoaderData } from "react-router";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryServiceCount,
  updateCategory,
} from "../api/categoryApi";

export const categoriesLoader = async () => {
  const response = await getCategories();

  const categories = await Promise.all(
    response.data.map(async (category) => ({
      ...category,
      Count: await getCategoryServiceCount(category.ID),
      UpdatedAt: new Date(category.UpdatedAt).toLocaleString(),
    }))
  );
  return categories || [];
};

export const categoriesAction = async ({ request }) => {
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
