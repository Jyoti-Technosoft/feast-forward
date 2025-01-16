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
  PersonFillGear,
} from "react-bootstrap-icons";
import { Container, Form, Button, FormControl } from "react-bootstrap";

import CustomToast from "../ReusableComponents/CustomToast";
import { RoleData } from "../ReusableComponents/UtilityFunctions";
import { upsertRegister } from "../../Services/AuthenticationServices";
import { errorMessage } from "../../Services/axiosinstance";
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
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!formData.contactNo) {
      newErrors.contactNo = "Contact number is required";
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.contactNo)) {
      newErrors.contactNo =
        "Invalid contact number. Must be 10 digits starting with 6-9";
      isValid = false;
    }

    if (!formData.city) {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
      isValid = false;
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // const response = await axios.post(
        //   `${BASE_URL}/register`,
        //   JSON.stringify(formData),
        //   { headers: { "Content-Type": "application/json" } }
        // );
        const response = await upsertRegister(JSON.stringify(formData));
        if (response?.status === 200) {
          setMessage({ type: "success", message: response.data.message });
          setTimeout(() => {
            resetFormValues();
            navigate("/login");
          }, 2000);
        } else if (response?.status === 201) {
          setMessage({ type: "warning", message: response.data.message });
          setTimeout(() => {
            resetFormValues();
          }, 2000);
        }
      } catch (error) {
        setMessage({ type: "warning", message: errorMessage });
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
      confirmPassword: "",
      role: "",
    });
  };

  return (
    <Container className="Registration-form">
      <Form onSubmit={handleSubmit} className="main-div transparent-box">
        <h1 className="login-div">Registration</h1>
        {/* FullName Field */}
        <Form.Group className="form-group" controlId="fullName">
          <Form.Label className="d-flex align-items-center">
            <PersonCircle color="white" size={18} />
            FullName
          </Form.Label>
          <FormControl
            type="text"
            placeholder="Full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            isInvalid={!!errors.fullName}
            // required
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
            // required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Role Field */}
        <Form.Group className="form-group" controlId="role">
          <Form.Label className="d-flex align-items-center">
            <PersonFillGear color="white" size={18} />
            Role
          </Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={formData?.role}
            onChange={handleInputChange}
            isInvalid={!!errors.role}
          >
            <option value="">Select a role</option>
            {RoleData?.map((role) => (
              <option key={role?.id} value={role?.value}>
                {role?.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors?.role}
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
            placeholder="Contact no"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleInputChange}
            isInvalid={!!errors.contactNo}
            // required
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
            // required
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
            // required
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
            // required
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
            placeholder="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            isInvalid={!!errors.confirmPassword}
            // required
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="w-100 mt-1">
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
      {message !== "" ? <CustomToast message={message} /> : null}
    </Container>
  );
};

export default Registration;
