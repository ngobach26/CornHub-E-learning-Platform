import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addToCart } from "../../services/cartAPI";
import Button from "../Button";

const CourseCTA = ({ isPurchased, courseID }) => {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    await addToCart(courseID);
    navigate("/cart");
  };

  

  return (
    <div className="flex gap-3 my-3">
      {isPurchased ? (
        <Button
          label="Go to course"
          className="w-full py-3 font-semibold"
          // onClick={handleLearnClick}
        />
      ) : (
        <Button
          label="Add to cart"
          className="w-full py-3 font-semibold"
          onClick={handleAddToCart}
        />
      )}
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
