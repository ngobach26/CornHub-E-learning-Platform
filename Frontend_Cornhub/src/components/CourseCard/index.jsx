import React from "react";
import DefaultCourse from "../../assets/image/DefaultCourse";

const CourseCard = (props) => {
  const { course, handleClick, hoverText } = props;

  return (
    <div className="relative">
      <div className="overflow-hidden border border-solid rounded-md cursor-pointer border-border">
        <DefaultCourse />
        <div className="px-2 py-2 pb-3">
          <h2 className="text-left">{course.courseTitle}</h2>
          <p className="text-left text-gray-600">{course.category}</p>
        </div>
      </div>
      <div
        className="absolute top-0 flex items-center justify-center w-full h-full opacity-0 cursor-pointer backdrop-blur-md hover:opacity-90"
        onClick={handleClick}
      >
        <p>{hoverText}</p>
      </div>
    </div>
  );
};

export default CourseCard;
