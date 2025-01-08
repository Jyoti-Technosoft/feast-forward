import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import CustomToast from "./ReusableComponents/CustomToast";
import { upsertDonate } from "../Services/CommonServices";
import { errorMessage } from "../Services/axiosinstance";
import donatebg from "../assets/images/banner_img1.jpg";
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
    expirationDate: "",
    donorType: "",
    organizationName: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState({ type: "", message: "" });

  const handleCancel = () => {
    setFormData({
      fullName: "",
      email: "",
      contactNo: "",
      address: "",
      mealQuantity: "",
      foodType: "",
      donationDate: "",
      expirationDate: "",
      donorType: "",
      organizationName: "",
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData?.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData?.contactNo?.trim()) {
      errors.contactNo = "Contact number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.contactNo)) {
      errors.contactNo =
        "Invalid contact number, Must be 10 digits starting with 6-9.";
    }
    if (!formData?.fullName?.trim()) {
      errors.fullName = "FullName is required";
    }
    if (!formData?.address?.trim()) {
      errors.address = "Address is required";
    }
    if (!formData?.mealQuantity?.trim()) {
      errors.mealQuantity = "Meal quantity is required";
    }
    if (!formData?.foodType?.trim()) {
      errors.foodType = "Food type is required";
    }
    if (!formData?.donationDate?.trim()) {
      errors.donationDate = "Donation date is required";
    }
    if (!formData?.expirationDate?.trim()) {
      errors.expirationDate = "Expiration date is required";
    }
    if (!formData?.donorType?.trim()) {
      errors.donorType = "Donor type  is required";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await upsertDonate(JSON.stringify(formData));
        if (response?.status === 200) {
          setMessage({ type: "success", message: response.data.message });
          resetFormValues();
        }
      } catch (error) {
        setMessage({ type: "warning", message: errorMessage });
        resetFormValues();
      }
    } else {
      setFormErrors(errors);
    }
  };

  const resetFormValues = () => {
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
    setFormErrors({});
  };

  return (
    <div>
      <div className="donate-form">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="image-column-donate">
              <img src={donatebg} alt="Donate" className="donate-now-image" />
            </Col>
            <Col lg={6} className="donate-container">
              <Form
                onSubmit={handleSubmit}
                className="d-flex justify-content-center flex-column"
              >
                <h2>Donate</h2>
                {/* Row 1: Full Name and Email */}
                <Row className="mb-1">
                  <Col md={6}>
                    <Form.Group className="donate-label me-md-3" controlId="fullName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        placeholder="Enter fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        isInvalid={!!formErrors.fullName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.fullName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="donate-label" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!formErrors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Row 2: Contact No. and Address */}
                <Row className="mb-1">
                  <Col md={6}>
                    <Form.Group className="donate-label me-md-3" controlId="contactNo">
                      <Form.Label>Contact No.</Form.Label>
                      <Form.Control
                        type="text"
                        name="contactNo"
                        placeholder="Enter contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                        isInvalid={!!formErrors.contactNo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.contactNo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="donate-label" controlId="address">
                      <Form.Label>Pick Up Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter address"
                        value={formData.address}
                        onChange={handleChange}
                        isInvalid={!!formErrors.address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Row 3: Meal Quantity and Food Type */}
                <Row className="mb-1">
                  <Col md={6}>
                    <Form.Group
                      className="donate-label me-md-3"
                      controlId="mealQuantity"
                    >
                      <Form.Label>Meal Quantity</Form.Label>
                      <Form.Select
                        name="mealQuantity"
                        placeholder="Select meal quantity"
                        value={formData.mealQuantity}
                        onChange={handleChange}
                        isInvalid={!!formErrors.mealQuantity}
                      >
                        <option value="">Select meal quantity</option>
                        <option value="50-200">50-200 Meals</option>
                        <option value="200-500">200-500 Meals</option>
                        <option value="1000+">1000+ Meals</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.mealQuantity}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="donate-label" controlId="foodType">
                      <Form.Label>Food Type</Form.Label>
                      <Form.Select
                        name="foodType"
                        value={formData.foodType}
                        onChange={handleChange}
                        isInvalid={!!formErrors.foodType}
                      >
                        <option value="">Select food type</option>
                        <option value="foodPackets">Food Packets</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="fullMeals">Full Meals</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.foodType}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Row 4: Donation Date and Expiration Date */}
                <Row className="mb-1">
                  <Col md={6}>
                    <Form.Group
                      className="donate-label me-md-3"
                      controlId="donationDate"
                    >
                      <Form.Label>Donation Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="donationDate"
                        value={formData.donationDate}
                        onChange={handleChange}
                        isInvalid={!!formErrors.donationDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.donationDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group
                      className="donate-label"
                      controlId="expirationDate"
                    >
                      <Form.Label>Expiration Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="expirationDate"
                        value={formData.expirationDate}
                        onChange={handleChange}
                        isInvalid={!!formErrors.expirationDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.expirationDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Row 5: Donor Type and Organization */}
                <Row className="mb-1">
                  <Col md={6}>
                    <Form.Group className="donate-label me-md-3" controlId="donorType">
                      <Form.Label>Donor Type</Form.Label>
                      <Form.Select
                        name="donorType"
                        value={formData.donorType}
                        onChange={handleChange}
                        isInvalid={!!formErrors.donorType}
                      >
                        <option value="">Select donor type</option>
                        <option value="individual">Individual</option>
                        <option value="organization">Organization</option>
                        <option value="socialFunction">Social Function</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.donorType}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {formData.donorType === "organization" && (
                    <Col md={6}>
                      <Form.Group className="donate-label" controlId="organizationName">
                        <Form.Label>Organization Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="organizationName"
                          placeholder="Enter organization name"
                          value={formData.organizationName}
                          onChange={handleChange}
                          isInvalid={!!formErrors.organizationName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.organizationName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  )}
                </Row>
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
            </Col>
          </Row>
        </Container>
      </div>
      {message !== "" ? <CustomToast message={message} /> : null}
    </div>
  );
};

export default Donate;
