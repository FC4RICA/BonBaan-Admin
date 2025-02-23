import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { getMyData } from "../api/userApi";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      getMyData()
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => logoutUser());
    }
  }, []);

  const setUserData = async ({ token }) => {
    try {
      sessionStorage.setItem("token", token);

      // const response = await getMyData();
      // setUser(response);

      setUser({
        username: "test",
      });

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logoutUser = () => {
    sessionStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUserData, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;