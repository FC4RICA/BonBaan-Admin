import { createContext, useEffect, useState } from "react";
import { getMyData } from "../api/userApi";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      getMyData()
        .then((res) => {
          user || setUser(res.data)
        })
        .catch(() => logoutUser())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const setUserData = async (token) => {
    try {
      sessionStorage.setItem("token", token);

      const response = await getMyData();
      if (response.data) {
        setUser(response.data);
      return true;
      }
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
    <UserContext.Provider value={{ user, setUserData, logoutUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
