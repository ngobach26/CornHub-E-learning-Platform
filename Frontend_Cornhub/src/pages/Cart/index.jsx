import React, { useEffect } from "react";

import CartCard from "../../components/CartCard";
import Button from "../../components/Button";
import CenterAligned from "../../components/CenterAligned";

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
  const renderPurchaseValueAndCTA = () => {
    const total = exampleCourses.reduce((acc, course) => acc + parseFloat(course.price), 0);
    return (
      <div className="flex flex-col gap-5 text-left md:w-1/4">
        <div>
          <p>Total :</p>
          <p className="text-4xl font-bold">{!total ? 'Free' : `$${total.toFixed(2)}`}</p>
        </div>
        <Button
          className="w-full py-3"
          // onClick={handleCheckout}
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
          {exampleCourses.map((c, i) => (
            <CartCard course={c} key={i} />
          ))}
        </div>
        {renderPurchaseValueAndCTA()}
      </div>
    );
  };

  return (
    <div className="max-w-[1300px] px-10 mx-auto my-10 xl:px-0">
      <h1 className="mb-5 text-2xl font-semibold text-left">Shopping Cart</h1>
      {renderCart()}
    </div>
  );
}