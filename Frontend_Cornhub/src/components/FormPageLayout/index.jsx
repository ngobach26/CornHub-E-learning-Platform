import React from "react";
import classnames from "classnames";
import { useState, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate, useParams } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import api from "../../services/instructorAPI";
import Button from "../Button";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function FormPageLayout(props) {
  // const { title, loading, handleSave, containerClass } = props;
  const { user } = useAuthContext(); 
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseDetail, setCourseDetails] = useState({
    courseTitle: "",
  });
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const getCourse = await api.getCourseById(user.token, id);
        setCourseDetails({
          courseTitle: getCourse.courseTitle || "",
        });
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourseDetails();
  }, [id, user.token]);
  const menu = [
    {
      icon: InfoOutlinedIcon,
      label: "Course Details",
      route: `course-detail/${id}`,
    },
    {
      icon: TocOutlinedIcon,
      label: "Curriculum",
      route: `create-curriculum/${id}`,
    },
    {
      icon: PeopleOutlinedIcon,
      label: "Intended learners",
      route: `intended-learners/${id}`,
    },
    {
      icon: MonetizationOnOutlinedIcon,
      label: "Pricing",
      route: `pricing/${id}`,
    },
    {
      icon: SettingsOutlinedIcon,
      label: "Settings",
      route: `setting/${id}`,
    },
  ];
  const handleMenuClick = (route) => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-16 text-black bg-blue-400 h-14 md:px-12 shadow-[rgba(0,_0,_0,_0.3)_0px_2px_20px]">
        <div className="flex items-center gap-4">
          <Link to="/instructor/courses">
            <ArrowBackIcon className="cursor-pointer" />
          </Link>
          <h2 className="text-lg font-semibold">{courseDetail.courseTitle}</h2>
        </div>
      </div>
      <div className="flex flex-col gap-5 px-3 lg:flex-row lg:px-12 lg:py-5">
        <div className="grid justify-between grid-cols-2 gap-3 mt-5 sm:grid-cols-4 lg:w-1/6 lg:flex lg:flex-col lg:mt-14 h-max">
          {menu.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 p-2 cursor-pointer hover:bg-blue-200"
              onClick={() => handleMenuClick(item.route)}
            >
              <item.icon />
              {item.label}
            </div>
            // </Link>
          ))}
        </div>
        {/* <div className="w-full p-3 shadow-lg lg:p-5">{renderBody()}</div> */}
        <div className="w-full p-3 shadow-lg lg:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}