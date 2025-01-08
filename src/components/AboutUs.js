import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import CustomToast from "./ReusableComponents/CustomToast";
import data from "../db.json";
import { upsertContactUs } from "../Services/CommonServices";
import { errorMessage } from "../Services/axiosinstance";
import "../assets/styles/AboutUs.css";
// import round_img from "../assets/images/round_img.jpg";
// import round_img2 from "../assets/images/round_img2.jpg";
// import round_img3 from "../assets/images/round_img3.jpg";
import org_img1 from "../assets/images/org_img1.jpg";
import org_img2 from "../assets/images/org_img2.jpg";
import org_img3 from "../assets/images/org_img3.jpg";
import Vision from "../assets/images/Vision.png";
import Mission from "../assets/images/Mission.png";
import Values from "../assets/images/Values.png";
import contactUs from "../assets/images/contactusbgimage.jpg"

const AboutUs = () => {
  const {
    aboutusSection1,
    impactData,
    points,
  } = data?.aboutuspage;
  const navigate = useNavigate();
  const duration = 3;
  const [formData, setFormData] = useState({
    requestType: "",
    email: "",
    contactNo: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", message: "" });
  const [animatedNumbers, setAnimatedNumbers] = useState(
    impactData?.map(() => 0)
  );

  const imageMap = {
    org_img1: org_img1,
    org_img2: org_img2,
    org_img3: org_img3,
    Vision: Vision,
    Mission: Mission,
    Values: Values,
  };

  const getImageSrc = (src) => imageMap[src] || src;

  const handleCancel = () => {
    setFormData({
      requestType: "",
      email: "",
      contactNo: "",
      message: "",
    });
    setErrors({});
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
    if (!formData?.message?.trim()) {
      errors.message = "Message is required";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object?.keys(errors)?.length === 0) {
      try {
        const response = await upsertContactUs(JSON.stringify(formData));
        if (response?.status === 200) {
          setMessage({ type: "success", message: response.data.message });
          setFormData({
            requestType: "",
            email: "",
            contactNo: "",
            message: "",
          });
        }
      } catch (error) {
        setFormData({ requestType: "", email: "", contactNo: "", message: "" });
        setMessage({ type: "warning", message: errorMessage });
      }
    } else {
      setErrors(errors);
    }
  };

  useEffect(() => {
    const intervals = impactData?.map((item, index) => {
      const targetValue = parseInt(item.number.replace(/\D/g, ""), 10);
      const step = targetValue / ((duration * 1000) / 30);

      let currentValue = 0;

      const interval = setInterval(() => {
        currentValue = Math.min(currentValue + step, targetValue);
        setAnimatedNumbers((prev) => {
          const updated = [...prev];
          updated[index] = Math.round(currentValue);
          return updated;
        });
        if (currentValue >= targetValue) {
          clearInterval(interval);
        }
      }, 30);

      return interval;
    });
    return () => intervals?.forEach(clearInterval);
  }, [impactData, duration]);

  return (
    <div className="about-us">
      <div className="about-header">
        <h1>About Us</h1>
        <p>
          <span
            onClick={() => navigate("/home")}
            style={{ color: "#ff6600", cursor: "pointer" }}
          >
            Home
          </span>{" "}
          &gt; About Us
        </p>
      </div>
      <section className="about-content">
        {aboutusSection1?.map((item, index) => {
          return (
            <>
              <div className="section-title-about">
                <div className="section-line">
                  <span className="section-line-first1"></span>
                  <span className="section-line-second"></span>
                </div>
                <span className="section-title-text">{item?.sectionTitle}</span>
                <div className="section-line">
                  <span className="section-line-first2"></span>
                  <span className="section-line-second"></span>
                </div>
              </div>
              <div className="overview">
                <div>
                  <img
                    className="section-img"
                    src={getImageSrc(item?.src)}
                    alt="images"
                  />
                </div>
                {item?.content?.map((data, contentIndex) => (
                  <p key={contentIndex}>{data}</p>
                ))}
              </div>
            </>
          );
        })}
      </section>
      <section
        className="container-section2 align-items-center"
        id="organization-link"
      >
        <div className="section-title-about">
          <div className="section-line">
            <span className="section-line-first1"></span>
            <span className="section-line-second"></span>
          </div>
          <span className="section-title-text">Organization</span>
          <div className="section-line">
            <span className="section-line-first2"></span>
            <span className="section-line-second"></span>
          </div>
        </div>
        <div className="impact-section">
          <div className="impact-header">
            <p className="impact-subtitle">Make a Difference</p>
            <h2 className="impact-title">
              What We Achieve With Your Contribution?
            </h2>
          </div>
          <div className="impact-stats">
            {impactData?.map((item, index) => (
              <div key={index} className="impact-stat">
                <h3 className="impact-number">
                  {item?.label === "Raised for Hunger Relief"
                    ? `$${animatedNumbers[index]}+`
                    : `${animatedNumbers[index]}+`}
                </h3>
                <p className="impact-label">{item?.label}</p>
                <p className="impact-description">{item?.description}</p>
              </div>
            ))}
          </div>
          <div className="impact-main-section">
            <div className="impact-details">
              {points?.map((point, index) => (
                <div key={index} className="impact-point">
                  <div className="impact-point-number">{index + 1}</div>
                  <div>
                    <h3 className="impact-point-title">{point?.title}</h3>
                    <p className="impact-point-content">{point?.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="contact-section" id="contact-us-link">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="image-column">
              <img src={contactUs} alt="Join Us" className="join-now-image" />
            </Col>
            <Col md={6} className="form-column">
              <div className="contact-container">
                <span className="text-center section-title-text">
                  Contact Us
                </span>
                {message !== "" && <CustomToast message={message} />}
                <Form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <Form.Group style={{ marginTop: "8px" }} controlId="requestType" className="form-group">
                      <Form.Control
                        as="select"
                        value={formData.requestType}
                        name="requestType"
                        onChange={handleChange}
                      >
                        <option value="support">Support request</option>
                        <option value="feedback">Feedback</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email" className="form-group">
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="contactNo" className="form-group">
                      <Form.Control
                        type="text"
                        name="contactNo"
                        placeholder="Contact number"
                        value={formData.contactNo}
                        onChange={handleChange}
                        isInvalid={!!errors.contactNo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contactNo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <Form.Group controlId="message" className="form-group">
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={4}
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      isInvalid={!!errors.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
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
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;
