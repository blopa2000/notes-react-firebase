import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/context";

const Layout = () => {
  const { loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export { Layout };
