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
import {
  Container,
  Form,
  Button,
  FormControl,
  Toast,
  ToastBody,
  ToastContainer
} from "react-bootstrap";
import axios from "axios";

import { BASE_URL } from "../../app-endpoint";
import "../../assets/styles/Register.css";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Email validation
    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }
    // Contact number validation
    if (formData.contactNo && !/^[6-9]\d{9}$/.test(formData.contactNo)) {
      newErrors.contactNo = "Invalid contact number. Must be 10 digits starting with 6-9";
      isValid = false;
    }
    // Passwords match validation
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // const isEmailRegistered = existingUsers.some(
      //   (user) => user.email === formData.email
      // );
      // if (isEmailRegistered) {
      //   setErrors({
      //     ...errors,
      //     email: "Email is already registered. Please use a different email.",
      //   });
      //   return;
      // }

      // const newUser = {
      //   fullName: formData.fullName,
      //   email: formData.email,
      //   contactNo: formData.contactNo,
      //   city: formData.city,
      //   address: formData.address,
      //   password: formData.password,
      // };
      // existingUsers.push(newUser);
      // localStorage.setItem("users", JSON.stringify(existingUsers));
      // navigate("/");

      try {
        const response = await axios.post(
          `${BASE_URL}/register`,
          JSON.stringify(formData),
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200) {
          setMessage(response.data.message);
          navigate("/");
          setTimeout(() => {
            resetFormValues();
          }, 2000);
        }
      } catch (error) {
        setMessage("Not able to register due to some error.");
        resetFormValues();
      }
    }
  };

  const resetFormValues = () => {
    setFormData({
      fullName: "",
      email: "",
      contactNo: "",
      city: "",
      address: "",
      password: "",
    });
  };

  return (
    <Container className="Registration-form">
      <div className="transparent-box">
        <Form onSubmit={handleSubmit} className="main-div">
          {/* FullName Field */}
          <Form.Group className="form-group" controlId="fullName">
            <Form.Label className="d-flex align-items-center">
              <PersonCircle color="white" size={18} />
              FullName
            </Form.Label>
            <FormControl
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              isInvalid={!!errors.fullName}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Email Field */}
          <Form.Group className="form-group" controlId="email">
            <Form.Label className="d-flex align-items-center">
              <EnvelopeFill color="white" size={18} />
              Email
            </Form.Label>
            <FormControl
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Contact Number Field */}
          <Form.Group className="form-group" controlId="contactNo">
            <Form.Label className="d-flex align-items-center">
              <TelephoneFill color="white" size={18} />
              Contact No
            </Form.Label>
            <FormControl
              type="text"
              placeholder="Contact No"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleInputChange}
              isInvalid={!!errors.contactNo}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.contactNo}
            </Form.Control.Feedback>
          </Form.Group>
          {/* City Field */}
          <Form.Group className="form-group" controlId="city">
            <Form.Label className="d-flex align-items-center">
              <PinMapFill color="white" size={18} />
              City
            </Form.Label>
            <FormControl
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              isInvalid={!!errors.city}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Address Field */}
          <Form.Group className="form-group" controlId="address">
            <Form.Label className="d-flex align-items-center">
              <GeoAltFill color="white" size={18} />
              Address
            </Form.Label>
            <FormControl
              type="text"
              placeholder=" Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              isInvalid={!!errors.address}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Password Field */}
          <Form.Group className="form-group" controlId="password">
            <Form.Label className="d-flex align-items-center">
              <Lock color="white" size={18} />
              Password
            </Form.Label>
            <FormControl
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              isInvalid={!!errors.password}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Confirm Password Field */}
          <Form.Group className="form-group" controlId="confirmPassword">
            <Form.Label className="d-flex align-items-center">
              <FileEarmarkLock2 color="white" size={18} />
              Confirm Password
            </Form.Label>
            <FormControl
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              isInvalid={!!errors.confirmPassword}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="w-100 mt-3">
            <Button variant="primary" className="register-button" type="submit">
              Register
            </Button>
          </div>
          <div className="mt-3">
            Already have an Account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </div>
        </Form>
      </div>
      {message !== "" ? (
        <ToastContainer position="top-end" className="p-3">
          <Toast className="toaster-alert">
            <ToastBody>Registered Successfully!</ToastBody>
          </Toast>
        </ToastContainer>
      ) : null}
    </Container>
  );
};

export default Registration;
