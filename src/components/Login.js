import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EnvelopeFill, LockFill, Eye, EyeSlash } from "react-bootstrap-icons";
import {
  Form,
  Button,
  Container,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import "../assets/styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedCredentials = localStorage.getItem("users");
    if (storedCredentials) {
      setFormData(JSON.parse(storedCredentials));
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length>= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};
    const { email, password } = formData;
    if (!validateEmail(email)) {
      tempErrors.email = "Please enter a valid email.";
    }
    if (!validatePassword(password)) {
      tempErrors.password = "Password must be at least 6 characters long.";
    }

    const storedCredentials = JSON.parse(localStorage.getItem("users"));
    if (storedCredentials) {
      const storedItems = JSON.parse(localStorage.getItem("users")) || [];
      const foundItem = storedItems.find((item) => item.email === email);

      if (foundItem) {
        const storedPassword = foundItem.password;
        if (password === storedPassword) {
          navigate("/home");
        } else {
          setErrors({
            ...errors,
            credentials: "Invalid credentials. Login failed.",
          });
        }
      } else {
        tempErrors.credentials = "Invalid email or password.";
      }

      setErrors(tempErrors);
    } else {
      setErrors("There is no data.");
    }
  };

  return (
    <Container className="login-container">
      <Form className="transparent-box-1" onSubmit={handleSubmit}>
        <h1 className="login-div">Login Account</h1>
        {/* Email Field */}
        <Form.Group controlId="formBasicEmail" className="email-div">
          <Form.Label className="d-flex align-items-center">
            <EnvelopeFill className="icon-div" size={18} />
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Password Field */}
        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <LockFill className="icon-div" size={18} />
            Password
          </Form.Label>
          <InputGroup>
            <FormControl
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              required
            />
            <InputGroup.Text
              className="viewer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </InputGroup.Text>
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" className="login-button">
          Login
        </Button>
        <div className="mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="link-div">
            Sign Up
          </Link>
        </div>
        {errors.credentials && (
          <Alert variant="danger" className="alert-div">
            {errors.credentials}
          </Alert>
        )}
      </Form>
    </Container>
  );
}

export default Login;
