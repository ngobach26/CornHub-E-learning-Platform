import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Avatar } from "@mui/material";
// import Sidebar from "../../components/Navbar/components/Sidebar";

export default function UserProfileEditing() {
  const { user } = useAuthContext();
  return (
    <>
      <Navbar />
      <div className="flex overflow-auto">
        {" "}
        {/* Sidebar and Form Container */}
        <div className="flex-1">
          <div className="z-20 flex h-screen mx-10 my-2 border">
            {" "}
            {/*Sidebar*/}
            <div
              className="z-20 flex h-screen transition-transform -translate-x-full border w-80 left-30 top-30 sm:translate-x-0"
              aria-label="Sidebar"
            >
              <div className="h-full px-3 py-4 overflow-y-auto bg-gray-300 dark:bg-gray-800">
                <Avatar
                  sx={{ width: 48, height: 48 }}
                  className="items-center mx-20"
                />
                <div className="py-3 font-bold text-center text-md">
                  {user.firstName} {user.lastName}
                </div>
                <div className="pb-3 text-sm italic">
                  Computer Science Student
                </div>
                <ul className="space-y-2 font-medium">
                  <li>
                    <a
                      href="/view-public-profile"
                      className="flex items-center p-2 text-gray-900 rounded-lg n dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        View public profile
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/userprofileediting"
                      className="flex items-center p-2 text-gray-900 rounded-lg bg-stone-400 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Profile
                      </span>
                    </a>
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
                    <a
                      href="/account-security"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Account Security
                      </span>
                    </a>
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
            <div className="w-full h-screen">
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
                    <input
                      className="w-full h-10 px-3 my-2 border border-black "
                      type="text"
                      placeholder="First Name"
                    />
                    <br />
                    <input
                      className="w-full h-10 px-3 my-2 border border-black "
                      type="text"
                      placeholder="Last Name"
                    />
                    <br />
                    <input
                      className="w-full h-10 px-3 my-2 border border-black "
                      type="text"
                      placeholder="Current Job Position"
                    />
                    <span className="text-xs font-semibold">
                      *Add a professional title, or a job position
                    </span>
                    <div
                      contenteditable="true"
                      className="w-full h-20 px-3 my-2 border border-black "
                      type="text"
                    >
                      <p>
                        <br />
                      </p>
                    </div>
                    <span className="text-xs font-semibold">
                      *Write a brief introduction about you!
                    </span>
                  </form>
                </div>
              </div>
              <div className="border">
                <div className="p-5 text-left">
                  <span className="my-3 text-base font-bold">Links:</span>
                  <form action="" className="p-5">
                    <input
                      className="w-full h-10 px-3 my-2 border border-black "
                      type="text"
                      placeholder="Website (http(s)://..)"
                    />
                    <input
                      className="w-full h-10 px-3 my-2 border border-black "
                      type="text"
                      placeholder="Twitter"
                    />
                    <input
                      className="w-full h-10 px-3 my-2 border border-black "
                      type="text"
                      placeholder="Facebook"
                    />
                    <input
                      className="w-full h-10 px-3 my-2 border border-black "
                      type="text"
                      placeholder="LinkedIn"
                    />
                  </form>
                  <span className="p-5">
                    <button className="px-4 py-2 font-bold text-white bg-gray-500 border rounded hover:bg-blue">
                      Save
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
