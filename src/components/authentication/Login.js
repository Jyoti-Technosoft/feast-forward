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
  Toast,
  ToastBody,
  ToastContainer
} from "react-bootstrap";
import axios from "axios";

import { BASE_URL } from "../../app-endpoint";
import "../../assets/styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    // const storedCredentials = localStorage.getItem("users");
    // if (storedCredentials) {
    //   setFormData(JSON.parse(storedCredentials));
    // }
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user && user.token ? true : false;
    setIsToken(token);
    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setErrors({ ...errors, [name]: "" });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!validateEmail(email)) {
      setErrors({ email: "Please enter a valid email." });
    }
    if (!validatePassword(password)) {
      setErrors({ password: "Password must be at least 6 characters long." });
    }
    // const storedCredentials = JSON.parse(localStorage.getItem("users"));
    // if (storedCredentials) {
    //   const storedItems = JSON.parse(localStorage.getItem("users")) || [];
    //   const foundItem = storedItems.find((item) => item.email === email);
    //   if (foundItem) {
    //     const storedPassword = foundItem.password;
    //     if (password === storedPassword) {
    //       navigate("/home");
    //     } else {
    //       setErrors({
    //         ...errors,
    //         credentials: "Invalid credentials. Login failed.",
    //       });
    //     }
    //   } else {
    //     tempErrors.credentials = "Invalid email or password.";
    //   }
    //   setErrors(tempErrors);
    // } else {
    //   setErrors("There is no data.");
    // }
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        JSON.stringify(formData),
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        setMessage(response.data.message);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/home");
        setTimeout(() => {
          setFormData({ email: "", password: "" });
        }, 2000);
      } else {
        setErrors({ credentials: response.data.message });
      }
    } catch (error) {
      setErrors({ credentials: error.response.data.message });
      setFormData({ email: "", password: "" });
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
      {message !== "" && (
        <ToastContainer position="top-end" className="p-3">
          <Toast className="toaster-alert">
            <ToastBody>Login Successfully done!</ToastBody>
          </Toast>
        </ToastContainer>
      )}
    </Container>
  );
}

export default Login;
