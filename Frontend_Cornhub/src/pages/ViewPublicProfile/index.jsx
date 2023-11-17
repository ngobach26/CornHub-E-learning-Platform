import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Avatar } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function ViewPublicProfile() {
  return (
    <>
      <Navbar />
      <div className="flex overflow-auto">
        {" "}
        {/* Sidebar and Form Container */}
        <div className="flex-1">
          <div className="pt-5 pb-10 text-left text-white bg-black h-30">
            <span className="ml-20 text-2xl">Nguyen Chan Hung</span>
            <br />
            <span className="ml-20 text-md">Work hard, play harder!</span>
          </div>
          <div className="z-20 flex h-screen mx-10 my-2">
            {" "}
            {/*Sidebar*/}
            <div
              className="z-20 flex h-screen transition-transform -translate-x-full w-80 left-30 top-30 sm:translate-x-0"
              aria-label="Sidebar"
            >
              <div className="h-full px-3 py-4 overflow-y-auto">
                <Avatar
                  sx={{ width: 90, height: 90 }}
                  className="items-center mx-20"
                />
                <div className="py-10 space-x-2">
                  <a href="/notfound">
                    <TwitterIcon style={{ width: "2rem", height: "2rem" }} />
                  </a>
                  <a href="/notfound">
                    <FacebookIcon style={{ width: "2rem", height: "2rem" }} />
                  </a>
                  <a href="/notfound">
                    <LinkedInIcon style={{ width: "2rem", height: "2rem" }} />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full h-screen">
              <div className="p-10 text-left ml-300 ">
                <span className="text-lg ">
                  I seek for courses that relates to CS as well as AI, which is
                  my area of research. Furthermore, I am willing to learn about
                  time management, leadership and communication as well..
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}