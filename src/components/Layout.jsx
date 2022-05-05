import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../context/context";

import { Navbar } from "./Navbar";
import { Loading } from "./Loading";

const Layout = () => {
  const { loading } = useGlobalContext();

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export { Layout };
