import React from 'react';
import '../../css/Gallery.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
// ... (previous imports)


function GalleryPage() {
  return (
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
          <Link to="/Shopping">
            <button className="shop-button">Loved our Pottery? Shop yours!</button>
          </Link>
        </div>
    </div>
  );
}

export default GalleryPage;