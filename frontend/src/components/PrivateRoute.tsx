import { Navigate, Outlet } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import Loader2 from "./Loader2";

const PrivateRoute = () => {
  const { account, isLoading } = useMainContext();

  if (isLoading) {
    return <Loader2 />;
  }

  return account ? <Outlet /> : <Navigate to="/connect-wallet" replace />;
};

export default PrivateRoute;
