import { Navigate } from "react-router-dom";
import { useAuth } from "./context/context";

const Privateroute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export { Privateroute };
