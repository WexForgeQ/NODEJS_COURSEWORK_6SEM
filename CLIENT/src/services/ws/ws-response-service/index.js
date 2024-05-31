import { RESPONSE_GROUP_MAP } from "./maps";

export const wsResponseService = (dispatch, responseData) => {
    if (RESPONSE_GROUP_MAP.has(responseData.request_data.group)) {
        const map = RESPONSE_GROUP_MAP.get(responseData.request_data.group);
        if (map.has(responseData.request_data.action)) {
            return map.get(responseData.request_data.action)(responseData, dispatch);
        } else {
            return;
        }
    } else {
        return;
    }
}
