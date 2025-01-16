import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Dropdown, Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { IoPersonCircleOutline } from "react-icons/io5";
import { HashLink } from "react-router-hash-link";
import { RiKey2Fill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { MdLiveHelp } from "react-icons/md";
import { HiUserPlus } from "react-icons/hi2";
import { MdVolunteerActivism } from "react-icons/md";
import { MdPermContactCalendar } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { RiOrganizationChart } from "react-icons/ri";
import { IoMdLogIn } from "react-icons/io";

import Logout from "./Logout";
import Profile from "./Profile";
import ResetPassword from "./ResetPassword";
import { GetInitialsName } from "./ReusableComponents/UtilityFunctions";
import foodDonationLogo from "../assets/images/Project logo.png";
import "../assets/styles/Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogLogout, setShowDialogLogout] = useState(false);
  const [showDialogPassword, setShowDialogPassword] = useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = user && user?.token ? true : false;

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    user && setUserName(user.fullName);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const handleResetPassword = () => {
    setShowDialogPassword(true);
  };

  const handleUsers = () => {
    navigate("/join-now-users");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleVolunteers = () => {
    navigate("/volunteers");
  };

  const startsWithPath = (path) => location.pathname.startsWith(path);
  const tooltip = <Tooltip id="tooltip">{userName}</Tooltip>;
  const adminMenu = user?.role === "admin";
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
                to="/"
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
                      <RiOrganizationChart size={18} />
                      Organization
                    </HashLink>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <HashLink
                      to="/about-us#contact-us-link"
                      className={`dropdown-item ${location.hash === "#contact-us-link" ? "active" : ""
                        }`}
                    >
                      <MdPermContactCalendar size={18} />
                      Contact Us
                    </HashLink>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            {isLoggedIn ? <li className="nav-item">
              <NavLink
                to="/donate"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Donate
              </NavLink>
            </li> : null}
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
            {isLoggedIn ? <li className="nav-item">
              <NavLink
                to="/feedback"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Feedback
              </NavLink>
            </li> : null}
            {isLoggedIn ? <li className="nav-item dropdown user-dropdown">
              <Dropdown className="user-dropdown">
                <Dropdown.Toggle
                  as="div"
                  className="d-flex align-items-center nav-link dropdown-toggle"
                >
                  {/* <IoPersonCircleOutline size={25} />
                  <span className="text-capitalize">&nbsp;{userName}</span> */}
                  <OverlayTrigger placement="bottom" overlay={tooltip}>
                    <GetInitialsName className="username" name={userName} />
                  </OverlayTrigger>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => setShowDialog(true)}
                    className="user-info user-dropdown-item"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {isHovered ? (
                      <FaUserEdit size={28} style={{
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 6s ease',
                      }} />
                    ) : (
                      <IoPersonCircleOutline size={36} />
                    )}
                    <p className="user-details">
                      <span className="text-capitalize">{userName}</span>
                      <span style={{ color: "#cbcbcb", fontSize: "13px" }}>
                        {user?.email}
                      </span>
                    </p>
                  </Dropdown.Item>
                  {/* <Dropdown.Divider/> */}
                  <hr />
                  {adminMenu ? <Dropdown.Item
                    className="user-dropdown-item"
                    onClick={handleUsers}
                  >
                    <HiUserPlus size={18} />
                    Join-Now Users
                  </Dropdown.Item> : null}
                  <Dropdown.Item
                    className="user-dropdown-item"
                    onClick={handleVolunteers}
                  >
                    <MdVolunteerActivism size={18} />
                    {/* Volunteer */}
                    Contributor
                    {/* Donor */}
                  </Dropdown.Item>
                  {adminMenu ? <hr /> : null}
                  <Dropdown.Item
                    className="user-dropdown-item"
                    onClick={handleResetPassword}
                  >
                    <RiKey2Fill size={18} />
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item className="user-dropdown-item">
                    <MdLiveHelp size={18} />
                    FAQ
                  </Dropdown.Item>
                  <hr />
                  {/* <Dropdown.Divider /> */}
                  <Dropdown.Item
                    className="user-dropdown-item"
                    onClick={() => setShowDialogLogout(true)}
                  >
                    <MdLogout size={18} />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li> :
              <li>
                <Button
                  className="header-login-button"
                  variant="primary"
                  type="button"
                  onClick={() => handleLogin()}
                >
                  Log In
                  <IoMdLogIn size={20} />
                </Button>
              </li>
            }
          </ul>
        </div>
      </nav>
      <Profile show={showDialog} setShowDialog={setShowDialog} />
      <Logout show={showDialogLogout} setShowDialog={setShowDialogLogout} />
      <ResetPassword
        show={showDialogPassword}
        setShowDialog={setShowDialogPassword}
      />
    </div>
  );
}

export default Header;
