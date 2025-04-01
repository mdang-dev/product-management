import { useUser } from "../auth/useUser";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRouteAuth() {
  const { user } = useUser();
  return user ? <Navigate to="/" replace /> : <Outlet />;
}
