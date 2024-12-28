import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
// import { Person } from "react-bootstrap-icons";
import Slider from "react-slick";
// import { HeartFill } from "react-bootstrap-icons";

import { getFeedback } from "../Services/CommonServices";
import data from "../db.json";
import "../assets/styles/Dashboard.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import banner_img1 from "../assets/images/banner_img1.jpg";
import banner_img2 from "../assets/images/banner_img2.jpg";
import banner_img3 from "../assets/images/banner_img3.jpg";
import banner_img4 from "../assets/images/banner_img4.jpg";
import banner_img5 from "../assets/images/banner_img5.jpg";
import FDPServices from "../assets/images/FDP Services.webp";
import poor_child from "../assets/images/poor_child.webp";
import Donate_food from "../assets/images/Donate_food.jpg";
import FDP_img from "../assets/images/FDP_img.webp";
import food_donate_bg from "../assets/images/food-donate-bg.png";
import round_img from "../assets/images/round_img.jpg";
import round_img2 from "../assets/images/round_img2.jpg";
// import admin_1 from "../assets/images/admin_1.jpeg";
// import admin_2 from "../assets/images/admin_2.webp";
// import admin_3 from "../assets/images/admin_3.jpeg";
// import admin_4 from "../assets/images/admin_4.webp";
// import admin_5 from "../assets/images/admin_5.webp";
// import admin_6 from "../assets/images/admin_6.jpeg";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Dashboard() {
  const { carouselImages, content, secondCarouselImages } = data?.homepage;
  const navigate = useNavigate();

  const [feedbackData, setFeedbackData] = useState([]);
  const [currentImages, setCurrentImages] = useState(secondCarouselImages?.slice(0, 6));

  const imageMap = {
    "banner_img1.jpg": banner_img1,
    "banner_img2.jpg": banner_img2,
    "banner_img3.jpg": banner_img3,
    "banner_img4.jpg": banner_img4,
    "banner_img5.jpg": banner_img5,
    "poor_child.webp": poor_child,
    "Donate_food.jpg": Donate_food,
    "FDP_img.webp": FDP_img,
    "food-donate-bg.png": food_donate_bg,
    "round_img.jpg": round_img,
    "round_img2.jpg": round_img2,
  };
  const getImageSrc = (src) => imageMap[src] || src;

  const getFeedbackData = async () => {
    try {
      const response = await getFeedback();
      if (response?.status === 200) {
        setFeedbackData(response?.data?.feedback);
      } else {
        setFeedbackData([]);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const RatingStar = ({ ratings }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratings) {
        stars?.push(
          <span key={i} className="star">
            &#9733;
          </span>
        );
      } else {
        stars?.push(
          <span key={i} className="star">
            &#9734;
          </span>
        );
      }
    }
    return <div>{stars}</div>;
  };

  const getInitials = (userName) => {
    if (!userName) return "";
    const words = userName?.trim()?.split(" ");
    if (words?.length === 1) {
      return words[0][0]?.toUpperCase();
    } else {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextImages = secondCarouselImages?.slice(currentImages?.length, currentImages?.length + 6);
      if (nextImages?.length > 0) {
        setCurrentImages((prevImages) => [...prevImages?.slice(6), ...nextImages]);
      } else {
        setCurrentImages(secondCarouselImages?.slice(0, 6));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImages, secondCarouselImages]);

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user && user?.token ? true : false;
      return token;
    };
    const token = checkUserLoggedIn();
    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getFeedbackData();
  }, []);

  const GallerySlider = () => {
    return (
      <div className="gallery-container">
        {currentImages?.map((image, index) => {
          return (
            <div key={index} className="gallery-item">
              <img
                src={getImageSrc(image?.src)}
                alt={image?.alt}
                className="gallery-image"
              />
            </div>
          );
        })}
      </div>
    );
  };

  const FeedbackSlider = ({ feedback }) => {
    const settings = {
      infinite: feedback?.length > 3,
      speed: 500,
      slidesToShow: Math?.min(3, feedback?.length),
      slidesToScroll: 1,
      autoplay: feedback?.length > 3,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: Math?.min(2, feedback?.length),
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

    const truncateText = (text, maxLength) => {
      if (text?.length > maxLength) {
        return `${text?.substring(0, maxLength)}...`;
      }
      return text;
    };

    const getCardClass = (feedbackLength) => {
      if (feedbackLength === 1) {
        return 'single-feedback';
      } else if (feedbackLength === 2) {
        return 'two-feedbacks';
      } else {
        return 'multiple-feedbacks';
      }
    };

    return (
      <div className="feedback-slider-container">
        <Slider {...settings}
        >
          {feedback?.map((item, index) => (
            <div
              key={index}
              className={`card feedback-card mb-4 ${getCardClass(feedback?.length)}`}
            >
              <div className="card-body">
                <div className="d-flex align-items-start">
                  <div className="rounded-circle user-profile">
                    {getInitials(item?.userName)}
                  </div>
                  <div className="w-100 ms-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <strong className="text-capitalize">
                        {item?.userName}
                      </strong>
                      <RatingStar ratings={item?.ratings} />
                    </div>
                    <p className="feedback-text mb-0">
                      {truncateText(item?.experience, 100)}
                    </p>{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  return (
    <>
      <Carousel>
        {carouselImages?.map((item, index) => {
          return (
            <Carousel.Item key={index} className="dashboard-container">
              <img
                className="w-100"
                src={getImageSrc(item?.src)}
                alt={item?.alt}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div className="content-1 row">
        <div className="section-title">
          <h2>The Impact Of Food Donations</h2>
          <p>"A small donation, a big impact on those in need".</p>
        </div>
        <div className="row">
          <div className="col-lg-6 donation-content">
            {content?.map((item, index) => {
              return (
                <div key={index} className={`content-item`}>
                  <h5>{item?.title}</h5>
                  <p>{item?.text}</p>
                </div>
              );
            })}
          </div>
          <div className="img col-lg-6">
            <img
              src={FDPServices}
              alt="Food Donation Content"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
      <div className="content-2 row">
        <div className="box">
          <div className="section-title-gallery">
            <h2>Gallery</h2>
          </div>
          <GallerySlider images={secondCarouselImages} />
        </div>
      </div>
      <div className="feedback-content">
        <div className="section-title-feedback">
          <h2>What People Say About Us</h2>
        </div>
        <FeedbackSlider feedback={feedbackData} />
      </div>
    </>
  );
}

export default Dashboard;
