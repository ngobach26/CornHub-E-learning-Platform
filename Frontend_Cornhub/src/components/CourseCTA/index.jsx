import React from "react";
// import { useSelector, useDispatch } from "react-redux";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Button from "../Button";
// only demo, no interaction yet
const CourseCTA = () => {
  return (
    <div className="flex gap-3 my-3">
      <Button
        label="Go to course"
        className="w-full py-3 font-semibold"
        //   onClick={handleLearnClick}
      />
      {/* <Button
        label="Add to cart"
        className="w-full py-3 font-semibold"
        //   loading={addRemoveCartLoading}
        //   onClick={handleAddToCart}
      />
      <Button
        label="Go to cart"
        className="w-full py-3 font-semibold"
        //   loading={addRemoveCartLoading}
        //   onClick={handleGotoCart}
      /> */}
      {/* <Button
        variant="outlined"
        //   onClick={handleAddToWishlist}
        //   loading={addRemoveWishlistLoading}
      >
        <FavoriteBorderIcon />
      </Button> */}
      <Button
        variant="outlined"
        //   onClick={handleRemoveFromWishlist}
        //   loading={addRemoveWishlistLoading}
      >
        <FavoriteIcon />
      </Button>
    </div>
  );
};
export default CourseCTA;