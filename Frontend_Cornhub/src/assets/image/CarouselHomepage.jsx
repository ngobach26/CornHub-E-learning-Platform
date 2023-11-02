import React from "react";

const customImageStyle = {
  maxHeight: "400px", 
  width: "1300px", 
};

const CarouselHomepage = {
  firstPicture: (
    <img
      alt="firstPic"
      src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      style={customImageStyle}
    />
  ),
  secondPicture: (
    <img
      alt="secondPic"
      src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=2022&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      style={customImageStyle}
    />
  ),
  thirdPicture: (
    <img
      alt="thirdPic"
      src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      style={customImageStyle}
    />
  ),
};

export default CarouselHomepage;