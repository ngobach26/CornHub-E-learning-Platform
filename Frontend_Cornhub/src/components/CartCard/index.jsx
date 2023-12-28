import React from "react";
import CartImg from "../../assets/image/CartImg";
import { Link } from "react-router-dom";

const CartCard = (props) => {
  const { course } = props;
  return (
    <div className="flex flex-col justify-between gap-5 p-2 border border-solid rounded-md md:flex-row border-border">
      <Link to="">
        <div className="flex text-left cursor-pointer">
          <CartImg />
          <div className="px-2">
            <h2 className="font-medium">{course.title}</h2>
            <p className="text-sm text-gray-400">{course.instructor}</p>
            <div className="flex mt-3 text-xs text-gray-400 divide-x">
              <p className="pr-2">{course.duration}</p>
              <p className="px-2">{course.level}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex gap-16 px-10">
        <div className="text-sm">
          <button className="text-red-600 cursor-pointer ">Remove</button>
        </div>
        <p className="font-semibold text-primary">${course.price}</p>
      </div>
    </div>
  );
};

export default CartCard;