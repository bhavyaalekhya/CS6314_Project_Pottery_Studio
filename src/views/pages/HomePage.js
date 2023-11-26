//import React from 'react';
import React, { useState, useEffect } from 'react';
import '../../css/HomePage.css'; // Import your CSS file for styling
//import '../common/imgIndex.js';

function HomePage() {

  const API_URL = "http://localhost:5000/";
  
  const [items, setItems] = useState([]); // Initialize and manage the items state

  useEffect(() => {
    // Fetch inventory data on component mount
    fetch('http://localhost:5000/dashboard')
      .then((response) => response.json())
      .then((data) => {
        // Update the items state with the fetched data
        console.log(data);
        setItems(data);
      });
  }, [API_URL]);

  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Welcome to Our Pottery Studio</h2>
        <p>
          Immerse yourself in the art of pottery at our studio. Discover the joy of creating unique
          and beautiful ceramic pieces while learning from experienced artisans.
        </p>
        <div className="highlight-container">
          <div className="highlight">
            <h3>Hands-On Experience</h3>
            <p>Get your hands dirty and experience the therapeutic nature of working with clay.</p>
          </div>
          <div className="highlight">
            <h3>Expert Guidance</h3>
            <p>Learn from skilled instructors who will guide you through every step of the process.</p>
          </div>
          <div className="highlight">
            <h3>Community Atmosphere</h3>
            <p>Join a vibrant community of fellow enthusiasts and share your passion for pottery.</p>
          </div>
        </div>
        <p>
          Whether you're a beginner or an experienced potter, our studio offers a welcoming
          environment for all. Come, explore, and unleash your creativity with us!
        </p>
        <button className="cta-button">Get Started</button>
      </div>
      <h2>Here are some items from the inventory</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Count</th>
            <th>Image</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.count}</td>
              <td>
                <img style={{ height: 100, width: 100 }} src={item.image.path} alt={item.image.description} title={item.image.description} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;