import React, { useState } from "react";
// import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Dropdown, Toast } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

import "../assets/styles/Header.css";
import foodDonationLogo from "../assets/images/Project logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleLogoutClick = () => {
    setShowToast(true);
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleJoinNow = () => {
    navigate("/join-now");
  };

  // const handleLogout = () => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You will be logged out!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, logout!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       navigate("/");
  //     }
  //   });
  // };

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
                >
                  About Us
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as="div">
                    <NavLink
                      to="/about-us#description"
                      activeClassName="active"
                      className="dropdown-item"
                    >
                      Description
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <NavLink
                      to="/organization"
                      activeClassName="active"
                      className="dropdown-item"
                    >
                      Organization
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <NavLink
                      to="/contact"
                      activeClassName="active"
                      className="dropdown-item"
                    >
                      Contact Details
                    </NavLink>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={handleJoinNow}>
                Join Now
              </div>
            </li>
            <li className="nav-item dropdown user-info">
              <Dropdown>
                <Dropdown.Toggle as="div" className="nav-link dropdown-toggle">
                  <PersonCircle size={25} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogoutClick}>
                    Logout
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Help?</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={3000}
              autohide
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                minWidth: "200px",
              }}
            >
              <Toast.Header>
                <strong className="mr-auto">Logout</strong>
              </Toast.Header>
              <Toast.Body>You have been logged out.</Toast.Body>
            </Toast>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
