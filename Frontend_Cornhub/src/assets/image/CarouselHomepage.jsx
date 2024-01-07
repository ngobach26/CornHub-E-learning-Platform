import React from "react";

const customImageStyle = {
  maxHeight: "450px", 
  width: "1200px", 
};

const CarouselHomepage = {
  firstPicture: (
    <img
      alt="firstPic"
      src="/banner1.jpg"
      style={customImageStyle}
    />
  ),
  secondPicture: (
    <img
      alt="secondPic"
      src="/banner2.jpg"
      style={customImageStyle}
    />
  ),
  thirdPicture: (
    <img
      alt="thirdPic"
      src="/banner3.jpg"
      style={customImageStyle}
    />
  ),
  fourthPicture: (
    <img
      alt="thirdPic"
      src="/banner4.jpg"
      style={customImageStyle}
    />
  ),
};

export default CarouselHomepage;