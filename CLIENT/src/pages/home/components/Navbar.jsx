import React, { useEffect, useState } from "react";
import { logo_icon, exit_icon } from "../../../assets/icons/home-page-wrapper";
import { HOME_PAGE_WRAPPER_NAVBAR_LINKS_ID, HOME_PAGE_WRAPPER_NAVBAR_ROUTES_MAP, HOME_PAGE_WRAPPER_ROUTES, HOME_PAGE_SECTIONS_MAP, SERVICE_ROUTES } from "../../../consts/url-routes";
import { useNavigate, useLocation } from "react-router-dom";
import { AUTH_ROUTES } from "../../../consts/url-routes";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { NAVBAR_ACTIONS } from "../../../consts/actions/app";
import { logout } from "../../../services/http/fetch-service";
import { getUserInfo} from "../../../services/http/fetch-service/profile-service";

export const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [onTop, setOnTop] = useState(true);
    const [auth, setAuth] = useState(false);
    const user_id = useSelector(state => state.authData.user_id)
    const user_role = useSelector(state => state.authData.user_role)

    useEffect(() => {
        if(localStorage.getItem("accessToken")){
            setAuth(true);
        }
        else
        {
            setAuth(false);
        }
        if (location.pathname === "/") {
            navigate(HOME_PAGE_WRAPPER_ROUTES.home.route);
        }
        const pageScroll = () => {
            if (window.screenY > 57 && onTop) {
                setOnTop(false)
            } else {
                setOnTop(true);
            }
        }
        window.addEventListener("scroll", pageScroll)
        return () => {
            window.removeEventListener("scroll", pageScroll)
        }
    }, [])

    const linkHandle = (e) => {
        if (HOME_PAGE_WRAPPER_NAVBAR_ROUTES_MAP.has(e.target.id)) {
            navigate(HOME_PAGE_WRAPPER_NAVBAR_ROUTES_MAP.get(e.target.id));
        }
    }

    const sectionHandle = (e) => {
        if (HOME_PAGE_SECTIONS_MAP.has(e.target.id)) {
            if (location.pathname !== HOME_PAGE_WRAPPER_ROUTES.home.route) {
                navigate(HOME_PAGE_WRAPPER_ROUTES.home.route)
            }
            dispatch({ type: NAVBAR_ACTIONS.SET_HOME_PAGE_SECTION, payload: HOME_PAGE_SECTIONS_MAP.get(e.target.id) })
        }
    }

    const logoutHandle = (e) => {
        e.preventDefault();
        dispatch(logout({user_id}))
        setAuth(false);
    }

    const startButtonClick = (e) => {
        navigate(AUTH_ROUTES.login.route);
    }

    const serviceButtonClick = (e) =>{
        dispatch(getUserInfo(123));
        navigate(SERVICE_ROUTES.boxer.dynamic_link + "/" + localStorage.getItem("USERID"))
    }

    return (
        <div className="home-page-wrapper-navbar" style={onTop ? { marginTop: "57px" } : {}}>
            <div className="home-page-wrapper-navbar-container">
            {user_role == 0 ? <><p>Добро пожаловать, Администратор!</p></> : <></>}
                <div className="home-page-wrapper-navbar-logo">
                    <img src={logo_icon.svg_icon} alt={logo_icon.alt_prop} id={HOME_PAGE_WRAPPER_NAVBAR_LINKS_ID.home} onClick={linkHandle} />
                </div>
                <div className="home-page-wrapper-navbar-sections">
                    <div className="home-page-wrapper-navbar-sections-item" style={HOME_PAGE_WRAPPER_ROUTES.home.route === location.pathname ? { fontWeight: 700 } : {}} id={HOME_PAGE_WRAPPER_NAVBAR_LINKS_ID.home} onClick={linkHandle}>Главная</div>
                    {user_role == 0 ?
                    <div className="home-page-wrapper-navbar-sections-item" style={HOME_PAGE_WRAPPER_ROUTES.orders.route === location.pathname ? { fontWeight: 700 } : {}} id={HOME_PAGE_WRAPPER_NAVBAR_LINKS_ID.orders} onClick={linkHandle}>Адм. Заказов</div>
                    :
                    <><div className="home-page-wrapper-navbar-sections-item" style={HOME_PAGE_WRAPPER_ROUTES.orders.route === location.pathname ? { fontWeight: 700 } : {}} id={HOME_PAGE_WRAPPER_NAVBAR_LINKS_ID.orders} onClick={linkHandle}>Мои Заказы</div>
                    <div className="home-page-wrapper-navbar-sections-item" id={HOME_PAGE_WRAPPER_NAVBAR_LINKS_ID.subscription} onClick={sectionHandle}>Тарифы</div>
                    <div className="home-page-wrapper-navbar-sections-item" id={HOME_PAGE_WRAPPER_NAVBAR_LINKS_ID.about_us} onClick={sectionHandle}>О нас</div>
                    <div className="home-page-wrapper-navbar-sections-item" id={HOME_PAGE_WRAPPER_NAVBAR_LINKS_ID.blog} onClick={sectionHandle}>Автопарк</div></>}            
                </div>
                {}
                <div className="home-page-wrapper-navbar-current-user">
                    {auth ? <><div style={{display: "flex"}}><button className="home-page-wrapper-navbar-current-user-btn" onClick={serviceButtonClick}>Сервис</button>
                    <img onClick={logoutHandle} style={{marginLeft: "10px"}} src={exit_icon.svg_icon} alt={exit_icon.svg_icon}></img></div></> :
                    <><button className="home-page-wrapper-navbar-current-user-btn" onClick={startButtonClick}>Войти</button></>}
                </div>
            </div>
        </div>
    )
}