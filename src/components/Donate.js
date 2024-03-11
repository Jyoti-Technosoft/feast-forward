import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/Donate.css";

const Donate = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    address: "",
    mealQuantity: "",
    foodType: "",
    donationDate: "",
    donorType: "",
    organizationName: "",
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
        "Invalid Indian contact number. Must be 10 digits starting with 6-9";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({...formErrors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      let donateformData = localStorage.getItem("donateformData");
      donateformData = donateformData ? JSON.parse(donateformData) : [];
      donateformData.push(formData);
      const updatedFormData = JSON.stringify(donateformData);
      localStorage.setItem("donateformData", updatedFormData);
      setFormData({
        fullName: "",
        email: "",
        contactNo: "",
        address: "",
        mealQuantity: "",
        foodType: "",
        donationDate: "",
        donorType: "",
        organizationName: "",
      });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="donate-header">
      <Header />
      <div className="donate-form">
        <div className="image-div"></div>
        <Container className="donate-container">
          <Form
            onSubmit={handleSubmit}
            className="d-flex justify-content-center flex-column"
          >
            <h2>Donate</h2>
            <Form.Group className="donate-form-label" controlId="fullName">
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
            <Form.Group className="donate-form-label" controlId="email">
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
            <Form.Group className="donate-form-label" controlId="contactNo">
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
            <Form.Group className="donate-form-label" controlId="address">
              <Form.Label>Pick Up Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={!!formErrors.address}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="donate-form-label" controlId="mealQuantity">
              <Form.Label>Meal Quantity</Form.Label>
              <Form.Select
                name="mealQuantity"
                placeholder="Select Meal Quantity"
                value={formData.mealQuantity}
                onChange={handleChange}
                isInvalid={!!formErrors.mealQuantity}
                required
              >
                <option value="">Select Meal Quantity</option>
                <option value="50-200">50-200 Meals</option>
                <option value="200-500">200-500 Meals</option>
                <option value="1000+">1000+ Meals</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors.mealQuantity}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="donate-form-label" controlId="foodType">
              <Form.Label>Food Type</Form.Label>
              <Form.Select
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                isInvalid={!!formErrors.foodType}
                required
              >
                <option value="">Select Food Type</option>
                <option value="breakfast">Breakfast</option>
                <option value="fullMeals">Full Meals</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors.foodType}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="donate-form-label" controlId="donationDate">
              <Form.Label>Donation Date</Form.Label>
              <Form.Control
                type="date"
                name="donationDate"
                value={formData.donationDate}
                onChange={handleChange}
                isInvalid={!!formErrors.donationDate}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.donationDate}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="donate-form-label" controlId="donorType">
              <Form.Label>Donor Type</Form.Label>
              <Form.Select
                name="donorType"
                value={formData.donorType}
                onChange={handleChange}
                isInvalid={!!formErrors.donorType}
                required
              >
                <option value="">Select Donor Type</option>
                <option value="individual">Individual</option>
                <option value="organization">Organization</option>
                <option value="socialFunction">Social Function</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors.donorType}
              </Form.Control.Feedback>
            </Form.Group>
            {formData.donorType === "organization" && (
              <Form.Group
                className="donate-form-label"
                controlId="organizationName"
              >
                <Form.Label>Organization Name</Form.Label>
                <Form.Control
                  type="text"
                  name="organizationName"
                  placeholder="Enter Organization Name"
                  value={formData.organizationName}
                  onChange={handleChange}
                  isInvalid={!!formErrors.organizationName}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.organizationName}
                </Form.Control.Feedback>
              </Form.Group>
            )}
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
