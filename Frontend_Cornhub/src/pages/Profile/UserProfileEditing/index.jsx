import React, { useState, useEffect, useRef } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { Avatar, stepContentClasses } from "@mui/material";
import { useAuthContext } from "../../../hooks/useAuthContext";
import api from "../../../services/userAPI";
import { Snackbar } from "@mui/material";
import { Link } from "react-router-dom";

export default function UserProfileEditing() {
  const { user, dispatch } = useAuthContext();
  const editableDivRef = useRef();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    currentjob: "",
    introduction: "",
    website: "",
    twitter: "",
    facebook: "",
    linkedin: "",
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setFormData((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  
  const handleChangeIntro = () => {
    const newIntroduction = editableDivRef.current.innerText;

    setFormData((prevalue) => {
      return {
        ...prevalue,
        introduction: newIntroduction,
      };
    });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await api.getProfile(user.token);
        setFormData({
          firstName: getData.firstName || "",
          lastName: getData.lastName || "",
          currentjob: getData.currentjob || "",
          introduction: getData.introduction || "",
          website: getData.website || "",
          twitter: getData.twitter || "",
          facebook: getData.facebook || "",
          linkedin: getData.linkedin || "", 
        });
        console.log(formData);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchData();
  }, [user.token]);
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSaveClick = async () => {
    try {
      const updatedUser = await api.updateProfile(user.token, formData);

      // Update the user context with the updated user data if needed
      // UpdateData(updatedUser);
      dispatch({ type: "UPDATE_PROFILE", payload: updatedUser });

      setSnackbarMessage("All changes saved successfully.");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error updating profile.");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex overflow-auto">
        <div className="flex-1">
          <div className="z-20 flex h-screen mx-10 my-2">
            <div
              className="z-20 flex h-screen transition-transform -translate-x-full w-80 left-30 top-30 sm:translate-x-0"
              aria-label="Sidebar"
            >
              <div className="h-full px-3 py-4 overflow-y-auto bg-gray-300 dark:bg-gray-500">
                <Avatar
                  sx={{ width: 48, height: 48 }}
                  className="items-center mx-20"
                />
                <div className="py-3 font-bold text-center text-md">
                  {formData.firstName} {formData.lastName}
                </div>
                <div className="pb-3 text-sm italic">{formData.currentjob}</div>
                <ul className="space-y-2 font-medium">
                  <li>
                    <Link
                      to="/view-public-profile"
                      className="flex items-center p-2 text-gray-900 rounded-lg n dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        View public profile
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/userprofileediting"
                      className="flex items-center p-2 text-gray-900 rounded-lg bg-stone-400 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Profile
                      </span>
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Photo
                      </span>
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/account-security"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Account Security
                      </span>
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Subscription
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Privacy
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Notifications
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full overflow-auto">
              <div className="p-10 text-center border ml-300">
                <span className="text-2xl font-bold">
                  Public profile
                  <br />
                </span>
                <span className="text-md">Add information about yourself</span>
              </div>
              <div className="border">
                <div className="p-5 text-left">
                  <span className="my-3 text-base font-bold">Basics:</span>
                  <form action="" className="p-5">
                    <span className="text-xs font-semibold">
                      *Please provide your first name and last name
                    </span>
                    <input
                      className="w-full h-10 px-3 my-2 border border-black "
                      type="text"
                      placeholder={formData.firstName}
                      name="firstName"
                    />
                    <input
                      className="w-full h-10 px-3 my-2 border border-black "
                      type="text"
                      placeholder={formData.lastName}
                      name="lastName"
                    />
                    <p>
                      <br />
                    </p>
                    <span className="text-xs font-semibold">
                      *Add a professional title, or a job position
                    </span>
                    <input
                      className="w-full h-10 px-3 my-2 border border-black "
                      type="text"
                      placeholder={formData.currentjob}
                      name="currentjob"
                    />
                    <p>
                      <br />
                    </p>
                    <span className="text-xs font-semibold">
                      *Write a brief introduction about you!
                    </span>
                    <input
                      contenteditable="true"
                      className="w-full h-20 px-3 my-2 border border-black "
                      type="text"
                      placeholder={formData.introduction}
                      onBlur={handleChangeIntro}
                      name="introduction"
                    />
                  </form>
                </div>
                <div className="">
                  <div className="p-5 text-left">
                    <span className="my-3 text-base font-bold">
                      Reference links:
                    </span>
                    <form action="" className="p-5">
                      <span className="text-xs font-semibold">
                        Your website
                      </span>
                      <input
                        className="w-full h-10 px-3 my-2 border border-black "
                        type="text"
                        placeholder={formData.website}
                        onChange={handleChange}
                        name="website"
                      />
                      <span className="text-xs font-semibold">
                        Your twitter
                      </span>
                      <input
                        className="w-full h-10 px-3 my-2 border border-black "
                        type="text"
                        placeholder={formData.twitter}
                        onChange={handleChange}
                        name="twitter"
                      />
                      <span className="text-xs font-semibold">
                        Your facebook
                      </span>
                      <input
                        className="w-full h-10 px-3 my-2 border border-black "
                        type="text"
                        placeholder={formData.facebook}
                        onChange={handleChange}
                        name="facebook"
                      />
                      <span className="text-xs font-semibold">
                        Your linkedin
                      </span>
                      <input
                        className="w-full h-10 px-3 my-2 border border-black "
                        type="text"
                        placeholder={formData.linkedin}
                        onChange={handleChange}
                        name="linkedin"
                      />
                    </form>
                    <span className="p-5">
                      <button
                        className="px-4 py-2 font-bold text-white bg-gray-500 border rounded hover:bg-blue"
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
}