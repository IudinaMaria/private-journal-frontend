import { Navigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}
