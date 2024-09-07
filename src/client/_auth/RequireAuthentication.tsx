import { useUserContext } from "../services/context/user/UseContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuthentication = () => {
  const { isUserAuthenticated } = useUserContext();
  const location = useLocation();

  if (!isUserAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location.pathname }} />;
  }
  return <Outlet />;
};

export default RequireAuthentication;
