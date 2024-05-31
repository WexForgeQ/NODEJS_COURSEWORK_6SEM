import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/pages/services/boxer/boxer-service-page.scss";
import { BOXER_COMPONENTS_MAP, BOXER_SIDEBAR_ITEM_NAMES } from "./components";
import { HOME_PAGE_WRAPPER_ROUTES } from "../../../consts/url-routes";
import { logo_icon, exit_icon } from "../../../assets/icons/services/chagall";
import { useSelector } from "react-redux";

export const BoxerServicePage = () => {

    const [selected, setSelected] = useState(BOXER_SIDEBAR_ITEM_NAMES.home);
    const navigate = useNavigate();
    const selectSidebarItem = (e) => {
        const item = e.target.closest('div');
        setSelected(item.id);
    }
    const user_role = useSelector(state => state.authData.user_role)
    
    return (
        <div className="boxer-service">
            <div className="boxer-service-sidebar">
                <div style={{cursor: "pointer"}} onClick={() => navigate(HOME_PAGE_WRAPPER_ROUTES.home.route)} className="boxer-service-sidebar-logo">
                    <div className="boxer-service-sidebar-logo-img">
                        <img src={logo_icon.svg_icon} alt={logo_icon.alt_prop} />
                    </div>
                    <div  className="boxer-service-sidebar-logo-text">
                        Boxer
                    </div>
                </div>
                    <div className="boxer-service-sidebar-menu">
                    {user_role  != 1 ? <><div className="boxer-service-sidebar-menu-item"  id={BOXER_SIDEBAR_ITEM_NAMES.home} onClick={selectSidebarItem}>
                        {selected === BOXER_SIDEBAR_ITEM_NAMES.home && <div className="boxer-service-sidebar-menu-item-selected"></div>}
                        <svg xmlns="http://www.w3.org/2000/svg"  width="40" height="40" viewBox="0 0 40 40" fill={selected === BOXER_SIDEBAR_ITEM_NAMES.home ? "#515151" : "#BBBBBB"}>
                            <path d="M31.6667 40H8.33333C3.73833 40 0 36.2624 0 31.6682V16.2111C0 13.4366 1.37333 10.8538 3.67333 9.30409L15.3383 1.43223C18.17 -0.47741 21.83 -0.47741 24.6617 1.43223L36.3283 9.30409C38.6267 10.8538 40 13.435 40 16.2111V31.6682C40 36.2624 36.2617 40 31.6667 40ZM20 3.33521C19.0267 3.33521 18.0533 3.62182 17.2033 4.19671L5.53667 12.0669C4.15667 12.9967 3.33333 14.5448 3.33333 16.2095V31.6666C3.33333 34.4227 5.57667 36.6656 8.33333 36.6656H31.6667C34.4233 36.6656 36.6667 34.4227 36.6667 31.6666V16.2111C36.6667 14.5464 35.8433 12.9967 34.465 12.0686L22.7967 4.19671C21.9467 3.62182 20.9733 3.33521 20 3.33521Z" />
                        </svg>
                    </div></> : <>
                    
                </>}
                    {user_role == 0 ?<>
                    </>
                     : <div className="boxer-service-sidebar-menu-item"  id={BOXER_SIDEBAR_ITEM_NAMES.profile} onClick={selectSidebarItem}>
                     {selected === BOXER_SIDEBAR_ITEM_NAMES.profile && <div className="boxer-service-sidebar-menu-item-selected"></div>}
                     <svg xmlns="http://www.w3.org/2000/svg"  width="40" height="40" viewBox="0 0 40 40" fill={selected === BOXER_SIDEBAR_ITEM_NAMES.profile ? "#515151" : "#BBBBBB"}>
                         <g clipPath="url(#clip0_2198_437)">
                             <path d="M20 20C21.9778 20 23.9112 19.4135 25.5557 18.3147C27.2002 17.2159 28.4819 15.6541 29.2388 13.8268C29.9957 11.9996 30.1937 9.98891 29.8079 8.0491C29.422 6.10929 28.4696 4.32746 27.0711 2.92894C25.6725 1.53041 23.8907 0.578004 21.9509 0.192152C20.0111 -0.193701 18.0004 0.00433286 16.1732 0.761209C14.3459 1.51809 12.7841 2.79981 11.6853 4.4443C10.5865 6.08879 10 8.02219 10 10C10.0026 12.6514 11.0571 15.1934 12.9319 17.0682C14.8066 18.9429 17.3486 19.9974 20 20ZM20 3.33334C21.3185 3.33334 22.6075 3.72433 23.7038 4.45687C24.8001 5.18942 25.6546 6.23061 26.1592 7.44878C26.6638 8.66696 26.7958 10.0074 26.5386 11.3006C26.2813 12.5938 25.6464 13.7817 24.714 14.7141C23.7817 15.6464 22.5938 16.2813 21.3006 16.5386C20.0074 16.7958 18.667 16.6638 17.4488 16.1592C16.2306 15.6546 15.1894 14.8001 14.4569 13.7038C13.7243 12.6075 13.3333 11.3185 13.3333 10C13.3333 8.2319 14.0357 6.5362 15.286 5.28596C16.5362 4.03572 18.2319 3.33334 20 3.33334Z" />
                             <path d="M20 23.3335C16.0231 23.3379 12.2104 24.9197 9.39827 27.7318C6.58618 30.5439 5.00441 34.3566 5 38.3335C5 38.7755 5.17559 39.1994 5.48816 39.512C5.80072 39.8246 6.22464 40.0002 6.66667 40.0002C7.10869 40.0002 7.53262 39.8246 7.84518 39.512C8.15774 39.1994 8.33333 38.7755 8.33333 38.3335C8.33333 35.2393 9.5625 32.2718 11.7504 30.0839C13.9383 27.896 16.9058 26.6668 20 26.6668C23.0942 26.6668 26.0617 27.896 28.2496 30.0839C30.4375 32.2718 31.6667 35.2393 31.6667 38.3335C31.6667 38.7755 31.8423 39.1994 32.1548 39.512C32.4674 39.8246 32.8913 40.0002 33.3333 40.0002C33.7754 40.0002 34.1993 39.8246 34.5118 39.512C34.8244 39.1994 35 38.7755 35 38.3335C34.9956 34.3566 33.4138 30.5439 30.6017 27.7318C27.7896 24.9197 23.9769 23.3379 20 23.3335Z" />
                         </g>
                     </svg>
                     </div>
                    }
                    
                    <div className="boxer-service-sidebar-menu-item" id={BOXER_SIDEBAR_ITEM_NAMES.calculator} onClick={selectSidebarItem}>
                        {selected === BOXER_SIDEBAR_ITEM_NAMES.calculator && <div className="boxer-service-sidebar-menu-item-selected"></div>}
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                width="40.000000pt" height="40.000000pt" viewBox="0 0 40.000000 40.000000"
                                preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)"
                                fill="#000000" stroke="none">
                                <path d="M62 338 c-17 -17 -17 -259 0 -276 17 -17 259 -17 276 0 17 17 17 259
                                0 276 -17 17 -259 17 -276 0z m128 -68 l0 -60 -60 0 -60 0 0 53 c0 30 3 57 7
                                60 3 4 30 7 60 7 l53 0 0 -60z m138 -2 l3 -58 -61 0 -60 0 0 60 0 61 58 -3 57
                                -3 3 -57z m-138 -138 l0 -61 -57 3 -58 3 -3 58 -3 57 61 0 60 0 0 -60z m138 3
                                l-3 -58 -57 -3 -58 -3 0 61 0 60 60 0 61 0 -3 -57z"/>
                                <path d="M120 295 c0 -8 -7 -15 -15 -15 -8 0 -15 -4 -15 -10 0 -5 7 -10 15
                                -10 8 0 15 -7 15 -15 0 -8 5 -15 10 -15 6 0 10 7 10 15 0 8 7 15 15 15 8 0 15
                                5 15 10 0 6 -7 10 -15 10 -8 0 -15 7 -15 15 0 8 -4 15 -10 15 -5 0 -10 -7 -10
                                -15z"/>
                                <path d="M230 270 c0 -5 18 -10 40 -10 22 0 40 5 40 10 0 6 -18 10 -40 10 -22
                                0 -40 -4 -40 -10z"/>
                                <path d="M103 130 c0 -22 5 -27 27 -27 22 0 27 5 27 27 0 22 -5 27 -27 27 -22
                                0 -27 -5 -27 -27z"/>
                                <path d="M260 160 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
                                -10 -4 -10 -10z"/>
                                <path d="M230 130 c0 -5 18 -10 40 -10 22 0 40 5 40 10 0 6 -18 10 -40 10 -22
                                0 -40 -4 -40 -10z"/>
                                <path d="M260 100 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
                                -10 -4 -10 -10z"/>
                                </g>
                                </svg>

                    </div>
                    <div className="boxer-service-sidebar-menu-item"  id={BOXER_SIDEBAR_ITEM_NAMES.info} onClick={selectSidebarItem}>
                        {selected === BOXER_SIDEBAR_ITEM_NAMES.info && <div className="boxer-service-sidebar-menu-item-selected"></div>}
                        <svg xmlns="http://www.w3.org/2000/svg"  width="40" height="40" viewBox="0 0 40 40" fill={selected === BOXER_SIDEBAR_ITEM_NAMES.info ? "#515151" : "#BBBBBB"} >
                            <g clipPath="url(#clip0_2198_443)">
                                <path d="M20 0C16.0444 0 12.1776 1.17298 8.8886 3.37061C5.59962 5.56824 3.03617 8.69181 1.52242 12.3463C0.00866572 16.0009 -0.387401 20.0222 0.384303 23.9018C1.15601 27.7814 3.06082 31.3451 5.85787 34.1421C8.65492 36.9392 12.2186 38.844 16.0982 39.6157C19.9778 40.3874 23.9992 39.9913 27.6537 38.4776C31.3082 36.9638 34.4318 34.4004 36.6294 31.1114C38.827 27.8224 40 23.9556 40 20C39.9943 14.6974 37.8853 9.61368 34.1358 5.8642C30.3863 2.11471 25.3026 0.00573514 20 0ZM20 36.6667C16.7037 36.6667 13.4813 35.6892 10.7405 33.8578C7.99969 32.0265 5.86348 29.4235 4.60202 26.3781C3.34056 23.3326 3.0105 19.9815 3.65359 16.7485C4.29668 13.5155 5.88402 10.5458 8.2149 8.21489C10.5458 5.88401 13.5155 4.29667 16.7485 3.65358C19.9815 3.01049 23.3326 3.34055 26.3781 4.60201C29.4235 5.86347 32.0265 7.99968 33.8578 10.7405C35.6892 13.4813 36.6667 16.7036 36.6667 20C36.6618 24.4188 34.9043 28.6552 31.7798 31.7798C28.6552 34.9043 24.4188 36.6618 20 36.6667Z" />
                                <path d="M20.0003 16.6665H18.3337C17.8916 16.6665 17.4677 16.8421 17.1551 17.1547C16.8426 17.4672 16.667 17.8911 16.667 18.3332C16.667 18.7752 16.8426 19.1991 17.1551 19.5117C17.4677 19.8242 17.8916 19.9998 18.3337 19.9998H20.0003V29.9998C20.0003 30.4419 20.1759 30.8658 20.4885 31.1783C20.801 31.4909 21.225 31.6665 21.667 31.6665C22.109 31.6665 22.5329 31.4909 22.8455 31.1783C23.1581 30.8658 23.3337 30.4419 23.3337 29.9998V19.9998C23.3337 19.1158 22.9825 18.2679 22.3573 17.6428C21.7322 17.0177 20.8844 16.6665 20.0003 16.6665Z" />
                                <path d="M20 13.3335C21.3807 13.3335 22.5 12.2142 22.5 10.8335C22.5 9.45278 21.3807 8.3335 20 8.3335C18.6193 8.3335 17.5 9.45278 17.5 10.8335C17.5 12.2142 18.6193 13.3335 20 13.3335Z" />
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="boxer-service-sidebar-return">
                    <img onClick={() => {navigate(-1)}} src={exit_icon.svg_icon} alt={exit_icon.alt_prop} />
                </div>
            </div>
            <div className="boxer-service-content">
                {BOXER_COMPONENTS_MAP.has(selected)
                    ? BOXER_COMPONENTS_MAP.get(selected)
                    : <></>
                }
            </div>
        </div >
    )
} 