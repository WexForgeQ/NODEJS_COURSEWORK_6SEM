import { GALLERY_FETCH_ROUTES } from "../../../../consts/fetch-routes";
import { GALLERY_ACTIONS, AUTH_ACTIONS } from "../../../../consts/actions/http";
import { APP_ROUTES } from "../../../../consts/url-routes";
import { GALLERY_PAGE_ROUTES } from "../../../../consts/url-routes";

export const GALLERY_RESPONSE_MAP = new Map([
    [GALLERY_FETCH_ROUTES.getImages.fetch_name, (responseData, dispatch) => {
        if (responseData.status === 200) {
            const parsedData = JSON.parse(responseData.data);
            dispatch({type: GALLERY_ACTIONS.SET_IMAGE_ARRAY, payload: parsedData})
        } else if (responseData.status === 400) {
            dispatch({ type: AUTH_ACTIONS.SET_INVALID_DATA, payload: true });
        }
    }],
    [GALLERY_FETCH_ROUTES.getSingleImage.fetch_name, (responseData, dispatch) => {
        if (responseData.status === 200) {
            const parsedData = JSON.parse(responseData.data);
            dispatch({type: GALLERY_ACTIONS.SET_SINGLE_IMAGE, payload: parsedData})
        } else if (responseData.status === 400) {
            dispatch({ type: AUTH_ACTIONS.SET_INVALID_DATA, payload: true });
        }
    }],
    [GALLERY_FETCH_ROUTES.getAuthorImages.fetch_name, (responseData, dispatch) => {
        if (responseData.status === 200) {
            const parsedData = JSON.parse(responseData.data);
            setTimeout(1);
            dispatch({type: GALLERY_ACTIONS.SET_AUTHOR_IMAGE, payload: parsedData})
        } else if (responseData.status === 400) {
            dispatch({ type: AUTH_ACTIONS.SET_INVALID_DATA, payload: true });
        }
    }],
])