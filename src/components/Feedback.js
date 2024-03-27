import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { BASE_URL } from "../app-endpoint";
import "../assets/styles/Feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    ratings: "",
    foodQuality: "",
    experience: "",
    suggestion: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("myImage", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(`${BASE_URL}/upload-images`, formData, config)
      .then((response) => {
        console.log("response:::", response);
      })
      .catch((error) => {
        console.log("error::", error);
      });
  };

  const handleStarClick = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          filename={file}
          onChange={onChange}
          type="file"
          name="myImage"
          accept="image/*"
        ></input>
        <button type="submit">Submit</button>
      </form>
      <div className="Feedback-form-container">
        <h2 className="text-center">Feedback</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="ratings" className="Feedback-group">
            <Form.Label>Ratings</Form.Label>
            <div className='FeedbackForm-star'>
              {renderStars(formData.ratings)}
            </div>
          </Form.Group>
          <Form.Group controlId="foodQuality" className="Feedback-group">
            <Form.Label>Food Quality</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type..."
              name="foodQuality"
              value={formData.foodQuality}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="experience" className="Feedback-group">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type..."
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="suggestion" className="Feedback-group">
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
    </div>
  );
};

export default Feedback;
