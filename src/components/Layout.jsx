import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const Layout = () => {
  const { loading } = useGlobalContext();

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export { Layout };
