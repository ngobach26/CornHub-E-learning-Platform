import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseInfoPopover from "../CourseInfoPopover";
import DefaultCourse from "../../assets/image/DefaultCourse";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

const CourseInfoCard = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { course, isPurchased, isInCart } = props;
  const baseURL = "http://localhost:3000/uploads/";

  const handleClick = () => {
    navigate(`/course/${course._id}`);
  };

  const StarRating = ({ rating_star }) => {
    const stars = Array.from({ length: 5 }, (_, idx) => {
      const val = idx + 0.5;
      return (
        <span key={idx} className="text-yellow-500 mr-0.5 text-base">
          {rating_star >= idx + 1 ? (
            <BsStarFill />
          ) : rating_star >= val ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
      );
    });

    return (
      <div className="flex">{stars}</div> // Apply flex here to make the stars line up horizontally
    );
  };

  return (
    <CourseInfoPopover course={course} isPurchased={isPurchased} isInCart={isInCart}>
      <div
        onClick={handleClick}
        className="cursor-pointer bg-white rounded-lg shadow-lg p-4 transition duration-300 hover:shadow-2xl"
      >
        {course.coverImage ? (
          <img
            src={baseURL + course.coverImage}
            alt={course.courseTitle}
            className="w-250 h-115 rounded-md"
          />
        ) : (
          <DefaultCourse />
        )}
        <div className="mt-4 text-left">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {course.courseTitle}
          </h2>
          <p className="text-sm text-gray-600">
            by{" "}
            {course.author
              ? `${course.author.firstName} ${course.author.lastName}`
              : "Unknown Author"}
          </p>
          <div className="flex items-center mt-1 space-x-1">
            <span className="text-yellow-600 text-xl font-semibold">
              {course.totalRating}
            </span>
            <StarRating rating_star={course.totalRating} />
            <span className="text-sm text-gray-500">({course.numRating})</span>
          </div>
          <p className="text-md font-semibold mt-2">
            {course.price === 0 ? "Free" : `$ ${course.price}`}
          </p>
        </div>
      </div>
    </CourseInfoPopover>
  );
};

export default CourseInfoCard;
