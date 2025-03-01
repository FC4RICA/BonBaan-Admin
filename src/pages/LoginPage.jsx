import { LoginForm } from "../components/forms/userForm";
import { useNavigate, useSubmit } from "react-router";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useLogin } from "../routes/loginRoute";

const LoginPage = () => {
  const submit = useSubmit();
  const result = useLogin();
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (result && result.token) {
      const success = await setUserData(result.token);
      if (success){
        navigate("/home");
      }
    }
  }

  useEffect(() => {
    handleLogin();
  }, [result, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-8">
        <img src="src/assets/images/logo3.svg" className="w-32" />
        <div className="flex form-control w-80 bg-white px-8 py-6 gap-6 border border-[#CECCD5] rounded-xl">
          <LoginForm onSubmit={(v) => submit(v, { method: "post", action: "/" })} />
          <p className="text-red-500 text-sm">{result.error}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
