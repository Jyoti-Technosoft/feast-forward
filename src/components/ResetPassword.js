import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash, LockFill } from "react-bootstrap-icons";
import { Form, Button, Container, InputGroup, FormControl } from "react-bootstrap";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/ResetPassword.css";

const ResetPassword = () => {
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (oldPassword === "") {
      tempErrors.oldPassword = "Old Password is required.";
    }

    if (!validatePassword(newPassword)) {
      tempErrors.newPassword = "Password must be at least 6 characters long.";
    }

    if (newPassword !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(tempErrors).length === 0) {
      navigate("/login");
    } else {
      setErrors(tempErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      <Header />
      <Container className="reset-password-container">
        <Form className="transparent-box-1" onSubmit={handleSubmit}>
          <h1 className="reset-div">Reset Password</h1>
          <Form.Group controlId="formBasicOldPassword" className="mb-3 password-div">
            <Form.Label className="d-flex align-items-center">
              <LockFill className="icon-div" size={18} />
              Old Password
            </Form.Label>
            <FormControl
              type="password"
              placeholder="Old Password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              isInvalid={!!errors.oldPassword}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.oldPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mb-3 password-div">
            <Form.Label className="d-flex align-items-center">
              <LockFill className="icon-div" size={18} />
              New Password
            </Form.Label>
            <InputGroup className="password-container">
              <FormControl
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                isInvalid={!!errors.newPassword}
                required
              />
              <InputGroup.Text className="viewer" onClick={togglePasswordVisibility}>
                {showPassword ? <EyeSlash /> : <Eye />}
              </InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {errors.newPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword" className="mb-3 password-div">
            <Form.Label className="d-flex align-items-center">
              <LockFill className="icon-div" size={18} />
              Confirm Password
            </Form.Label>
            <InputGroup className="password-container">
              <FormControl
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
                required
              />
              <InputGroup.Text className="viewer" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <EyeSlash /> : <Eye />}
              </InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="reset-button">
            Reset Password
          </Button>
          <div className="mt-3">
            Remembered your password?{" "}
            <Link to="/login" className="link-div">
              Log in
            </Link>
          </div>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}

export default ResetPassword;
