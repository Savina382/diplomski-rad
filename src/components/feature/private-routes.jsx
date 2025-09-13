import { Outlet, Navigate } from "react-router";
import { isAuthenticated } from "../../helpers/authentication";

export default function PrivateRoutes() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Outlet />
  )
}
