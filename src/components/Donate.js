import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/Donate.css";

const Donate = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNo: '',
    address: '',
    personContactNo: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const savedFormData = localStorage.getItem('donateformData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.contactNo) {
      errors.contactNo = "Contact number is required";
    } else if (!/^\d+$/.test(formData.contactNo)) {
      errors.contactNo = "Contact number must be numeric";
    }
    if (!formData.address.trim()) errors.address = "Pick up address is required";
    if (!formData.personContactNo) {
      errors.personContactNo = "Contact of person is required";
    } else if (!/^\d+$/.test(formData.personContactNo)) {
      errors.personContactNo = "Contact of person must be numeric";
    }
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
      localStorage.setItem('donateformData', JSON.stringify(formData));
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div style={{ height: '100%', backgroundColor: 'aliceblue' }}>
      <Header />
      <div className="donate-form" style={{ height: 'calc(100% - 178px)' }}>
      <div className='image-div'></div>
        <Container className="donate-container" >
          <Form onSubmit={handleSubmit} className="d-flex justify-content-center flex-column">
            <h2 style={{textAlign:'center'}}>Donate</h2>
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
            <Form.Group controlId="address">
              <Form.Label>Pick Up Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={!!formErrors.address}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="personContactNo">
              <Form.Label>Contact of Person</Form.Label>
              <Form.Control
                type="text"
                name="personContactNo"
                value={formData.personContactNo}
                onChange={handleChange}
                isInvalid={!!formErrors.personContactNo}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.personContactNo}
              </Form.Control.Feedback>
            </Form.Group>
            <Button className="donate-button" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Donate;
