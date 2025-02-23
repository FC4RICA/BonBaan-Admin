import { LoginForm } from "../components/forms/userForm";
import { useActionData, useNavigate, useSubmit } from "react-router";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { login } from "../api/userApi";

export const loginLoader = async () => {
  
}

export const loginAction = async ({ request }) => {
  const data = await request.formData();
  const body = {
    emailOrUsername: data.get("username"),
    password: data.get("password")
  }

  try {
    const response = login(body);
    return response;
  } catch (error) {
    return { error: "Invalid credentials" };
  }
}

const LoginPage = () => {
  const submit = useSubmit();
  const result = useActionData();
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (result) {
      setUserData(result.token);
      navigate("/home");
    }
  }, [result, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-8">
        <img src="src/assets/images/logo3.svg" className="w-32" />
        <div className="flex form-control w-80 bg-white px-8 py-6 gap-6 border border-[#CECCD5] rounded-xl">
          <LoginForm onSubmit={(v) => submit(v, { method: "post", action: "/" })} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
