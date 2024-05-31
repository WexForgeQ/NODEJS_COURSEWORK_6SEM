import React from "react";
import "../../styles/pages/not-found/not-found-page.scss";
import not_found_svg from "../../assets/pages/not-found/not-found.svg";

export const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <img src={not_found_svg} alt={"not found"} className="not-found-page-img"/>
        </div>
    )
}