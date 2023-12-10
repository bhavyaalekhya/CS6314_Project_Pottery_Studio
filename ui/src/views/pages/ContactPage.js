import React, { useState, useEffect, useRef } from 'react';
import { Envelope, TelephoneFill, GeoAltFill } from 'react-bootstrap-icons';  // Import Bootstrap icons
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../css/HomePage.css';



function ContactPage() {
  const API_URL = "http://localhost:5000/";
  const [items, setItems] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/dashboard')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, [API_URL]);

  useEffect(() => {
    // Set up event listener for video end
    const handleVideoEnd = () => {
      // Replay the video
      if (videoRef.current) {
        videoRef.current.play();
      }
    };

    // Attach the event listener
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', handleVideoEnd);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="home-container">
      <div className="about-us-section">
        <h1>About Us</h1>
        <p>Welcome to our Pottery Studio, where creativity meets craftsmanship. Our studio is a haven for art lovers and pottery enthusiasts. We believe in the beauty of handmade creations and strive to bring you pottery that not only decorates your space but also tells a story.At our studio, each piece is carefully crafted by skilled artisans who pour their passion into every creation. We aim to capture the essence of authenticity, ensuring that every stroke and detail reflects the dedication and artistry of our talented team.</p>
        <p>Explore our collection, and let the artistry of our pottery elevate your surroundings. Whether you're looking for a unique gift or a statement piece for your home, we have something special for every art lover.</p>
      </div>

      <div className="video-section">
        <h1>Our Studio in Action</h1>
        <video autoPlay muted ref={videoRef} width="100%" style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
          <source src={`${process.env.PUBLIC_URL}/images/HomePageVideo.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="contact-us-section">
        <h1>Contact Us</h1>
        <p>Have questions or want to get in touch? Reach out to us!</p>
        <p>
          <Envelope /> Email: <a href="mailto:potterystudio@gmail.com">potterystudio@gmail.com</a>
        </p>
        <p>
          <TelephoneFill /> Phone: +1 242 423 7272
        </p>
        <p>
          <GeoAltFill /> Address: Nybrogade 128, 103 Copenhagen, Denmark
        </p>
      </div>
    </div>
      );
    }
    
    export default ContactPage;