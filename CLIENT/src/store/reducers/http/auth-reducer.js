import { AUTH_ACTIONS } from "../../../consts/actions/http";

export const defaultState = {
    isAuth: false,
    user_id: 0,
    invalid_code: false,
    existed_email: false,
    invalid_email: false,
    existed_username: false,
    invalid_data: false,
    user_role : 2
}

const actions = new Map([
    [AUTH_ACTIONS.SET_INVALID_DATA, (state, payload) => {
        return { ...state, invalid_data: payload }
    }],
    [AUTH_ACTIONS.SET_USER_ID, (state, payload) => {
        return { ...state, user_id: payload }
    }],
    [AUTH_ACTIONS.SET_ROLE, (state, payload) => {
        return { ...state, user_role: payload }
    }],
    [AUTH_ACTIONS.SET_INVALID_CODE, (state, payload) => {
        return { ...state, invalid_code: payload }
    }],
    [AUTH_ACTIONS.SET_INVALID_EMAIL, (state, payload) => {
        return { ...state, invalid_email: payload }
    }],
    [AUTH_ACTIONS.SET_EXISTED_USERNAME, (state, payload) => {
        return { ...state, existed_username: payload }
    }],
    [AUTH_ACTIONS.SET_EXISTED_EMAIL, (state, payload) => {
        return { ...state, existed_email: payload }
    }],
    [AUTH_ACTIONS.LOGOUT, (state, payload) => {
        return { ...state, user_id: 0, user_role: 2 }
    }]
])

export const authReducer = (state = defaultState, action) => {
    if (actions.has(action.type)) {
        return actions.get(action.type)(state, action.payload);
    } else {
        return state;
    }
}