import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function Submenu() {
  const renderMenus = (menu, allowHover) => {
    const categories = [
      "Information Technology",
      "Business",
      "Finance and accouting",
      "Editing and design",
      "Music",
      "Fitness",
      "Self development",
    ];
    if (!menu) return null;

    return (
      <div className="flex-col hidden w-64 gap-4 p-5 mt-6 border border-border bg-bodyBg group-hover:flex">
        {menu?.map((category, i) => (
          <Link key={i} to={category.url}>
            <div className="flex justify-between item-center">
              <p className="hover:text-primary">title</p>
              <p>
                <NavigateNextIcon />
              </p>
              {/* not done yet */}
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="py-6 cursor-pointer md:mx-3 lg:mx-8 group">
      <h3>Categories</h3>
      <div
        className="absolute z-10 grid grid-cols-2 drop-shadow-md h-96"
        style={{ fontSize: "0.95rem" }}
      >
        <div className="flex-col hidden w-64 gap-4 p-5 mt-6 bg-white border border-border bg-bodyBg group-hover:flex">
          <Link to="/">
            <div className="flex justify-between item-center">
              <p className="hover:text-primary">title</p>
              <p>
                <NavigateNextIcon />
              </p>
            </div>
          </Link>
        </div>
        {/* {renderMenus(categories, true)}
        {renderMenus(activeMenu)} */}
      </div>
    </div>
  );
}

export default Submenu;