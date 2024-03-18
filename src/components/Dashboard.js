import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
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

{/* Feedback Form */ }
function FeedbackListing() {
  const feedbackData = [
    { id: 1, name: "John", message: "Great service!" },
    { id: 2, name: "Alice", message: "Love the website design." },
    { id: 3, name: "Bob", message: "Very informative content." },
  ];

  return (
    <div className="Feedback-list">
      <h2>Feedback</h2>
      <ul>
        {feedbackData.map((feedback) => {
          return <li key={feedback.id}>
            <strong>{feedback.name}:</strong> {feedback.message}
          </li>
        })}
      </ul>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <Header />
      <div>
        <Carousel>
          <Carousel.Item className="dashboard-container">
            <img
              className="d-block w-100"
              src={banner_img1}
              alt="First slide"
            />
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
      </div>
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
          <p>
            <h1 className="text-box">
              <i>“No one has ever become poor from giving.”</i>
            </h1>
          </p>
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
      <FeedbackListing />
      <Footer />
    </div>
  );
}

export default Dashboard;
