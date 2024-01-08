import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function Submenu() {
  const categories = [
    "Information Technology",
    "Business",
    "Finance and accounting",
    "Editing and design",
    "Music",
    "Fitness",
    "Self development",
  ];

  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (index) => {
    setActiveMenu(index === activeMenu ? null : index);
  };

  const renderMenus = () => {
    return categories.map((category, index) => (
      <Link to="/" key={index}>
        <div
          className={`flex justify-between items-center ${
            index === activeMenu ? "text-primary" : "text-black"
          }`}
          onClick={() => handleMenuClick(index)}
        >
          <p>{category}</p>
          <NavigateNextIcon />
        </div>
      </Link>
    ));
  };

  return (
    <div className="relative py-6 cursor-pointer md:mx-3 lg:mx-8 group">
      <h3>Categories</h3>
      <div
        className="absolute z-10 grid grid-cols-2 drop-shadow-md h-96"
        style={{ fontSize: "0.95rem" }}
      >
        <div className="flex-col hidden w-64 gap-4 p-5 mt-6 bg-white border border-border bg-bodyBg group-hover:flex">
          {renderMenus()}
        </div>
      </div>
    </div>
  );
}

export default Submenu;
