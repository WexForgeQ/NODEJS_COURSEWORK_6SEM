import { AUTH_FETCH_ROUTES } from "../../../../consts/fetch-routes";
import { AUTH_ACTIONS } from "../../../../consts/actions/http";
import { APP_ROUTES } from "../../../../consts/url-routes";
import { AUTH_ROUTES } from "../../../../consts/url-routes";

export const AUTH_RESPONSE_MAP = new Map([
    [AUTH_FETCH_ROUTES.login.fetch_name, (responseData, dispatch, navigate) => {
        if (responseData.status === 200) {
            dispatch({type: AUTH_ACTIONS.SET_ROLE, payload: responseData.data.role})
            navigate(APP_ROUTES.home.route);
        } else if (responseData.status === 400) {
            navigate(AUTH_ROUTES.login.route);
            dispatch({ type: AUTH_ACTIONS.SET_INVALID_DATA, payload: true });
        }
    }],
    [AUTH_FETCH_ROUTES.registration.fetch_name, (responseData, dispatch, navigate) => {
        if (responseData.status === 200) {
            dispatch({type: AUTH_ACTIONS.SET_USER_ID, payload: responseData.data.userid})
            navigate(AUTH_ROUTES.emailcode.route);
        } else if (responseData.status === 400) {
            dispatch({ type: AUTH_ACTIONS.SET_INVALID_DATA, payload: true });
        }
        else{
            alert(responseData.status);
        }
    }],
    [AUTH_FETCH_ROUTES.emailcode.fetch_name, (responseData, dispatch, navigate) => {
        if (responseData.status === 200) {
            dispatch({type: AUTH_ACTIONS.SET_ROLE, payload: responseData.data.role})
            navigate(APP_ROUTES.home.route);
        } else if (responseData.status === 400) {
            dispatch({ type: AUTH_ACTIONS.SET_INVALID_DATA, payload: true });
        }
        else{

            alert(responseData.status);
        }
    }],
    [AUTH_FETCH_ROUTES.logout.fetch_name, (responseData, dispatch, navigate) => {
        if (responseData.status === 200) {
            dispatch({type: AUTH_ACTIONS.LOGOUT, payload: responseData})
            navigate(APP_ROUTES.auth.route);
        } else if (responseData.status === 400) {
            navigate(AUTH_ROUTES.login.route);
            dispatch({ type: AUTH_ACTIONS.SET_INVALID_DATA, payload: true });
        }
        else{
            alert(responseData.status);
        }
    }],
    [AUTH_FETCH_ROUTES.role.fetch_name, (responseData, dispatch, navigate) => {
        if (responseData.status === 200) {
            dispatch({type: AUTH_ACTIONS.SET_ROLE, payload: responseData.data.role})
            console.log(responseData);
        } else if (responseData.status === 400) {
            navigate(AUTH_ROUTES.login.route);
            dispatch({ type: AUTH_ACTIONS.SET_INVALID_DATA, payload: true });
        }
        else{
            alert(responseData.status);
        }
    }]
])