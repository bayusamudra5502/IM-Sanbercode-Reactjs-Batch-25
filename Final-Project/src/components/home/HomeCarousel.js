import React from "react";
import { Carousel } from "antd";

function HomeCarousel() {
  return (
    <Carousel autoplay dotPosition="bottom">
      <div className="carousel-item">
        <div className="carousel-content">Halo</div>
      </div>
      <div className="carousel-item">
        <div className="carousel-content">Haii</div>
      </div>
      <div className="carousel-item">
        <div className="carousel-content">Hai Halo</div>
      </div>
    </Carousel>
  );
}

export default HomeCarousel;
