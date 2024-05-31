import { RESPONSE_GROUP_MAP } from "./maps";
import { APP_ROUTES, AUTH_ROUTES } from "../../../consts/url-routes";
import { AUTH_FETCH_ROUTES } from "../../../consts/fetch-routes";
import { refresh } from "../fetch-service";

export const responseService = (dispatch, responseData, navigate) => {
    console.log(123);
    if (responseData.status === 401) {
        return navigate(AUTH_ROUTES.login.route);
    } else if (RESPONSE_GROUP_MAP.has(responseData.fetch_data.group)) {
        const map = RESPONSE_GROUP_MAP.get(responseData.fetch_data.group);
        if (map.has(responseData.fetch_data.fetch_name)) {
            return map.get(responseData.fetch_data.fetch_name)(responseData, dispatch, navigate);
        } else {
            return;
        }
    } else {
        return;
    }
}