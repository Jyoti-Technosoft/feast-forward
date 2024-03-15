import React, { useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Dropdown, Toast, ToastBody, ToastContainer } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { HashLink } from "react-router-hash-link";

import "../assets/styles/Header.css";
import foodDonationLogo from "../assets/images/Project logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
      navigate("/");
    }, 1000);
  };

  const startsWithPath = (path) => location.pathname.startsWith(path);

  return (
    <div className="Header-container">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <img
          className="logo-image"
          src={foodDonationLogo}
          alt="Food Donation Logo"
          width="80px"
          height="85px"
        />
        <div className="navbar-expand-lg .navbar-collapse"></div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown d-flex">
              <NavLink
                to="/about-us#description"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                About Us
              </NavLink>
              <Dropdown>
                <Dropdown.Toggle
                  to="/about-us#description"
                  as="div"
                  id="aboutUsDropdown"
                  className={`nav-link dropdown-toggle ${
                    startsWithPath("/about-us") ? "active" : ""
                  }`}
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as="div">
                    <HashLink
                      to="/about-us#organization-link"
                      className={`dropdown-item ${
                        location.hash === "#organization-link" ? "active" : ""
                      }`}
                    >
                      Organization
                    </HashLink>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <HashLink
                      to="/about-us#contact-us-link"
                      className={`dropdown-item ${
                        location.hash === "#contact-us-link" ? "active" : ""
                      }`}
                    >
                      Contact Us
                    </HashLink>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <NavLink
                to="/donate"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Donate
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/join-now"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Join Now
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/feedback"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Feedback
              </NavLink>
            </li>
            <li className="nav-item dropdown user-info">
              <Dropdown>
                <Dropdown.Toggle as="div" className="nav-link dropdown-toggle">
                  <PersonCircle size={25} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Help?</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>
      {show && (
        <ToastContainer position="top-end" className="p-3">
          <Toast className="toaster-alert">
            <ToastBody>Successfully logged out!</ToastBody>
          </Toast>
        </ToastContainer>
      )}
    </div>
  );
}

export default Header;
