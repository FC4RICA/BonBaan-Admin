import { useActionData, useLoaderData } from "react-router";
import { getServices } from "../api/serviceApi";

export const servicesLoader = async () => {
  const response = await getServices();
  return response.data;
};

export const servicesAction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("id");
  const response = await deleteService(id);
  return response;
};

export const useServices = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  return loaderData || actionData;
};
