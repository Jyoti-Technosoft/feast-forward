import React from "react";
import { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

import { BASE_URL } from "../app-endpoint";
import "../assets/styles/AboutUs.css";
import round_img from "../assets/images/round_img.jpg";
import round_img2 from "../assets/images/round_img2.jpg";
import round_img3 from "../assets/images/round_img3.jpg";
import org_img1 from "../assets/images/org_img1.jpg";
import org_img2 from "../assets/images/org_img2.jpg";
import org_img3 from "../assets/images/org_img3.jpg";

const AboutUs = () => {
  const [formData, setFormData] = useState({
    requestType: "",
    email: "",
    contactNo: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid Email is required";
    }
    if (formData.contactNo && !/^[6789]\d{9}$/.test(formData.contactNo)) {
      newErrors.contactNo =
        "Invalid contact formData.contactNo. Must be 10 digits starting with 6-9";
    }
    setErrors(newErrors);
    return newErrors;
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
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        const response = await axios.post(
          `${BASE_URL}/contactUs`,
          JSON.stringify(formData),
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200) {
          setSubmitted(true);
          setFormData({
            requestType: "",
            email: "",
            contactNo: "",
            message: "",
          });
        }
      } catch (error) {
        setFormData({ requestType: "", email: "", contactNo: "", message: "" });
      }
      setSubmitted(false);
    }
  };

  return (
    <div>
      <h1 className="about-us-text">
        <b>
          <u>About Us</u>
        </b>
      </h1>
      <section className="container-section1 d-flex" id="about-us-link">
        <div className="w-100">
          <h3>Our Mission</h3>
          <ul>
            <li>
              Our mission at [Organization Name] is to alleviate hunger and
              reduce food waste in our community.
            </li>
            <li>
              <p>
                We believe that access to nutritious food is a fundamental human
                right, and we are dedicated to ensuring that no one in our
                community goes to bed hungry.
              </p>
            </li>
            <li>
              Our mission is to fight food insecurity and reduce food waste by
              connecting donors with surplus food to local communities in need.
            </li>
          </ul>
          <h3>Our Vision</h3>
          <ul>
            <li>
              We envision a future where food waste is significantly reduced and
              surplus food is efficiently redirected to support those facing
              food insecurity.{" "}
            </li>
            <li>
              <p>
                We aim to create a sustainable, communitydriven model that
                empowers individuals and strengthens resilience against hunger.
              </p>
            </li>
          </ul>
          <h3>Our Values</h3>
          <ul>
            <li>
              Compassion: We are driven by a deep sense of empathy for those we
              serve.
            </li>
            <li>
              Integrity: We uphold the highest standards of honesty and
              transparency in our work.
            </li>
            <li>
              Collaboration: We believe in the power of partnerships and
              community involvement.
            </li>
            <li>
              Innovation: We continuously seek creative solutions to fight
              hunger and food waste.
            </li>
            <li>
              We envision a world where every individual has access to
              nutritious meals and where no good food goes to waste.
            </li>
          </ul>
        </div>
        <div>
          <img className="round-image1" src={round_img} alt="Description" />
          <div>
            <img
              className="round-image1 round-image2"
              src={round_img2}
              alt="Description"
            />
          </div>
          <img className="round-image1" src={round_img3} alt="Description" />
        </div>
      </section>

      <section
        className="container-section2 align-items-center"
        id="organization-link"
      >
        <h1>Organization</h1>
        <h3>Who We Are</h3>
        <ul>
          <li>
            We are a non-profit organization composed of passionate volunteers
            and staff committed to making a meaningful impact in our community.
          </li>
          <li>
            Founded in 2023, we have grown from a small group of dedicated
            individuals to a robust organization with diverse programs and
            initiatives.
          </li>
          <li>
            We have been collaborated to many individuals, organizations and
            NGO's through whom we serve foods.
          </li>
          <li>
            We also serve foods we get from social functions like weddings and
            parties.
          </li>
        </ul>
        <h3>Our Impact</h3>
        <ul>
          <li>
            Distributed over [X] meals to families and individuals in need.
          </li>
          <li>
            Partnered with [X] local food businesses and supermarkets to rescue
            surplus food.
          </li>
          <li>
            Hosted [X] educational workshops on nutrition and sustainable food
            practices.
          </li>
          <li>Engaged over [X] volunteers in our mission.</li>
        </ul>
        <ul>
          <li>
            We are a team of dedicated volunteers and staff committed to making
            a difference in our community through food donation and education.
          </li>
          <li>
            Since our inception, we have distributed thousands of meals to
            families and individuals in need, thanks to our network of generous
            donors and partners.
          </li>
        </ul>
        <div className="d-flex justify-content-between">
          <img
            className="organization-image"
            src={org_img1}
            alt="Organization"
          />
          <img
            className="organization-image"
            src={org_img2}
            alt="Organization"
          />
          <img
            className="organization-image"
            src={org_img3}
            alt="Organization"
          />
        </div>
      </section>
      {/** Contact Us section */}
      <section className="container-section3" id="contact-us-link">
        <Container className="Contact-form">
          <h2 className="text-center">Contact Us</h2>
          {submitted && (
            <Alert className="text-center" variant="success">
              Form submitted successfully!
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group controlId="requestType" className="Contact-group">
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
              <Col md={6}>
                <Form.Group controlId="email" className="Contact-group">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="contactNo" className="Contact-group">
                  <Form.Control
                    type="text"
                    name="contactNo"
                    placeholder="Contact no."
                    value={formData.contactNo}
                    onChange={handleChange}
                    isInvalid={!!errors.contactNo}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.contactNo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="message" className="Contact-group">
              <Form.Control
                as="textarea"
                name="message"
                rows={3}
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                isInvalid={!!errors.message}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" className="Contact-submit" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;
