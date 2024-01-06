import React from "react";
import CartImg from "../../assets/image/CartImg";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../services/cartAPI";

const CartCard = ({ course, onRemove }) => {
  const removeCourse = async () => {
    const courseId = course._id;
    await removeFromCart(courseId);
    onRemove?.(courseId);
  };

  return (
    <div className="flex flex-col justify-between gap-5 p-2 border border-solid rounded-md md:flex-row border-border">
      <Link to="">
        <div className="flex text-left cursor-pointer">
          <CartImg />
          <div className="px-2">
            <h2 className="font-medium">{course.courseTitle}</h2>
            <p className="text-sm text-gray-400">By: {course.authorName}</p>
            <div className="flex mt-3 text-xs text-gray-400 divide-x">
              <p className="pr-2">{course.category}</p>
              <p className="px-2">{course.language}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-2 px-10 items-end">
        <p className="font-semibold text-primary">${course.price}</p>
        <div className="text-sm">
          <button
            className="text-red-600 cursor-pointer"
            onClick={removeCourse}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
