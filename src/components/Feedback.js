import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../assets/styles/Feedback.css';
import Header from "../components/Header";
import Footer from "./Footer";

const Feedback = () => {
  const [formData, setFormData] = useState({
    satisfaction: '',
    foodQuality: '',
    experience: '',
    suggestion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className='feedback-header'>
    <Header />
    <div className="feedback align-item-center"></div>
      <div className="feedback-form-container">
      <h2 className=" text-center">Feedback</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicServiceSatisfaction" className="Feedback-group">
          <Form.Label>Service Satisfaction</Form.Label>
          <Form.Control
            as="select"
            name="satisfaction"
            value={formData.satisfaction}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="satisfied">Satisfied</option>
            <option value="dissatisfied">Dissatisfied</option>
            <option value="neutral">Neutral</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicFoodQuality" className="Feedback-group">
          <Form.Label>Food Quality</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type..."
            name="foodQuality"
            value={formData.foodQuality}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicExperience" className="Feedback-group">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type..."
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicSuggestion" className="Feedback-group">
          <Form.Label>Suggestion for Improvement</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="suggestion"
            value={formData.suggestion}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" className="Contact-submit" type="submit">
          Submit
        </Button>
      </Form>
    </div>
    <Footer />
    </div>
  );
};

export default Feedback;
