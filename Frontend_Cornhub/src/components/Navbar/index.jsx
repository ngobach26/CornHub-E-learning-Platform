import { useState } from "react";
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import React from "react";
import SearchBar from "../SearchBar";
import Profilemenu from "./components/Profilemenu";
import Button from "../Button";

export default function Navbar(){
  return (
    <div className="">
      <div className="w-full shadow-lg lg:px-6 md:w-auto">
        <div className="flex items-center h-20">
          <div className="text-3xl font-semibold hover:cursor-pointer">
            CornHub
          </div>
          <h3 className="hidden ml-5 text-base md:block hover:text-gray-500 hover:cursor-pointer">
            Categories
          </h3>
          <div className="items-center hidden w-1/3 ml-5 md:flex">
            <SearchBar />
          </div>
          <div className="flex-grow" />
          <div className="flex items-center">
            <div className="hidden gap-8 md:flex">
              <h3 className="hidden text-base lg:block hover:text-gray-500 hover:cursor-pointer">
                My learning
              </h3>
            </div>
            <div className="flex gap-2 mx-5">
              <IconButton 
                size="large" 
                aria-label="wishlist" 
                color="inherit">
                <Badge color="primary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="shopping cart"
                color="inherit"
              >
                <Badge color="primary">
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
            </div>
            <div className="hidden gap-3 md:flex">
              <Link to="/login">
                <Button label="Log In" variant="outlined" />
              </Link>
              <Link to="/signup">
                <Button label="Sign Up" />
              </Link>
              <Profilemenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};