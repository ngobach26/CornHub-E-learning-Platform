import React from "react";
import CourseInfoPopover from "../CourseInfoPopover";
import DefaultCourse from "../../assets/image/DefaultCourse";

const CourseInfoCard = (props) => {
  const { course } = props;
  
  return (
    <CourseInfoPopover course={course}>
      {/* <div onClick={handleClick} className='cursor-pointer'> */}
      <div className="cursor-pointer">
        <DefaultCourse />
        <div className="pb-3 text-base">
          <h2>{course.title}</h2>
          {/* <h2>Course title</h2> */}
          <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet</p>
          <p className="font-medium">
            {course?.pricing === 'Free'
              ? 'Free'
              : `${course.currency} ${course.price}`}
          </p>
        </div>
      </div>
    </CourseInfoPopover>
  );
};

export default CourseInfoCard;