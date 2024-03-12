import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/JoinNow.css";

const JoinNowPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    reason: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.contactNo) {
      errors.contactNo = "Contact number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.contactNo)) {
      errors.contactNo =
        "Invalid contact number. Must be 10 digits starting with 6-9";
    }
    if (!formData.reason.trim())
      errors.reason = "This field is required to understand your motivation";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      let joinFormData = localStorage.getItem("joinFormData");
      joinFormData = joinFormData ? JSON.parse(joinFormData) : [];
      joinFormData.push(formData);
      const updatedFormData = JSON.stringify(joinFormData);
      localStorage.setItem("joinFormData", updatedFormData);
      setFormData({ fullName: "", email: "", contactNo: "", reason: "" });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="join-now-header">
        <div className="join-div">
      <Header />
      <div className="join-now align-item-center">
        <Container className="join-now-container">
          <Form
            onSubmit={handleSubmit}
            className="d-flex justify-content-center flex-column"
            >
            <h2>Join Now</h2>
            <Form.Group className="joinNow-label" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Enter FullName"
                value={formData.fullName}
                onChange={handleChange}
                isInvalid={!!formErrors.fullName}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="joinNow-label" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!formErrors.email}
                required
                />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="joinNow-label" controlId="contactNo">
              <Form.Label>Contact No.</Form.Label>
              <Form.Control
                type="text"
                name="contactNo"
                placeholder="Enter Contact No."
                value={formData.contactNo}
                onChange={handleChange}
                isInvalid={!!formErrors.contactNo}
                required
                />
              <Form.Control.Feedback type="invalid">
                {formErrors.contactNo}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="joinNow-label" controlId="reason">
              <Form.Label>Why do you want to join us?</Form.Label>
              <Form.Control
                as="textarea"
                name="reason"
                placeholder="Write a Reason..."
                value={formData.reason}
                onChange={handleChange}
                rows={3}
                isInvalid={!!formErrors.reason}
                required
                />
              <Form.Control.Feedback type="invalid">
                {formErrors.reason}
              </Form.Control.Feedback>
            </Form.Group>
            <Button className="join-button" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
      <Footer />
    </div>
    </div>
  );
};

export default JoinNowPage;
