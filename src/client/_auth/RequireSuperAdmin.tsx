import { useUserContext } from "../services/context/user/UseContext";
import { Navigate, Outlet } from "react-router-dom";

export const RequireSuperAdmin = () => {
  const { user } = useUserContext();
  if (!user || user.role !== "superadmin") {
    return <Navigate to="/unauthorized" />;
  }
  return <Outlet />;
};

export default RequireSuperAdmin;
