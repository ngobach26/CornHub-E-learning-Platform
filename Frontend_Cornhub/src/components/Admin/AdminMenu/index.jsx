import { Link } from "react-router-dom";
import React from "react";

const AdminMenu = () => {
    return (
        <div className="">
            <div className="flex flex-col gap-2.5 mb-5">
                <Link to="home" className="flex items-center gap-2.5 p-2 mt-4">
                    <img src="/home.jpg" className="w-10 rounded-full"/>
                    <span className="">Homepage</span>
                </Link>
            </div>
            <div className="flex flex-col gap-2.5 mb-5">
                <Link to="users" className="flex items-center gap-2.5 p-2 rounded-md"> 
                    <img src="/user.jpg" className="w-10 rounded-full"/>
                    <span className="">Users</span>
                </Link>
                <Link to="courses" className="flex items-center gap-2.5 p-2 rounded-md"> 
                    <img src="/course.jpg" className="w-10 rounded-full"/>
                    <span className="">Courses</span>
                </Link>
            </div>
            <div className="flex flex-col gap-2.5 mb-5">
                <Link className="flex items-center gap-2.5 p-2 rounded-md">
                    <img src="/settings.jpg" className="w-10 rounded-full"/>
                    <span className="">Settings</span>
                </Link>
                <Link to="/logout" className="flex items-center gap-2.5 p-2 rounded-md">
                    <img src="/logout.jpg" className="w-10 rounded-full"/>
                    <span className="">Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default AdminMenu;