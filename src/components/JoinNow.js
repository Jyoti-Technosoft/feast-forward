import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import CustomToast from "./ReusableComponents/CustomToast";
import { upsertJoinUser } from "../Services/CommonServices";
import { errorMessage } from "../Services/axiosinstance";
import joinUs from "../assets/images/join_us.jpg";
import "../assets/styles/JoinNow.css";

const JoinNowPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    reason: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState({ type: "", message: "" });

  const handleCancel = () => {
    setFormData({ fullName: "", email: "", contactNo: "", reason: "" });
    setFormErrors({});
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData?.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
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
    if (!formData?.reason?.trim()) {
      errors.reason = "Provide details is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object?.keys(errors)?.length === 0) {
      try {
        const response = await upsertJoinUser(JSON.stringify(formData));
        if (response?.status === 200) {
          console.log('response?.data?.message==>:', response?.data?.message);
          setMessage({
            type: "success",
            message: response?.data?.message ?? "User Added Successfully!",
          });
          setFormData({ fullName: "", email: "", contactNo: "", reason: "" });
        }
      } catch (error) {
        setFormData({ fullName: "", email: "", contactNo: "", reason: "" });
        setMessage({
          type: "warning",
          message: errorMessage ?? "Not able to new user some error.",
        });
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="join-now-page">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="image-column-join">
            <img src={joinUs} alt="Join Us" className="join-now-image" />
          </Col>
          <Col lg={6} className="form-column">
            <div className="join-now-container">
              <h4 className="join-now-heading">Join Us</h4>
              <Form onSubmit={handleSubmit}>
                <div className="form-fields">
                  <Form.Group className="joinNow-label" controlId="fullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      isInvalid={!!formErrors.fullName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.fullName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="joinNow-label" controlId="email">
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

                  <Form.Group className="joinNow-label" controlId="contactNo">
                    <Form.Label>Contact No.</Form.Label>
                    <Form.Control
                      type="text"
                      name="contactNo"
                      placeholder="Enter contact no."
                      value={formData.contactNo}
                      onChange={handleChange}
                      isInvalid={!!formErrors.contactNo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.contactNo}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="joinNow-label" controlId="reason">
                    <Form.Label>Provide Details</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="reason"
                      placeholder="Let us know if you want to donate food, volunteer, or support in any other way."
                      value={formData.reason}
                      onChange={handleChange}
                      rows={3}
                      isInvalid={!!formErrors.reason}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.reason}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="button-row">
                    <Button
                      className="small-button"
                      variant="secondary"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="small-button"
                      variant="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      {message !== "" ? <CustomToast message={message} /> : null}
    </div>
  );
};

export default JoinNowPage;
