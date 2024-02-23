import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/JoinNow.css";

const JoinNowPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNo: '',
    reason: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const savedFormData = localStorage.getItem('joinFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

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
    } else if (!/^\d+$/.test(formData.contactNo)) {
      errors.contactNo = "Contact number must be numeric";
    }
    if (!formData.reason.trim()) errors.reason = "This field is required to understand your motivation";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      localStorage.setItem('joinFormData', JSON.stringify(formData));
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div style={{ height:'100%', backgroundColor:'aliceblue'}}>
      <Header/>
      <div className="join-now-form" style={{height:'calc(100% - 178px)', display: 'flex', alignItems: 'center'}}>
      <div className='join-div'></div>
        <Container className="join-now-container">
          <Form onSubmit={handleSubmit} className="d-flex justify-content-center flex-column">
            <h2>Join Now</h2>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                isInvalid={!!formErrors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!formErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="contactNo">
              <Form.Label>Contact No.</Form.Label>
              <Form.Control
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                isInvalid={!!formErrors.contactNo}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.contactNo}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="reason">
              <Form.Label>Why do you want to join us?</Form.Label>
              <Form.Control
                as="textarea"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={3}
                isInvalid={!!formErrors.reason}
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
      <Footer/>
    </div>
  );
};

export default JoinNowPage;
