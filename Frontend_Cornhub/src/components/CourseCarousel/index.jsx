import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Carousel from "react-multi-carousel"
import 'react-multi-carousel/lib/styles.css'

import CourseInfoCard from "../CourseInfoCard";

const CourseCarousel = ({ publishedCourses, purchasedCourses, cart }) => {
  // const { data } = props;
  const categories = ["Information Technology", "Business", "Finance and accouting", "Editing and design", "Music", "Fitness", "Self development"]
  const coursesArray = publishedCourses;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const renderSlides = (filteredCourses) => {    
    const isPurchased = (id) => {
      for (let purchasedCourse of purchasedCourses){
        if (purchasedCourse.courseId && purchasedCourse.courseId._id===id) return true;
      }
      return false;
    }

    const isInCart = (id) => {
      for (let inCart of cart){
        if (inCart._id===id) return true;
      }
      return false;
    }
    return (
      <Carousel responsive={responsive} showDots={true}>
        {filteredCourses.map((course) => (
          <SwiperSlide key={course._id}>
            <CourseInfoCard 
              course={course} 
              isPurchased={isPurchased(course._id)} 
              isInCart={isInCart(course._id)}
            />
          </SwiperSlide>
        ))}
      </Carousel>
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
            <div className="my-8" key={category}>
              <div className="mb-3">{renderTitle(category)}</div>              
              {renderSlides(filteredCourses)}              
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