import { PropsWithChildren } from "react";
import { useUser } from "../auth/useUser";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useUser();

  const isAdmin = user?.roles.some((role) => role.name === "ADMIN");

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
