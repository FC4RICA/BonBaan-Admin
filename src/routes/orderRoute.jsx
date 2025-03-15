export const orderLoader = async () => {
  const { id } = params;
  const response = await getOrder(id);
  const order = response.data;

  if (!order)
    throw new Response("Order not found", { status: 404 })

  return order;
}

export const orderAction = async () => {
  return null;
}

export const useOrder = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  return actionData || loaderData;
}