import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseInfoPopover from "../CourseInfoPopover";
import DefaultCourse from "../../assets/image/DefaultCourse";

const CourseInfoCard = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { course } = props;
  
  const handleClick = () => {
      navigate(`/course/${course._id}`);
  };
  
  return (
    <CourseInfoPopover course={course}>
      <div onClick={handleClick} className='cursor-pointer'>
        <DefaultCourse />
        <div className="pb-3 mx-5 text-base text-left">
          <h2>{course.courseTitle}</h2>
          {/* <p className="text-sm text-gray-400">Lecturer insert here</p> */}
          <p className="text-sm font-medium">
            {course.price === 0 ? "Free" : `$ ${course.price}`}
          </p>
        </div>
      </div>
    </CourseInfoPopover>
  );
};

export default CourseInfoCard;