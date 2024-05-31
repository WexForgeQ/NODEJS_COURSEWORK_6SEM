import React, { useEffect } from "react";
import "../../../../styles/pages/home/home-pages/home-page.scss";
import { HomePageHeader, HomePageContent } from "./components";
import { useLocation } from "react-router-dom"
import { HOME_PAGE_WRAPPER_ROUTES } from "../../../../consts/url-routes";

export const HomePage = () => {

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === HOME_PAGE_WRAPPER_ROUTES.home.route) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }, [location])


    return (
        <div className="home-page">
            <HomePageHeader />
            <HomePageContent />
        </div>
    )
}