import React from "react";
import { logo_icon, mail_icon, donate_arrow_icon, inst_icon, number_icon } from "../../../assets/icons/home-page-wrapper";

export const Footer = () => {
    return (
        <div className="home-page-wrapper-footer">
            <div className="home-page-wrapper-footer-container">
                <div className="home-page-wrapper-footer-under">
                    <div className="home-page-wrapper-footer-under-cert">
                        <div className="home-page-wrapper-footer-under-cert-1">
                            BOXer©2024.
                        </div>
                        <div className="home-page-wrapper-footer-under-cert-2">
                            All Rights Reserved
                        </div>
                    </div>
                    <div className="home-page-wrapper-footer-under-info">
                        <img className="home-page-wrapper-footer-under-social" src={inst_icon.svg_icon} alt={inst_icon.alt_prop} />
                        <img className="home-page-wrapper-footer-under-social" src={mail_icon.svg_icon} alt={mail_icon.alt_prop} />
                        <img className="home-page-wrapper-footer-under-social" src={number_icon.svg_icon} alt={number_icon.alt_prop} />
                    </div>
                </div>
            </div>
        </div>
    )
}