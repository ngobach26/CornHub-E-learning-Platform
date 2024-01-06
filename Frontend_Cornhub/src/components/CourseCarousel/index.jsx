import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import CourseInfoCard from "../CourseInfoCard";
import ShimmerBlock from "../ShimmerBlock";

const CourseCarousel = ({ data, purchasedCourses }) => {
  // const { data } = props;
  const categories = ["Information Technology", "Business", "Finance and accouting", "Editing and design", "Music", "Fitness", "Self development"]
  const coursesArray = data.courses ? data.courses : [];

  const renderSlides = (filteredCourses) => {    
    const isPurchased = (id) => {
      for (let purchasedCourse in purchasedCourses){
        if (purchasedCourse.courseId && purchasedCourse.courseId._id===id) return true;
      }
      return false;
    }
    return (
      <>
        {filteredCourses.map(course => (
          <SwiperSlide key={course._id}>
            <CourseInfoCard course={course} isPurchased={isPurchased(course._id)}/>
          </SwiperSlide>
        ))}
      </>
    );
  };

  const renderTitle = (category) => {
      // return <p className="text-2xl font-semibold">{`${title} Courses`}</p>;
      return <p className="px-8 text-2xl font-semibold text-left"> {category} courses </p>;

    // }
  };

  const renderSwiper = () => {
    return (
      <div className="my-8">
        {categories.map(category => {
          const filteredCourses = coursesArray.filter(course => course.category == category);
          return (
            <div className="my-8">
              <div className="mb-3">{renderTitle(category)}</div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-1">
                {renderSlides(filteredCourses)}
              </div>
            </div>
          )
        })}
      </div>
    );
  };

  const renderContent = () => {
    return renderSwiper();
  };

  return renderContent();
};

export default CourseCarousel;