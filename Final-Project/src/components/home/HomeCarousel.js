import React from "react";
import { Carousel } from "antd";

import img1 from "../../assets/img/home-1.jpg";
import img2 from "../../assets/img/home-2.jpg";
import img3 from "../../assets/img/home-3.jpg";

function HomeCarousel() {
  return (
    <div className="carousel-wrapper">
      <Carousel autoplay dotPosition="bottom">
        <div className="carousel-item">
          <img
            src={img1}
            alt="Gambar Ilustrasi 1"
            style={{ bottom: "500px" }}
          />
          <div className="carousel-overlay"></div>
        </div>
        <div className="carousel-item">
          <img
            src={img2}
            alt="Gambar Ilustrasi 2"
            style={{ bottom: "250px" }}
          />
          <div className="carousel-overlay"></div>
        </div>
        <div className="carousel-item">
          <img
            src={img3}
            alt="Gambar Ilustrasi 3"
            style={{ bottom: "250px" }}
          />
          <div className="carousel-overlay"></div>
        </div>
      </Carousel>
      <div className="carousel-message">
        <h1>Cari dan Temukan</h1>
        <p>Review Game dan Film terbaru pada Movimepedia</p>
      </div>
    </div>
  );
}

export default HomeCarousel;
