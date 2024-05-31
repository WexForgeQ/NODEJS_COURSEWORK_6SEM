import { GALLERY_ACTIONS } from "../../../consts/actions/http"

export const defaultState = {
    imagesArray: [], 
    maxpage: 0,
    singleImage: {},
    authorImages: [],
}

const actions = new Map([
    [GALLERY_ACTIONS.SET_IMAGE_ARRAY, (state, payload) => {
        return  {...state, imagesArray: payload.data.map(obj => ({ ...obj })), maxpage: payload.count }
    }],
    [GALLERY_ACTIONS.SET_AUTHOR_IMAGE, (state, payload) => {

        return {...state, authorImages: payload.data.map(obj => ({ ...obj }))}
    }],
    [GALLERY_ACTIONS.SET_SINGLE_IMAGE, (state, payload) => {
        return {...state, singleImage: {...payload}}
    }],
])

export const galleryReducer = (state = defaultState, action) => {
    if (actions.has(action.type)) {
        return actions.get(action.type)(state, action.payload);
    } else {
        return state;
    }
}