import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

type Props = {
  children: React.ReactNode;
  restricted?: boolean;
};

export default function PublicRoute({ children, restricted = false }: Props) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (restricted && user) {
    if (user.role === "Admin") return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
