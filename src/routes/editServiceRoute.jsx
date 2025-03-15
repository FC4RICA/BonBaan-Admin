import { useActionData, useLoaderData } from "react-router";
import { getService } from "../api/serviceApi";

export const serviceLoader = async ({ params }) => {
  const { id } = params;
  const response = await getService(id);
  const data = response.data;

  if (!response.data)
    throw new Response("Service not found", { status: 404 })
  
  const service = {
    name: data.name,
    description: data.description,
    address: data.address,
    packages: data.packages,
    customable: true,
    images: data.attachments.map((attachment) => attachment.url),
    categories: data.categories.map((category) => category.id),
  };
  return service;
}

export const serviceAction = () => {
  return null;
}

export const useService = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  return actionData || loaderData;
}