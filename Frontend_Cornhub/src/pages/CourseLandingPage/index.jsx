import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LanguageIcon from "@mui/icons-material/Language";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

import Description from "../../components/CourseLandingPage/Description";
import Highlights from "../../components/CourseLandingPage/Highlights";
import Instructors from "../../components/CourseLandingPage/Instructors";
import Points from "../../components/CourseLandingPage/Points";

import Meta from "../../components/Meta";
import Reviews from "../../components/Reviews";
import VideoPlayer from "../../components/VideoPlayer";
import CourseCTA from "../../components/CourseCTA";

const exampleCourse = {
  category: "Development",
  subcategory: "Web development",
  duration: "21:05:00",
  title: "Title Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  subtitle: "subtitle Lorem ipsum dolor sit amet consectetur adipisicing elit adipisicing elit adipisicing elit adipisicing elit",
  instructor: "hello123",
  numChapters: 3,
  courseurlPreview: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
  courseHighlights: [
    { points: 'Deep understanding of React Fundamentals, Advanced Topics and Hooks' },
    { points: 'Learn the most popular packages that work with React like React Redux' },
    { points: 'Understand why React code is written the way it is written' },
  ],
  requirements: [
    { points: 'HTML, CSS and JavaScript fundamentals are absolutely required' },
    { points: 'You DO NOT have to be a JavaScript expert to take up this course' },
    { points: 'NO prior React or any other JS framework experience is required!' },
  ],
  description: `
    This comprehensive course is designed to introduce you to the world of web development. 
    Whether you're a beginner or have some experience, this course will cover HTML, CSS, 
    and JavaScript to build interactive and responsive websites. By the end of the course, 
    you'll have the skills to create your own web projects and a strong foundation for further learning. 
    Further learning. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sunt veritatis provident! 
    A optio eaque totam quibusdam minima sint distinctio in itaque dolore iusto, natus assumenda voluptatem 
    quos ipsam commodi? Further learning. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Eos sunt veritatis provident! A optio eaque totam quibusdam minima sint distinctio in itaque dolore iusto, 
    natus assumenda voluptatem quos ipsam commodi? Further learning. Lorem ipsum dolor sit amet consectetur 
    adipisicing elit. Eos sunt veritatis provident! A optio eaque totam quibusdam minima sint distinctio 
    in itaque dolore iusto, natus assumenda voluptatem quos ipsam commodi? Further learning. 
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sunt veritatis provident! 
    A optio eaque totam quibusdam minima sint distinctio in itaque dolore iusto, natus assumenda voluptatem 
    quos ipsam commodi?.
  `,
  targetAudience: [
    { points: 'Web developers interested in learning React and its ecosystem' },
    { points: 'Loser' },
    { points: 'Vozer' },
    { points: 'IT sinh nam 96' },
  ],
};

export default function CourseLandingPage() {
  const renderHeader = () => {
    return (
      <div className="pt-8 pb-12 text-sm bg-sky-400 lg:h-80">
        <div className="flex justify-between w-9/12 mx-auto xl:w-18/25">
          <div className="w-11/12 mx-auto md:w-3/4 lg:w-61/100 lg:m-0">
            <p className="flex items-center my-3 text-sm">
              {exampleCourse?.category}{" "}
              
              <NavigateNextIcon fontSize="small" className="text-sm" />
              {exampleCourse?.subcategory}
            </p>
            <div className="block lg:hidden">
              <VideoPlayer url={exampleCourse?.courseurlPreview} />
            </div>
            <div className="flex flex-col gap-2 my-5 text-left">
              <h1 className="text-3xl font-medium">
                {exampleCourse?.title}{" "}
              </h1>
              <h1 className="text-lg">
                {exampleCourse.subtitle}{" "}
              </h1>
            </div>
            <div className="flex gap-3 text-sm divide-x divide-solid">
              <p>
                Course Creator:{" "}
                {/* <span className="font-bold">{getInstructors(course)}</span> */}
                <span className="font-bold">{exampleCourse.instructor}</span>
              </p>
              <p className="flex items-center gap-2 pl-3">
                <LanguageIcon fontSize="small" /> English
              </p>
            </div>
            <div className="block mt-8 lg:hidden">
              {/* <CourseCTA course={course} /> */}
              <CourseCTA />
            </div>
          </div>
          {renderSidebar()}
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="hidden text-black lg:block w-96">
        <VideoPlayer url={exampleCourse.courseurlPreview} />
        {/* video can be added later */}
        <div className="px-6 py-8 bg-white shadow-md">
          {/* <CourseCTA course={course} /> */}
          <CourseCTA />
          <div>
            <p className="mt-8 mb-3 font-bold text-left">
              This course includes:
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <p className="flex items-center gap-3">
                <OndemandVideoIcon fontSize="small" />
                21 hours+ on-demand video
              </p>
              <p className="flex items-center gap-3">
                <AllInclusiveIcon fontSize="small" />
                Full lifetime access
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCourseContent = () => {
    return (
      <div className="text-left">
        <h3 className="mb-4 text-2xl font-bold">Course curriculum</h3>
        {/* <p className="mb-3 text-sm">
          {course?.curriculum.length} chapters &#8226; {course?.duration} total
          duration
        </p> */}
        <p className="mb-3 text-sm">
          {exampleCourse.numChapters} chapters &#8226; {exampleCourse.duration} total duration
        </p>
        {/* <CurriculumAccordion viewOnly /> */}
      </div>
    );
  };

  return (
    <>
      {renderHeader()}
      <div className="flex justify-between w-9/12 py-10 mx-auto text-left xl:w-18/25">
        <div className="flex flex-col mx-auto w-17/18 gap-14 md:w-2/3 lg:w-62/100 lg:m-0">
          {/* <Highlights highlights={course?.highlights} /> */}
          <Highlights highlights={exampleCourse.courseHighlights} />
          {renderCourseContent()}
          {/* <Points data={course?.prerequisites} title="Requirements" /> */}
          <Points title="Requirements" data={exampleCourse.requirements} />
          {/* <Description description={course?.description} /> */}
          <Description description={exampleCourse.description} />
          {/* <Points
              data={course?.targetAudience}
              title="Who this course is for:"
            /> */}
          <Points data={exampleCourse.targetAudience} title="Who this course is for:" />
          {/* <Instructors data={course?.instructors} /> */}
          {/* <Reviews
              url={`http://localhost:3000/course/${slug}`}
              id={course?.id}
              title={slug}
            /> */}
          <Reviews />
        </div>
      </div>
      {/* </Layout> */}
    </>
  );
}