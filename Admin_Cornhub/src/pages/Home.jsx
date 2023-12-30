import React from "react";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="">
                <Menu />
                <div className="">Welcome to CornHub's Admin Panel!</div>
            </div>
        </>
    );
};

export default Home;