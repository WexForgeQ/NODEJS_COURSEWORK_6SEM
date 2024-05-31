import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components";
import "../../styles/pages/home/home-page-wrapper.scss";

export const HomePageWrapper = () => {
    return (
        <div className="home-page-wrapper">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}