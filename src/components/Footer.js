import React from "react";

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
} from "react-bootstrap-icons";
import "../assets/styles/Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="d-flex justify-content-center gap-4">
        <a
          href="https://www.facebook.com/info.jyotitechnosoft/?ref=py_c"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <Facebook size={20} className="text-gray-300 hover:text-teal-400" />
        </a>
        <a
          href="https://twitter.com/JyotiTechnosoft"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <Twitter size={20} className="text-gray-300 hover:text-teal-400" />
        </a>
        <a
          href="https://www.instagram.com/jyoti_technosoft_llp/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <Instagram size={20} className="text-gray-300 hover:text-teal-400" />
        </a>
        <a
          href="https://in.linkedin.com/company/jyoti-technosoft"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} className="text-gray-300 hover:text-teal-400" />
        </a>
        <a
          href="https://github.com/Jyoti-Technosoft"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github size={20} className="text-gray-300 hover:text-teal-400" />
        </a>
      </div>
      {/* Footer Copyright */}
      <div className="border-top mt-4 pt-3">
        <p className="footer-text mb-0">
          &copy; 2024 Feast Forward. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
