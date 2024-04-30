import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Dropdown, Toast, ToastBody, ToastContainer } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { HashLink } from "react-router-hash-link";
import axios from "axios";

import { BASE_URL } from "../app-endpoint";
import "../assets/styles/Header.css";
import foodDonationLogo from "../assets/images/Project logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogout = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      try {
        await axios.delete(`${BASE_URL}/logout/${user.email}`);
        setShow(true);
        localStorage.removeItem("user");
        navigate("/");
      } catch (error) {
        console.error("error", error);
      }
    }
  }

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    user && setUserName(user.fullName);
  })

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  const handleUsers = () => {
    navigate("/join-now-users");
  };

  const handleVolunteers = () => {
    navigate("/volunteers");
  };

  const startsWithPath = (path) => location.pathname.startsWith(path);

  return (
    <div className="header-container">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <img
          className="logo-image"
          src={foodDonationLogo}
          alt="Food Donation Logo"
          width="80px"
          height="85px"
        />
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
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
                  className={`nav-link dropdown-toggle ${startsWithPath("/about-us") ? "active" : ""
                    }`}
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as="div">
                    <HashLink
                    to="/about-us#organization-link"
                    className={`dropdown-item ${location.hash === "#organization-link" ? "active" : ""
                      }`}
                    >
                      Organization
                    </HashLink>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <HashLink
                      to="/about-us#contact-us-link"
                      className={`dropdown-item ${location.hash === "#contact-us-link" ? "active" : ""
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
                <Dropdown.Toggle as="div" className="d-flex align-items-center nav-link dropdown-toggle">
                  <PersonCircle size={25} />
                  <span>&nbsp;{userName}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleResetPassword}>
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleUsers}>
                    Join-Now Users
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleVolunteers}>
                    Volunteer
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Help?</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>
      {show
        ? setTimeout(() => {
            return (
              <ToastContainer position="top-end" className="p-3">
                <Toast className="toaster-alert">
                  <ToastBody>Successfully logged out!</ToastBody>
                </Toast>
              </ToastContainer>
            );
          }, 8000)
        : ""}
    </div>
  );
}

export default Header;
