import React from 'react';

import Header from '../components/Header';
import Footer from './Footer';
import "../assets/styles/AboutUs.css";

const AboutUs = () => {
  return (
      <div style={{backgroundColor:'aliceblue'}}>
      <Header/>
      <section className= "container" id= "Description" style={{marginTop: '20px', marginLeft: '10px'}}>
          <h1>Description Section:</h1>
        <ul>
          <li>This section contains information about the Food Donation Project...</li>
        </ul>
          <h3>-Our Mission</h3>
        <ul>
        <li>Our mission at [Organization Name] is to alleviate hunger and reduce food waste in our community.
            We believe that access to nutritious food is a fundamental human right, and we are dedicated to 
            ensuring that no one in our community goes to bed hungry.</li>
        <li>Our mission is to fight food insecurity and reduce food waste by connecting donors with 
            surplus food to local communities in need.</li>
        </ul>
          <h3>-Our Vision</h3>
        <ul>
          <li>We envision a future where food waste is significantly reduced and surplus food is efficiently 
              redirected to support those facing food insecurity. We aim to create a sustainable, community-driven 
              model that empowers individuals and strengthens resilience against hunger.</li></ul>
          <h3>-Our Values</h3>
          <ul>
          <li>Compassion: We are driven by a deep sense of empathy for those we serve.</li>
          <li>Integrity: We uphold the highest standards of honesty and transparency in our work.</li>
          <li>Collaboration: We believe in the power of partnerships and community involvement.</li>
          <li>Innovation: We continuously seek creative solutions to fight hunger and food waste.</li>
          <li>We envision a world where every individual has access to nutritious meals and where no
              good food goes to waste.</li>
        </ul>
      </section>

      <section className='container' id="Organization" style={{marginLeft: '10px'}}>
        <h1>Organization Section:</h1>
          <h3>-Who We Are</h3>
        <ul>
          <li>Details about the organization behind the project...</li>
          <li>[Organization Name] is a non-profit organization composed of passionate volunteers and 
              staff committed to making a meaningful impact in our community. Founded in [Year], 
              we have grown from a small group of dedicated individuals to a robust organization with 
              diverse programs and initiatives.</li>
        </ul>
          <h3>-Our Impact</h3>
        <ul>
          <li>Since our inception, we have:</li>
        </ul>
        <ul>
          <li>Distributed over [X] meals to families and individuals in need.</li>
          <li>Partnered with [X] local food businesses and supermarkets to rescue surplus food.</li>
          <li>Hosted [X] educational workshops on nutrition and sustainable food practices.</li>
          <li>Engaged over [X] volunteers in our mission.</li>
        </ul>
        <ul>
          <li>
            We are a team of dedicated volunteers and staff committed to making a difference in our community
            through food donation and education.
          </li>
          <li>
            Since our inception, we have distributed thousands of meals to families and individuals in need,
            thanks to our network of generous donors and partners.
          </li>
        </ul>
      </section>
      
      <section className= "container" id="Contact-Deatils" style={{marginLeft: '10px'}}>
        <h1>Contact Details Section:</h1>
        <h3>-Get in Touch</h3>
      <ul>
        <li>Email: contact@fooddonation.org</li>
        <li>Phone: (123) 456-7890</li>
        <li>Address: 123 Charity Lane, Kindness City, 12345</li>
      </ul>
        <h3>-Volunteer with Us</h3>
      <ul>
        <li>Join our team of volunteers and make a difference in the fight against hunger. 
            Visit our website to learn more about volunteer opportunities and sign up.</li>
        <li>Remember to replace placeholder information (like "[Organization Name]")with actual
            details pertaining to your food donation project.</li>
        <li>You might also want to add real statistics,
            stories, or testimonials to enrich the content and make it more relatable.</li>
      </ul>
      </section>
      <Footer/>
    </div>
  );
};

export default AboutUs;