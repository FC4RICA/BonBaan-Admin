import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import UserContext from "../context/UserContext";

const ProtectedRoute = () => {
  const { context, user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet context={context} />;
};

export default ProtectedRoute;
