import { ORDER_ACTIONS, PROFILE_ACTIONS } from "../../../../consts/actions/http";
import { ORDER_FETCH_ROUTES, PROFILE_FETCH_ROUTES } from "../../../../consts/fetch-routes";
import { APP_ROUTES, AUTH_ROUTES } from "../../../../consts/url-routes";
import { AUTH_RESPONSE_MAP } from "./auth-response-map";

export const ORDER_RESPONSE_MAP = new Map([
    [ORDER_FETCH_ROUTES.getOrders.fetch_name, (responseData, dispatch, navigate) =>{
        if (responseData.status === 200) {
            dispatch({type: ORDER_ACTIONS.SET_ORDERS_LIST, payload: responseData.data})
        } else if (responseData.status === 400) {
            dispatch({ type: PROFILE_ACTIONS.SET_INVALID_DATA, payload: true });
        }
        else{
            alert(responseData.status);
        }
    }],
    [ORDER_FETCH_ROUTES.getSingleOrder.fetch_name, (responseData, dispatch, navigate) =>{
        if (responseData.status === 200) {
            setTimeout(10);
            dispatch({type: ORDER_ACTIONS.SET_SINGLE_ORDER, payload: responseData.data})
        } else if (responseData.status === 400) {
            navigate(AUTH_ROUTES.login.route);
            dispatch({ type: PROFILE_ACTIONS.SET_INVALID_DATA, payload: true });
        }
        else{
            alert(responseData.status);
        }
    }],
    [ORDER_FETCH_ROUTES.changeOrderStatus.fetch_name, (responseData, dispatch, navigate) =>{
        if (responseData.status === 200) {
        } else if (responseData.status === 400) {
            navigate(AUTH_ROUTES.login.route);
            dispatch({ type: PROFILE_ACTIONS.SET_INVALID_DATA, payload: true });
        }
        else{
            alert(responseData.status);
        }
    }],
    [ORDER_FETCH_ROUTES.getCars.fetch_name, (responseData, dispatch, navigate) =>{
        if (responseData.status === 200) {
            dispatch({type: ORDER_ACTIONS.SET_CARS_ARRAY, payload: responseData.data.cars})
        } else if (responseData.status === 400) {
            navigate(AUTH_ROUTES.login.route);
            dispatch({ type: PROFILE_ACTIONS.SET_INVALID_DATA, payload: true });
        }
        else{
            alert(responseData.status);
        }
    }]
])