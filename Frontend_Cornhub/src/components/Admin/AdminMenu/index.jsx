import { Link } from "react-router-dom";
import React from "react";

const AdminMenu = () => {
    return (
        <div className="">
            <div className="flex flex-col gap-2.5 mb-5">
                {/* main div */}
                <span className="text-lg text-white font-extralight">Main</span>
                <Link to="home" className="flex items-center gap-2.5 p-2.5">
                    <img src="/home.jpg" className="w-10 rounded-full"/>
                    <span className="">Homepage</span>
                </Link>
            </div>
            <div className="flex flex-col gap-2.5 mb-5">
                {/* lists div */}
                <span className="text-lg text-white font-extralight">Lists</span>
                <Link to="users" className="flex items-center gap-2.5 p-2.5 rounded-md"> 
                    <img src="/user.jpg" className="w-10 rounded-full"/>
                    <span className="">Users</span>
                </Link>
                <Link to="courses" className="flex items-center gap-2.5 p-2.5 rounded-md"> 
                    <img src="/course.jpg" className="w-10 rounded-full"/>
                    <span className="">Courses</span>
                </Link>
            </div>
            <div className="flex flex-col gap-2.5 mb-5">
                <span className="text-lg text-white font-extralight">Utility</span>
                <Link className="flex items-center gap-2.5 p-2.5 rounded-md">
                    <img src="/settings.svg" className="w-10 rounded-full"/>
                    <span className="">Settings</span>
                </Link>
                <Link className="flex items-center gap-2.5 p-2.5 rounded-md">
                    <img src="/logout.jpg" className="w-10 rounded-full"/>
                    <span className="">Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default AdminMenu;