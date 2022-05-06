import { useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { useOuterClick } from "../hooks/useOuterClick";

import ReactJsAlert from "reactjs-alert";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { HiMenuAlt3 } from "react-icons/hi";
import * as yup from "yup";

import { Modal } from "./Modal";

const Navbar = () => {
  const { logout, user, updateUser } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const menuRef = useRef();
  const [openAlert, setOpenAlert] = useState({
    status: false,
    title: "",
    type: "",
  });

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useOuterClick(() => setIsOpenMenu(false), menuRef);

  const handleIsOpenModal = () => {
    setIsOpenMenu(false);
    setIsOpenModal(!isOpenModal);
  };

  const handleSubmitNav = async (values, actions) => {
    try {
      const res = await updateUser(values);
      if (!res) throw new Error("Error when trying to update the user");
      actions.setSubmitting(false);
    } catch (error) {
      console.error(openAlert);
      setOpenAlert({
        status: true,
        title: error.message,
        type: "error",
      });
    }
    setIsOpenModal(false);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-title">
          <h1>Notes</h1>
        </Link>

        <div className="navbar-content">
          <h3 className="navbar-content-user-name">{`Welcome ${
            user?.name[0].toUpperCase() + user?.name.slice(1)
          }`}</h3>

          <div className="navbar-content-menu" ref={menuRef}>
            <button className="navbar-content-menu-btn" onClick={() => setIsOpenMenu(!isOpenMenu)}>
              <HiMenuAlt3 />
            </button>

            <div
              className={`navbar-content-menu-list ${
                isOpenMenu ? "navbar-content-menu-list-show" : ""
              }`}
            >
              <ul>
                <li>
                  <Link to="/">
                    <button component={Link} to="/" onClick={() => setIsOpenMenu(!isOpenMenu)}>
                      Notes
                    </button>
                  </Link>
                </li>
                {location.pathname === "/" && (
                  <li>
                    <button onClick={handleIsOpenModal}>Settings</button>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="navbar-spacing" />

      {isOpenModal && (
        <Modal handleIsOpenModal={handleIsOpenModal} title="Settings">
          <Formik
            initialValues={{
              name: user.name,
            }}
            validationSchema={yup.object({
              name: yup.string().required("Name is required").max(20, "Name is too long"),
            })}
            onSubmit={handleSubmitNav}
            enableReinitialize={true}
          >
            {({ handleSubmit, setFieldValue, isSubmitting }) => (
              <Form className="form-control" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Name:</label>
                  <Field type="text" name="name" className="form-control-input-label" />
                  <ErrorMessage
                    className="form-control-message-error"
                    name="name"
                    component="div"
                  />
                </div>

                <button
                  type="submit"
                  className="form-control-btn btn-center"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </Modal>
      )}

      <ReactJsAlert
        status={openAlert.status}
        type={openAlert.type}
        title={openAlert.title}
        Close={() => setOpenAlert({ ...openAlert, status: false })}
      />
    </>
  );
};

export { Navbar };
