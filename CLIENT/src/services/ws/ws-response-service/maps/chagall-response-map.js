import { CHAGALL_ACTIONS, SOCKET_ACTIONS } from "../../../../consts/actions/ws";
import { CHAGALL_WS_ROUTES } from "../../../../consts/ws-routes/";

export const CHAGALL_RESPONE_MAP = new Map([
    [CHAGALL_WS_ROUTES.history.action, (responseData, dispatch, navigate) => {
        console.log(responseData);
    }]
])