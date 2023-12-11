import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { Envelope, TelephoneFill, GeoAltFill } from 'react-bootstrap-icons';  // Import Bootstrap icons
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../css/HomePage.css';
import '../../css/Gallery.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

function HomePage() {
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
      <Slider {...settings}>
        {/* Slideshow slides */}
        {/* Slide 1 */}
        <div className="slide">
          <div className="slide-image">
            <img
              src={`${process.env.PUBLIC_URL}/images/slideshow-image2.jpg`}
              alt="Pottery Studio Slideshow"
              title="Pottery Studio Slideshow"
              className="carousel-image"
            />
            <div className="carousel-caption">
              <h1>Welcome to Refined Pottery</h1>
              <p>Elevate your living with the charm of handmade pottery. Explore our collection and bring home a touch of artistry</p>
            </div>
          </div>
        </div>
        {/* Slide 2 */}
        <div className="slide">
          <div className="slide-image">
            <img
              src={`${process.env.PUBLIC_URL}/images/slideshow-image.jpg`}
              alt="Pottery Studio Slideshow"
              title="Pottery Studio Slideshow"
              className="carousel-image"
            />
            <div className="carousel-caption">
              <h1>Authenticity is our signature</h1>
              <p>Experience the true essence of handcrafted pottery, where each stroke of the artist's hand adds character and charm</p>
            </div>
          </div>
        </div>
      </Slider>

      { /* Resetting the page */}
    <div className="gallery-container">
      <h1 className="gallery-heading">Pottery Gallery</h1>

      <div className="carousels-container">
        {/* First Carousel */}
        <Carousel controls={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`${process.env.PUBLIC_URL}/images/porcelain.jpg`}
              alt="Porcelain"
            />
            <p className="Caption"> 
              <h3>Porcelain</h3>
              <p>Beautiful porcelain pottery.</p>
            </p>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`${process.env.PUBLIC_URL}/images/StoneWare.jpg`}
              alt="StoneWare"
            />
            <p className="Caption"> 
              <h3>StoneWare</h3>
              <p>Durable and elegant stoneware pottery.</p>
            </p>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`${process.env.PUBLIC_URL}/images/Earth.jpg`}
              alt="Earthenware"
            />
            <p className="Caption"> 
              <h3>Earthenware</h3>
              <p>Natural and rustic earthenware pottery.</p>
            </p>
          </Carousel.Item>
        </Carousel>

        {/* Second Carousel */}
        <Carousel controls={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`${process.env.PUBLIC_URL}/images/BoneChina.jpg`}
              alt="BoneChina"
            />
            <p className="Caption"> 
              <h3>BoneChina</h3>
              <p>Elegant and delicate bone china pottery.</p>
            </p>
          </Carousel.Item>
          

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`${process.env.PUBLIC_URL}/images/AgateWare.jpg`}
              alt="AgateWare"
            />
            <p className="Caption"> 
              <h3>AgateWare</h3>
              <p>Unique and vibrant agate ware pottery.</p>
            </p>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`${process.env.PUBLIC_URL}/images/Majolica.jpg`}
              alt="Majolica"
            />
            <p className="Caption"> 
              <h3>Majolica</h3>
              <p>Colorful and decorative majolica pottery.</p>
            </p>
          </Carousel.Item>
        </Carousel>

      </div>
      <div className="shop-button-container">
          {/* Use Link to navigate to the Shopping page */}
          <Link to="/shop">
            <button className="shop-button">Loved our Pottery? Shop yours!</button>
          </Link>
        </div>
    </div>
    </div>
  );
}

export default HomePage;
