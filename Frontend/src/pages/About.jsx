import React from 'react';
import image1 from "../images/founder1.jpg"
import image2 from "../images/founder2.jpg"
import image3 from "../images/founder3.jpg"
import image4 from "../images/founder4.jpg"

const founders = [
  {
    name: 'Cynthia Daou',
    role: 'Cofounder/President', 
  
    image: image1, // Replace with actual image file
  },
  {
    name: 'Cynthia Daou',
    role: 'Director of Business Support',
    image: image2, // Replace with actual image file
  },

  {
    name: 'Cynthia Daou',
    role: 'Psychiatrist, Head of Clinical Excellence',
    image: image3, // Replace with actual image file
  },
  {
    name: 'Cynthia Daou',
    role: 'Research Manager',
    image: image4, // Replace with actual image file
  },
];

const About = () => {
  return (
    <div className="about-us">
      <h2>About Us</h2>
      <div className="founders">
        {founders.map((founder, index) => (
          <div key={index} className="founder">
            <div className="founder-image">
              <img src={founder.image} alt={founder.name} />
            </div>
            <div className="founder-details">
              <h3>{founder.name}</h3>
              <p>{founder.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

  