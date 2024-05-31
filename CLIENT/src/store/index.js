import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { fetchSlice, authReducer } from "./reducers/http";
import { socketReducer, chagallWSReducer } from "./reducers/ws";
import { navbarReducer } from "./reducers/app";
import { galleryReducer } from "./reducers/http/gallery-reducer";
import { profileReducer } from "./reducers/http/profile-reducer";
import { orderReducer } from "./reducers/http/order-reducer";

const rootReducer = combineReducers({
    fetchData: fetchSlice.reducer,
    authData: authReducer,
    navbarData: navbarReducer,
    profileData: profileReducer,
    orderData: orderReducer,
    galleryData: galleryReducer,
    socketData: socketReducer,
    chagallWSData: chagallWSReducer,
})

export const store = configureStore({
    reducer: rootReducer
})
