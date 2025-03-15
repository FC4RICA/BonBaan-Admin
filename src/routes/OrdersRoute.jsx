import { useActionData, useLoaderData } from "react-router";
import { getOrders, getOrderStatuses } from "../api/orderApi";

export const ordersLoader = async () => {
  const statuses = await getOrderStatuses();

  const ordersData = await getOrders();
  return {
    statuses: statuses.data,
    orders: ordersData.data.orders,
    pagination: ordersData.data.pagination
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
