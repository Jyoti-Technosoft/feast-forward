import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import Header from "../components/Header";
import '../assets/styles/Feedback.css';
import Footer from "./Footer";

const Feedback = () => {
  const [formData, setFormData] = useState({
    rating: '',
    foodQuality: '',
    experience: '',
    suggestion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStarClick = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= numStars) {
        stars.push(
          <span
            key={i}
            className="star"
            onClick={() => handleStarClick(i)}
            role="button"
          >
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span
            key={i}
            className="star"
            onClick={() => handleStarClick(i)}
            role="button"
          >
            &#9734;
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className='feedback-div'>
      <Header />
      <div className="Feedback-form-container align-item-center">
        <h2 className="text-center">Feedback</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicRating" className="Feedback-group">
            <Form.Label>Rating</Form.Label>
            <div className='FeedbackForm-star'>
              {renderStars(formData.rating)}
            </div>
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
          <Button className="Feedback-button" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default Feedback;
