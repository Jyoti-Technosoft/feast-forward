import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EnvelopeFill,
  PinMapFill,
  GeoAltFill,
  Lock,
  PersonCircle,
  FileEarmarkLock2,
  TelephoneFill,
} from "react-bootstrap-icons";

import "../assets/styles/Register.css";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    number: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    usernameError: null,
    emailError: null,
    numberError: null,
    cityError: null,
    addressError: null,
    passwordError: null,
    confirmPasswordError: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateUsername = () => {
    if (formData.username === "") {
      setErrors({ usernameError: "Username is required" });
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({ emailError: "Invalid email address" });
      return false;
    }
    return true;
  };

  const validateNumber = () => {
    if (isNaN(formData.number) || formData.number <= 0) {
      setErrors({ numberError: "Please enter a valid positive number" });
      return false;
    }
    return true;
  };

  const validateCity = () => {
    if (formData.city.trim() === "") {
      setErrors({ cityError: "City is required" });
      return false;
    }
    return true;
  };

  const validateAddress = () => {
    if (formData.address.trim() === "") {
      setErrors({ addressError: "Address is required" });
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (formData.password.trim() === "") {
      setErrors({ passwordError: "Password is required" });
      return false;
    }
    return true;
  };

  const validateConfirmPassword = () => {
    if (formData.confirmPassword !== formData.password) {
      setErrors({ confirmPasswordError: "Passwords do not match" });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    console.log(validateUsername());
    e.preventDefault();
    if (
      validateUsername() &&
      validateEmail() &&
      validateNumber() &&
      validateCity() &&
      validateAddress() &&
      validatePassword() &&
      validateConfirmPassword()
    ) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      const isEmailRegistered = existingUsers.some(
        (user) => user.email === formData.email
      );

      if (isEmailRegistered) {
        console.log("Email is already registered. Registration failed.");
        return;
      }

      const newUser = {
        username: formData.username,
        email: formData.email,
        number: formData.number,
        city: formData.city,
        address: formData.address,
        password: formData.password,
      };

      existingUsers.push(newUser);

      localStorage.setItem("users", JSON.stringify(existingUsers));

      navigate("/dashboard");
    }
  };

  return (
    <div className="Registration-form">
      <div className="transparent-box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <PersonCircle color="white" size={18} />
            <label>
              <h6 style={{ color: "white", marginLeft: "3px" }}>Username*</h6>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Please Enter Your Username..."
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            {errors.usernameError && (
              <p className="error">{errors.usernameError}</p>
            )}
          </div>
          <div className="form-group">
            <EnvelopeFill color="white" size={18} />
            <label>
              <h6 style={{ color: "white", marginLeft: "3px" }}>Email*</h6>
            </label>
            <input
              type="email"
              name="email"
              placeholder="yourname@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.emailError && <p className="error">{errors.emailError}</p>}
          </div>
          <div className="form-group">
            <TelephoneFill color="white" size={18} />
            <label>
              <h6 style={{ color: "white", marginLeft: "3px" }}>Contact No*</h6>
            </label>
            <input
              type="number"
              name="number"
              placeholder="Please Enter Your Contact No..."
              value={formData.number}
              onChange={handleInputChange}
              required
            />
            {errors.numberError && (
              <p className="error">{errors.numberError}</p>
            )}
          </div>
          
          <div className="form-group">
            <PinMapFill color="white" size={18} />
            <label>
              <h6 style={{ color: "white", marginLeft: "3px" }}>City*</h6>
            </label>
            <input
              type="text"
              name="city"
              placeholder="Please Enter Your City..."
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            {errors.cityError && <p className="error">{errors.cityError}</p>}
          </div>
          <div className="form-group">
            <GeoAltFill color="white" size={18} />
            <label>
              <h6 style={{ color: "white", marginLeft: "3px" }}>Address*</h6>
            </label>
            <input
              className="m-0"
              type="text"
              name="address"
              placeholder="Please Enter Your Location..."
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            {errors.addressError && (
              <p className="error">{errors.addressError}</p>
            )}
          </div>
          <div className="form-group">
            <Lock color="white" size={18} />
            <label>
              <h6 style={{ color: 'white', marginLeft: '3px' }}>Password*</h6>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Please Enter Your Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {errors.passwordError && (
              <p className="error">{errors.passwordError}</p>
            )}
          </div>
          <div className="form-group">
            <FileEarmarkLock2 color="white" size={18} />
            <label>
              <h6 style={{ color: "white", marginLeft: "3px" }}>
                Confirm Password*
              </h6>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {errors.confirmPasswordError && (
              <p className="error">{errors.confirmPasswordError}</p>
            )}
            <p style={{ color: "white", marginTop: "20px", marginLeft:'42px'}}>
              Already have an account?{' '}
              <Link to="/" className="link" style={{color: 'rgb(5 103 245)' }}>
                  Login
              </Link>
            </p>
          </div>
          <div>
            <button className="register-button" type="submit" onClick={handleSubmit}>
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
