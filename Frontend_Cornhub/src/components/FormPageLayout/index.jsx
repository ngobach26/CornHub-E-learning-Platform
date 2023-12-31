import React from "react";
import classnames from "classnames";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Button from "../Button";

export default function FormPageLayout(props) {
  // const { title, loading, handleSave, containerClass } = props;
  const navigate = useNavigate();
  const menu = [
    {
      icon: InfoOutlinedIcon,
      label: "Course Details",
      route: ":id/d",
    },
    {
      icon: TocOutlinedIcon,
      label: "Curriculum",
      route: ":id/c",
    },
    {
      icon: PeopleOutlinedIcon,
      label: "Intended learners",
      route: ":id/l",
    },
    {
      icon: MonetizationOnOutlinedIcon,
      label: "Pricing",
      route: ":id/p",
    },
    {
      icon: SettingsOutlinedIcon,
      label: "Settings",
      route: ":id/s",
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
          <h2 className="text-lg font-semibold">Course title</h2>
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