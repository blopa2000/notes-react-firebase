import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/context";

import "../styles/navbar.scss";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1>Notes</h1>
      <div className="navbar-info">
        <h3>{`Welcome ${user.name[0].toUpperCase() + user.name.slice(1)}`}</h3>
        <button onClick={() => handleLogout()}>|||</button>
      </div>
    </nav>
  );
};

export { Navbar };
