import { useActionData, useLoaderData } from "react-router";
import { cancelCustomOrder, getAllPendingOrders } from "../api/orderApi";

export const inboxLoader = async () => {
  const statuses = await getAllPendingOrders();
  if (!statuses)
    throw new Response("Null response", { status: 404});

  return statuses.orders;
};

export const inboxAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  try {
    if (intent === "accept") {
      const id = formData.get("id");
      const price = formData.get("price");
      await acceptCustomOrder(id, price)
    } else if (intent === "cancel") {
      const id = formData.get("id");
      const reason = formData.get("cancel_reason");
      await cancelCustomOrder(id, { cancel_reason: reason })
    }
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};

export const useInbox = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  return loaderData || actionData;
};
