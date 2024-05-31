import { AUTH_RESPONSE_MAP } from "./auth-response-map";
import { AUTH_FETCH_ROUTES, GALLERY_FETCH_ROUTES, ORDER_FETCH_ROUTES, PROFILE_FETCH_ROUTES } from "../../../../consts/fetch-routes";
import { GALLERY_RESPONSE_MAP } from "./gallery-response-map";
import { PROFILE_RESPONSE_MAP } from "./profile-response-map";
import { ORDER_RESPONSE_MAP } from "./orders-response-map";

export const RESPONSE_GROUP_MAP = new Map([
    [AUTH_FETCH_ROUTES.group, AUTH_RESPONSE_MAP],
    [GALLERY_FETCH_ROUTES.group, GALLERY_RESPONSE_MAP],
    [PROFILE_FETCH_ROUTES.group, PROFILE_RESPONSE_MAP],
    [ORDER_FETCH_ROUTES.group, ORDER_RESPONSE_MAP]
])