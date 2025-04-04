import { PropsWithChildren } from "react";
import { useUser } from "../auth/useAuth";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  
  const { user, isLoading } = useUser();
  const isAdmin = user?.roles.some((role) => role.name === "ADMIN");

  if (isLoading) return <div>Loading...</div>;

  if (!isAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
}
