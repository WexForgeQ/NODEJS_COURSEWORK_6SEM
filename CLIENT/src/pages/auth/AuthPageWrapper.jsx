import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../../consts/url-routes";
import { backgroundRobot } from "../../assets/auth-wrapper-page/index";
import '../../styles/pages/auth-wrapper-page/auth-wrapper.scss'
export const AuthPageWrapper = () => {

    const navigate = useNavigate();
    const [pageRoute, setPageRoute] = useState(AUTH_ROUTES.login.route);

    useEffect(() => {
        if (pageRoute) {
             navigate(pageRoute);
         }
     }, [pageRoute])

    return (
        <div className="authwrapperpage-content-container">
            <div className="authwrapperpage-content-container-background-image-container">
                <img className = "authwrapperpage-content-container-background-image-container-image" src={backgroundRobot.svg_icon}/>
            </div>
            <Outlet />
        </div>
    )
}