import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash, LockFill } from "react-bootstrap-icons";
import { Form, Button, Container, InputGroup, FormControl, Alert } from "react-bootstrap";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/ResetPassword.css";

function ResetPassword() {
  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};
    const { newPassword, confirmPassword } = formData;

    if (!validatePassword(newPassword)) {
      tempErrors.newPassword = "Password must be at least 6 characters long.";
    }

    if (newPassword !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(tempErrors).length === 0) {
      localStorage.setItem("password", newPassword);
      navigate("/login");
    } else {
      setErrors(tempErrors);
    }
  };

  return (
    <div>
      <Header />
      <Container className="reset-password-container">
        <Form className="transparent-box-1" onSubmit={handleSubmit}>
          <h1 className="reset-div">Reset Password</h1>
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
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
                required
              />
              <InputGroup.Text className="viewer" onClick={togglePasswordVisibility}>
                {showPassword ? <EyeSlash /> : <Eye />}
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
