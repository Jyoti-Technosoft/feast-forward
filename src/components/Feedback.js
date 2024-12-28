import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import CustomToast from "./ReusableComponents/CustomToast";
import {
  upsertFeedback,
  upsertFeedbackUpload,
} from "../Services/CommonServices";
import { errorMessage } from "../Services/axiosinstance";
import "../assets/styles/Feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    ratings: "",
    foodQuality: "",
    experience: "",
    suggestions: "",
    userName: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ type: "", message: "" });
  const [userName, setUserName] = useState("");

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    user && setUserName(user.fullName);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("myImage", file);
      // axios
      //   .post(`${BASE_URL}/upload-images`, formData, config)
      //   .then((response) => {})
      //   .catch((error) => {});
      const response = await upsertFeedbackUpload(formData);
      if (response?.status === 200) {
        setMessage({ type: "success", message: "Upload Image Successfully." });
      }
    } catch (error) {
      setMessage({ type: "warning", message: errorMessage });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.userName = userName;
      // const response = await axios.post(
      //   `${BASE_URL}/feedback`,
      //   JSON.stringify(formData),
      //   { headers: { "Content-Type": "application/json" } }
      // );
      const response = await upsertFeedback(JSON.stringify(formData));
      if (response?.status === 200) {
        setMessage({
          type: "success",
          message: response.data.message ?? "Your feedback sent Successfully!",
        });
      }
    } catch (error) {
      setMessage({
        type: "warning",
        message: errorMessage ?? "Not able to send feedback due to some error.",
      });
      resetFormValues();
    }
  };

  const resetFormValues = () => {
    setFormData({
      ratings: "",
      foodQuality: "",
      experience: "",
      suggestions: "",
    });
  };

  const handleStarClick = (ratingValue) => {
    setFormData({ ...formData, ratings: ratingValue });
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
      <form onSubmit={handleUploadImage}>
        <input
          filename={file}
          onChange={onChange}
          type="file"
          name="myImage"
          accept="image/*"
        ></input>
        <button type="submit">Submit</button>
      </form>
      {/* <div className="Feedback-form-container">
        <h2 className="text-center">Feedback</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="ratings" className="Feedback-group">
            <Form.Label>Ratings</Form.Label>
            <div className="FeedbackForm-star">
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
          <Form.Group controlId="suggestions" className="Feedback-group">
            <Form.Label>Suggestion for Improvement</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="suggestions"
              value={formData.suggestions}
              onChange={handleChange}
            />
          </Form.Group>
          <Button className="Feedback-button" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div> */}
          <div className="Feedback-form-container">
      <h2 className="text-center">Feedback</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="ratings" className="Feedback-group">
          <Form.Label>Ratings</Form.Label>
          <div className="FeedbackForm-star">{renderStars(formData.ratings)}</div>
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
        <Form.Group controlId="suggestions" className="Feedback-group">
          <Form.Label>Suggestion for Improvement</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="suggestions"
            value={formData.suggestions}
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="Feedback-button" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
      {message !== "" ? <CustomToast message={message} /> : null}
    </div>
  );
};

export default Feedback;
