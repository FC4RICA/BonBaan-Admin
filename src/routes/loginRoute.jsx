import { useActionData, useLoaderData } from "react-router";
import { login } from "../api/userApi";

export const loginLoader = async () => {
  try {
    const token = sessionStorage.getItem("token")
    return { token }
  } catch (error) {
    return null
  }
}

export const loginAction = async ({ request }) => {
  const data = await request.formData();
  const body = {
    emailOrUsername: data.get("username"),
    password: data.get("password")
  }

  try {
    const response = await login(body);
    return response
  } catch (error) {
    return { error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" };
  }
}

export const useLogin = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  return actionData || loaderData;
}