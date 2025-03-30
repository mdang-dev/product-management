import { PropsWithChildren } from "react";
import { useUser } from "../auth/useUser";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export function ProtectedRouteAuth({ children }: ProtectedRouteProps) {
  const { user } = useUser();
  if (user) return <Navigate to="/" replace />;

  return <>{children}</>;
}
