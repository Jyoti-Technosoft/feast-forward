import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { BASE_URL } from "../app-endpoint";
import "../assets/styles/Dashboard.css";
import banner_img1 from "../assets/images/banner_img1.jpg";
import banner_img2 from "../assets/images/banner_img2.jpg";
import banner_img3 from "../assets/images/banner_img3.jpg";
import banner_img4 from "../assets/images/banner_img4.jpg";
import banner_img5 from "../assets/images/banner_img5.jpg";
import FDPServices from "../assets/images/FDP Services.webp";
import poor_child from "../assets/images/poor_child.webp";
import Donate_food from "../assets/images/Donate_food.jpg";
import FDP_img from "../assets/images/FDP_img.webp";
import admin_1 from "../assets/images/admin_1.jpeg";
import admin_2 from "../assets/images/admin_2.webp";
import admin_3 from "../assets/images/admin_3.jpeg";
import admin_4 from "../assets/images/admin_4.webp";
import admin_5 from "../assets/images/admin_5.webp";
import admin_6 from "../assets/images/admin_6.jpeg";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function Dashboard() {
  const [isToken, setIsToken] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserLoggedIn();
    getFeedbackData();
  }, []);

  const checkUserLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user && user.token ? true : false;
    setIsToken(token);
    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  const getFeedbackData = () => {
    axios.get(`${BASE_URL}/feedback`).then((res) => {
      setFeedbackData(res.data.feedback);
    });
  };

  const RatingStar = ({ ratings }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratings) {
        stars.push(
          <span key={i} className="star">
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star">
            &#9734;
          </span>
        );
      }
    }
    return <div>{stars}</div>;
  };

  return (
    <div>
      <Carousel>
        <Carousel.Item className="dashboard-container">
          <img className="w-100" src={banner_img1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item className="dashboard-container">
          <img className="w-100" src={banner_img2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item className="dashboard-container">
          <img className="w-100" src={banner_img3} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item className="dashboard-container">
          <img className="w-100" src={banner_img4} alt="Fourth slide" />
        </Carousel.Item>
        <Carousel.Item className="dashboard-container">
          <img className="w-100" src={banner_img5} alt="Fifth slide" />
        </Carousel.Item>
      </Carousel>
      <div className="content-1 row">
        <div className="col-lg-6">
          <h3>Helps people and communities</h3>
          <p>
            Food donations can provide immediate relief to people and
            communities who are struggling with food insecurity. They can also
            help promote good health and well-being among vulnerable
            populations.
          </p>
          <h3>Supports local communities</h3>
          <p>
            Food donations can help support local communities and save resources
            that would otherwise go to waste.
          </p>
          <h3>Combats child labor</h3>
          <p>
            Food donations can help combat child labor and work towards
            achieving a food-secure society.
          </p>
          <h3>Improves harmony</h3>
          <p>
            Donating food to worthy people or organizations can help counter
            poverty and hunger, and can also improve harmony,friendliness, and
            trust among residents.
          </p>
          <h3>Supports education</h3>
          <p>
            Food donations can also help support education in developing
            countries.
          </p>
        </div>
        <div className="img col-lg-6">
          <img src={FDPServices} alt="Food Donation Content" />
        </div>
      </div>
      <div className="content-2 row">
        <div className="box">
          <h1 className="text-box">
            <i>“No one has ever become poor from giving.”</i>
          </h1>
          <div className="row">
            <div className="col-lg-4">
              <img className="poor-child-image" src={poor_child} alt="Donate" />
            </div>
            <div className="col-lg-4">
              <img
                className="donate-food-image"
                src={Donate_food}
                alt="content2"
              />
            </div>
            <div className="col-lg-4">
              <img className="fdp-iamge" src={FDP_img} alt="content3" />
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Feedback section */}
        <h2 className="text-center">Feedback</h2>
        <ul className="list-group">
          {feedbackData.map((feedback, index) => (
            <li key={index} className="list-group-item">
              <div className="d-flex align-items-center">
                <span className="bi bi-person me-2"></span>
                <div>
                  <strong>ABC</strong>
                  <RatingStar ratings={feedback.ratings} />
                  <p>{feedback.experience}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;