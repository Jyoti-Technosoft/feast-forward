import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EnvelopeFill, LockFill, Eye, EyeSlash } from "react-bootstrap-icons";
import {
  Form,
  Button,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import CustomToast from "../ReusableComponents/CustomToast";
import { upsertLogin } from "../../Services/AuthenticationServices";
import { errorMessage } from "../../Services/axiosinstance";
import "../../assets/styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", message: "" });

  const checkUserLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      navigate("/home");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validatePassword = (password) => {
    return password?.length >= 6;
  };

  const resetForm = () => {
    setFormData({ email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    let validationErrors = {};
    if (!email || email.trim() === "") {
      validationErrors.email = "Please enter email.";
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      validationErrors.email = "Please enter a valid email.";
    }
    if (!password || password.trim() === "") {
      validationErrors.password = "Please enter Password.";
    } else if (!validatePassword(password)) {
      validationErrors.password =
        "Password must be at least 6 characters long.";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await upsertLogin(JSON.stringify(formData));
      if (response.status === 200) {
        setMessage({ type: "success", message: response.data.message });
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        navigate("/home");
        setErrors({});
        resetForm();
      } else if (response.status === 201) {
        setMessage({ type: "warning", message: response.data.message });
      }
    } catch (error) {
      setMessage({ type: "warning", message: errorMessage });
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <Container className="login-container">
      <Form className="transparent-box-1" onSubmit={handleSubmit}>
        <h1 className="login-div">Login Account</h1>
        {/* Email Field */}
        <Form.Group
          controlId="formBasicEmail"
          style={{ marginBottom: errors?.email ? "2px" : "15px" }}
          className="email-div"
        >
          <Form.Label className="d-flex align-items-center">
            <EnvelopeFill className="icon-div" size={18} />
            Email
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid" style={{ marginBottom: "5px" }}>
            {errors?.email}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Password Field */}
        <Form.Group
          style={{ marginBottom: errors?.email ? "2px" : "15px" }}
          controlId="formBasicPassword"
          className="mb-3"
        >
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
            />
            <InputGroup.Text
              className="viewer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </InputGroup.Text>
          </InputGroup>
          <Form.Control.Feedback type="invalid" style={{ marginBottom: "5px" }}>
            {errors?.password}
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
      </Form>
      {message ? <CustomToast message={message} /> : null}
    </Container>
  );
}

export default Login;
