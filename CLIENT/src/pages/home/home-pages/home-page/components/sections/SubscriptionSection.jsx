import React from "react";
import { subscription1_png, subscription2_png, subscription3_png } from "../../../../../../assets/pages/home-page";
import { subscription_ingo_icon } from "../../../../../../assets/icons/home-page";

export const SubscriptionSection = () => {
    return (
        <>
            <div className="home-page-content-section-title">
                Тарифы
            </div>
            <div className="home-page-content-section-subscription">
                <div className="home-page-content-section-subscription-item">
                    <div className="home-page-content-section-subscription-item-title">
                        <img className="home-page-content-section-subscription-item-title-img"
                            src={subscription1_png.png}
                            alt={subscription1_png.alt_prop}
                        />
                        <div className="home-page-content-section-subscription-item-title-name">
                            Коммерческий
                        </div>
                    </div>
                    <div className="home-page-content-section-subscription-item-info">
                        <div className="home-page-content-section-subscription-item-info-item">
                            <img src={subscription_ingo_icon.svg_icon} alt={subscription_ingo_icon.alt_prop} />
                            500кг-3т = 20р/ч
                        </div>
                        <div className="home-page-content-section-subscription-item-info-item">
                            <img src={subscription_ingo_icon.svg_icon} alt={subscription_ingo_icon.alt_prop} />
                            3т-5т = 40р/ч
                        </div>
                        <div className="home-page-content-section-subscription-item-info-item">
                            <img src={subscription_ingo_icon.svg_icon} alt={subscription_ingo_icon.alt_prop} />
                            5т-30т = 100р/ч
                        </div>

                    </div>
                </div>
                <div className="home-page-content-section-subscription-item">
                    <div className="home-page-content-section-subscription-item-title">
                        <img className="home-page-content-section-subscription-item-title-img"
                            src={subscription2_png.png}
                            alt={subscription2_png.alt_prop}
                        />
                        <div className="home-page-content-section-subscription-item-title-name">
                            Офисный
                        </div>
                    </div>
                    <div className="home-page-content-section-subscription-item-info">
                        <div className="home-page-content-section-subscription-item-info-item">
                            <img src={subscription_ingo_icon.svg_icon} alt={subscription_ingo_icon.alt_prop} />
                            500кг-3т = 15р/ч
                        </div>
                        <div className="home-page-content-section-subscription-item-info-item">
                            <img src={subscription_ingo_icon.svg_icon} alt={subscription_ingo_icon.alt_prop} />
                            3т-5т = 30р/ч
                        </div>
                        <div className="home-page-content-section-subscription-item-info-item">
                            <img src={subscription_ingo_icon.svg_icon} alt={subscription_ingo_icon.alt_prop} />
                            5т-30т = 70р/ч
                        </div>

                    </div>
                </div>
                <div className="home-page-content-section-subscription-item">
                    <div className="home-page-content-section-subscription-item-title">
                        <img className="home-page-content-section-subscription-item-title-img"
                            src={subscription3_png.png}
                            alt={subscription3_png.alt_prop}
                        />
                        <div className="home-page-content-section-subscription-item-title-name">
                            Частный
                        </div>
                    </div>
                    <div className="home-page-content-section-subscription-item-info">
                        <div className="home-page-content-section-subscription-item-info-item">
                            <img src={subscription_ingo_icon.svg_icon} alt={subscription_ingo_icon.alt_prop} />
                            500кг-3т = 30р/ч
                        </div>
                        <div className="home-page-content-section-subscription-item-info-item">
                            <img src={subscription_ingo_icon.svg_icon} alt={subscription_ingo_icon.alt_prop} />
                            3т-5т = 50р/ч
                        </div>
                        <div className="home-page-content-section-subscription-item-info-item">
                            <img src={subscription_ingo_icon.svg_icon} alt={subscription_ingo_icon.alt_prop} />
                            5т-30т = 150р/ч
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}