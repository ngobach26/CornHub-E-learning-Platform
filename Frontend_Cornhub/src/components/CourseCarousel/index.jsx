import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import CourseInfoCard from "../CourseInfoCard";
import ShimmerBlock from "../ShimmerBlock";

const CourseCarousel = ({ data }) => {
  // const { data } = props;

  const renderSlides = () => {
    const coursesArray = Object.values(data.courses || {});
    return (
      <>
        {coursesArray.map(course => (
          <SwiperSlide key={course._id}>
            <CourseInfoCard course={course} />
          </SwiperSlide>
        ))}
      </>
    );
  };

  const renderTitle = () => {
      // return <p className="text-2xl font-semibold">{`${title} Courses`}</p>;
      return <p className="px-8 text-2xl font-semibold text-left"> course title </p>;

    // }
  };

  const renderSwiper = () => {
    return (
      <div className="my-8">
        <div className="mb-3">{renderTitle()}</div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-1">
          {renderSlides()}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return renderSwiper();
  };

  return renderContent();
};

export default CourseCarousel;