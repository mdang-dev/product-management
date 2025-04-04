import { useUser } from "../auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRouteAuth() {
  const { user } = useUser();
  const isAdmin = user?.roles.some((role) => role.name === "ADMIN");

  if (user && isAdmin) return <Navigate to="/admin/products/list" replace />;
  if (user && !isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}
