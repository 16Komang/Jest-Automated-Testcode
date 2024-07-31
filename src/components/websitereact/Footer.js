import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3 className="footer-heading">About Us</h3>
          <p>We are a company dedicated to providing the best services and solutions to our customers. Our mission is to deliver high-quality products and exceptional customer support.</p>
        </div>
        <div className="footer-section links">
          <h3 className="footer-heading">Quick Links</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/todolist">TodoList</a></li>
            <li><a href="/calculator">Calculator</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3 className="footer-heading">Follow Us</h3>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Belajar Reactjs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
