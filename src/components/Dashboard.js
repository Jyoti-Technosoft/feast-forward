import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from '../components/Header';
import Footer from '../components/Footer';
import "../assets/styles/Dashboard.css"; 
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import image5 from "../assets/images/image5.jpg";
import FDPServices from "../assets/images/FDP Services.webp";
import content1 from "../assets/images/content1.webp";
import content2 from "../assets/images/content2.webp";
import content3 from "../assets/images/content3.jpg";

function Dashboard() {
  return (
    <div>
      <Header />
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image1}
              alt="First slide"
              style={{height: '90vh'}}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-100"
              src={image2}
              alt="Second slide"
              style={{height: '90vh'}}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-100"
              src={image3}
              alt="Third slide"
              style={{height: '90vh'}}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-100"
              src={image4}
              alt="Fourth slide"
              style={{height: '90vh'}}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-100"
              src={image5}
              alt="Fifth slide"
              style={{height: '90vh'}}
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div
        className="content-1 row"
        style={{
          textAlign: 'center',
          backgroundColor: 'aliceblue',
          paddingTop: '5vh',
        }}
        >
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
        <div className="img col-lg-6" style={{marginTop: '6px' }}>
          <img
            src={FDPServices}
            alt="Food Donation Content"
            style={{marginTop: '0px' }}
          />
        </div>
      </div>
      <div
        className='conetent-2 row'
        style={{
          backgroundColor: 'aliceblue',
          padding: '3vh',
          textAlign: 'center'
        }}
      >
        <div className="box">
          <p>
            <h1 style={{color:'white', backgroundColor: 'rgb(51, 51, 51)'}}>
              <i>“No one has ever become poor from giving.“</i>
            </h1>
          </p>
          <div className="row">
            <div className="col-lg-4">
              <img
                src={content1}
                alt="Donate"
                style={{
                  backgroundColor: 'aliceblue',
                  width: '70%',
                  marginRight: '100px',
                  marginBottom: '15px'
                }}
              />
            </div>
            <div className="col-lg-4">
              <img
                src={content2}
                alt="content2"
                style={{
                  backgroundColor: 'aliceblue',
                  width: '70%',
                  marginRight: '0px',
                  marginBottom: '15px'
                }}
              />
            </div>
            <div className="col-lg-4">
              <img
                src={content3}
                alt="content3"
                style={{
                  backgroundColor: 'aliceblue',
                  width: '70%',
                  marginLeft: '100px',
                  marginBottom: '15px',
                  height: '87%',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="content-3 row">
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
