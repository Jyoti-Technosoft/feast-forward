import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { HashLink } from "react-router-hash-link";

import CustomToast from "./ReusableComponents/CustomToast";
import { upsertLogout } from "../Services/AuthenticationServices";
import foodDonationLogo from "../assets/images/Project logo.png";
import "../assets/styles/Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState({ type: "", message: "" });

  const handleLogout = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      try {
        const response = await upsertLogout(user?.email);
        if (response?.status === 200) {
          setMessage({ type: "success", message: response?.data?.message });
          setTimeout(() => {
            window.localStorage.clear();
            navigate("/");
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        console.error("error", error);
      }
    }
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    user && setUserName(user.fullName);
  });

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
          width="50px"
          height="55px"
        />
        {/* Toggler Icon for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
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
                Join Us
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
                <Dropdown.Toggle
                  as="div"
                  className="d-flex align-items-center nav-link dropdown-toggle"
                >
                  <PersonCircle size={25} />
                  <span className="text-capitalize">&nbsp;{userName}</span>
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
      {message !== "" ? <CustomToast message={message} /> : null}
    </div>
  );
}

export default Header;
