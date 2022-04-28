import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

import "../styles/navbar.scss";

const Navbar = () => {
  const { logout, user } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1>Notes</h1>
      <div className="navbar-info">
        <h3>{`Welcome ${user?.name[0].toUpperCase() + user?.name.slice(1)}`}</h3>
        <button onClick={() => handleLogout()}>|||</button>
      </div>
    </nav>
  );
};

export { Navbar };
