import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classnames from "classnames";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import CurriculumAccordion from "../../components/Curriculum/CurriculumAccordion";
import CourseNavbar from "../../components/CourseNavbar";
import VideoPlayer from "../../components/VideoPlayer";
import CenterAligned from "../../components/CenterAligned";
import Quiz from "../../components/Quiz";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

import api from "../../services/instructorAPI";

export default function CourseLearningPage() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [showSidebar, setShowSidebar] = useState(true);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [curriculumItems, setCurriculumItems] = useState([]);
  const [embedUrl, setEmbedUrl] = useState(null);
  const [lessonDisplay, setLessonDisplay] = useState();
  const [lessonType, setLessonType] = useState("");
  const [quizData, setQuizData] = useState([]);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        if (user){
          const course = await api.getCourseById(user.token, id);
          setCurriculumItems(course.contents);
          setCourseTitle(course.courseTitle);
          setCourseId(course._id);
          console.log(courseId);
        }
        else {
          navigate(`/course/${id}`);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourseDetails();
  }, [id, user?.token]);

  const handleVideoClick = (videoUrl) => {
    setEmbedUrl(videoUrl);
  };

  const handleQuizClick = (data) => {
    setQuizData(data);
  }

  const handleLessonDisplay = (title) => {
    setLessonDisplay(title);
  };

  const lessonTypeCheck = (type) => {
    setLessonType(type);
  };

  const renderMainContent = () => {
    if (lessonType === "video") {
      return (
        <>
          <VideoPlayer url={embedUrl} />
        </>
      );
    }
    if (lessonType === "quiz") {
      console.log(quizData);
      return (
        <Quiz quizData={quizData} />
      );
    }
  };

  return (
    <div>
      <CourseNavbar title={courseTitle} id={id} />
      <div className="flex h-auto overflow-auto text-base overscroll-auto">
        <div
          className={classnames({
            "w-full lg:w-4/5": showSidebar,
            "w-full": !showSidebar,
          })}
        >
          <div className="relative">
            {renderMainContent()}
            {!showSidebar && (
              <IconButton
                size="large"
                color="inherit"
                aria-label="back"
                onClick={toggleSidebar}
                className="absolute z-50 bg-gray-200 top-2 right-2 hover:bg-gray-200 drop-shadow-md"
              >
                <KeyboardBackspaceIcon />
              </IconButton>
            )}
          </div>
          <div
            className={classnames("mx-5 md:mx-16 lg:mx-40 mt-5 md:mt-10", {
              "lg:hidden": showSidebar,
            })}
          >
            {lessonType === "video" && (
              <div className="my-3">
                You are watching{" "}
                <span className="font-bold">{lessonDisplay}</span>
              </div>
            )}
            <CurriculumAccordion
              curriculumItems={curriculumItems}
              handleVideoClick={handleVideoClick}
              handleQuizClick={handleQuizClick}
              handleLessonDisplay={handleLessonDisplay}
              lessonTypeCheck={lessonTypeCheck}
            />
          </div>
        </div>
        {showSidebar && (
          <div className="hidden lg:block lg:w-1/4 lg:sticky lg:top-0">
            <div className="flex items-center justify-between px-4">
              <p className="font-semibold">Content</p>
              <IconButton aria-label="close" onClick={toggleSidebar}>
                <CloseIcon />
              </IconButton>
            </div>{" "}
            <div
              className="overflow-auto overscroll-auto"
              style={{ height: "600px" }}
            >
              {" "}
              <CurriculumAccordion
                curriculumItems={curriculumItems}
                handleVideoClick={handleVideoClick}
                handleQuizClick={handleQuizClick}
                handleLessonDisplay={handleLessonDisplay}
                lessonTypeCheck={lessonTypeCheck}
              />
              {lessonType === "video" && (
                <div>
                  You are watching{" "}
                  <span className="font-bold">{lessonDisplay}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}