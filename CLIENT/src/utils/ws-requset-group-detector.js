import { CHAGALL_WS_ROUTES } from "../consts/ws-routes"

const routesArray = [
    CHAGALL_WS_ROUTES,

]

export const wsRequestGroupDetector = (action) => {
    routesArray.map((obj) => {
        Object.keys(obj).map((key) => {
            if (typeof obj[key] === "object" && obj[key].action === action) {
                return obj[key].group;
            }
        })
    })
    return "";
}