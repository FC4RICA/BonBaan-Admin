import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router";

const LogoutPage = () => {
  const { logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser();
    navigate("/");
  }, []);

  return <div></div>;
};

export default LogoutPage;
