import { NAVBAR_ACTIONS } from "../../../consts/actions/app";

export const defaultState = {
    home_page_section: "",
}

const actions = new Map([
    [NAVBAR_ACTIONS.SET_HOME_PAGE_SECTION, (state, payload) => {
        return { ...state, home_page_section: payload }
    }],
])

export const navbarReducer = (state = defaultState, action) => {
    if (actions.has(action.type)) {
        return actions.get(action.type)(state, action.payload);
    } else {
        return state;
    }
}