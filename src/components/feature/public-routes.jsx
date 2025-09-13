import { Outlet, Navigate } from "react-router";
import { isAuthenticated } from "../../helpers/authentication";

export default function PublicRoutes() {
  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
