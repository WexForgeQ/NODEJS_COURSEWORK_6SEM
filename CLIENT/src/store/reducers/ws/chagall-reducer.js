import { CHAGALL_ACTIONS } from "../../../consts/actions/ws";

const defaultState = {
    history: [],
}

const actionsMap = new Map([
    [CHAGALL_ACTIONS.SET_HISTORY, (state, payload) => {
        return { ...state, connected: payload.map(obj => structuredClone(obj)) }
    }],
]);

export const chagallWSReducer = (state = defaultState, action) => {
    if (actionsMap.has(action.type)) {
        return actionsMap.get(action.type)(state, action.payload);
    } else {
        return state;
    }
}