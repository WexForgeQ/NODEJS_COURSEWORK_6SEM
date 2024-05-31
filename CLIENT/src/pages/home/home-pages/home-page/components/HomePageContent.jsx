import React, { useEffect } from "react";
import { HOME_PAGE_SECTIONS } from "../../../../../consts/url-routes";
import { ServicesSection, SubscriptionSection, AboutUsSection, BlogSection } from "./sections";
import { useSelector, useDispatch } from "react-redux";
import { NAVBAR_ACTIONS } from "../../../../../consts/actions/app";

export const HomePageContent = () => {

    const selectedSection = useSelector(store => store.navbarData.home_page_section);

    useEffect(() => {
        if (selectedSection) {
            const element = document.getElementById(selectedSection);
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: "smooth",
            });
        }
    }, [selectedSection])

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch({ type: NAVBAR_ACTIONS.SET_HOME_PAGE_SECTION, payload: "" })
        }
    }, [])

    return (
        <div className="home-page-content">
            <div className="home-page-content-container">
                <div id={HOME_PAGE_SECTIONS.subscription} className="home-page-content-section">
                    <SubscriptionSection />
                </div>
                <div id={HOME_PAGE_SECTIONS.about_us} className="home-page-content-section">
                    <AboutUsSection />
                </div>
                <div id={HOME_PAGE_SECTIONS.blog} className="home-page-content-section">
                    <BlogSection />
                </div>
            </div>
        </div>
    )
}