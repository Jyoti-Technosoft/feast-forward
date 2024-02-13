import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Dropdown, Toast, ToastBody } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { HashLink } from "react-router-hash-link";

import "../assets/styles/Header.css";
import foodDonationLogo from "../assets/images/Project logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleHome = () => {
    navigate("/home");
  };

  const handleDonate = () => {
    navigate("/donate");
  };

  const handleJoinNow = () => {
    navigate("/join-now");
  };

  const handleLogout = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="Header-container">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <img
          src={foodDonationLogo}
          alt="Food Donation Logo"
          width="80px"
          height="85px"
          style={{ marginLeft: "4rem" }}
        />
        <div className="navbar-brand"></div>

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
              <div className="nav-link" onClick={handleHome}>
                <NavLink
                  to="/home"
                  className="nav-link"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
              <Dropdown>
                <Dropdown.Toggle
                  as="div"
                  className="nav-link dropdown-toggle"
                  id="aboutUsDropdown"
                  style={{ cursor: "pointer" }}
                >
                  About Us
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as="div">
                    <HashLink
                      to="/about-us#description"
                      className="dropdown-item"
                    >
                      Description
                    </HashLink>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <HashLink
                      to="/about-us#organization-link"
                      className="dropdown-item"
                    >
                      Organization
                    </HashLink>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <HashLink
                      to="/about-us#contact-us-link"
                      className="dropdown-item"
                    >
                      Contact Us
                    </HashLink>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                onClick={handleDonate}
                style={{ cursor: "pointer" }}
              >
                Donate
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                onClick={handleJoinNow}
                style={{ cursor: "pointer" }}
              >
                Join Now
              </div>
            </li>
            <li className="nav-item dropdown user-info">
              <Dropdown>
                <Dropdown.Toggle as="div" className="nav-link dropdown-toggle">
                  <PersonCircle size={25} style={{ cursor: "pointer" }} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Help?</Dropdown.Item>
                </Dropdown.Menu> 
              </Dropdown>
            </li>
            {show ? (
              <Toast
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  zIndex: 1051,
                  backgroundColor: "#d4edda",
                  color: "#155724",
                  borderLeft: "5px solid #28a745",
                }}
              >
                <ToastBody>Successfully logged out!</ToastBody>
              </Toast>
            ) : null}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
