import { Link } from "react-router-dom";
import React from "react";

const Menu = () => {
    return (
        <div className="">
            <div className="flex flex-col gap-2.5 mb-5">
                {/* main div */}
                <span className="text-xs text-white font-extralight">MAIN</span>
                <Link to="/" className="flex items-center gap-2.5 p-2.5 rounded-md">
                    <img src="/home.jpg"/>
                    <span className="">Homepage</span>
                </Link>
            </div>
            <div className="flex flex-col gap-2.5 mb-5">
                {/* lists div */}
                <span className="text-xs text-white font-extralight">LISTS</span>
                <Link to="/users" className="flex items-center gap-2.5 p-2.5 rounded-md"> 
                    <img src="/user.jpg"/>
                    <span className="">Users</span>
                </Link>
                <Link to="/courses" className="flex items-center gap-2.5 p-2.5 rounded-md"> 
                    <img src="/course.jpg"/>
                    <span className="">Courses</span>
                </Link>
            </div>
            <div className="flex flex-col gap-2.5 mb-5">
                {/* utility div */}
                <span className="text-xs text-white font-extralight">UTILITY</span>
                <Link to="/settings" className="flex items-center gap-2.5 p-2.5 rounded-md">
                    <img src="/settings.svg"/>
                    <span className="">Settings</span>
                </Link>
                <Link className="flex items-center gap-2.5 p-2.5 rounded-md">
                    <img src="/logout" className="rounded-full"/>
                    <span className="">Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default Menu;