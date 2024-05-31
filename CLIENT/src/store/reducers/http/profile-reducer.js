import { PROFILE_ACTIONS } from "../../../consts/actions/http"

export const defaultState = {
    userinfo: {},
    invalid_data: false,
}

const actions = new Map([
    [PROFILE_ACTIONS.SET_INVALID_DATA, (state, payload) => {
        return { ...state, invalid_data: payload }
    }],
    [PROFILE_ACTIONS.SET_USER_INFO, (state, payload) => {
        return { ...state, userinfo: {...payload}}
    }]
])

export const profileReducer = (state = defaultState, action) => {
    if (actions.has(action.type)) {
        return actions.get(action.type)(state, action.payload);
    } else {
        return state;
    }
}