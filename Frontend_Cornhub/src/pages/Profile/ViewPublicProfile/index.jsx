import React , {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { Avatar } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import KeyboardBackspace from "@mui/icons-material/KeyboardBackspace";

import { useAuthContext } from "../../../hooks/useAuthContext";
import api from "../../../services/userAPI";

export default function ViewPublicProfile() {
  const { user } = useAuthContext();
  const [ detail, setDetail ] = useState([]);

  useEffect (() => {
    const fetchUserDetail = async () => {
      try{
        const userDetail = await api.getProfile(user.token);
        setDetail(userDetail);
      }
      catch(err){
        console.log(err);
      }
    };
    fetchUserDetail();
  }, [user.token]);

  return (
    <>
      <Navbar />
      <div className="flex overflow-auto">
        {/* Sidebar and Form Container */}
        <div className="flex-1">
          <div className="flex flex-col pt-5 pb-5 text-left text-white bg-black h-30">
            <Link to="/user-profile-editing" className="ml-4 text-3xl font-bold">
              {detail.firstName} {detail.lastName}
            </Link>
            <span className="ml-4 italic text-md">{detail.currentjob}</span>
          </div>
          <div className="z-20 flex h-screen mx-10 my-2">
            {/* Sidebar */}
            <div className="z-20 flex h-screen transition-transform -translate-x-full w-80 left-30 top-30 sm:translate-x-0">
              <div className="h-full px-3 py-4 overflow-y-auto">
                <Avatar sx={{ width: 90, height: 90 }} className="mx-auto mb-4" />
                <div className="flex justify-center space-x-2">
                  <a href={detail.twitter}>
                    <TwitterIcon style={{ width: "2rem", height: "2rem" }} />
                  </a>
                  <a href={detail.facebook}>
                    <FacebookIcon style={{ width: "2rem", height: "2rem" }} />
                  </a>
                  <a href={detail.linkedin}>
                    <LinkedInIcon style={{ width: "2rem", height: "2rem" }} />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full h-screen">
              <div className="p-10 text-left">
                <span className="text-lg">{detail.introduction}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
