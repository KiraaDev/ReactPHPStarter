import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

export default function PrivateRoute({ children, allowedRoles }: Props) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
