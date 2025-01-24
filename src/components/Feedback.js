import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";

import CustomToast from "./ReusableComponents/CustomToast";
import { HiOutlineDownload } from "react-icons/hi";
import {
  upsertFeedback,
} from "../Services/CommonServices";
import { errorMessage } from "../Services/axiosinstance";
import "../assets/styles/Feedback.css";

const Feedback = () => {
  const fileInputRef = useRef(null);
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
  const [formErrors, setFormErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCancel = () => {
    setFormData({
      ratings: "",
      foodQuality: "",
      experience: "",
      suggestions: "",
      userName: "",
    });
    setFile(null);
    setFormErrors({});
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setIsDragging(false);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData?.foodQuality?.trim()) {
      errors.foodQuality = "FoodQuality is required";
    }
    if (!formData?.experience?.trim()) {
      errors.experience = "Experience  is required";
    }
    if (formData?.ratings === "") {
      errors.ratings = "Ratings  is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const formdata = new FormData();
        formdata.append("userName", userName);
        formdata.append("ratings", formData?.ratings);
        formdata.append("foodQuality", formData?.foodQuality);
        formdata.append("experience", formData?.experience);
        formdata.append("suggestions", formData?.suggestions);
        if (file) formdata.append("myImage", file);
        const response = await upsertFeedback(formdata);
        if (response && response.status === 200) {
          setMessage({
            type: "success",
            message: response.data?.message || "Your feedback sent Successfully!",
          });
          resetFormValues();
        }
      } catch (error) {
        setMessage({
          type: "warning",
          message: errorMessage ?? "Not able to send feedback due to some error.",
        });
        resetFormValues();
      }
    } else {
      setFormErrors(errors);
    }
  };

  const resetFormValues = () => {
    setFormData({
      ratings: "",
      foodQuality: "",
      experience: "",
      suggestions: "",
    });
    setFile(null);
    setFormErrors({});
  };

  const handleStarClick = (ratingValue) => {
    setFormData({
      ...formData,
      ratings: formData?.ratings === ratingValue ? 0 : ratingValue,
    });
    if (formErrors.ratings) {
      setFormErrors({ ...formErrors, ratings: "" });
    }
  };

  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= numStars;
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? 'filled' : ''}`}
          onClick={() => handleStarClick(i)}
          role="button"
        >
          {isFilled ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    user && setUserName(user.fullName);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="main-feedback">
      <div className="Feedback-form-container">
        <h2 className="text-center feedback-title">Feedback</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="ratings" className="Feedback-group">
            {/* <Form.Label>Ratings</Form.Label> */}
            <div className="FeedbackForm-star">{renderStars(formData.ratings)}</div>
          </Form.Group>
          <span className="invalid-ratings">{formErrors.ratings}</span>
          <Form.Group controlId="foodQuality" className="Feedback-group">
            <Form.Label>Food Quality</Form.Label>
            <Form.Control
              type="text"
              placeholder="Food quality"
              name="foodQuality"
              value={formData.foodQuality}
              onChange={handleChange}
              isInvalid={!!formErrors.foodQuality}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.foodQuality}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="experience" className="Feedback-group">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              type="text"
              placeholder="Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              isInvalid={!!formErrors.experience}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.experience}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="suggestions" className="Feedback-group">
            <Form.Label>Suggestion For Improvement</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Suggestion for improvement"
              rows={3}
              name="suggestions"
              value={formData.suggestions}
              onChange={handleChange}
              isInvalid={!!formErrors.suggestions}
            />
          </Form.Group>
          <Form.Group controlId="fileUpload" className="Feedback-group">
            <Form.Label>Upload Supporting File</Form.Label>
            <div style={{ backgroundColor: isDragging ? 'white' : 'var(--secondary-color)' }} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleDivClick} className="upload-box">
              <HiOutlineDownload className="upload-icon" />
              {file ? file?.name : 'Upload File'}
            </div>
            <input
              type="file"
              filename={file}
              accept=".zip,.png,.jpg,.jpeg,.pdf"
              onChange={onChange}
              name="myImage"
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </Form.Group>
          <div className="button-row-donate">
            <Button
              className="small-button"
              variant="secondary"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button className="small-button" variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
      {message !== "" ? <CustomToast message={message} /> : null}
    </div>
  );
};

export default Feedback;
