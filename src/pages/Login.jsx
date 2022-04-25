import "../styles/login.scss";

const Login = () => {
  return (
    <div className="container">
      <div className="card-form">
        <header>
          <h1 className="card-title">Notes</h1>
          <h3 className="card-subtitle">Login</h3>
        </header>

        <div className="content-form">
          <form className="form">
            <input type="text" placeholder="Email" className="card-form-input" />
            <input type="password" placeholder="Password" className="card-form-input" />
            <div className="container-btn">
              <button className="btn">Login</button>
              <button className="btn btn-google">Google</button>
            </div>
          </form>

          <a href="#!">Logout</a>
        </div>
      </div>
    </div>
  );
};

export { Login };
