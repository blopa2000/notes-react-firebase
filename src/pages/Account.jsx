import { useAuth } from "../context/context";
import { Navigate, useNavigate, Link } from "react-router-dom";
import "../styles/login.scss";

const Account = ({ isLogin = true }) => {
  const { login, signup, user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = e.target.elements;
    try {
      if (isLogin) {
        await login(email.value, password.value);
      } else {
        await signup(email.value, password.value, name.value);
      }
    } catch (error) {
      //errors are handled in the context
    } finally {
      navigate("/");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {user ? (
        <Navigate to="/" replace />
      ) : (
        <div className="container">
          <div className="card-form">
            <header>
              <h1 className="card-title">Notes</h1>
              <h3 className="card-subtitle">{isLogin ? "Login" : "signup"}</h3>
            </header>

            <div className="content-form">
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="youEmail@enterprise.com"
                  className="card-form-input"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="card-form-input"
                />

                {!isLogin && (
                  <input
                    type="text"
                    name="name"
                    placeholder="your name"
                    className="card-form-input"
                  />
                )}

                <div className="container-btn">
                  <button type="submit" className="btn">
                    {isLogin ? "Login" : "Signup"}
                  </button>
                  <button className="btn btn-google">Google</button>
                </div>
              </form>

              <Link to={!isLogin ? "/login" : "/signup"}>{!isLogin ? "Login" : "Signup"}</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Account };
