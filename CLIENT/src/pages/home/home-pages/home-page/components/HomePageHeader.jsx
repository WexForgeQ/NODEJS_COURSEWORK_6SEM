import React from "react";
import { logo_icon, header_link_icon, service_link } from "../../../../../assets/icons/home-page";
import { chagall2_header_png, chagall_header_png } from "../../../../../assets/pages/home-page";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES, HOME_PAGE_WRAPPER_ROUTES, SERVICE_ROUTES } from "../../../../../consts/url-routes";
import { getUserInfo } from "../../../../../services/http/fetch-service/profile-service";
import { useDispatch } from "react-redux";
export const HomePageHeader = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
        
    return (
        <div className="home-page-header">
            <div className="home-page-header-container">
                <div className="home-page-header-container-news">
                    <div className="home-page-header-container-news-sub-title">
                        невероятно удобно
                    </div>
                    <div className="home-page-header-container-news-title">
                    Все возможности перевозок в одном месте с компанией BOXer
                        <div className="home-page-header-container-news-title-logo">
                            <img src={logo_icon.svg_icon} alt={logo_icon.alt_prop} />
                        </div>
                    </div>
                </div>
                <div className="home-page-header-container-service">
                    <img className="home-page-header-container-service-img" src={chagall_header_png.png} alt={chagall_header_png.alt_prop} />
                    {localStorage.getItem("USERID") ? 
                    <div onClick={() => navigate(SERVICE_ROUTES.boxer.dynamic_link + "/" + localStorage.getItem("USERID"))} className="home-page-header-container-service-link">
                    Поехали
                    <img  src={service_link.svg_icon} alt={service_link.alt_prop} />
                    </div>
                    : 
                    <div onClick={() => navigate(AUTH_ROUTES.login.route)} className="home-page-header-container-service-link" >
                     Поехали
                    <img src={service_link.svg_icon} alt={service_link.alt_prop} />
                    </div>}

                </div>
            </div>
        </div>
    )
}