import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import 'font-awesome/css/font-awesome.min.css';
import { auth } from '../components/firebase-config';  // Adjust this line in your component file

// import { auth } from "../components/firebase-config";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });

   const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    if (user) {
      setUserEmail(user.email); // Update state with the logged-in user's email
    } else {
      // User is not logged in or session has ended
      alert('Please log in to send messages.');
    }
  });

  // Cleanup subscription on unmount
  return () => unsubscribe();
}, []);


  const handleSubmit = (e) => {
    e.preventDefault();
 
    // Check if the entered email matches the logged-in user's email
    if (formData.from_email !== userEmail) {
      alert('The email address is incorrect.');
      return; // Prevent form submission
    }
    
    emailjs
      .sendForm('service_i6xc5ye', 'template_03bzjx4', e.target, 'u2nNbv3-e4I8uOkOu')
      .then((result) => {
        alert('Email sent successfully:', result.text);
        setFormData({
          from_name: '',
          from_email: '',
          message: '',
        });
      })
      .catch((error) => {
        alert('Email sending failed:', error.text);
      });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <div className="address">
          <div className="icon">
            <a href="https://maps.app.goo.gl/bhH2g3zDuYuYCo1g9" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-map-marker"></i>
            </a>
          </div>
          <p>Lebanese American University, Beirut</p>
        </div>
        <div className="address">
          <div className="icon">
            <i className="fa fa-phone"></i>
          </div>
          <p>+961 71133739</p>
        </div>
        <div className="address">
          <div className="icon">
            <i className="fa fa-envelope"></i>
          </div>
          <p>calm@gmail.com</p>
        </div>
        <div className="social-icons">
          <a href="#" className="icon">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#" className="icon">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="icon">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="contact-form">
        <h3>Send Us a Message</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="from_email"
              value={formData.from_email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
