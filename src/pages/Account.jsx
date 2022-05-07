import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import ReactJsAlert from "reactjs-alert";

import { Loading } from "../components/Loading";
import { Modal } from "../components/Modal";

import accountImg from "../utils/images/account.svg";
// import googleImg from "../utils/images/google.png";
import { useEffect } from "react";

const Account = ({ isLogin = true }) => {
  const navigate = useNavigate();
  const { login, signup, loading, setLoading, user, resetPassword /*loginWithGoogle*/ } =
    useGlobalContext();
  const [dataResetPassword, setdataResetPassword] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState({
    status: false,
    title: "",
    type: "",
  });

  useEffect(() => {
    setLoading(true);
    if (user) {
      navigate("/");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [user, navigate, setLoading]);

  const handleSubmit = async (values, actions) => {
    const { email, password, name } = values;

    try {
      if (isLogin) {
        const res = await login(email, password);
        if (!res) throw new Error("Error when trying to login");
        actions.setSubmitting(false);
        navigate("/");
      } else {
        const res = await signup(email, password, name);
        if (!res) throw new Error("Error when trying to signup");
        actions.setSubmitting(false);
        navigate("/");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setOpenAlert({ status: true, type: "error", title: "Email already in use" });
      } else if (error.code === "auth/invalid-email") {
        setOpenAlert({ status: true, type: "error", title: "Invalid email" });
      } else if (error.code === "auth/weak-password") {
        setOpenAlert({ status: true, type: "error", title: "Weak password" });
      } else if (error.code === "auth/user-not-found") {
        setOpenAlert({ status: true, type: "error", title: "User not found" });
      } else if (error.code === "auth/wrong-password") {
        setOpenAlert({ status: true, type: "error", title: "Wrong password" });
      }
      setOpenAlert({ status: true, type: "error", title: error.message });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!dataResetPassword) {
      setOpenAlert({ status: true, type: "error", title: "Please enter your email" });
      return;
    }
    try {
      await resetPassword(dataResetPassword);
      setOpenAlert({
        status: true,
        type: "success",
        title: "we sent you an email with  a link to reset your password",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setdataResetPassword("");
      setIsOpenModal(false);
    }
  };

  const handleChange = ({ target }) => {
    setdataResetPassword(target.value);
  };

  // const hangleLoginWithGoogle = async () => {
  //   try {
  //     const res = await loginWithGoogle();
  //     if (!res) {
  //       setOpenAlert({ status: true, type: "error", title: "User not found" });
  //     }
  //   } catch (error) {
  //     setOpenAlert({ status: true, type: "error", title: "Error login with google" });
  //   }
  // };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="account-container">
          <div className="account-info-container">
            <h1 className="title">{isLogin ? "Log in" : "sign up"}</h1>

            {/* <div className="social-account">
              <div className="social-account-element" onClick={hangleLoginWithGoogle}>
                <img src={googleImg} alt="google" />
                <span>Google</span>
              </div>
            </div>

            <p>or</p> */}

            <Formik
              initialValues={{
                email: "",
                password: "",
                name: "",
              }}
              validationSchema={yup.object({
                email: yup.string().required("Email is required").email("Invalid email"),
                password: yup
                  .string()
                  .required("Password is required")
                  .min(9, "Password must be at least 9 characters"),
              })}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ handleSubmit, setFieldValue, isSubmitting }) => (
                <Form onSubmit={handleSubmit} className="inputs-container">
                  <Field type="text" name="email" placeholder="email" className="input" />
                  <ErrorMessage
                    className="form-control-message-error"
                    name="email"
                    component="div"
                  />

                  <Field type="password" name="password" placeholder="password" className="input" />
                  <ErrorMessage
                    className="form-control-message-error"
                    name="password"
                    component="div"
                  />

                  {!isLogin && (
                    <>
                      <Field type="text" name="name" placeholder="your name" className="input" />
                      <ErrorMessage
                        className="form-control-message-error"
                        name="password"
                        component="div"
                      />
                    </>
                  )}

                  {isLogin && (
                    <p>
                      Forgot password{" "}
                      <span className="span" onClick={() => setIsOpenModal(true)}>
                        Click here
                      </span>
                    </p>
                  )}
                  <button type="submit" className="btn-account">
                    {isLogin ? "Log in" : "sign up"}
                  </button>
                  <p>
                    Don't heve an account?{" "}
                    <Link to={!isLogin ? "/login" : "/signup"} className="span">
                      {!isLogin ? "Login" : "Signup"}
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>

          <img src={accountImg} className="image-account" alt="account-img" />
        </div>
      )}
      <ReactJsAlert
        status={openAlert.status}
        type={openAlert.type}
        title={openAlert.title}
        Close={() => setOpenAlert({ ...openAlert, status: false })}
      />

      {isOpenModal && (
        <Modal handleIsOpenModal={() => setIsOpenModal(false)} title="Reset Password">
          <form onSubmit={handleResetPassword} className="form-control">
            <header className="form-control-header">
              <h1 className="form-control-header-title">Enter your email</h1>
            </header>
            <input
              type="text"
              name="email"
              placeholder="email"
              className="form-control-input-label"
              onChange={handleChange}
            />
            <button type="submit" className="form-control-btn btn-center">
              send
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export { Account };
