import React from "react";
import { useNavigate} from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import {PersonCircle } from "react-bootstrap-icons";

import "../assets/styles/Dashboard.css";
import foodDonationLogo from "../assets/images/Project logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
    const navigate = useNavigate();
  
    const handleHome = () => {
      navigate("/Home");
    };
  
    const handleJoinNow = () => {
      navigate("/join-now");
    };
  
    const handleLogout = () => {
      navigate("/");
    };
  
    return (
      <div className="Header-container" style={{height:'90px'}}>
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{backgroundColor:'#333', width:'100%', position:'absolute', height:'90px' }}
        >
          <img
            src={foodDonationLogo}
            alt="Food Donation Logo"
            style={{width:'80px', height:'85px'}}
          />
          <div className="navbar-brand" style={{marginRight:'930px'}}></div>
  
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" style={{marginLeft:'205px', justifyContent:'flex-end'}}>
              <li className="nav-item" style={{cursor: 'pointer'}}>
                <div className="nav-link" onClick={handleHome} >
                  <NavLink
                    to="/home"
                    className="nav-link"
                    activeClassName="active"
                    style={{cursor:'pointer', margin:'20px'}}>
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
                  style={{cursor: 'pointer', margin: '28px' }}
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
              <li className="nav-item" style={{cursor: 'pointer', margin:'20px', marginTop: '9px'}}>
                <div className="nav-link" onClick={handleJoinNow}>
                  Join Now
                </div>
              </li>
              <li className="nav-item dropdown user-info">
                <Dropdown>
                  <Dropdown.Toggle
                    as="div"
                    className="nav-link dropdown-toggle"
                    style={{cursor:'pointer', margin:'20px'}}>
                    <PersonCircle size={25} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item>Help?</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }

  export default Header;