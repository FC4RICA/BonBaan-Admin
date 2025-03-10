import { useActionData, useLoaderData } from "react-router";
import { getOrders, getOrderStatuses, getOrderType } from "../api/orderApi";

export const ordersLoader = async () => {
  const statuses = await getOrderStatuses();

  const ordersData = await getOrders();
  return {
    statuses: statuses.data,
    data: ordersData.data,
  };
};

export const ordersAction = () => {
  return null;
};

export const useOrders = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  return actionData || loaderData;
};
