import { GALLERY_ACTIONS, ORDER_ACTIONS } from "../../../consts/actions/http"

export const defaultState = {
    ordersArray: [], 
    maxpage: 0,
    singleOrder: {},
    carsArray: []
}

const actions = new Map([
    [ORDER_ACTIONS.SET_ORDERS_LIST, (state, payload) => {
        return  {...state, ordersArray: payload.orders.map(obj => ({ ...obj })), maxpage: payload.maxPage}
    }],
    [ORDER_ACTIONS.SET_SINGLE_ORDER, (state, payload) => {
        return  {...state, singleOrder: {...payload}}
    }],
    [ORDER_ACTIONS.SET_CARS_ARRAY, (state, payload) => {
        return  {...state, carsArray: payload.map(obj => ({ ...obj }))}
    }],
])

export const orderReducer = (state = defaultState, action) => {
    if (actions.has(action.type)) {
        return actions.get(action.type)(state, action.payload);
    } else {
        return state;
    }
}