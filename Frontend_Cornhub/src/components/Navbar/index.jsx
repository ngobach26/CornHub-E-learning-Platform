import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useAuthContext } from "../../hooks/useAuthContext";
import SearchBar from "../SearchBar";
import Profilemenu from "./components/Profilemenu";
import Submenu from "./components/Submenu";
import Button from "../Button";
import Logo from "../Logo";

export default function Navbar() {
  const { user } = useAuthContext();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="w-full shadow-lg lg:px-6 md:w-auto">
        <div className="flex items-center h-20">
          <div className="text-3xl font-semibold hover:cursor-pointer">
            <Logo variant='header' />
          </div>
          <div className="items-center hidden w-1/2 md:flex">
            <Submenu />
            <SearchBar />
          </div>
          <div className="flex-grow" />
          <div className="flex items-center">
            <div className="hidden gap-8 md:flex">
              <Link to='/instructor/courses' className="hidden text-base lg:block hover:text-gray-500 hover:cursor-pointer">
                Instructor
              </Link>
              <Link className="hidden text-base lg:block hover:text-gray-500 hover:cursor-pointer">
                Learning
              </Link>
            </div>
            <div className="flex gap-2 mx-5">
              <IconButton
                style={{ color: '#0077FF' }}
                size="large"
                aria-label="shopping cart"
                color="inherit"
              >
                <Badge color="primary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
              <IconButton
                style={{ color: '#0077FF' }}
                size="large"
                aria-label="favorite"
                color="inherit"
              >
                <Badge color="primary">
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
              <IconButton
                style={{ color: '#0077FF' }}
                size="large"
                color="inherit"
              >
                <Badge color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </div>
            {user ? (
              <div className="hidden gap-3 md:flex">
                <Profilemenu />
              </div>
            ) : (
              <div className="hidden gap-3 md:flex">
                <Button
                  label="Log In"
                  variant="outlined"
                  onClick={() => navigate("/login")}
                />
                <Button label="Sign Up" onClick={() => navigate("/signup")} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}