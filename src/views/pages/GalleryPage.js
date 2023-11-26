import React from 'react';
import '../../css/Gallery.css'; // Import your CSS file for styling
import { Carousel } from 'react-bootstrap';

function GalleryPage() {
  return (
    <div className="gallery-container">
      <h2>Gallery</h2>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Image 1</h3>
            <p>Caption for Image 1.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Image 2</h3>
            <p>Caption for Image 2.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Image 3</h3>
            <p>Caption for Image 3.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default GalleryPage;