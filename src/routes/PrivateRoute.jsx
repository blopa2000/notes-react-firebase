import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const Privateroute = ({ children }) => {
  const { user, loading } = useGlobalContext();
  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export { Privateroute };
