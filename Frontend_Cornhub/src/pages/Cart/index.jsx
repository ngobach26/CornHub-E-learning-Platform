import React, { useEffect, useState } from "react";

import CartCard from "../../components/CartCard";
import Button from "../../components/Button";
import CenterAligned from "../../components/CenterAligned";
import api from "../../services/cartAPI";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Snackbar } from "@mui/material";

const exampleCourses = [
  {
    title: "Introduction to Programming",
    instructor: "John Doe",
    price: "19.99",
    duration: "6 weeks",
    level: "Beginner",
  },
  {
    title: "Web Development Fundamentals",
    instructor: "Jane Smith",
    price: "29.99",
    duration: "8 weeks",
    level: "Intermediate",
  },
  {
    title: "Data Science Basics",
    instructor: "Alex Johnson",
    price: "49.99",
    duration: "10 weeks",
    level: "Advanced",
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuthContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    api.viewCart(user.token).then((cart) => {
      console.log(cart);
      setCartItems(cart);
    });
  }, [user.token]);

  const handleRemoveCartItem = (courseId) => {
    console.log(courseId, cartItems);
    setCartItems((items) => {
      const newCart = [...items];

      return newCart.filter((course) => course._id !== courseId);
    });
  };

  const handleCheckout = async () =>{
    try{
      await api.checkout(user.token);
      setSnackbarMessage("Successfully register!");
      setSnackbarOpen(true);
      setCartItems([]);
    }
    catch (error){
      console.log("No courses: ", error)
      setSnackbarMessage("No courses to checkout");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const renderPurchaseValueAndCTA = () => {
    const total = cartItems?.reduce(
      (acc, course) => acc + parseFloat(course.price),
      0
    );
    return (
      <div className="flex flex-col gap-5 text-left md:w-1/4">
        <div>
          <p>Total :</p>
          <p className="text-4xl font-bold">
            {!total ? "Free" : `$${total.toFixed(2)}`}
          </p>
        </div>
        <Button
          className="w-full py-3"
          onClick={handleCheckout}
          // loading={checkoutLoading}
        >
          Checkout
        </Button>
      </div>
    );
  };

  const renderCart = () => {
    return (
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <div className="flex flex-col gap-5">
          {cartItems?.map((c, i) => (
            <CartCard course={c} key={i} onRemove={handleRemoveCartItem} />
          ))}
        </div>
        {renderPurchaseValueAndCTA()}
      </div>
    );
  };

  return (
    <>
      <div className="max-w-[1300px] px-10 mx-auto my-10 xl:px-0">
        <h1 className="mb-5 text-2xl font-semibold text-left">Shopping Cart</h1>
        {renderCart()}
      </div>
      <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
      />
    </>
    
  );
}
