import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { HiMenuAlt3 } from "react-icons/hi";
import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useOuterClick } from "../hooks/useOuterClick";

import { Modal } from "./Modal";

import "../styles/navbar.scss";

const Navbar = () => {
  const { logout, user, updateUser } = useGlobalContext();
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const menuRef = useRef();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useOuterClick(() => setIsOpenMenu(false), menuRef);

  const handleIsOpenModal = () => {
    setIsOpenMenu(false);
    setIsOpenModal(!isOpenModal);
  };

  const handleSubmit = async (values, actions) => {
    const res = await updateUser(values);
    if (res) {
      setIsOpenModal(false);
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-link">
          <h1>Notes</h1>
        </Link>
        <div className="navbar-info">
          <h3>{`Welcome ${user?.name[0].toUpperCase() + user?.name.slice(1)}`}</h3>

          <div className="menu" ref={menuRef}>
            <button className="menu-btn" onClick={() => setIsOpenMenu(!isOpenMenu)}>
              <HiMenuAlt3 />
            </button>

            <div className={`menu-list ${isOpenMenu ? "show-menu " : " "}`}>
              <ul>
                <li>
                  <Link to="/">
                    <button component={Link} to="/" onClick={() => setIsOpenMenu(!isOpenMenu)}>
                      Notes
                    </button>
                  </Link>
                </li>
                <li>
                  <button onClick={handleIsOpenModal}>Settings</button>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="spacin_nav" />

      {isOpenModal && (
        <Modal handleIsOpenModal={handleIsOpenModal}>
          <div className="content-form-nav">
            <Formik
              initialValues={{
                name: user.name,
              }}
              validationSchema={yup.object({
                name: yup.string().required("Name is required").max(20, "Name is too long"),
              })}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ handleSubmit, setFieldValue, isSubmitting }) => (
                <Form className="content-form-card-form " onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name">Name:</label>
                    <Field type="text" name="name" className="content-form-card-input" />
                    <ErrorMessage className="text-error" name="name" component="div" />
                  </div>

                  <button type="submit" className="content-form-card-btn" disabled={isSubmitting}>
                    Save
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      )}
    </>
  );
};

export { Navbar };
