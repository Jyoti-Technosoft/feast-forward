import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import Header from "../components/Header";
import "../assets/styles/JoinNow.css";

const JoinNowPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNo: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <Header/>
      <Container className="join-now-container">
      <Form onSubmit={handleSubmit}>
        <h2>Join Now</h2>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="contactNo">
          <Form.Label>Contact No.</Form.Label>
          <Form.Control
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="reason">
          <Form.Label>Why do you want to join us?</Form.Label>
          <Form.Control
            as="textarea"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={3}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
    </div>
  );
};

export default JoinNowPage;
