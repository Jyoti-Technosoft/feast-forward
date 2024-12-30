import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import CustomToast from "./ReusableComponents/CustomToast";
import data from "../db.json";
import { upsertContactUs } from "../Services/CommonServices";
import { errorMessage } from "../Services/axiosinstance";
import "../assets/styles/AboutUs.css";
import round_img from "../assets/images/round_img.jpg";
import round_img2 from "../assets/images/round_img2.jpg";
import round_img3 from "../assets/images/round_img3.jpg";
import org_img1 from "../assets/images/org_img1.jpg";
import org_img2 from "../assets/images/org_img2.jpg";
import org_img3 from "../assets/images/org_img3.jpg";
import Vision from "../assets/images/Vision.png";
import Mission from "../assets/images/Mission.png"
import Values from "../assets/images/Values.png"

const AboutUs = () => {
  const { aboutusSection1, aboutusSection2, aboutusSection3, impactData, points } = data?.aboutuspage;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    requestType: "",
    email: "",
    contactNo: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", message: "" });

  const imageMap = {
    "org_img1": org_img1,
    "org_img2": org_img2,
    "org_img3": org_img3,
    "Vision": Vision,
    "Mission": Mission,
    "Values": Values
  };
  const getImageSrc = (src) => imageMap[src] || src;

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
    }
  };

  return (
    <div className="about-us">
      <div className="about-header">
        <h1>About Us</h1>
        <p><span onClick={() => navigate("/home")} style={{ color: "#ff6600", cursor: "pointer" }}>Home</span> &gt; About Us</p>
      </div>
      <section className="about-content">
        {
          aboutusSection1?.map((item, index) => {
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
                    <img className="section-img" src={getImageSrc(item?.src)} alt="images" />
                  </div>
                  {item?.content?.map((data, contentIndex) => (
                    <p key={contentIndex}>{data}</p>
                  ))}
                </div>
              </>
            );
          })
        }
      </section>
      {/* <section className="container-section1 d-flex" id="about-us-link">
        <div className="w-100">
          {
            aboutusSection1?.map((item, index) => {
              return (
                <div key={index}>
                  <h3>{item?.sectionTitle}</h3>
                  <ul>
                    {item?.content?.map((data, contentIndex) => (
                      <li key={contentIndex}>{data}</li>
                    ))}
                  </ul>
                </div>
              );
            })
          }
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
      </section> */}
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
            <h2 className="impact-title">What We Achieve With Your Contribution?</h2>
          </div>
          <div className="impact-stats">
            {impactData?.map((item, index) => (
              <div key={index} className="impact-stat">
                <h3 className="impact-number">{item?.number}</h3>
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
        {/* {
          aboutusSection2?.map((item, index) => {
            return (
              <div key={index}>
                <h3>{item?.sectionTitle}</h3>
                <ul>
                  {item?.content?.map((data, contentIndex) => (
                    <li key={contentIndex}>{data}</li>
                  ))}
                </ul>
              </div>
            );
          })
        }
        <div className="d-flex justify-content-between">
          {aboutusSection3?.map((item, index) => {
            return (<img
              className="organization-image"
              src={getImageSrc(item?.src)}
              alt={item?.alt ?? "Organization"}
              key={index}
            />)
          })}
        </div> */}
      </section>
      <section className="contact-section" id="contact-us-link">
        <div className="contact-container">
          <h2 className="text-center">Contact Us</h2>
          {message !== "" && <CustomToast message={message} />}
          <Form onSubmit={handleSubmit}>
            <div className="form-row">
              <Form.Group controlId="requestType" className="form-group">
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

              <Form.Group controlId="contactNo" className="form-group">
                <Form.Control
                  type="text"
                  name="contactNo"
                  placeholder="Contact number"
                  value={formData.contactNo}
                  onChange={handleChange}
                  isInvalid={!!errors.contactNo}
                  required
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
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" className="submit-btn" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
