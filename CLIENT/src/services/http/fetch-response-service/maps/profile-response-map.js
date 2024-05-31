import { PROFILE_ACTIONS } from "../../../../consts/actions/http";
import { PROFILE_FETCH_ROUTES } from "../../../../consts/fetch-routes";
import { APP_ROUTES, AUTH_ROUTES } from "../../../../consts/url-routes";
import { AUTH_RESPONSE_MAP } from "./auth-response-map";

export const PROFILE_RESPONSE_MAP = new Map([
    [PROFILE_FETCH_ROUTES.getUserInfo.fetch_name, (responseData, dispatch, navigate) =>{
        if (responseData.status === 200) {
            dispatch({type: PROFILE_ACTIONS.SET_USER_INFO, payload: responseData.data.userinfo})
        } else if (responseData.status === 400) {
            navigate(AUTH_ROUTES.login.route);
            dispatch({ type: PROFILE_ACTIONS.SET_INVALID_DATA, payload: true });
        }
    }],
    [PROFILE_FETCH_ROUTES.updateUserInfo.fetch_name, (responseData, dispatch, navigate) =>{
        if (responseData.status === 200) {
            dispatch({type: PROFILE_ACTIONS.SET_USER_INFO, payload: responseData.data.userinfo})
        } else if (responseData.status === 400) {
            navigate(AUTH_ROUTES.login.route);
            dispatch({ type: PROFILE_ACTIONS.SET_INVALID_DATA, payload: true });
        }
    }]
])