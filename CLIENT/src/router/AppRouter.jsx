import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
    APP_ROUTES,
    AUTH_ROUTES,
    HOME_PAGE_WRAPPER_ROUTES,
    ORDERS_PAGE_ROUTES,
    BLOG_PAGE_ROUTES,
    SERVICE_ROUTES,
    PROFILE_ROUTES
} from "../consts/url-routes";
import { responseService } from "../services/http/fetch-response-service";
import { wsResponseService } from "../services/ws/ws-response-service";
import { useDispatch, useSelector } from "react-redux";
import { role } from "../services/http/fetch-service";


export const AppRouter = () => {

    const request_data = useSelector(state => state.socketData.request_data);
    const wsData = useSelector(state => state.socketData.data);
    const wsStatus = useSelector(state => state.socketData.status);
    const fetch_data = useSelector(state => state.fetchData.fetch_data);
    const data = useSelector(state => state.fetchData.data);
    const status = useSelector(state => state.fetchData.status);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user_role = useSelector(state => state.authData.user_role)

    useEffect(() => {
        if (localStorage.getItem("accessToken")){
          dispatch(role());
          console.log(user_role);
        }
    },[])

    useEffect(() => {
        if (Object.keys(request_data).length > 0) {
            wsResponseService(dispatch, {request_data, wsStatus, wsData});
        }
    },[request_data])

    useEffect(() => {
        if (Object.keys(fetch_data).length > 0) {
            responseService(dispatch, { fetch_data, status, data }, navigate);
        }
    }, [fetch_data])

    return (
        <Routes>
            <Route path={APP_ROUTES.auth.route} element={APP_ROUTES.auth.element}>
                <Route path={AUTH_ROUTES.login.route} element={AUTH_ROUTES.login.element} />
                <Route path={AUTH_ROUTES.registration.route} element={AUTH_ROUTES.registration.element} />
                <Route path={AUTH_ROUTES.emailcode.route} element={AUTH_ROUTES.emailcode.element} />
            </Route>
            <Route path={APP_ROUTES.home.route} element={APP_ROUTES.home.element}>
                <Route path={HOME_PAGE_WRAPPER_ROUTES.blog.route} element={HOME_PAGE_WRAPPER_ROUTES.blog.element}>
                    <Route path={BLOG_PAGE_ROUTES.blog_item.route} element={BLOG_PAGE_ROUTES.blog_item.element} />
                </Route>
                <Route path={HOME_PAGE_WRAPPER_ROUTES.orders.route} element={HOME_PAGE_WRAPPER_ROUTES.orders.element}>
                    <Route path={ORDERS_PAGE_ROUTES.order.route} element={ORDERS_PAGE_ROUTES.order.element} />
                </Route>
                <Route path={HOME_PAGE_WRAPPER_ROUTES.home.route} element={HOME_PAGE_WRAPPER_ROUTES.home.element} />
            </Route>
            <Route path={SERVICE_ROUTES.service.route} element={SERVICE_ROUTES.service.element}>
                <Route path={SERVICE_ROUTES.boxer.route} element={SERVICE_ROUTES.boxer.element} />
            </Route>
            <Route path={APP_ROUTES.not_found.route} element={APP_ROUTES.not_found.element} />
        </Routes>
    )
}