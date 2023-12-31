import React, { useState, useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useLocation } from "react-router-dom";

import CenterAligned from "../CenterAligned";
import CourseDetails from "./CourseDetails";
import CreateCurriculum from "./CreateCurriculum";
import IntendedLearners from "./IntendedLearners";
import Pricing from "./Pricing";
import Settings from "./Setting";

import api from "../../services/instructorAPI";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ManageCourse() {
  const { user } = useAuthContext();
  const location = useLocation();
  const activePath = new URLSearchParams(location.search).get("tab");
  const [courseId, setCourseId] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await api.getPublishedCourse(user.token);
        setCourseId(courseData._id); 
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, []);
  
  const menu = [
    {
      icon: InfoOutlinedIcon,
      label: "Course Details",
      query: "d",
    },
    {
      icon: TocOutlinedIcon,
      label: "Curriculum",
      query: "c",
    },
    {
      icon: PeopleOutlinedIcon,
      label: "Intended learners",
      query: "l",
    },
    {
      icon: MonetizationOnOutlinedIcon,
      label: "Pricing",
      query: "p",
    },
    {
      icon: SettingsOutlinedIcon,
      label: "Settings",
      query: "s",
    },
  ];

  const renderBody = () => {
    switch (activePath) {
      case "d":
        return <CourseDetails />;
      case "c":
        return <CreateCurriculum />;
      case "l":
        return <IntendedLearners />;
      case "p":
        return <Pricing />;
      case "s":
        return <Settings />;
      default:
        return <CourseDetails />;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-16 text-black bg-blue-400 h-14 md:px-12 shadow-[rgba(0,_0,_0,_0.3)_0px_2px_20px]">
        <div className="flex items-center gap-4">
          <Link to="/instructor/courses">
            <ArrowBackIcon className="cursor-pointer" />
          </Link>
          <h2 className="text-lg font-semibold">Course title</h2>
        </div>
      </div>
      <div className="flex flex-col gap-5 px-3 lg:flex-row lg:px-12 lg:py-5">
        <div className="grid justify-between grid-cols-2 gap-3 mt-5 sm:grid-cols-4 lg:w-1/6 lg:flex lg:flex-col lg:mt-14 h-max">
          {menu.map((item, index, course) => (
            <Link key={index} to={`/instructor/courses/manage/?tab=${item.query}&id=${course._id}`}>
              <div
               key={index}
                className={`flex gap-3 cursor-pointer p-2 hover:bg-blue-200 ${
                  activePath === item.query ? "bg-hoverBg" : ""
                }`}
              >
                <item.icon />
                {item.label}
              </div>
            </Link>
          ))}
        </div>
        {/* <div className="w-full p-3 shadow-lg lg:p-5">{renderBody()}</div> */}
        <div className="w-full p-3 shadow-lg lg:p-5"></div>

      </div>
    </>
  );
}
