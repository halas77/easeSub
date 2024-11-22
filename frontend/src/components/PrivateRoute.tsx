import { Navigate, Outlet } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import Loader from "./Loader";

const PrivateRoute = () => {
  const { account, isLoading } = useMainContext();

  if (isLoading) {
    return <Loader />;
  }

  return account ? <Outlet /> : <Navigate to="/connect-wallet" replace />;
};

export default PrivateRoute;
