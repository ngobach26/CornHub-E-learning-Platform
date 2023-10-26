import React from "react";
import CarouselHomepage from '../../assets/image/CarouselHomepage';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CarouselComp = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showArrows
      showThumbs={false}
      showStatus={false}
    >
      <div>
        {CarouselHomepage.firstPicture}
      </div>
      <div>
        {CarouselHomepage.secondPicture}
      </div>
      <div>
        {CarouselHomepage.thirdPicture}
      </div>
    </Carousel>
  );
};

export default CarouselComp;