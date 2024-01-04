import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import CourseInfoCard from "../CourseInfoCard";
import ShimmerBlock from "../ShimmerBlock";

const CourseCarousel = (props) => {
  const { data, title, loading } = props;

  const renderSlides = () => {
    // if (loading) {
      return new Array(5).fill(1).map((item, id) => (
        <SwiperSlide key={id}>
          {/* <ShimmerBlock className="w-full h-36" /> */}
          <CourseInfoCard />
        </SwiperSlide>
      ));
    // }

    // return data?.map((course, index) => (
    //   <SwiperSlide key={index}>
    //     <CourseInfoCard course={course} />
    //   </SwiperSlide>
    // ));
  };

  const renderTitle = () => {
    // if (title) {
    //   if (loading) {
    //     return <ShimmerBlock className="h-6 rounded w-72" />;
    //   }

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
    // if (loading || data?.length) {
      return renderSwiper();
    // }

    // if (!loading && !data?.length) {
    //   return null;
    // }
  };

  return renderContent();
};

export default CourseCarousel;