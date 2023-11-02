import React from "react";
// import Image from "next/image";
// import { useRouter } from 'next/router';
import CourseInfoPopover from "../CourseInfoPopover";

// import Books from 'public/assets/books.svg';

const CourseInfoCard = (props) => {
  //   const router = useRouter();
  const { course } = props;

  //   const handleClick = () => router.push(`/course/${course.slug}`);

  return (
    <CourseInfoPopover course={course}>
      {/* <div onClick={handleClick} className='cursor-pointer'> */}
      <div className="cursor-pointer">
        {/* <Image alt="books" width="300" height="170" /> */}
        <div className="pb-3 text-base">
          {/* <h2>{course.title}</h2> */}
          <h2>Course title</h2>
          <p className="text-sm text-labelText">Lorem ipsum dolor sit amet</p>
          <p className="font-medium">
            {/* {course?.pricing === 'Free'
              ? 'Free'
              : `${course.currency} ${course.price}`} */}
            Free
          </p>
        </div>
      </div>
    </CourseInfoPopover>
  );
};

export default CourseInfoCard;