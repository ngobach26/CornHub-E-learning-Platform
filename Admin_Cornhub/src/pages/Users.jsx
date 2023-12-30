import React from "react";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";

const Users = () => {
    return (
        <>
            <Navbar />
            <div className="">
                <Menu />
                <div className="">Welcome to CornHub's Admin Panel!</div>
                <h1>Users</h1>
                <button>Add new user</button>
            </div>

            
        </>
    );
};

export default Users;