import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import api from "../../services/cartAPI";
import Button from "../Button";
import { useAuthContext } from "../../hooks/useAuthContext";

const CourseCTA = ({ isPurchased, courseID, isInCart }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleAddToCart = async () => {
    try{
      if (user){
        await api.addToCart(user.token, courseID);
        console.log(user.token)
        navigate("/cart");
      }
      else {
        navigate("/login")
      }
      
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
    
  };

  const handleLearnClick = async () => {
    navigate(`/course/${courseID}/learn`);
    
  };

  const handleGoToCart = async () => {
    navigate('/cart');
    
  };

  return (
    <div className="flex gap-3 my-3">
      {isPurchased ? (
        <Button
          label="Go to course"
          className="w-full py-3 font-semibold"
          onClick={handleLearnClick}
        />
      ) : isInCart ? (
        <Button
          label="Go to cart"
          className="w-full py-3 font-semibold"
          onClick={handleGoToCart}
        />
      ) : (
        <Button
          label="Add to cart"
          className="w-full py-3 font-semibold"
          onClick={handleAddToCart}
        />)}
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
