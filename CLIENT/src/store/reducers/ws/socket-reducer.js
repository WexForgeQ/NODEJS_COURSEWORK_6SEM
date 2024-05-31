import { SOCKET_ACTIONS } from "../../../consts/actions/ws";

const defaultState = {
    connected: false,
    data: {},
    prevRequest: {},
    loading: false,
    request_data: {},
}

const actionsMap = new Map([
    [SOCKET_ACTIONS.DISCONNECT_SOCKET, (state, payload) => {
        return { ...state, connected: false }
    }],
    [SOCKET_ACTIONS.CONNECT_SOCKET, (state, payload) => {
        return { ...state, connected: true }
    }],
    [SOCKET_ACTIONS.RECEIVE_MESSAGE, (state, payload) => {
        return { ...state, data: structuredClone(payload) }
    }],
    [SOCKET_ACTIONS.PREVIOUS_REQUEST, (state, payload) => {
        return { ...state, prevRequest: structuredClone(payload) }
    }],
    [SOCKET_ACTIONS.LOADING, (state, payload) => {
        return { ...state, loading: payload }
    }],
    [SOCKET_ACTIONS.SET_REQUEST_DATA, (state, payload) => {
        return { ...state, loading: { ...payload } }
    }],
]);

export const socketReducer = (state = defaultState, action) => {
    if (actionsMap.has(action.type)) {
        return actionsMap.get(action.type)(state, action.payload);
    } else {
        return state;
    }
}