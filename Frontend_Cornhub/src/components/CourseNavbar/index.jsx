import * as React from "react";
import { useNavigate } from "react-router-dom";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import Logo from "../Logo";

export default function CourseNavbar(props) {
  const { title, id } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/course/${id}`);
  };

  return (
    <div className="">
      <div className="w-full shadow-lg lg:px-6 md:w-auto">
        <div className="flex items-center h-18">
          <div onClick={handleClick}>
            <p className="mb-0.5 text-lg font-medium cursor-pointer flex">
              <KeyboardBackspaceIcon /> {title}
            </p>
          </div>
          <div className="flex-grow" />
          <div className="flex items-center">
          <div className="hover:cursor-pointer">
            <Logo variant="footer" />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}