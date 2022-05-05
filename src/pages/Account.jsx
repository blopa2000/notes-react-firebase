import { Navigate, useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const Account = ({ isLogin = true }) => {
  const navigate = useNavigate();
  const { login, signup, loading, user } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = e.target.elements;
    try {
      if (isLogin) {
        await login(email.value, password.value);
      } else {
        await signup(email.value, password.value, name.value);
      }
      navigate("/");
    } catch (error) {
      //errors are handled in the context
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {user ? (
        <Navigate to="/" replace />
      ) : (
        <div className="container-account">
          <div className="container-account-card">
            <header className="container-account-card-header">
              <h1 className="title">Notes</h1>
              <h3 className="subtitle">{isLogin ? "Login" : "signup"}</h3>
            </header>

            <div>
              <form className="container-account-card-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="youEmail@enterprise.com"
                  className="container-account-card-form-input"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="container-account-card-form-input"
                />

                {!isLogin && (
                  <input
                    type="text"
                    name="name"
                    placeholder="your name"
                    className="container-account-card-form-input"
                  />
                )}

                <div className="container-account-card-form-container-btn">
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
