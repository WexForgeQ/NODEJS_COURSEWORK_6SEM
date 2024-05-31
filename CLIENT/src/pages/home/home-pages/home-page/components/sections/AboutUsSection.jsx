import React from "react";
import { logo_icon, link_icon } from "../../../../../../assets/icons/home-page";
import { about_us1_png, about_us2_png, about_us3_png, about_us4_png } from "../../../../../../assets/pages/home-page";

export const AboutUsSection = () => {
    return (
        <>
            <div className="home-page-content-section-title">
                О нас
            </div>
            <div className="home-page-content-section-about-us">
                <div className="home-page-content-section-about-us-img">
                    <img src={about_us1_png.png} alt={about_us1_png.alt_prop}/>
                    <img src={about_us1_png.png} alt={about_us2_png.alt_prop}/>
                    <img src={about_us1_png.png} alt={about_us3_png.alt_prop}/>
                    <img src={about_us1_png.png} alt={about_us4_png.alt_prop}/>
                </div>
                <div className="home-page-content-section-about-us-info">
                    <img className="home-page-content-section-about-us-info-logo"
                        src={logo_icon.svg_icon} alt={logo_icon.alt_prop}
                    />
                    <div className="home-page-content-section-about-us-info-text">
                    Наша компания предоставляет различные решения для перевозок ваших грузов, используя большой автопарк и опыт водителей.
                    </div>
                </div>
            </div>
        </>
    )
}